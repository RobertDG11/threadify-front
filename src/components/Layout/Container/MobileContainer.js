import React, { Component } from "react";
import HeaderDevice from "../Header/HeaderDevice";
import Footer from "../Footer/Footer";
import SidebarCustom from "../Header/Menu/Device/SidebarCustom";
import { Sidebar, Responsive, SidebarPusher } from "semantic-ui-react";

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyComputer.minWidth : window.innerWidth;
  };

  render() {
    const { children, showCarousel } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={this.getWidth}
        maxWidth={Responsive.onlyTablet.maxWidth}
      >
        <SidebarCustom
          handleSidebarHide={this.handleSidebarHide}
          sidebarOpened={sidebarOpened}
        />

        <SidebarPusher dimmed={sidebarOpened}>
          <HeaderDevice
            handleToggle={this.handleToggle}
            showCarousel={showCarousel}
          />
          {children}
          <Footer />
        </SidebarPusher>
      </Responsive>
    );
  }
}

export default MobileContainer;
