import React from "react";
import HeaderDesktop from "../Header/HeaderDesktop";
import Footer from "../Footer/Footer";
import { Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const DesktopContainer = props => {
  const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyComputer.minWidth : window.innerWidth;
  };
  const showCarousel =
    props.location.pathname === "/" ||
    props.location.pathname === "/register" ||
    props.location.pathname === "/login";

  console.log(props.location.pathname);
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyComputer.minWidth}>
      <HeaderDesktop
        showCarousel={showCarousel}
        pathname={props.location.pathname}
      />
      {props.children}
      <Footer />
    </Responsive>
  );
};

export default withRouter(DesktopContainer);
