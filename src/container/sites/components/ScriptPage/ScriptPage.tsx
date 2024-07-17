import { Control, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { handleCopyClick } from '@/utils/helper'

import { SeodeIcon } from '@/assets/icons/svgs'
import { AddSitePayloadTypes } from '@/container/sites/sitesTypes'

const ScriptPage = ({control}:{control:Control<AddSitePayloadTypes>}) => {
  const script = useWatch({control, name:"script"})
  return (
    <Container width={100} borderRadius boxShadow className="add-site-container">
      <Flex vertical gap={32} align="center">
        {SeodeIcon}
        <Flex vertical gap={16} align="start">
          <Typography text={`How to Install Seode on Your Site`} type="h3" />
          <Divider />
          <ol style={{ paddingLeft: '40px' }}>
            <li>
              <Typography text="Copy the code snippet below." />
            </li>
            <li>
              <Typography
                text={
                  <>
                    Paste it above the closing <Typography text="</Head>" color="warning" inline /> of your site's source code or template.
                  </>
                }
              />
            </li>
            <li>
              <Typography text="Make sure the snippet is present on every page where you want to receive search engine traffic." />
            </li>
            <li>
              <Typography text="That's it! You really just have to copy and paste this little code." />
            </li>
          </ol>
          <pre className="alert alert-light" style={{ padding: '0px 40px', cursor: 'pointer' }} onClick={handleCopyClick}>
            <code
              dangerouslySetInnerHTML={{ __html: script }}
              style={{
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                wordBreak: 'break-all',
                color: 'gray',
              }}
            />
          </pre>
          <Typography text="Note: The only changes to your site will be from Recommendations you review and approve." />
          <Typography
            text={
              <>
                Place this code before the closing <Typography text="</Head>" color="warning" inline /> tag on your site.
              </>
            }
          />
          <Flex justify="end">
            <Button variant="outlined" size="sm" onClick={() => handleCopyClick(script)} type="borderRadius">
              Click to copy the code
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ScriptPage
