import React, { Component } from 'react';
import { connect } from 'react-redux';
import {count} from "../../redux/actions/user";
import {calcPercentage} from '../../utils/math';
import Loader from "../common/Loader";
import {Redirect} from "react-router-dom";
import menu from "../../constants/menu";

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Main extends Component {
  constructor(props) {
    super(props);
    const count = calcPercentage(props.user.count);
    this.state = {
      documents: menu.documents,
      url: '',
      countPer: {
        rejected: count.rejected,
        verified: count.verified,
        pending: count.pending
      },
      count: props.user.count,
      isRequester: props.user.details.type === 1,
      isVerifier: props.user.details.type === 0,
      showCreateScreen: false
    }
  }
  componentDidMount(){
    this.props.dispatch(count({account: this.props.user.details.account}));
  }
  componentWillReceiveProps(nextProps){
    this.setState({count: nextProps.user.count, countPer: calcPercentage(nextProps.user.count)});
  }
  createScreen = () => {
    this.setState({redirect: true, url: this.state.documents.create})
  };
  list = () => {
    if(this.state.isRequester)
      this.setState({redirect: true, url: this.state.documents.requester});
    if(this.state.isVerifier)
      this.setState({redirect: true, url: this.state.documents.verifier})
  };
  render() {
    if(this.props.user.loading)
      return (<Loader/>);
    if(this.state.redirect)
      return (<Redirect to={this.state.url}/>);
    return (
      <div className='container'>
        <div className='row align-center'>
          <div className='col-12'>
            <h2 className="custom-h2"> Documents <span className='doc-count'>{this.state.count.total}</span></h2>
          </div>
        </div>
        <div className='row' onClick={this.list}>
          <div className='col-4'>
            <div className='card text-white bg-verify mb-3 pointer' >
              <div className='card-header'>Verified</div>
              <div className='card-body'>
                <h5 className='card-title'>
                  {this.state.count.verified}
                </h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-verifyload' role='progressbar'
                       aria-valuemin='0' aria-valuemax='100' style={{width: this.state.countPer.verified}}>
                    {this.state.countPer.verified}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card text-white bg-rejected mb-3 pointer' >
              <div className='card-header'>Rejected</div>
              <div className='card-body'>
                <h5 className='card-title'>{this.state.count.rejected}</h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-rejectload'
                       role='progressbar' aria-valuemax='100' style={{width: this.state.countPer.rejected}}>
                    {this.state.countPer.rejected}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card text-white bg-pending mb-3 pointer' >
              <div className='card-header'>Pending</div>
              <div className='card-body'>
                <h5 className='card-title'>
                  {this.state.count.total - (this.state.count.rejected + this.state.count.verified)}
                </h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-pendload'
                       role='progressbar' aria-valuemax='100' style={{width: this.state.countPer.pending}}>
                    {this.state.countPer.pending}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isRequester && (
          <div>
            <div className='float-right'>
              <button type="button" className="btn-verify" onClick={this.createScreen}>Create</button>
            </div>
            <div className='clear'> </div>
          </div>
          )}
      </div>
    );
  }

};
