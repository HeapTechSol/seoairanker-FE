import { useEffect } from 'react'
// import { Controller, useWatch } from 'react-hook-form'
import { useParams } from 'react-router-dom'

// import Flex from '@/components/Flex'
// import Button from '@/components/Button'
// import Select from '@/components/Select'
// import Divider from '@/components/Divider/Divider'
// import ToggleButton from '@/components/ToggleButton'
import Container from '@/components/Container/Container'
// import Typography from '@/components/Typography/Typography'
// import RangeSelector from '@/components/RangeSelector/RangeSelector'

// import { useAppSelector } from '@/api/store'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
// import useHandleSiteSetting from '@/container/sites/hooks/useHandleSiteSetting'

import './Settings.scss'

const Settings = () => {
  const { id } = useParams()
  // const navigate = useNavigate()

  // const userQuota = useAppSelector((state) => state.billing.userQuota)
  // const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  // const { control } = useHandleSiteSetting()
  const { getSiteCrawledInfoData } = useHandleSitesLogic()

  // const pages = useWatch({ control, name: 'pages' })

  useEffect(() => {
    if (id) getSiteCrawledInfoData({ site_id: id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="add-new-keywords-container ">
      Setting
      {/* <Flex vertical gap={16}>
        <Typography text={crawledInfo?.site_data?.site_url || ''} type="h1" />
        <Divider color="primary" />
        <Container width={100} borderRadius boxShadow className="site-setting-page container-bg">
          <Flex vertical gap={32} align="start">
            <Controller
              render={({ field: { onChange, value } }) => (
                <ToggleButton onChange={onChange} checked={value} label="Generate JSON Schemas for pages?" labelPosition="right" id="json-schema" />
              )}
              name="jsonSchemas"
              control={control}
            />
            <Flex vertical gap={8}>
              <Typography text="Limit the number of AI JSON Page Schemas optimizations" />
              <Controller
                render={({ field: { onChange, value } }) => (
                  <RangeSelector
                    isInfoChip={false}
                    onChange={onChange}
                    value={value}
                    min={0}
                    step={1}
                    size="lg"
                    max={userQuota?.total_pages_quota}
                    filledRangeColor="primary"
                    emptyRangeColor="secondary"
                  />
                )}
                name="pages"
                control={control}
              />
              <Typography
                text={`Current Limit: ${pages >= (userQuota?.total_pages_quota || 0) ? 'unlimited' : pages || ''} usage: ${
                  userQuota?.total_pages_quota
                }`}
              />
            </Flex>
            <Container width={100}>
              <Typography text="Crawl Setting" type="h3" />
              <Divider color="primary" margin={20} />
              <Flex vertical gap={32}>
                <Controller
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Select
                      Options={[
                        { label: 'Daily', id: 'daily' },
                        { label: 'Weekly', id: 'weekly' },
                        { label: 'Monthly', id: 'monthly' },
                        { label: 'Annually', id: 'annually' },
                        { label: 'Team Default (Daily)', id: 'daily' },
                      ]}
                      title="How often would you like to refresh ranking stats for this keyword?"
                      placeholder="Schedule"
                      titlePosition="top"
                      setValues={onChange}
                      values={value}
                      size="md"
                      error={error ? error.message : ''}
                    />
                  )}
                  name="refresh_frequency"
                  control={control}
                />
                <Flex vertical gap={8}>
                  <Typography text={`Limit the number of AI Title and Description optimizations for ${crawledInfo?.site_data?.site_url}`} />
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <RangeSelector
                        isInfoChip={false}
                        onChange={onChange}
                        value={value}
                        min={0}
                        step={1}
                        size="lg"
                        max={userQuota?.total_pages_quota}
                        filledRangeColor="primary"
                        emptyRangeColor="secondary"
                      />
                    )}
                    name="pages"
                    control={control}
                  />
                  <Typography
                    text={`Current Limit: ${pages >= (userQuota?.total_pages_quota || 0) ? 'unlimited' : pages || ''} usage: ${
                      userQuota?.total_pages_quota
                    }`}
                  />
                </Flex>
              </Flex>
            </Container>
            <Flex gap={32}>
              <Button >Update</Button>
              <Button  variant="text" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Flex> */}
    </Container>
  )
}

export default Settings
