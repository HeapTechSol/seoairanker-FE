import { useNavigate } from "react-router-dom";

import {
  getElements,
  hasClass,
  toggleCSSClass,
  toggleCSSClasses,
} from "@/utils/helper";

import Flex from "@/components/Flex";
import Button from "@/components/Button";

import { EXACT_ROUTES } from "@/constant/routes";
import { MaleHeadIcon } from "@/assets/icons/svgs";

import SeodeIcon from "@/assets/images/seode.png";

import "./Topbar.scss";

const {
  LOGIN,
  SIGNUP,
  BILLING_PLANS,
  PAYMENT_HISTORY,
  BILLING_DETAIL,
  RECOMMENDATIONS,
  ADD_SITE,
} = EXACT_ROUTES;

const Topbar = ({
  sidebarRef,
}: {
  sidebarRef: React.RefObject<HTMLDivElement>;
}) => {
  const navigate = useNavigate();

  const sidebarToggleHandler = () => {
    if (sidebarRef.current) {
      const subMenuList = getElements(sidebarRef.current, "submenu-list");
      if (hasClass(sidebarRef.current, "collapsed")) {
        toggleCSSClass(sidebarRef.current, "collapsed", "remove");
        toggleCSSClasses(subMenuList, "submenu-collapsed", "remove");
      } else {
        if (hasClass(sidebarRef.current, "minimized")) {
          if (hasClass(sidebarRef.current, "overlay"))
            return toggleCSSClass(sidebarRef.current, "overlay", "remove");
          return toggleCSSClass(sidebarRef.current, "overlay", "add");
        }
        toggleCSSClass(sidebarRef.current, "collapsed", "add");
        toggleCSSClasses(subMenuList, "submenu-collapsed", "add");
      }
    }
  };

  const lines = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="line no-pointer"></div>
  ));

  const isLogged = false;

  return (
    <div className="topbar-container">
      {isLogged && (
        <div className="humbarger-icon" onClick={sidebarToggleHandler}>
          {lines}
        </div>
      )}
      <div className="topbar-content">
        <Flex align="center" justify="between">
          <Flex align="center" gap={8}>
            <img
              height={40}
              src={SeodeIcon}
              alt=""
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Flex>
          <Flex justify="center">
            <Button
              size="lg"
              variant="text"
              onClick={() => navigate(BILLING_PLANS)}
            >
              Pricing
            </Button>
            <Button
              size="lg"
              variant="text"
              onClick={() => navigate(PAYMENT_HISTORY)}
            >
              Payment History
            </Button>
            <Button
              size="lg"
              variant="text"
              onClick={() => navigate(BILLING_DETAIL)}
            >
              Billing Details
            </Button>
            <Button
              size="lg"
              variant="text"
              onClick={() => navigate(RECOMMENDATIONS)}
            >
              Recommendations
            </Button>
            <Button size="lg" variant="text" onClick={() => navigate(ADD_SITE)}>
              Add Site
            </Button>
          </Flex>
          <Flex justify="end" gap={16}>
            <Button
              type="borderRadius"
              color="info"
              variant="text"
              StartIcon={MaleHeadIcon}
              onClick={() => navigate(LOGIN)}
            >
              Login
            </Button>
            <Button type="borderRadius" onClick={() => navigate(SIGNUP)}>
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Topbar;
