import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from '../../components';
import {keypairsActions} from '../../store/actions';
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
          <h5>Generate keypairs</h5>
          <p className="mb-5">Click &laquo;Generate&raquo; to create random keypair</p>
          <Button type="button" theme="outline-primary" onClick={this.onClickGenerate}>Generate</Button>
          {this.state.error &&
            <div className="alert alert-danger mt-5">{this.props.keypairs.errors.generate}</div>
          }
          {this.state.success &&
            <div className="alert alert-success mt-5">
              Success! Here is your keypair:
              <div className="row">
                <div className="col-12 col-lg-2">Private key:</div>
                <div className="col-12 col-lg-10" style={{wordWrap: 'break-word'}}>{this.props.keypairs.keypair.privateKey}</div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-2">Public key:</div>
                <div className="col-12 col-lg-10" style={{wordWrap: 'break-word'}}>{this.props.keypairs.keypair.publicKey}</div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  keypairs: state.keypairs
}))(Transfer);
