import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import "./RecommendationList.scss";

const RecommendationList = () => {

  
  const accordionDescription = (
    <Flex vertical gap={4}>
      <Typography text="Demoting h3 tag to h4" type="h6" />
      <Typography text="Content:" />
      <Typography
        text="Ali Liaila story changed to other story"
        color="warning"
      />
      <Typography text="Existing:" />
      <Typography text="h3" color="warning" />
      <Typography text="Suggestion:" />
      <Typography text="h4" color="warning" />
    </Flex>
  );

  const onApprove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <Container
      borderRadius
      boxShadow
      width={100}
      className="recommendation-list-container"
      padding={"40px 20px"}
    >
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Headline Tags" />
            <Typography
              text="The right to rectification – You have the right to request that we correct any
                information you believe is inaccurate. You also have the right to request that we
                complete the information you believe is incomplete. The right to data portability – You have the right to request that we transfer the
                data that we have collected to another organization, or directly to you, under
                certain conditions"
            />
          </Flex>
          <Button size="sm" variant="outlined" type="borderRadius">
            Approve All (0/1,408)
          </Button>
        </Flex>
        <Flex vertical gap={10}>
          <Accordion
            title={"/book/fashion/online-purchase-page"}
            description={accordionDescription}
            color="primary"
            CustomIcon={
              <Button
                size="sm"
                variant="outlined"
                onClick={onApprove}
                type="borderRadius"
                color="success"
              >
                Approve
              </Button>
            }
          />
          <Accordion
            title={"/gadget/tech/detail-page"}
            description={accordionDescription}
            color="primary"
            CustomIcon={
              <Button
                size="sm"
                variant="outlined"
                onClick={onApprove}
                type="borderRadius"
                color="success"
              >
                Approve
              </Button>
            }
          />
          <Accordion
            title={"/gadget/tech/detail-page"}
            description={accordionDescription}
            color="primary"
            CustomIcon={
              <Button
                size="sm"
                variant="outlined"
                onClick={onApprove}
                type="borderRadius"
                color="success"
              >
                Approve
              </Button>
            }
          />
          <Accordion
            title={"/gadget/tech/detail-page"}
            description={accordionDescription}
            color="primary"
            CustomIcon={
              <Button
                size="sm"
                variant="outlined"
                onClick={onApprove}
                type="borderRadius"
                color="success"
              >
                Approve
              </Button>
            }
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default RecommendationList;
