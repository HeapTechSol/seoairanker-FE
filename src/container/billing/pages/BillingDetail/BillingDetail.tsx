import { useNavigate } from "react-router-dom";

import Flex from "@/components/Flex";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import HorizontalProgressBar from "@/components/ProgressIndicator/HorizontalProgressBar";

import { EXACT_ROUTES } from "@/constant/routes";

import "./BillingDetail.scss";

const { PAYMENT_HISTORY, PLANS } = EXACT_ROUTES;

const BillingDetail = () => {
  const navigate = useNavigate();
  return (
    <Container width={100}>
      <Flex vertical gap={16}>
        <Flex gap={16}>
          <Container
            boxShadow
            borderRadius
            className="billing-details-container lg container-bg"
            padding={"40px"}
          >
            <Flex vertical gap={12}>
              <Typography text="You're Subscribed" type="h3" />
              <Divider color="warning" />
              <Typography
                text={
                  <>
                    You're currently subscribed to the Agency plan. See your
                    billing history and current month usage{" "}
                    <Typography
                      color="info"
                      text="here."
                      onClick={() => navigate(PAYMENT_HISTORY)}
                      inline
                      link
                    />
                  </>
                }
              />
              <Typography text="Plan Usage" type="h4" />
              <Flex vertical gap={4}>
                <Flex padding={5} vertical>
                  <Flex justify="between" align="center">
                    <Typography text="Sites" type="h4" />
                    <Chip color="info" text="19 of 25" circled size="sm" bordered />
                  </Flex>
                  <HorizontalProgressBar max={25} value={19} />
                </Flex>
                <Flex padding={5} vertical>
                  <Flex justify="between" align="center">
                    <Typography text="Membership" type="h4" />
                    <Chip color="info" text="4 of 25" circled size="sm" bordered />
                  </Flex>
                  <HorizontalProgressBar max={25} value={4} />
                </Flex>
                <Flex padding={5} vertical>
                  <Flex justify="between" align="center">
                    <Typography text="Keywords" type="h4" />
                    <Chip color="info" text="0 of 2,500" circled size="sm" bordered />
                  </Flex>
                  <HorizontalProgressBar max={2500} value={0} />
                </Flex>
                <Flex padding={5} vertical>
                  <Flex justify="between" align="center">
                    <Typography text="Pages Optimized" type="h4" />
                    <Chip color="info" text="10,138 of 10,500" circled size="sm" bordered />
                  </Flex>
                  <HorizontalProgressBar max={10500} value={10138} />
                </Flex>
              </Flex>
              <Flex padding={5} align="center" gap={16}>
                <Button variant="outlined" type="borderRadius" size="sm" onClick={()=>navigate(PLANS)}>
                  Edit Subscription
                </Button>
                <Button type="borderRadius" size="sm">
                  Cancel Subscription
                </Button>
              </Flex>
            </Flex>
          </Container>
          <Flex
            vertical
            gap={16}
            justify="between"
            className="right-section sm "
          >
            <Container
              boxShadow
              borderRadius
              className="billing-details-container sub-container container-bg"
              padding={"40px"}
            >
              <Flex vertical gap={16} align="start">
                <Typography text="Payment Information" type="h3" />
                <Divider color="warning" />
                <Typography text="The card on file for your account ends with 8679." />
                <Button type="borderRadius" size="sm">
                  Update Payment Information
                </Button>
              </Flex>
            </Container>
            <Container
              boxShadow
              borderRadius
              className="billing-details-container sub-container container-bg"
              padding={"40px"}
            >
              <Flex vertical gap={16} align="start">
                <Typography text="Thank You" type="h3" />
                <Divider color="warning" />
                <Typography text="Seode wouldn't be possible without you! If we can do anything to make your experience better, reach out at support@seode.com." />
              </Flex>
            </Container>
          </Flex>
        </Flex>
        <Container
          boxShadow
          borderRadius
          width={100}
          className="billing-details-container container-bg"
          padding={"40px"}
        >
          <Flex vertical gap={16} align="start">
            <Typography text="AI Engine Usage Information" type="h3" />
            <Divider color="warning" />
            <Flex vertical gap={4}>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Page Schemas" type="h4" />
                  <Chip color="info" text="19 of 25" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={25} value={19} />
              </Flex>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Meta Titles" type="h4" />
                  <Chip color="info" text="4 of 25" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={25} value={4} />
              </Flex>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Meta Descriptions" type="h4" />
                  <Chip color="info" text="0 of 2500" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={2500} value={0} />
              </Flex>
            </Flex>
          </Flex>
        </Container>
        <Container
          boxShadow
          borderRadius
          width={100}
          className="billing-details-container container-bg"
          padding={"40px"}
        >
          <Flex vertical gap={16} align="start">
            <Typography text="Crawls and Ranking Updates" type="h3" />
            <Divider color="warning" />
            <Flex vertical gap={4}>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Ranking Updates" type="h4" />
                  <Chip color="info" text="19 of 25" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={25} value={19} />
              </Flex>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Page Crawls" type="h4" />
                  <Chip color="info" text="4 of 25" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={25} value={4} />
              </Flex>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Ranking Updates Estimated*" type="h4" />
                  <Chip color="info" text="0 of 2,500" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={2500} value={0} />
              </Flex>
              <Flex padding={5} vertical>
                <Flex justify="between" align="center">
                  <Typography text="Page Crawls Estimated*" type="h4" />
                  <Chip color="info" text="0 of 2,500" circled size="sm" bordered />
                </Flex>
                <HorizontalProgressBar max={2500} value={0} />
              </Flex>
            </Flex>
            <Typography text="* Estimated value calculated for the current billing period. The number is not exact and may change in accordance with account preferences, such as ranking refresh an crawl intervals, newly added keywords, and discovered pages." />
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
};

export default BillingDetail;
