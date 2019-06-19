import React from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

const ResponsiveContainer = props => (
  <div>
    <DesktopContainer showCarousel={props.showCarousel}>
      {props.children}
    </DesktopContainer>
    <MobileContainer showCarousel={props.showCarousel}>
      {props.children}
    </MobileContainer>
  </div>
);

export default ResponsiveContainer;
