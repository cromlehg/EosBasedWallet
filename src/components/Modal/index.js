import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.scss';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    footer: PropTypes.node,
    onClose: PropTypes.func,
    closeButton: PropTypes.bool,
    overflowTransparent: PropTypes.bool,
    overflowClose: PropTypes.bool
  };

  static defaultProps = {
    onClose: () => {
    },
    overflowTransparent: false,
    overflowClose: true,
    closeButton: true
  };

  constructor(props) {
    super(props);
    this.modalNode = null;
  }

  componentDidMount() {
    this.autoPosition();
    window.addEventListener('resize', this.autoPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.autoPosition);
  }

  autoPosition = () => {
    let top = 10;
    if (window.innerWidth > this.modalNode.clientHeight) {
      top = Math.max(top, (window.innerHeight - this.modalNode.clientHeight) / 2 - top);
    }
    this.modalNode.style.marginTop = `${top}px`;
  };

  onClose = (e) => {
    e.preventDefault();
    this.props.onClose();
  };

  onCloseOverflow = (e) => {
    if (this.props.overflowClose && e.target.dataset.modal === 'overflow') {
      this.onClose(e);
    }
  };

  render() {
    const {className, children, header, footer, overflowTransparent, closeButton} = this.props;

    return (
      <div
        data-modal="overflow"
        className={cn('Modal__backdrop', {'Modal__backdrop_transparent': overflowTransparent})}
        onClick={this.onCloseOverflow}
      >
        <div className={cn('Modal', 'modal-dialog', className)} ref={ref => this.modalNode = ref}>
          {closeButton && <a className="Modal__close" href="#" onClick={this.onClose}/>}
          <div className="Modal__inner modal-content">
            {header &&
              <div className="Modal__header modal-header">
                {header}
              </div>
            }
            <div className="Modal__body modal-body">
              {children}
            </div>
            {footer &&
              <div className="Modal__footer modal-footer">
                {footer}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
