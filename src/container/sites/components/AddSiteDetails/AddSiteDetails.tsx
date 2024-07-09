import { Control, Controller, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Select from '@/components/Select'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import CountryFlag from '@/components/CountryFlag/CountryFlag'

import languages from '@/constant/languages'
import { AddSitePayloadTypes } from '@/container/sites/sitesTypes'

import './AddSiteDetails.scss'

const AddSiteDetails = ({ control }: { control: Control<AddSitePayloadTypes> }) => {
  const siteUrl = useWatch({ control, name: 'siteUrl' })
  return (
    <Container width={100} borderRadius boxShadow className="add-site-container">
      <Flex vertical gap={32} align="center">
        <Flex vertical gap={16}>
          <Typography text={`Tell us about ${siteUrl ?? ''}`} type="h3" />
          <Divider />
          <Typography text="Some info about your business and traffic will help us tailor our recommendations to your needs." />
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                Options={[
                  { label: 'Business', id: 'business' },
                  { label: 'Agency', id: 'agency' },
                  { label: 'Blog', id: 'blog' },
                  { label: 'E-commerce', id: 'e-commerce' },
                ]}
                searchable
                title="Type of Business"
                placeholder="Select business type"
                titlePosition="top"
                setValues={onChange}
                values={value}
                size="md"
                error={error ? error.message : ''}
              />
            )}
            name="businessType"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CountryFlag label="Select Search Country" value={value} onChange={onChange} error={error?.message} />
            )}
            name="country"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                Options={languages?.map((lang) => ({
                  label: `${lang.name} (${lang.code})`,
                  id: lang.code,
                }))}
                searchable
                title="Primary Language"
                placeholder="Select primary language"
                titlePosition="top"
                setValues={onChange}
                values={value}
                size="md"
                error={error ? error.message : ''}
              />
            )}
            name="language"
            control={control}
          />
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddSiteDetails
