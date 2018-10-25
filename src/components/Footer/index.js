import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from '../';
import './style.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer__container">
          &copy; VestChain 2018
        </div>
      </div>
    );
  }
}
