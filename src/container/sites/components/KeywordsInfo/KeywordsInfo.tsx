import { SeodeIcon } from "@/assets/icons/svgs";
import Container from "@/components/Container/Container";
import Flex from "@/components/Flex";
import Typography from "@/components/Typography/Typography";

const KeywordsInfo = () => {
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
          <Typography text={`Adding Your Keywords`} type="h3" />
          <Typography text="On the next page, you'll find some search keywords suggestions from us." />
          <Typography text="The keyword's Seode Score is our estimate of how much monthly revenue you'll gain from a quick improvements." />
          <Typography text="You'll be able to add you own (with local targeting) later on, but let's start with these." />
        </Flex>
      </Flex>
    </Container>
  );
};

export default KeywordsInfo;
