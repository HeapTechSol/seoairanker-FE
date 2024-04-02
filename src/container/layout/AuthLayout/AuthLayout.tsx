import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Flex from "@/components/Flex";
import Container from "@/components/Container/Container";

import "./AuthLayout.scss";

const AuthLayout = () => {
  return (
    <GoogleOAuthProvider clientId={"dsfdsfjdslfdsjlkj"}>
      <Flex className="auth-layout" align="center" justify="center">
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
          contentCenter
          className="auth-form-section"
          padding={"0px 130px"}
        >
          <Flex vertical>
            <img
              src="https://assets-global.website-files.com/64c3a0ad253925de30be6ae7/64ec9ca6cc02c6570f5ffdc6_seode%20logga.svg"
              style={{ width: "200px" }}
            />
            <Outlet />
          </Flex>
        </Container>
      </Flex>
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
