import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import "./RecommendationOverview.scss";

type RecommendationsListType = {
  id: string;
  type: string;
  title: string;
  totalCount: string;
  used: string;
};

const RecommendationOverview = ({
  recommendationsList,
  onClick,
}: {
  onClick: (id: string) => void;
  recommendationsList: RecommendationsListType[];
}) => {
  return (
    <Container
      width={50}
      padding={"40px 20px"}
      borderRadius
      boxShadow
      className="recommendations-container"
    >
      <Flex vertical>
        {recommendationsList?.map((recommendation) => (
          <Flex
            justify="between"
            padding={"5px 15px"}
            className="recommendations-status"
            onClick={() => onClick(recommendation.id)}
          >
            <Typography text={recommendation.title} />
            <Typography
              text={`(${recommendation.used}/${recommendation.totalCount})`}
            />
          </Flex>
        ))}
      </Flex>
      <Button fullWidth variant="outlined">I'm Feeling Lucky (Approve All)</Button>
    </Container>
  );
};

export default RecommendationOverview;
