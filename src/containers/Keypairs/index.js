import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Icon} from '../../components';
import {keypairsActions} from '../../store/actions';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './style.scss';


class Transfer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    keypairs: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false
    };
  }

  onClickGenerate = () => {
    this.setState({error: false, success: false});
    this.props.dispatch(keypairsActions.generate()).then(() => {
      if (this.props.keypairs.errors.generate) {
        this.setState({error: true});
      } else {
        this.setState({success: true});
      }
    });
  }

  render() {
    return (
      <div className="Keypairs">
        <div className="Keypairs__container container">
          <h5>Generate Key Pairs</h5>
          <p className="mb-5">Click &laquo;Generate&raquo; to create a Random Key Pair</p>
          <Button
            className="mr-3"
            type="button"
            theme="outline-secondary"
            onClick={this.onClickGenerate}
            disabled={this.props.keypairs.loading.generate ? true : false}
          >Generate</Button>
          {this.props.keypairs.loading.generate &&
            <Icon icon={['fas', 'spinner']} spin color="#6c757d"/>
          }
          <div className="form-group my-3">
            <label htmlFor="private">Private Key</label>
            <div className="input-group">
              <input id="private" type="text" className="form-control" placeholder="Private key" value={this.props.keypairs.keypair.privateKey} disabled/>
              <div className="input-group-append">
                <CopyToClipboard text={this.props.keypairs.keypair.privateKey}>
                  <button className="btn btn-outline-secondary" type="button" title="Copy to clipboard">
                    <Icon icon={['far', 'copy']}/>
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="private">Public Key</label>
            <div className="input-group mb-3">
              <input id="public" type="text" className="form-control" placeholder="Public key" value={this.props.keypairs.keypair.publicKey} disabled/>
              <div className="input-group-append">
                <CopyToClipboard text={this.props.keypairs.keypair.publicKey}>
                  <button className="btn btn-outline-secondary" type="button" title="Copy to clipboard">
                    <Icon icon={['far', 'copy']}/>
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  keypairs: state.keypairs
}))(Transfer);
