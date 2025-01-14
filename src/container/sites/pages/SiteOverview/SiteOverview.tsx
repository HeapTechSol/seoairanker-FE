import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

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

import { ModalTypes } from '@/container/sites/sitesTypes'

import './SiteOverview.scss'
import { useAppSelector } from '@/api/store'
import { useGetWebsiteSummarQuery } from '../../api/sitesAPI'


// Types for props and mappers
type IconMapper = Record<string, JSX.Element>;
type FieldMapper = Record<string, { title: string; desc: string }>;
type DomainInfo = { checks: Record<string, any> };
type PageMetrics = { links_external: number; links_internal: number;[key: string]: any };


const SiteOverview = ({ isGetSiteDataPending }: { isGetSiteDataPending: boolean }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { id } = useParams();
  const { data } = useGetWebsiteSummarQuery(id);

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  const getModalRecommendationsCountByType = (modal: ModalTypes) => crawledInfo?.model_data?.find((item) => item.model === modal)?.total

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
  };

  const wesbiteSummary = data?.data;

  const domainInfo: DomainInfo = {
    checks: {
      ssl: wesbiteSummary?.domain_info?.checks?.ssl,
      sitemap: wesbiteSummary?.domain_info?.checks?.sitemap,
      robots: wesbiteSummary?.domain_info?.checks?.robots_txt,
    },
  };

  const pageMetrics: PageMetrics = {
    links_external: wesbiteSummary?.page_metrics?.links_external,
    links_internal: wesbiteSummary?.page_metrics?.links_internal,
    duplicate_title: wesbiteSummary?.page_metrics?.duplicate_title,
    duplicate_description: wesbiteSummary?.page_metrics?.duplicate_description,
    duplicate_content: wesbiteSummary?.page_metrics?.duplicate_content,
    broken_links: wesbiteSummary?.page_metrics?.broken_links,
    broken_resources: wesbiteSummary?.page_metrics?.broken_resources,
    non_indexable: wesbiteSummary?.page_metrics?.non_indexable,
    deprecated_html_tags: wesbiteSummary?.page_metrics?.deprecated_html_tags || 0,
  };


  const WebsiteChecklist: React.FC<{ domainInfo: DomainInfo; pageMetrics: PageMetrics }> = ({ domainInfo, pageMetrics }) => {
    const checks = {
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
                {crawledInfo?.site_data?.recommendations_generated ? (
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
          {wesbiteSummary && <>
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
                    <Typography text={crawledInfo?.site_data?.total_approved || 0} className={'recommendations-overview__left-container__count'} />
                    <Typography text={`of ${crawledInfo?.site_data?.total_count || 0} Available`} />
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
