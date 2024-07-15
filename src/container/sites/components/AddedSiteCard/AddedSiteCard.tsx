import { Link, useNavigate } from 'react-router-dom'

import Chip from '@/components/Chip'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import KeywordProgress from '../KeywordProgress/KeywordProgress'

import { EXACT_ROUTES } from '@/constant/routes'
import { SitesAPIResponse } from '@/container/sites/sitesTypes'

import { GiWorld } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { TiLocationArrowOutline } from 'react-icons/ti'

import './AddedSiteCard.scss'

const { SITE_DETAILS_PAGE, KEYWORDS_RANKING } = EXACT_ROUTES

const AddedSiteCard = ({ site, onClick }: { site: SitesAPIResponse; onClick: () => void }) => {
  const navigate = useNavigate()

  const isKeywords = false

  return (
    <Container borderRadius boxShadow className="added-site-info-container container-bg">
      <Flex vertical className="site-info-card" gap={16}>
        <Flex className="site-info" justify="between" align="center">
          <Flex
            gap={8}
            onClick={() =>
              navigate(isKeywords ? KEYWORDS_RANKING : SITE_DETAILS_PAGE, {
                state: { siteId: site.id, siteUrl: site.site_url },
              })
            }
            align="center"
            className="site-info-card__header"
          >
            {site?.favicon_url ? <img src={site?.favicon_url} alt="" /> : <GiWorld />}
            <Link to="" className="site-link">
              {site?.site_url || ''}
            </Link>
          </Flex>
          <Flex className="site-info-controls" justify="end" align="center">
            <Button onlyIcon size="sm" color="info" variant="text" StartIcon={<IoSettingsOutline />} onClick={() => console.log('clicked')} />
            <Button onlyIcon size="sm" color="error" variant="text" fill StartIcon={<RiDeleteBin6Line />} onClick={onClick} />
          </Flex>
        </Flex>
        <Flex justify="between" className="performance-state">
          {isKeywords && (
            <Flex>
              <Container color="success" width={100} className="keywords-performance-stats">
                <Flex vertical justify="between">
                  <Flex justify="between" align="center" className="keywords-performance-stats__graphs">
                    <Typography text="TOP 10" />
                    <KeywordProgress count={22} />
                  </Flex>
                  <Flex align="center" gap={8} className="keywords-performance-stats__graphs">
                    <Typography className={'count'} text="4" inline />
                    <Typography text="/9" className="total-count" inline />
                  </Flex>
                </Flex>
              </Container>
              <Container color="success" width={100} className="keywords-performance-stats">
                <Flex vertical justify="between">
                  <Flex justify="between" align="center" className="keywords-performance-stats__graphs">
                    <Typography text="TOP 25" />
                    <KeywordProgress count={33} />
                  </Flex>
                  <Flex align="center" gap={8} className="keywords-performance-stats__graphs">
                    <Typography className={'count'} text="6" inline />
                    <Typography text="/9" className="total-count" inline />
                  </Flex>
                </Flex>
              </Container>
              <Container color="success" width={100} className="keywords-performance-stats">
                <Flex vertical justify="between">
                  <Flex justify="between" align="center" className="keywords-performance-stats__graphs">
                    <Typography text="LIFETIME UP" />
                    <KeywordProgress count={56} />
                  </Flex>
                  <Flex align="center" gap={8} className="keywords-performance-stats__graphs">
                    <Typography className={'count'} text="5" inline />
                    <Typography text="/9" className="total-count" inline />
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          )}
          {!isKeywords && (
            <Container className="alert-message-container" width={100} contentCenter>
              <Chip
                text="Alert! Please select your keywords so Seode can start analyzing your site."
                color="error"
                rounded
                bordered
                size="lg"
                className="alert-message"
              />
            </Container>
          )}
          <Container width={30}>
            <Flex vertical className="keywords-performance-stats__counts">
              <Flex justify="between" align="center" className="keywords-performance-stats__graphs">
                <Typography text="RECOMMENDATIONS" />
                <Button
                  onlyIcon
                  color="info"
                  variant="text"
                  StartIcon={<TiLocationArrowOutline />}
                  onClick={() =>
                    navigate(isKeywords ? KEYWORDS_RANKING : SITE_DETAILS_PAGE, {
                      state: { siteId: site.id, siteUrl: site.site_url },
                    })
                  }
                />
              </Flex>
              <Flex align="center" gap={8} className="keywords-performance-stats__graphs">
                <Typography text={site?.total_approved_count || 0} inline className={'count'} />
                <Typography className="total-count" text={`/${site.total_count || 0}`} />
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddedSiteCard
