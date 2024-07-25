import Flex from "@/components/Flex"
import Divider from "@/components/Divider/Divider"
import Container from "@/components/Container/Container"
import Typography from "@/components/Typography/Typography"

const RecommendationInfo = () => {
  return (
    <Container
    width={100}
    borderRadius
    boxShadow
    padding={"40px 20px"}
    className="add-site-container"
  >
    <Flex vertical gap={32} align="center">
      <Flex vertical gap={16}>
        <Typography text={`Generating Recommendations...`} type="h3" />
        <Divider/>
        <Typography text="Seode is crawling your site to create a list of changes you can make to improve SEO performance" />
        <Typography text="Once you installed the code snippet and approve the Automations, those optimization will be live on your website." />
        <Typography text="We will email you once the Automations are ready for your review and approval." />
      </Flex>
    </Flex>
  </Container>
  )
}

export default RecommendationInfo
