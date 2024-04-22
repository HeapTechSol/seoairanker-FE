import { Control, useWatch } from "react-hook-form"

import Flex from "@/components/Flex"
import Container from "@/components/Container/Container"
import Typography from "@/components/Typography/Typography"

import { SeodeIcon } from "@/assets/icons/svgs"

const AddSiteDetails = ({ control }: { control: Control<any> }) => {
  const siteUrl = useWatch({control, name:"site_url"})
  return (
    <Container
    width={100}
    borderRadius
    boxShadow
    padding={"40px 20px"}
    className="add-site-container"
  >
    <Flex vertical gap={32} align="center">
      {SeodeIcon}
      <Flex vertical gap={16}>
      <Typography text={`Tell us about ${siteUrl}`} type="h3" />
          <Typography text="Some info about your business and traffic will help us tailor our recommendations to your needs." />
      </Flex>
    </Flex>
  </Container>
  )
}

export default AddSiteDetails
