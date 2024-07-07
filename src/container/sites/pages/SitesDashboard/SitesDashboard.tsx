import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
// import Pagination from "@/components/Pagination/Pagination";
import AddedSiteCard from '@/container/sites/components/AddedSiteCard/AddedSiteCard'

import { EXACT_ROUTES } from '@/constant/routes'

import { WarningIcon } from '@/assets/icons/svgs'

import { GoSearch } from 'react-icons/go'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './SitesDashboard.scss'

const { ADD_SITE, SITE_DETAILS_PAGE } = EXACT_ROUTES

const SitesDashboard = () => {
  const navigate = useNavigate()

  const [siteId, setSiteId] = useState<number>()
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false)

  const { getSitesList, sitesList, handleDeleteSite, deleteSideLoading } = useHandleSitesLogic()

  useEffect(() => {
    getSitesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteSite = (id: number) => {
    setSiteId(id)
    setIsShowDeleteModal(true)
  }

  const columns = [
    {
      header: 'Sites',
      dataKey: 'siteUrl',
      sortKey: 'siteUrl',
      render: (value: string, record: any) => (
        <Typography
          text={value}
          color="info"
          link
          onClick={() =>
            navigate(SITE_DETAILS_PAGE, {
              state: {
                siteId: record.id,
                siteUrl: value,
              },
            })
          }
        />
      ),
    },
    { header: 'Date', dataKey: 'createdAt', sortKey: 'createdAt' },
    {
      header: '',
      dataKey: 'action',
      render: (_: string, record: Record<string, number>) => (
        <Flex className="site-info-controls" justify="end" align="center">
          <Button onlyIcon size="sm" color="info" variant="text" StartIcon={<IoSettingsOutline />} onClick={() => console.log('clicked')} />
          <Button onlyIcon size="sm" color="error" variant="text" StartIcon={<RiDeleteBin6Line />} fill onClick={() => deleteSite(record.id)} />
        </Flex>
      ),
    },
  ]

  const isSitesExist = !!sitesList?.length

  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Typography text="Seode's Dashboard" type="h1" />
        <Divider color="warning" />
        <Container className="sites-dashboard-header container-bg" borderRadius boxShadow>
          <Flex justify="between">
            <Input StartIcon={<GoSearch />} name="search_site" placeholder="Search" />
            <Button onClick={() => navigate(ADD_SITE)} size="sm" type="borderRadius">
              Add a New Site
            </Button>
          </Flex>
        </Container>
        {isSitesExist && (
          <Flex gap={16}>
            <Flex vertical gap={16}>
              {sitesList?.map((site, index) => <AddedSiteCard site={site} onClick={() => deleteSite(site.id)} key={`${index}-AddSiteCard`} />)}
              {/* <Pagination
              pageSize={10}
              currentPage={1}
              totalCount={75}
              onPageChange={() => console.log("onPage Change")}
            /> */}
            </Flex>
            <Container borderRadius boxShadow className="sites-history container-bg">
              <Flex vertical gap={16} align="start">
                <Typography type="h3" text="Add Your Site" />
                <Typography text="It's easy! Just click the button." />
                <Divider color="warning" />
                <Input StartIcon={<GoSearch />} name="search_site" placeholder="Search" />
                <Divider color="warning" />
                <Table columns={columns} data={sitesList || []} />
                {/* <Pagination
                pageSize={10}
                currentPage={1}
                totalCount={75}
                noCount
                onPageChange={() => console.log("onPage Change")}
              /> */}
                <Button onClick={() => navigate(ADD_SITE)} size="sm" type="borderRadius">
                  Add a New Site
                </Button>
              </Flex>
            </Container>
          </Flex>
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
    </Container>
  )
}

export default SitesDashboard
