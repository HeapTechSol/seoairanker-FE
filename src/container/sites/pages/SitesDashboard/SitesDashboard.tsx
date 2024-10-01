import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import Stepper from '@/components/Stepper'
// import Drawer from '@/components/Drawer/Drawer'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import NoDataPlaceholder from '@/components/NoDataPlaceholder/NoDataPlaceholder'
import AddedSiteCard from '@/container/sites/components/AddedSiteCard/AddedSiteCard'

import { EXACT_ROUTES } from '@/constant/routes'

import { GoSearch } from 'react-icons/go'
import { WarningIcon } from '@/assets/icons/svgs'
import { RiDeleteBin6Line } from 'react-icons/ri'
// import { IoSettingsOutline } from 'react-icons/io5'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

// import { steps } from '@/container/sites/utils'
import { ColumnType } from '@/components/Table/types'
import { SitesAPIResponse } from '@/container/sites/sitesTypes'

import './SitesDashboard.scss'
import { formatDate } from '@/utils/helper'

const { ADD_SITE, SITE_DETAILS_PAGE, KEYWORDS_RANKING } = EXACT_ROUTES

const SitesDashboard = () => {
  const navigate = useNavigate()

  const [siteId, setSiteId] = useState<number>()
  const [query, setQuery] = useState('')
  // const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false)

  const {
    // control,
    sitesList,
    // isLoading,
    // currentStep,
    getSitesList,
    // submitHandler,
    // keywordsLoading,
    sitesListLoading,
    handleDeleteSite,
    deleteSideLoading,
    // handleForwardButtonPress,
    // handlePreviousButtonPress,
  } = useHandleSitesLogic()

  useEffect(() => {
    getSitesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteSite = (id: number) => {
    setSiteId(id)
    setIsShowDeleteModal(true)
  }

  const isKeywords = false

  const columns: ColumnType<SitesAPIResponse>[] = [
    {
      header: 'Sites',
      dataKey: 'site_url',
      render: (value, record) => (
        <Typography text={value} color="info" link onClick={() => navigate(isKeywords ? KEYWORDS_RANKING : `${SITE_DETAILS_PAGE}/${record?.id}`)} />
      ),
    },
    { header: 'Date', dataKey: 'created_at', render: (text) => formatDate(text) },
    {
      header: '',
      render: (_, record) => (
        <Flex className="site-info-controls" justify="end" align="center">
          {/* <Button onlyIcon size="sm" color="info" variant="text" StartIcon={<IoSettingsOutline />} onClick={() => console.log('clicked')} /> */}
          <Button onlyIcon size="sm" color="error" variant="text" StartIcon={<RiDeleteBin6Line />} onClick={() => deleteSite(record.id)} />
        </Flex>
      ),
    },
  ]

  const isSitesExist = !!sitesList?.length

  const filteredSiteList = sitesList?.filter((site) => site?.site_url?.includes(query))

  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen)
  // }

  return (
    <Container className="sites-dashboard">
      {/* <div>
        <Drawer
          showCloseIcon
          position="right"
          cancelText="Back"
          submitText="Submit"
          title="Add New Site"
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          onSubmit={handleForwardButtonPress}
          onCancel={handlePreviousButtonPress}
          disableCancelButton={false}
          disableSubmitButton={false}
          submitButtonLoading={isLoading || keywordsLoading}
          footerPosition="between"
        >
          <Stepper
            color="common"
            minHeight={'480px'}
            steps={steps(control)}
            componentControl={false}
            activeStepper={currentStep}
            showInternalButtons={false}
            submitHandler={submitHandler}
          />
        </Drawer>
      </div> */}
      <Loader loading={sitesListLoading}>
        <Flex vertical gap={24}>
          <Typography text="SEOAIRanker's Dashboard" type="h1" />
          <Container className="sites-dashboard-header container-bg" borderRadius boxShadow>
            <Flex justify="between">
              <Input StartIcon={<GoSearch />} name="search_site" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button onClick={() => navigate(ADD_SITE)} size="sm" >
                Add a New Site
              </Button>
            </Flex>
          </Container>
          {isSitesExist ? (
            <Flex gap={16}>
              <Flex vertical gap={16}>
                {filteredSiteList?.map((site, index) => (
                  <AddedSiteCard site={site} onClick={() => deleteSite(site.id)} key={`${index}-AddSiteCard`} />
                ))}
              </Flex>
              <Container borderRadius boxShadow className="sites-history container-bg">
                <Flex vertical gap={16} align="start">
                  <Typography type="h3" text="Add Your Site" />
                  <Typography text="It's easy! Just click the button." />
                  <Divider color="primary" />
                  <Table columns={columns} data={sitesList || []} />
                  <Button onClick={() => navigate(ADD_SITE)} size="sm" >
                    Add a New Site
                  </Button>
                </Flex>
              </Container>
            </Flex>
          ) : (
            <NoDataPlaceholder />
          )}
        </Flex>
        <Modal
          show={isShowDeleteModal}
          OkText="Delete Site"
          header={false}
          cancelText="Cancel"
          setShowModel={setIsShowDeleteModal}
          OkButtonProperties={{ color: 'error' }}
          requestLoading={deleteSideLoading}
          onSubmit={() => handleDeleteSite(siteId as number, setIsShowDeleteModal)}
        >
          <Flex vertical gap={8} align="center" padding={'20px 0px'}>
            {WarningIcon}
            <Typography text="Are you sure you want to delete?" />
          </Flex>
        </Modal>
      </Loader>
    </Container>
  )
}

export default SitesDashboard
