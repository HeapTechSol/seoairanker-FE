import { Controller } from 'react-hook-form'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider/Divider'
import TextArea from '@/components/TextArea/TextArea'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import Pagination from '@/components/Pagination/Pagination'
import CountryFlag from '@/components/CountryFlag/CountryFlag'

import languages from '@/constant/languages'

import useAddNewKeyword from '@/container/sites/hooks/useAddNewkeyword'

import { KEYWORDS_COLUMN, KEYWORDS_DATA } from '@/container/sites/utils'

import './AddNewKeywords.scss'

const AddNewKeywords = () => {
  const { control, handleSaveKeywords, handleClearKeywordData } = useAddNewKeyword()

  return (
    <Container className="add-new-keywords-container ">
      <Flex vertical gap={16}>
        <Typography text="Add New Keywords" type="h1" />
        <Divider color="warning" />
        <Flex gap={16} className="container-screens">
          <Container borderRadius boxShadow padding={'40px'} className="recommended-keywords-table-container container-bg">
            <Flex vertical gap={16}>
              <Typography text="Your Recommended Keywords" type="h2" />
              <Typography
                text={`Seode found these keywords for your site. Click on a keyword to add it to your keyword box. Once you're done selecting your target keywords, click the "Save Your Keywords" button to save your keywords.`}
              />
              <Divider color="warning" />
              <Table
                columns={KEYWORDS_COLUMN}
                data={KEYWORDS_DATA}
                style={{
                  tableCellStyle: {
                    fontSize: '14px',
                  },
                  tableHeadingStyle: {
                    fontSize: '10.5px',
                  },
                }}
              />
              <Pagination
                pageSize={10}
                currentPage={1}
                totalCount={75}
                onPageChange={() => console.log('onPage Change')}
                showSizeChanger={{
                  pageSizeOptions: [
                    { label: '10', id: '10' },
                    { label: '25', id: '25' },
                    { label: '50', id: '50' },
                  ],
                  onPageSizeChange: () => console.log('page size changing'),
                }}
              />
            </Flex>
          </Container>
          <Container borderRadius boxShadow padding={'40px'} className="manual-keywords-form container-bg">
            <Flex vertical gap={16}>
              <Typography text="Save Your Keywords" type="h2" />
              <Typography
                text={`Click "Save Your Keywords" button below to add your chosen keywords. You can also type in any other keywords you want to rank for.`}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextArea
                    onChange={onChange}
                    value={value}
                    name="keywords"
                    error={error?.message}
                    borderRadius
                    title="Keyword"
                    placeholder="One keyword per line, maximum 10 words per keyword. Please avoid special characters, punctuation, and emoji."
                  />
                )}
                name="country"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CountryFlag label="Country" placeholder="Country" value={value} onChange={onChange} error={error?.message} />
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
                    title="Language"
                    placeholder="Language"
                    titlePosition="top"
                    setValues={onChange}
                    searchable
                    values={value}
                    error={error ? error.message : ''}
                    size="md"
                  />
                )}
                name="language"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    Options={[
                      { label: 'Daily', id: 'type1' },
                      { label: 'Weekly', id: 'type2' },
                      { label: 'Monthly', id: 'type3' },
                      { label: 'Annually', id: 'type4' },
                      { label: 'Team Default (Daily)', id: 'type5' },
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
                name="schedule"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    name="abc"
                    label="Track Local Results"
                    borderRadius
                    size="sm"
                    labelPosition="right"
                    onChange={onChange}
                    checked={value as boolean}
                  />
                )}
                name="local"
                control={control}
              />

              <Divider color="warning" />
              <Flex gap={16}>
                <Button onClick={handleSaveKeywords} type="borderRadius" size="sm">
                  Save Your Keywords
                </Button>
                <Button onClick={handleClearKeywordData} variant="text" type="borderRadius" size="sm">
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddNewKeywords
