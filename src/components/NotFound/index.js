import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.scss';

export default class NotFound extends Component {
  static propTypes = {
    heading: PropTypes.string
  }
  render() {
    const {heading} = this.props;
    return (
      <div className="NotFound">
        <h4 className="text-center mb-4">
          {heading || 'Sorry! This page does not exist.'}
        </h4>
        <p className="text-center text-secondary">Not to worry. You can head back to <Link to="/">our homepage</Link>.</p>
      </div>
    );
  }
}
