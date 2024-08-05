import { useNavigate } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Grid from '@/components/Grid/Grid'
import SiteInsights from '../SiteInsights/SiteInsights'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import KeywordProgress from '@/container/sites/components/KeywordProgress/KeywordProgress'

import { VscGraphLine } from 'react-icons/vsc'
import { GrInstallOption } from 'react-icons/gr'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineRecommend, MdOutlineSchema, MdOutlineWatchLater } from 'react-icons/md'

import { useAppSelector } from '@/api/store'

import { EXACT_ROUTES } from '@/constant/routes'
import { ModalTypes } from '@/container/sites/sitesTypes'

import './SiteOverview.scss'

const { SCRIPT_SECTION } = EXACT_ROUTES

const SiteOverview = () => {
  const navigate = useNavigate()
  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  const getModalRecommendationsCountByType = (modal: ModalTypes) => crawledInfo?.model_data?.find((item) => item.model === modal)?.total

  const keywordsMatrics = crawledInfo?.site_data?.keywordsSummary

  return (
    <Container borderRadius boxShadow className="site-overview-detail">
      <Flex vertical gap={40}>
        <Grid gap={16} minMax={500} minWidth={200}>
          <Container className="container-bg checklist__item" style={{ cursor: 'pointer' }} onClick={() => navigate(SCRIPT_SECTION)}>
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
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <VscGraphLine className="item-icon" />
                <Typography text="Add Keywords to Track" />
              </Flex>
              {crawledInfo?.site_data?.keywords_add_to_track ? (
                <FaRegCircleCheck className="checkmark-icon" />
              ) : (
                <MdOutlineWatchLater className="checkmark-icon watch" />
              )}
            </Flex>
          </Container>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <MdOutlineRecommend className="item-icon" />
                <Typography text="Configure Recommendations" />
              </Flex>
              {crawledInfo?.site_data?.recommendations_generated ? (
                <FaRegCircleCheck className="checkmark-icon" />
              ) : (
                <MdOutlineWatchLater className="checkmark-icon watch" />
              )}
            </Flex>
          </Container>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <MdOutlineSchema className="item-icon" />
                <Typography text="Configure Schema" />
              </Flex>
              {crawledInfo?.site_data?.schema_configured ? (
                <FaRegCircleCheck className="checkmark-icon" />
              ) : (
                <MdOutlineWatchLater className="checkmark-icon watch" />
              )}
            </Flex>
          </Container>
        </Grid>

        <Grid gap={16} minWidth={200} minMax={300} className="keywords-ranking-detail__cards">
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end" gap={16}>
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 10" />
                <Typography className={'keywords-ranking-detail__card__count'} text={keywordsMatrics?.top_10 || 0} inline />
              </Flex>
              <KeywordProgress count={keywordsMatrics?.trend_top_10 || 0} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end" gap={16}>
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 30" />
                <Typography className={'keywords-ranking-detail__card__count'} text={keywordsMatrics?.top_30 || 0} inline />
              </Flex>
              <KeywordProgress count={keywordsMatrics?.trend_top_30 || 0} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end" gap={16}>
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 50" />
                <Typography className={'keywords-ranking-detail__card__count'} text={keywordsMatrics?.top_50 || 0} inline />
              </Flex>
              <KeywordProgress count={keywordsMatrics?.trend_top_50 || 0} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end" gap={16}>
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 100" />
                <Typography className={'keywords-ranking-detail__card__count'} text={keywordsMatrics?.top_100 || 0} inline />
              </Flex>
              <KeywordProgress count={keywordsMatrics?.trend_top_100 || 0} />
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
                <Button size="sm" type="borderRadius">
                  Recommendations
                </Button>
              </Flex>
            </Container>
            <Container width={70} className="recommendations-overview__right-container">
              <Grid gap={16} minWidth={100} minMax={200}>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('heading_suggestions') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Optimize Headline Tags" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('missing_meta_titles') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Optimize Title" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('og_tags') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Add a Social Preview" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('missing_meta_descriptions') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Add Meta Description" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('heading_suggestions') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Add an H1 Tag" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('missing_link_title_attr') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="Links Missing Titles" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('external_links') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="External Link Target" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography
                      text={getModalRecommendationsCountByType('missing_alt_images') || 0}
                      className={'recommendations-overview__right-container__batch__count'}
                    />
                    <Typography text="No Image Alt/Title Text" />
                  </Flex>
                </Container>
              </Grid>
            </Container>
          </Flex>
        </Container>

        <SiteInsights />
      </Flex>
    </Container>
  )
}

export default SiteOverview
