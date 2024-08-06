import { Link, useNavigate } from 'react-router-dom'

import Chip from '@/components/Chip'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import Dropdown from '@/components/Dropdown/Dropdown'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import KeywordProgress from '../KeywordProgress/KeywordProgress'

import { EXACT_ROUTES } from '@/constant/routes'
import { SitesAPIResponse } from '@/container/sites/sitesTypes'

import { GiWorld } from 'react-icons/gi'
import { FaDownload } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TiLocationArrowOutline } from 'react-icons/ti'
import { IoWarningOutline } from 'react-icons/io5'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './AddedSiteCard.scss'

const { SITE_DETAILS_PAGE, KEYWORDS_RANKING } = EXACT_ROUTES

const AddedSiteCard = ({ site, onClick }: { site: SitesAPIResponse; onClick: () => void }) => {
  const navigate = useNavigate()

  const { exportDataToCSV } = useHandleSitesLogic()
  // exportCSVLoading, csvData,

  const isKeywords = false

  const reportsMenu = [
    // {
    //   id: 1,
    //   name: (
    //     <Button fullWidth variant="filled" color="primary" type="borderRadius">
    //       Download PDF
    //     </Button>
    //   ),
    // },
    {
      id: 2,
      onClick: () => exportDataToCSV({ site_id: String(site?.id) }),
      name: (
        <Button fullWidth variant="filled" color="primary" type="borderRadius">
          Download CSV
        </Button>
      ),
    },
  ]

  return (
    <Container borderRadius boxShadow className="added-site-info-container container-bg">
      <Flex vertical className="site-info-card" gap={16}>
        <Flex className="site-info" justify="between" align="center">
          <Flex
            gap={8}
            onClick={() =>
              navigate({
                pathname: isKeywords ? KEYWORDS_RANKING : SITE_DETAILS_PAGE,
                search: `?id=${site.id}&url=${encodeURIComponent(site.site_url)}`,
              })
            }
            align="center"
            className="site-info-card__header"
          >
            {site?.favicon_url ? (
              <span className="fav-icon-image">
                <img src={site?.favicon_url} alt="" />
              </span>
            ) : (
              <GiWorld />
            )}
            <Link to="" className="site-link">
              {site?.site_url || ''}
            </Link>
          </Flex>
          <Flex className="site-info-controls" justify="end" align="center">
            <Tooltip content={'Snippet is not installed'}>
              <Button
                type="borderRadius"
                onlyIcon
                size="sm"
                color="warning"
                variant="text"
                StartIcon={<IoWarningOutline />}
                onClick={() => console.log('clicked')}
              />
            </Tooltip>
            {/* <Button
              type="borderRadius"
              onlyIcon
              size="sm"
              color="info"
              variant="text"
              StartIcon={<IoSettingsOutline />}
              onClick={() => console.log('clicked')}
            /> */}
            <Button type="borderRadius" onlyIcon size="sm" color="error" variant="text" fill StartIcon={<RiDeleteBin6Line />} onClick={onClick} />
            <Dropdown options={reportsMenu} onSelect={() => null} className="profile-dropdown-list" dropDownPlacement="right">
              <Button type="borderRadius" onlyIcon size="sm" color="primary" variant="text" StartIcon={<FaDownload />} onClick={() => null} />
            </Dropdown>
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
