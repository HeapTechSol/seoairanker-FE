import { Link, useNavigate } from 'react-router-dom'

import Chip from '@/components/Chip'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { EXACT_ROUTES } from '@/constant/routes'
import { SitesAPIResponse } from '@/container/sites/sitesTypes'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { TiLocationArrowOutline } from 'react-icons/ti'

import './AddedSiteCard.scss'

const { SITE_DETAILS_PAGE } = EXACT_ROUTES

const AddedSiteCard = ({ site, onClick }: { site: SitesAPIResponse; onClick: () => void }) => {
  const navigate = useNavigate()
  return (
    <Container borderRadius boxShadow padding={'10px 20px'} className="added-site-info-container container-bg">
      <Flex vertical className="site-info-card" gap={16}>
        <Flex className="site-info" justify="between" align="center">
          <Flex
            gap={8}
            onClick={() =>
              navigate(SITE_DETAILS_PAGE, {
                state: { siteId: site.id, siteUrl: site.siteUrl },
              })
            }
          >
            <img src={site?.logo} alt="" />
            <Link to="" className="site-link">
              {site?.siteUrl || ''}
            </Link>
          </Flex>
          <Flex className="site-info-controls" justify="end" align="center">
            <Button onlyIcon size="sm" color="info" variant="text" StartIcon={<IoSettingsOutline />} onClick={() => console.log('clicked')} />
            <Button onlyIcon size="sm" color="error" variant="text" fill StartIcon={<RiDeleteBin6Line />} onClick={onClick} />
          </Flex>
        </Flex>
        <Divider color="info" />
        <Flex justify="between" align="center">
          <Chip
            text="Alert! Please select your keywords so Seode can start analyzing your site."
            color="error"
            rounded
            bordered
            size="lg"
            className="alert-message"
          />
          <Flex vertical className="recommendations-info ">
            <Flex justify="between" align="center">
              <Typography text="Recommendations" />
              <Button onlyIcon color="info" variant="text" StartIcon={<TiLocationArrowOutline />} onClick={() => console.log('clicked')} />
            </Flex>
            <Flex align="center">
              <Typography
                text={
                  <>
                    <Typography text={site?.recommendations?.approved || 0} inline type="h1" />/
                    {site?.recommendations?.approved + site?.recommendations?.unapproved || 0}
                  </>
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddedSiteCard
