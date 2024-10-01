import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Grid from '@/components/Grid/Grid'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import KeywordProgress from '@/container/sites/components/KeywordProgress/KeywordProgress'
import KeywordsTrendingChart from '@/container/sites/components/KeywordsTrendingChart/KeywordsTrendingChart'

import { VscGraphLine } from 'react-icons/vsc'
import { GrInstallOption } from 'react-icons/gr'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { MdOutlineRecommend, MdOutlineSchema } from 'react-icons/md'

import './KeywordsRankingDetail.scss'

const KeywordsRankingDetail = () => {
  return (
    <Container className="keywords-ranking-detail">
      <Flex vertical gap={40}>

        <Grid gap={16} minMax={500} minWidth={200}>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <GrInstallOption className="item-icon" />
                <Typography text="Install Snippet" />
              </Flex>
              <FaRegCircleCheck className="checkmark-icon" />
            </Flex>
          </Container>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <VscGraphLine className="item-icon" />
                <Typography text="Add Keywords to Track" />
              </Flex>
              <FaRegCircleCheck className="checkmark-icon" />
            </Flex>
          </Container>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <MdOutlineRecommend className="item-icon" />
                <Typography text="Configure Recommendations" />
              </Flex>
              <FaRegCircleCheck className="checkmark-icon" />
            </Flex>
          </Container>
          <Container className="container-bg checklist__item">
            <Flex>
              <Flex align="center" gap={16}>
                <MdOutlineSchema className="item-icon" />
                <Typography text="Configure Schema" />
              </Flex>
              <FaRegCircleCheck className="checkmark-icon" />
            </Flex>
          </Container>
        </Grid>

        <Grid gap={16} minWidth={200} minMax={350} className="keywords-ranking-detail__cards">
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end">
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 5" />
                <Typography className={'keywords-ranking-detail__card__count'} text="3" inline />
              </Flex>
              <KeywordProgress count={22} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end">
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 10" />
                <Typography className={'keywords-ranking-detail__card__count'} text="4" inline />
              </Flex>
              <KeywordProgress count={22} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end">
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 25" />
                <Typography className={'keywords-ranking-detail__card__count'} text="6" inline />
              </Flex>
              <KeywordProgress count={22} />
            </Flex>
          </Container>
          <Container padding={20} className="container-bg keywords-ranking-detail__card">
            <Flex align="end">
              <Flex vertical inline align="center" gap={16}>
                <Typography text="TOP 100" />
                <Typography className={'keywords-ranking-detail__card__count'} text="8" inline />
              </Flex>
              <KeywordProgress count={22} />
            </Flex>
          </Container>
        </Grid>

        <Container padding={20} className="container-bg recommendations-overview">
          <Flex>
            <Container width={30} className="recommendations-overview__left-container">
              <Flex vertical gap={32} align="start" justify="between">
                <Typography text="Recommendations" type="h3" />
                <Flex gap={16}>
                  <Typography text="35,775" className={'recommendations-overview__left-container__count'} />
                  <Typography text="of 40,800 Available" />
                </Flex>
                <Button size="sm" >
                  Recommendations
                </Button>
              </Flex>
            </Container>
            <Container width={70} className="recommendations-overview__right-container">
              <Grid gap={16} minWidth={100} minMax={200}>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="597" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Optimize Headline Tags" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="2" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Optimize Title" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="18" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Add a Social Preview" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="14" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Add Meta Description" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="1" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Add an H1 Tag" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="1,215" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="Links Missing Titles" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="95" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="External Link Target" />
                  </Flex>
                </Container>
                <Container className="recommendations-overview__right-container__batch">
                  <Flex gap={8} vertical>
                    <Typography text="7,973" className={'recommendations-overview__right-container__batch__count'} />
                    <Typography text="No Image Alt/Title Text" />
                  </Flex>
                </Container>
              </Grid>
            </Container>
          </Flex>
        </Container>

        <KeywordsTrendingChart />

      </Flex>
    </Container>
  )
}

export default KeywordsRankingDetail
