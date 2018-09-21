import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(far, fas);

export default class Icon extends Component {
  render() {
    return <FontAwesomeIcon {...this.props}/>;
  }
}
