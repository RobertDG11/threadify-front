import React, { Component } from "react";
import { Card, Image, Dimmer, Icon, Header } from "semantic-ui-react";
import Aux from "../../hoc/aux";
import WindowSize from "../../hoc/WindowSize";

import styles from "./Card.module.scss";

class SimpleCard extends Component {
  state = {
    className: styles.Card,
    active: false,
    activeMobile: false
  };
  handleClick = () => {
    const newClass =
      this.state.className === styles.Card ? styles.CardClicked : styles.Card;

    this.setState({ className: newClass, active: !this.state.active });
  };

  handleClickMobile = () => {
    this.setState({ activeMobile: !this.state.activeMobile });
  };

  render() {
    const { image, name, specialisation, description, dateHired } = this.props;
    const device = this.props.windowWidth < 990 && this.props.windowWidth > 414;
    const mobile = this.props.windowWidth <= 414;
    return (
      <Aux>
        <Dimmer
          active={this.state.active}
          page
          onClickOutside={this.handleClick}
          style={{ opacity: "0.5" }}
        />
        <Card
          raised={this.props.raised}
          className={this.state.className}
          onClick={this.props.windowWidth >= 990 ? this.handleClick : null}
        >
          <Image src={image} size="medium" />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{specialisation}</Card.Meta>
            {mobile && this.state.activeMobile ? (
              <Aux>
                <Card.Description>{description}</Card.Description>
                <Header as="h5" onClick={this.handleClickMobile}>
                  Vezi mai putin...
                </Header>
              </Aux>
            ) : mobile ? (
              <Header as="h5" onClick={this.handleClickMobile}>
                Vezi mai mult...
              </Header>
            ) : null}
            {this.state.active || device ? (
              <Card.Description>{description}</Card.Description>
            ) : null}
          </Card.Content>
          {mobile && this.state.activeMobile ? (
            <Card.Content extra>
              <span>
                <Icon name="calendar alternate outline" />
                Angajat la: {dateHired}
              </span>
            </Card.Content>
          ) : null}
          {this.state.active || device ? (
            <Card.Content extra>
              <span>
                <Icon name="calendar alternate outline" />
                Angajat la: {dateHired}
              </span>
            </Card.Content>
          ) : null}
        </Card>
      </Aux>
    );
  }
}

export default WindowSize(SimpleCard);
