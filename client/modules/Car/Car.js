import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Car.css';

class Car extends Component {
  render() {
    return (
    	<h1>Testing</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Car.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Car);
