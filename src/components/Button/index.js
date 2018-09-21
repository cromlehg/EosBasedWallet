import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {themeClasses} from '../../utils';
import './style.scss';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.string
  };

  onClick = (e) => {
    if (this.props.onClick) {
      e.preventDefault();
      this.props.onClick();
    }
  };

  render() {
    const {theme, type = 'button'} = this.props;
    return (
      <button
        type={type}
        className={cn('btn', themeClasses('btn-', theme), this.props.className)}
        onClick={this.onClick}
        id={this.props.id}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
