import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class ConnectedSearchProfessors extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" });
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      let professors = [];
      this.props.professors.forEach(element => {
        professors.push({
          title: element.search.title,
          description: element.search.description,
          image: element.search.image
        });
      });

      this.setState({
        isLoading: false,
        results: _.filter(professors, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            style={this.props.style}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    professors: state.showCarousel.professors
  };
};

const SearchProfessors = connect(mapStateToProps)(ConnectedSearchProfessors);

export default SearchProfessors;
