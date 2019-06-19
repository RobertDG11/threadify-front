import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import SimpleCard from "./SimpleCard";
import axios from "axios";
import { connect } from "react-redux";
import { addProfessors } from "../redux/actions/actions";

import styles from "./Card.module.scss";

class ConnectedSimpleCards extends Component {
  componentWillMount() {
    this.props.addProfessors();
  }

  render() {
    const { professors } = this.props;
    console.log(this.props.location);
    return (
      <Card.Group className={styles.CardGroup} centered>
        {professors.map(professor => (
          <SimpleCard
            key={professor.search.title}
            raised
            image={professor.search.image}
            name={professor.search.title}
            specialisation={professor.search.description}
            description={professor.description}
            dateHired={professor.dateHired}
          />
        ))}
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    professors: state.showCarousel.professors
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addProfessors: () => dispatch(addProfessors())
  };
}

const SimpleCards = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSimpleCards);

export default SimpleCards;
