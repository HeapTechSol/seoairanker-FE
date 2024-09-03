import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Divider from '@/components/Divider/Divider'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
// import { IoArrowBackCircleOutline } from 'react-icons/io5'

import { handleCopyClick } from '@/utils/helper'

const ScriptPage = () => {
  const { id } = useParams()
  const { getScript, siteScript, scriptLoading } = useHandleSitesLogic()

  useEffect(() => {
    if (id) getScript({ id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container width={100} borderRadius boxShadow className="add-site-container">
      <Loader loading={scriptLoading} overlay />
      <Flex vertical gap={32} align="center">
        <Flex vertical gap={16} align="start">
          <Typography text={`How to Install SEOAIRanker on Your Site`} type="h3" />
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
          <TruncateText
            text={
              <pre
                style={{
                  padding: '0px 40px',
                  borderRadius: '5px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  maxWidth: '1356px',
                  cursor: 'pointer',
                }}
                onClick={handleCopyClick}
              >
                <code>{`${siteScript?.data || ''}`}</code>
              </pre>
            }
          />
          <Typography text="Note: The only changes to your site will be from Recommendations you review and approve." />
          <Typography
            text={
              <>
                Place this code before the closing <Typography text="</Head>" color="warning" inline /> tag on your site.
              </>
            }
          />
          <Flex justify="end">
            <Button variant="outlined" size="sm" onClick={() => handleCopyClick(siteScript?.data || '')} type="borderRadius">
              Click to copy the code
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default ScriptPage
