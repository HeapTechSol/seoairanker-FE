import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Flex from "@/components/Flex";
import Container from "@/components/Container/Container";

const AuthLayout = () => {
  return (
    <GoogleOAuthProvider clientId={"dsfdsfjdslfdsjlkj"}>
      <Flex>
        <Container center width={100} contentCenter fullHeight>
          <img
            src="https://www.loginradius.com/blog/static/edd68e06d3b48bea04c157d4bde4f9ab/701ee/sign-up-rate.jpg"
            alt="auth dashboard image"
            style={{ width: "100%", height: "100%" }}
          />
        </Container>
        <Outlet />
      </Flex>
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
