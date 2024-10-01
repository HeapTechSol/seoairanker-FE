import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { API_KEYS_COLUMN, API_KEYS_DATA } from '@/container/sites/utils'

import './APIKeys.scss'

const APIKeys = () => {
  return (
    <Container className="api-keys-container">
      <Flex vertical gap={16}>
        <Typography text="Sites’s API Keys" type="h1" />
        <Divider color="primary" />
        <Flex gap={16} className="container-screens">
          <Container borderRadius boxShadow padding={'40px'} className="site-pages-table-container container-bg" width={100}>
            <Flex vertical gap={16} align="start">
              <Typography text="API Keys" type="h2" />
              <Typography text={`Please keep the keys secure.`} />
              <Divider color="primary" />
              <Table
                columns={API_KEYS_COLUMN}
                data={API_KEYS_DATA}
                style={{
                  tableCellStyle: {
                    fontSize: '14px',
                  },
                  tableHeadingStyle: {
                    fontSize: '10.5px',
                  },
                }}
              />
              <Button size="sm" >
                Generate New API Key
              </Button>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  )
}

export default APIKeys
