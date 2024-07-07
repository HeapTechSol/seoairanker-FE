import { Control, Controller, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Divider from '@/components/Divider/Divider'
import ToggleButton from '@/components/ToggleButton'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import RangeSelector from '@/components/RangeSelector/RangeSelector'

import { useAppSelector } from '@/api/store'
import { RiGlobalLine } from 'react-icons/ri'
import { SeodeIcon } from '@/assets/icons/svgs'

import './AddSite.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddSite = ({ control }: { control: Control<any> }) => {
  
  const userQuota = useAppSelector((state) => state.billing.userQuota)

  const pages = useWatch({ control, name: 'pages' })

  return (
    <Container width={100} borderRadius boxShadow padding={'40px 20px 0px 20px'} className="add-site-container">
      <Flex vertical gap={32} align="center">
        {SeodeIcon}
        <Flex vertical gap={16}>
          <Typography text="What's your domain name?" type="h3" />
          <Divider />
          <Typography text="Copy your site URL here. We will run a preliminary scan, then begin to optimize your SEO performance." />

          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                StartIcon={<RiGlobalLine />}
                name="siteUrl"
                title="URL"
                titlePosition="top"
                placeholder="Enter your Site URL"
                value={value}
                onChange={onChange}
                error={error ? error.message : ''}
              />
            )}
            name="siteUrl"
            control={control}
          />
          <Typography text="Limit the number of pages to crawl. This allows you to distribute the global per-team limit across your sites." />
          <Controller
            render={({ field: { onChange, value } }) => (
              <RangeSelector
                isInfoChip={false}
                onChange={onChange}
                value={value}
                min={0}
                step={10}
                max={userQuota?.total_pages_quota}
                filledRangeColor="primary"
                emptyRangeColor="secondary"
              />
            )}
            name="pages"
            control={control}
          />

          <Typography
            text={`Current Limit: ${pages >= (userQuota?.total_pages_quota || 0) ? 'unlimited' : pages || ''} ${userQuota?.total_pages_quota} Included in your plan`}
          />
          <Flex align="center" gap={16}>
            <Controller
              render={({ field: { onChange, value } }) => <ToggleButton onChange={onChange} checked={value} />}
              name="jsonSchemas"
              control={control}
            />
            <Typography text="Use AI Engine to generate JSON Schemas for pages?" />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddSite
