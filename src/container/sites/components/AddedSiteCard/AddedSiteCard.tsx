import { Link } from "react-router-dom";

import Chip from "@/components/Chip";
import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Divider from "@/components/Divider/Divider";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import { DeleteIcon, SettingIcon, TopRightIcon } from "@/assets/icons/svgs";

import "./AddedSiteCard.scss";

const AddedSiteCard = () => {
  return (
    <Container
      borderRadius
      boxShadow
      padding={"10px 20px"}
      className="added-site-info-container"
    >
      <Flex vertical className="site-info-card" gap={16}>
        <Flex className="site-info" justify="between" align="center">
          <Flex gap={8}>
            <img
              src="https://alliai-images.s3.us-east-2.amazonaws.com/3aN882UedT4fkAWGgxEr2PGT?response-content-disposition=inline%3B%20filename%3D%22favicon.png%22%3B%20filename%2A%3DUTF-8%27%27favicon.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA56WHDN3QMILRGVFM%2F20240427%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240427T141315Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f575e3193a8617dcd7c737fe3bb7d72199697534725a0cb7527050a1a92158a3"
              alt=""
            />
            <Link to="" className="site-link">
              www.dinakubik.se
            </Link>
          </Flex>
          <Flex className="site-info-controls" justify="end" align="center">
            <Button
              onlyIcon
              size="sm"
              color="info"
              variant="text"
              StartIcon={SettingIcon}
              onClick={() => console.log("clicked")}
            />
            <Button
              onlyIcon
              size="sm"
              color="error"
              variant="text"
              StartIcon={DeleteIcon}
              onClick={() => console.log("clicked")}
            />
          </Flex>
        </Flex>
        <Divider color="info" />
        <Flex justify="between" align="center">
          <Chip
            text="Alert! Please select your keywords so Seode can start analyzing your site."
            color="error"
            rounded
            bordered
            size="lg"
            className="alert-message"
          />
          <Flex vertical className="recommendations-info">
            <Flex justify="between" align="center">
              <Typography text="Recommendations" />
              <Button
                onlyIcon
                color="info"
                variant="text"
                StartIcon={TopRightIcon}
                onClick={() => console.log("clicked")}
              />
            </Flex>
            <Flex align="center">
              <Typography
                text={
                  <>
                    <Typography text={`277,325 `} inline type="h1" />
                    /434,882
                  </>
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default AddedSiteCard;
