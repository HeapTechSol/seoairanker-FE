import Container from "@/components/Container/Container";
import Flex from "@/components/Flex";
import Chart from "@/container/billing/components/Chart";

const BillingDetail = () => {
  return (
    <Container>
      <Flex gap={16}>
        <Chart
          height="400px"
          textPosition="center"
          text="Team Members"
          used={0}
          remaining={10}
        />
        <Chart
          height="400px"
          textPosition="center"
          text="Site Crawls"
          used={0}
          remaining={250}
        />
        <Chart
          height="400px"
          textPosition="center"
          text="Keyword Searches"
          used={0}
          remaining={250}
        />
        <Chart
          height="400px"
          textPosition="center"
          text="Pages"
          used={0}
          remaining={250}
        />
      </Flex>
    </Container>
  );
};

export default BillingDetail;
