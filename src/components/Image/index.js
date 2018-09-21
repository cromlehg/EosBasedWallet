import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.scss';

export default class Image extends Component {
  static propTypes = {
    alt: PropTypes.string,
    align: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {geometry: null};
    const img = document.createElement('img');
    img.src = props.src;
    this.poll = setInterval(() => {
      const {naturalWidth, naturalHeight} = img;
      if (naturalWidth && naturalHeight) {
        clearInterval(this.poll);
        this.setGeometry(naturalWidth, naturalHeight);
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  setGeometry = (width, height) => {
    if (width > height) {
      this.setState({geometry: 'wide'});
    } else if (width < height) {
      this.setState({geometry: 'tall'});
    } else {
      this.setState({geometry: 'square'});
    }
  }

  render() {
    const classNames = cn({
      'Image': true,
      [`Image_${this.state.geometry}`]: this.state.geometry,
      [`Image_align_${this.props.align}`]: this.props.align
    }, this.props.className);
    return (
      <div className={classNames}>
        <img src={this.props.src} alt={this.props.alt || ''}/>
      </div>
    );
  }
}
