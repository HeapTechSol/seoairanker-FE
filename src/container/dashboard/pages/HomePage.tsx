import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <Container contentCenter fullHeight className="home-page" width={100}>
      <Typography type="h1" text="Landing Page is Under Maintenance" />
    </Container>
  );
};

export default HomePage;
