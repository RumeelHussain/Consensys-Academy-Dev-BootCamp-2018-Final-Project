import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import menu from '../../constants/menu';
import web3 from '../../constants/web3';
import Loader from '../common/Loader';
import { auth } from '../../redux/actions/user';

@connect((store) => {
  return {
    user: store.user.details
  };
})

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      home: menu.home.url,
      web3: web3.instance,
      submitted: false,
      accounts: [],
      account: null,
      errors: {
        account: 'Please select an account'
      }
    };
  }
  componentWillMount() {
    
    this.state.web3.eth.getAccounts((error, accounts) => {
     
      this.setState({accounts: accounts});
    });
  }
  login = () =>{
    this.setState({submitted: true});
    if(this.state.account){
      this.props.dispatch(auth({account: this.state.account}));
      this.setState({redirect: true});
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
console.log(this.state.accounts)
    if(this.props.user.loading)
      return (<Loader/>);
    if(this.state.redirect)
      return (<Redirect to={this.state.home}/>);
    return (
      <div className='container align-center'>
        <div className='row'>
          <div className='col-12'>
            <h2 className="custom-login"> Login Account </h2>
          </div>
        </div>
        <div className='form-group row padding-25'>
          <div className='col-2'> </div>
          <label htmlFor='select' className="custom-acc1">Accounts</label>
          <div className='col-6'>
            <select name='account' className='custom-select' onChange={this.onChange} defaultValue={this.state.account}>
              <option value='' selected disabled hidden>Choose here</option>
              {this.state.accounts.map((account, index) => (<option value={account} key={index}>{account}</option>))}
            </select>
            {this.state.submitted && !this.state.account && (<p className='error-msg'>{this.state.errors.account}</p>)}
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <button type='button' className='btn-login' onClick={this.login}>Login</button>
          </div>
        </div>
      </div>
    );
  }

};
