import React, { Component } from 'react';
import { connect } from 'react-redux';
import menu from '../../constants/menu';
import web3 from '../../constants/web3';
import Loader from '../common/Loader';
import {getDocument} from "../../redux/actions/documents";
import accountsConst from "../../constants/accounts";

@connect((store) => {
  return {
    user: store.user.details,
    documents: store.documents
  };
})

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      home: menu.home.url,
      web3: web3.instance,
      getStatusLabel: accountsConst.getStatusLabel,
      submitted: false,
      accounts: [],
      account: '',
      document: '',
      errors: {
        account: 'Please select an account',
        document: 'Please enter document address'
      }
    };
  }
  componentWillMount() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({accounts: accounts});
    });
  }
  verify = () =>{
    this.setState({submitted: true});
    if(this.state.account && this.state.document){
      const payload = {
        docAddress: this.state.document,
        account: this.state.account
      };
      this.props.dispatch(getDocument(payload));
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.props.documents.document);
    if(this.props.user.loading)
      return (<Loader/>);
    return (
      <div className='container'>
        <div className='row  align-center'>
          <div className='col-12'>
            <h2 className="custom-h1"> Verify Document </h2>
          </div>
        </div>
        <div className='form-group row padding-40'>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select'  className='custom-acc'>Account</label>
              <div className='col-8'>
                <select name='account' className='custom-select' onChange={this.onChange} defaultValue={this.state.account}>
                  <option selected disabled hidden>Choose here</option>
                  {this.state.accounts.map((account, index) => (<option value={account} key={index}>{account}</option>))}
                </select>
                {this.state.submitted && !this.state.account && (<p className='error-msg'>{this.state.errors.account}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select' className='custom-acc'>Document Address</label>
              <div className='col-8'>
                <input className='form-control' name='document' type='text' onChange={this.onChange} defaultValue={this.state.document}/>
                {this.state.submitted && !this.state.document && (<p className='error-msg'>{this.state.errors.document}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className='row  align-center'>
          <div className='col-12'>
            <button type='button' className='btn-verify' onClick={this.verify}>Verify</button>
          </div>
        </div>
        {this.state.submitted && this.props.documents.document.valid && (
          <div className='row'>
            <div className='col-12'>
              <span className="custom-h1"> Name&nbsp;&nbsp;&nbsp; </span>
              <span>
                <a className="custom-name" href={this.props.documents.document.link} target='_blank' >
                  {this.props.documents.document.name}
                  </a>
              </span>
            </div>
            <div className='col-12 '>
              <span className="custom-h1"> Owner&nbsp;&nbsp; </span>
              <span>
                {this.props.documents.document.requester}
                </span>
            </div>
            <div className='col-12'>
              <span className="custom-h1"> Verifier&nbsp; </span>
              <span>
                {this.props.documents.document.requester}
                </span>
            </div>
            <div className='col-12'>
              <span className="custom-h1"> Status&nbsp;&nbsp; </span>
              <span className={this.state.getStatusLabel(this.props.documents.document.status).label}>
                {this.state.getStatusLabel(this.props.documents.document.status).label}
              </span>
            </div>
          </div>
        )}
        {this.state.submitted && this.props.documents.document.valid === false && (
          <div>
            <p className='error-msg'> Invalid document address !!! </p>
          </div>
        )}
      </div>
    );
  }

};
