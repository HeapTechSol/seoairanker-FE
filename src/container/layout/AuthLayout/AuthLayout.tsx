import { Outlet } from "react-router-dom";

import Flex from "@/components/Flex";
import Container from "@/components/Container/Container";

import SeodeIcon from "@/assets/images/seode.png";

import "./AuthLayout.scss";

const AuthLayout = () => {
  return (
      <Flex className="auth-layout container-bg" align="center" justify="center">
        <Container
          width={50}
          contentCenter
          fullHeight
          className="image-section"
        >
          <img
            src="https://internest.agency/wp-content/uploads/2023/12/ai-for-seo-2024.webp"
            alt="auth dashboard image"
            style={{ width: "100%", height: "100%" }}
          />
        </Container>
        <Container
          width={50}
          fullHeight
          contentCenter
          className="auth-form-section"
          padding={"0px 130px"}
        >
          <Flex vertical gap={80} align="center">
            <Flex>
              <img height={40} src={SeodeIcon} alt="" />
            </Flex>
            <Outlet />
          </Flex>
        </Container>
      </Flex>
  );
};

export default AuthLayout;
