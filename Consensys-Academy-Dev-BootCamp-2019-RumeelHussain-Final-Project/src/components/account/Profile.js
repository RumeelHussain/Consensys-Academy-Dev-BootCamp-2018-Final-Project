import React, { Component } from 'react';
import regex from '../../constants/regex';
import accounts from '../../constants/accounts';
import { connect } from 'react-redux';
import { update } from '../../redux/actions/user';
import defaultImg from '../../assets/images/defaultUser.png';
import Loader from '../common/Loader';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      readOnly: true,
      price0: props.user.details.type === 1, // for requester price should be zero
      name: props.user.details.name,
      email: props.user.details.email,
      invalidEmail: false,
      description: props.user.details.description,
      type: props.user.details.type,
      price: props.user.details.price,
      logo: '',
      urlLogo: props.user.details.image,
      types: accounts.types,
      errors: {
        name: 'Please enter name',
        email: {
          empty: 'Please enter email',
          invalid: 'Please enter a valid email'
        },
        description: 'Please enter description',
        type: 'Please select type',
        price: 'Please enter price',
        logo: 'Please upload an avatar'
      }
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onTypeChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
    if(value === '1'){
      this.setState({price0: true, price: 0})
    }else{
      this.setState({price0: false})
    }
  };
  onSubmit = (event) =>{
    event.preventDefault();
    this.setState({submitted: true});
    if(this.state.name && this.state.email && regex.email(this.state.email) && this.state.description && this.state.type !== null && this.state.logo){
      const payload =  {
        name: this.state.name,
        email: this.state.email,
        description: this.state.description,
        type: this.state.type,
        price: this.state.price,
        logo: this.state.logo,
        account: this.props.user.details.account
      };
      this.props.dispatch(update(payload));
      this.setState({readOnly: true});
    }
  };
  emailError = () =>{
    if(this.state.submitted && !this.state.email)
      return (<p className='error-msg'>{this.state.errors.email.empty}</p>);
    if(this.state.submitted && !regex.email(this.state.email))
      return (<p className='error-msg'>{this.state.errors.email.invalid}</p>);
  };
  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };
  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({logo: buffer});
  };
  changeState = (event) =>{
    event.preventDefault();
    this.setState({readOnly: !this.state.readOnly});
  };
  render() {
    if(this.props.user.loading)
      return (<Loader/>);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 align-center'>
            <h2> Profile </h2>
          </div>
        </div>
        <div className='form-group row padding-40'>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Name</label>
              <div className='col-8'>
                <input className='form-control' name='name' readOnly={this.state.readOnly} type='text' onChange={this.onChange} defaultValue={this.state.name}/>
                {this.state.submitted && !this.state.name && (<p className='error-msg'>{this.state.errors.name}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Email</label>
              <div className='col-8'>
                <input className='form-control' name='email' type='email' readOnly={this.state.readOnly} onChange={this.onChange} defaultValue={this.state.email}/>
                {this.emailError()}
              </div>
            </div>
          </div>
          <div className='col-6  padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Description</label>
              <div className='col-8'>
                <input className='form-control' name='description' type='text' readOnly={this.state.readOnly} onChange={this.onChange} defaultValue={this.state.description}/>
                {this.state.submitted && !this.state.description && (<p className='error-msg'>{this.state.errors.description}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Type</label>
              <div className='col-8'>
                <select name='type' className='custom-select' disabled={this.state.readOnly} onChange={this.onTypeChange} defaultValue={this.state.type}>
                  <option selected disabled hidden>Choose here</option>
                  {this.state.types.map((type, index) => (<option value={type.value} key={index}>{type.label}</option>))}
                </select>
                {this.state.submitted && this.state.type === null && (<p className='error-msg'>{this.state.errors.type}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Price <span className='unit'>(wei)</span> </label>
              <div className='col-8'>
                <input className='form-control' name='price' type='number' readOnly={this.state.readOnly || this.state.price0} onChange={this.onChange} value={this.state.price} />
              </div>
            </div>
          </div>
          {!this.state.readOnly && (<div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Avatar</label>
              <div className='col-8'>
                <input className='form-control-file' name='logo' type='file' onChange={this.captureFile}/>
                {this.state.submitted && !this.state.logo && (<p className='error-msg'>{this.state.errors.logo}</p>)}
              </div>
            </div>
          </div>)
          }
          {this.state.readOnly && (<div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Avatar</label>
              <div className='col-8'>
                <a href={this.props.user.details.image} target='_blank' className='width-in'>
                  <img src={this.props.user.details.image} className='avatar-size pointer' onError={(e)=>{e.target.src=defaultImg}}/>
                </a>
              </div>
            </div>
          </div>)
          }
        </div>
        <div className='row align-center'>
          <div className='col-12'>
            {!this.state.readOnly && (<div>
                <button type='button' className='btn btn-primary' onClick={this.onSubmit}> Save </button>
                <button type='button' className='btn btn-default margin-left-12' onClick={this.changeState}> Cancel </button>
            </div>)
            }
            {this.state.readOnly && (<button type='button' className='btn btn-primary' onClick={this.changeState}>
              Edit
            </button>)
            }
          </div>
        </div>
      </div>
    );
  }

};
