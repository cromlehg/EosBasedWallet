import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Icon extends Component {
  render() {
    return <FontAwesomeIcon {...this.props}/>;
  }
}
