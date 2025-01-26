import { useNavigate, useSearchParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Grid from '@/components/Grid/Grid'
import Divider from '@/components/Divider/Divider'
import SiteInsights from '../SiteInsights/SiteInsights'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import KeywordProgress from '@/container/sites/components/KeywordProgress/KeywordProgress'

import Tooltip from '@/components/Tooltip'
// import { VscGraphLine } from 'react-icons/vsc'
import { GrInstallOption } from 'react-icons/gr'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { FaRegTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { MdOutlineRecommend, MdOutlineSchema, MdOutlineWatchLater } from 'react-icons/md'
import { GrLock, GrDocumentText, GrLink, GrUnlink, GrBug } from 'react-icons/gr'; // Example icons, customize as needed
import { GrInProgress } from "react-icons/gr";
import { MdDangerous } from "react-icons/md";

import { ModalTypes } from '@/container/sites/sitesTypes'

import './SiteOverview.scss'
import { useAppSelector } from '@/api/store'


// Types for props and mappers
type IconMapper = Record<string, JSX.Element>;
type FieldMapper = Record<string, { title: string; desc: string }>;
type DomainInfo = { checks: Record<string, any>;[key: string]: any };
type PageMetrics = { links_external: number; links_internal: number;[key: string]: any };


const SiteOverview = ({ isGetSiteDataPending }: { isGetSiteDataPending: boolean }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  const getModalRecommendationsCountByType = (modal: ModalTypes) => {
    const entry = Object.entries(crawledInfo?.categories || {}).find(([key]) => key === modal);
    return entry ? entry[1]?.total : undefined;
  };

  const keywordInfo = crawledInfo?.site_data?.keywordsSummary

  const navigateToTab = (tabName: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('tab', tabName.toLowerCase())

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    })
  }

  const iconMapper: IconMapper = {
    ssl: <GrLock />,
    sitemap: <GrDocumentText />,
    robots: <GrDocumentText />,
    links_external: <GrLink />,
    links_internal: <GrLink />,
    duplicate_title: <GrBug />,
    duplicate_description: <GrBug />,
    duplicate_content: <GrBug />,
    broken_links: <GrUnlink />,
    broken_resources: <GrUnlink />,
    non_indexable: <GrBug />,
    deprecated_html_tags: <MdOutlineSchema />,
  };

  const fieldsMapper: FieldMapper = {
    ssl: { title: 'SSL Enabled', desc: 'Indicates whether a target website has an SSL certificate (providing https:// connection).' },
    sitemap: { title: 'Sitemap Found', desc: 'Indicates whether a sitemap.xml file exists.' },
    robots: { title: 'Robots.txt Exists', desc: 'Indicates whether a robots.txt file exists.' },
    links_external: { title: 'External Links', desc: 'Number of external links on the website.' },
    links_internal: { title: 'Internal Links', desc: 'Number of internal links within the website.' },
    duplicate_title: { title: 'Duplicate Titles', desc: 'Pages with duplicate title tags.' },
    duplicate_description: { title: 'Duplicate Descriptions', desc: 'Pages with duplicate meta descriptions.' },
    duplicate_content: { title: 'Duplicate Content', desc: 'Pages with duplicate content.' },
    broken_links: { title: 'Broken Links', desc: 'Links that are broken or lead to non-existent pages.' },
    broken_resources: { title: 'Broken Resources', desc: 'Broken images, JavaScript, or CSS resources.' },
    non_indexable: { title: 'Non Indexable Pages', desc: 'Pages that are not indexable by search engines.' },
    deprecated_html_tags: { title: 'Deprecated HTML Tags', desc: 'Use of obsolete or deprecated HTML tags.' },
    total_pages: { title: 'Total Pages', desc: 'The total number of crawled pages' },
    onpage_score: {
      title: 'On Page Score', desc: `This shows how this Website is optimized on a 100-point scale
this field shows how website is optimized considering critical on-page issues and warnings detected;
100 is the highest possible score that means website does not have any critical on-page issues and important warnings` },
    duplicate_meta_tags: {
      title: 'Duplicate Meta Tags', desc: `Number of pages with duplicate meta tags
the number of pages with more than one meta tag of the same type` },
    large_page_size: {
      title: 'Large Page Size', desc: `Number of heavy pages
the number of pages that have a size exceeding 1 megabyte` },
    no_h1_tag: {
      title: 'Missing H1 Tag', desc: `Number of pages with empty or absent h1 tags`
    },
    seo_friendly_url: {
      title: 'Large Page Size', desc: `Number of pages with seo-frienldy urls
the ‘SEO-friendliness’ of a page URL is checked by four parameters` }
  };

  type CrawlErrorMapper = {
    site_unreachable: string;
    forbidden_meta_tag: string;
    forbidden_robots: string;
    forbidden_http_header: string;
    too_many_redirects: string;
    unknown: string;
    [key: string]: string; // Allows indexing with any string key
  };

  const crawlErrorMapper: CrawlErrorMapper = {
    'site_unreachable': 'Our crawler could not reach this website. something must be wrong on your website.',
    'forbidden_meta_tag': 'First crawled page contains the <meta robots=”noindex”> tag.',
    'forbidden_robots': 'Robots.txt forbids crawling the website',
    'forbidden_http_header': 'HTTP header of the page contains “X-Robots-Tag: noindex”.',
    'too_many_redirects': 'First crawled page has more than 10 redirects',
    'unknown': 'The reason is unknown'
  }

  type WesbiteSummary = {
    domain_info?: {
      checks: {
        ssl?: boolean;
        sitemap?: boolean;
        robots_txt?: boolean;
        seo_friendly_url: number,
        duplicate_meta_tags: number,
        large_page_size: number,
        no_h1_tag: number
      };
      extended_crawl_status: string,
      total_pages: number
    };
    page_metrics?: {
      links_external: number;
      links_internal: number;
      duplicate_title?: number;
      duplicate_description?: number;
      duplicate_content?: number;
      broken_links?: number;
      broken_resources?: number;
      non_indexable?: number;
      deprecated_html_tags?: number;
      onpage_score?: number
    };
  };

  const websiteSummary = crawledInfo?.site_data?.crawl_summary as WesbiteSummary;

  const domainInfo: DomainInfo = {
    checks: {
      ssl: websiteSummary?.domain_info?.checks?.ssl,
      sitemap: websiteSummary?.domain_info?.checks?.sitemap,
      robots: websiteSummary?.domain_info?.checks?.robots_txt,
      extended_crawl_status: websiteSummary?.domain_info?.extended_crawl_status,
      seo_friendly_url: websiteSummary?.domain_info?.checks?.seo_friendly_url,
      duplicate_meta_tags: websiteSummary?.domain_info?.checks?.duplicate_meta_tags,
      large_page_size: websiteSummary?.domain_info?.checks?.large_page_size,
      no_h1_tag: websiteSummary?.domain_info?.checks?.no_h1_tag

    },
    total_pages: websiteSummary?.domain_info?.total_pages
  };

  const pageMetrics: PageMetrics = {
    links_external: websiteSummary?.page_metrics?.links_external || 0,
    links_internal: websiteSummary?.page_metrics?.links_internal || 0,
    duplicate_title: websiteSummary?.page_metrics?.duplicate_title || 0,
    duplicate_description: websiteSummary?.page_metrics?.duplicate_description || 0,
    duplicate_content: websiteSummary?.page_metrics?.duplicate_content || 0,
    broken_links: websiteSummary?.page_metrics?.broken_links || 0,
    broken_resources: websiteSummary?.page_metrics?.broken_resources || 0,
    non_indexable: websiteSummary?.page_metrics?.non_indexable || 0,
    deprecated_html_tags: websiteSummary?.page_metrics?.deprecated_html_tags || 0,
    onpage_score: websiteSummary?.page_metrics?.onpage_score || 0,
  };


  const WebsiteChecklist: React.FC<{ domainInfo: DomainInfo; pageMetrics: PageMetrics }> = ({ domainInfo, pageMetrics }) => {
    const checks = {
      ...domainInfo,
      ...domainInfo.checks,
      ...pageMetrics,
    };

    return (
      <Grid gap={16} minMax={500} minWidth={200}>
        {Object.entries(fieldsMapper).map(([key, object]) => {
          const value = checks[key];
          // let isPositive = !isNaN(parseFloat(value)) && isFinite(value) && value > 0 || value;
          // Define positivity/negativity rules
          let isPositive = value;
          if (key === 'duplicate_description' || key === 'duplicate_title' || key === 'duplicate_content' || key === 'deprecated_html_tags') {
            isPositive = value === 0; // 0 is positive
          } else if (key === 'broken_links' || key === 'non_indexable' || key === 'broken_resources') {
            isPositive = value === 0; // 0 is positive, >0 is negative
          } else if (key === 'links_external') {
            isPositive = value > 0; // >0 is positive, 0 is negative
          }

          return (
            <Container key={key} className="container-bg checklist__item">
              <Flex justify="between">
                <Flex align="center" gap={16}>
                  {iconMapper[key] || <GrBug />}
                  <Typography text={object.title} />
                  <Tooltip content={object.desc}>
                    <FaInfoCircle />
                  </Tooltip>
                </Flex>
                <Flex align="center" justify="end" gap={16}>
                  {!isNaN(parseFloat(value)) && isFinite(value) && <Typography text={value?.toString() || 'N/A'} />}
                  {isPositive ? (
                    <FaRegCircleCheck className="checkmark-icon" style={{ color: 'green' }} />
                  ) : (
                    <FaRegTimesCircle className="checkmark-icon" style={{ color: 'red' }} />
                  )}
                </Flex>
              </Flex>
            </Container>
          );
        })}
      </Grid>
    );
  };

  return (
    <Container borderRadius boxShadow className="site-overview-detail">
      <Flex vertical gap={40}>
        <Flex vertical gap={30} className="top-container">
          <Loader loading={isGetSiteDataPending} overlay />
          {websiteSummary?.domain_info?.extended_crawl_status && websiteSummary?.domain_info?.extended_crawl_status !== 'no_errors' && <Container className="container-bg checklist__item error">
            <Flex>
              <Flex align="center" gap={16}>
                <MdDangerous className="item-icon" style={{ color: 'red' }} />
                <Typography text={'Error: ' + crawlErrorMapper[websiteSummary?.domain_info?.extended_crawl_status]} />
              </Flex>
            </Flex>
          </Container>}
          {crawledInfo?.site_data?.crawl_in_progress && <Container className="container-bg checklist__item" style={{ cursor: 'pointer' }}>
            <Flex>
              <Flex align="center" gap={16}>
                <GrInProgress className="item-icon rotating-icon" />
                <Typography text={'Pages in queue: ' + crawledInfo?.site_data?.crawl_summary?.crawl_status?.pages_in_queue + ', Pages processed: ' + crawledInfo?.site_data?.crawl_summary?.crawl_status?.pages_crawled} />
              </Flex>
            </Flex>
          </Container>}
          <Grid gap={16} minMax={500} minWidth={200}>
            <Container className="container-bg checklist__item" style={{ cursor: 'pointer' }} onClick={() => navigateToTab('script')}>
              <Flex>
                <Flex align="center" gap={16}>
                  <GrInstallOption className="item-icon" />
                  <Typography text="Install Snippet" />
                </Flex>
                {crawledInfo?.site_data?.snippet_installed ? (
                  <FaRegCircleCheck className="checkmark-icon" />
                ) : (
                  <MdOutlineWatchLater className="checkmark-icon watch" />
                )}
              </Flex>
            </Container>
            <Container className="container-bg checklist__item" style={{ cursor: 'pointer' }} onClick={() => navigateToTab('automation')}>
              <Flex>
                <Flex align="center" gap={16}>
                  <MdOutlineRecommend className="item-icon" />
                  <Typography text="Recommendations" />
                </Flex>
                {crawledInfo?.total?.total ? (
                  <FaRegCircleCheck className="checkmark-icon" />
                ) : (
                  <MdOutlineWatchLater className="checkmark-icon watch" />
                )}
              </Flex>
            </Container>
            <Container className="container-bg checklist__item" style={{ cursor: 'pointer' }} onClick={() => navigateToTab('Schema')}>
              <Flex>
                <Flex align="center" gap={16}>
                  <MdOutlineSchema className="item-icon" />
                  <Typography text="Schema" />
                </Flex>
                {crawledInfo?.site_data?.schema_configured ? (
                  <FaRegCircleCheck className="checkmark-icon" />
                ) : (
                  <MdOutlineWatchLater className="checkmark-icon watch" />
                )}
              </Flex>
            </Container>
          </Grid>
          {websiteSummary && <>
            <Typography type='h2' text='Website Summary' />
            <Divider margin={0} color="common" />
            <WebsiteChecklist domainInfo={domainInfo} pageMetrics={pageMetrics} />
          </>}
          <Typography type='h2' text='keywords Ranking Data' />
          <Divider margin={0} color="common" />
          <Grid gap={16} minWidth={200} minMax={300} className="keywords-ranking-detail__cards">
            <Container padding={20} className="container-bg keywords-ranking-detail__card">
              <Flex align="end" gap={16}>
                <Flex vertical inline align="center" gap={16}>
                  <Typography text="TOP 10" />
                  <Typography className={'keywords-ranking-detail__card__count'} text={keywordInfo?.top_10 || 0} inline />
                </Flex>
                <KeywordProgress count={keywordInfo?.trend_top_10 || 0} />
              </Flex>
            </Container>
            <Container padding={20} className="container-bg keywords-ranking-detail__card">
              <Flex align="end" gap={16}>
                <Flex vertical inline align="center" gap={16}>
                  <Typography text="TOP 30" />
                  <Typography className={'keywords-ranking-detail__card__count'} text={keywordInfo?.top_30 || 0} inline />
                </Flex>
                <KeywordProgress count={keywordInfo?.trend_top_30 || 0} />
              </Flex>
            </Container>
            <Container padding={20} className="container-bg keywords-ranking-detail__card">
              <Flex align="end" gap={16}>
                <Flex vertical inline align="center" gap={16}>
                  <Typography text="TOP 50" />
                  <Typography className={'keywords-ranking-detail__card__count'} text={keywordInfo?.top_50 || 0} inline />
                </Flex>
                <KeywordProgress count={keywordInfo?.trend_top_50 || 0} />
              </Flex>
            </Container>
            <Container padding={20} className="container-bg keywords-ranking-detail__card">
              <Flex align="end" gap={16}>
                <Flex vertical inline align="center" gap={16}>
                  <Typography text="TOP 100" />
                  <Typography className={'keywords-ranking-detail__card__count'} text={keywordInfo?.top_100 || 0} inline />
                </Flex>
                <KeywordProgress count={keywordInfo?.trend_top_100 || 0} />
              </Flex>
            </Container>
          </Grid>

          <Container padding={20} className="container-bg recommendations-overview">
            <Flex>
              <Container width={30} className="recommendations-overview__left-container">
                <Flex vertical gap={32} align="start" justify="between">
                  <Typography text="Recommendations" type="h3" />
                  <Flex gap={16}>
                    <Typography text={crawledInfo?.total?.approved || 0} className={'recommendations-overview__left-container__count'} />
                    <Typography text={`of ${crawledInfo?.total?.total || 0} Available`} />
                  </Flex>
                  <Button size="sm" onClick={() => navigateToTab('automation')}>
                    Recommendations
                  </Button>
                </Flex>
              </Container>
              <Container width={70} className="recommendations-overview__right-container">
                <Grid gap={16} minWidth={100} minMax={200}>
                  {!!getModalRecommendationsCountByType('heading_suggestions') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('heading_suggestions') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Optimize Headline Tags" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('missing_meta_titles') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('missing_meta_titles') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Optimize Title" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('og_tags') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('og_tags') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Add a Social Preview" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('missing_meta_descriptions') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('missing_meta_descriptions') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Add Meta Description" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('heading_suggestions') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('heading_suggestions') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Add an H1 Tag" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('missing_link_title_attr') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('missing_link_title_attr') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Links Missing Titles" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('external_links') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('external_links') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="External Link Target" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('missing_alt_images') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('missing_alt_images') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="No Image Alt/Title Text" />
                      </Flex>
                    </Container>
                  )}
                  {!!getModalRecommendationsCountByType('cannonical_tags') && (
                    <Container className="recommendations-overview__right-container__batch">
                      <Flex gap={8} vertical>
                        <Typography
                          text={getModalRecommendationsCountByType('cannonical_tags') || 0}
                          className={'recommendations-overview__right-container__batch__count'}
                        />
                        <Typography text="Add Canonical URL Tag" />
                      </Flex>
                    </Container>
                  )}
                </Grid>
              </Container>
            </Flex>
          </Container>
        </Flex>

        <Flex vertical gap={32}>
          <Flex vertical gap={16}>
            <Typography text="Google Site Insights" type="h2" />
            <Divider margin={0} color="common" />
          </Flex>
          <SiteInsights />
        </Flex>
      </Flex>
    </Container>
  )
}

export default SiteOverview
