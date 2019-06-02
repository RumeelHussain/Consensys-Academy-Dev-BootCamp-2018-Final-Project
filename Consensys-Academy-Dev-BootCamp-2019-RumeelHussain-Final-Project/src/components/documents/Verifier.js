import React, { Component } from 'react';
import { connect } from 'react-redux';
import {verifyDoc, verifierDocs} from "../../redux/actions/documents";
import accountsConst from '../../constants/accounts';
import menu from "../../constants/menu";
import Loader from "../common/Loader";
import {Redirect} from "react-router-dom";

@connect((store) => {
  return {
    user: store.user,
    documents: store.documents
  };
})

export default class Verifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getStatusLabel: accountsConst.getStatusLabel,
      redirect: false,
      documents: menu.documents,
      url: '',
      isVerifier: props.user.details.type === 0
    };
  }
  componentDidMount() {
    this.props.dispatch(verifierDocs({
      account: this.props.user.details.account,
      total: this.props.user.count.total
    }));
    if (!this.state.isVerifier)
      this.back();
  }

  verifyDoc = (docAddress, status) => {
    this.props.dispatch(verifyDoc({
      account: this.props.user.details.account,
      docAddress: docAddress,
      status: status
    }));
    this.back();
  };
  back = () =>{
    this.setState({redirect: true, url: this.state.documents.list});
  };
  render() {
    if(this.props.documents.loading)
      return (<Loader />);
    if(this.state.redirect)
      return (<Redirect to={this.state.url}/>);
    return (
      <div className='container'>
        <div className='row align-center'>
          <div className='col-12'>
            <table className="table table-hover">
              <thead>
              <tr>
                <th className="custom-t">Name</th>
                <th className="custom-t">Description</th>
                <th className="custom-t">Status</th>
                <th> </th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.documents.verifierDocs.map((doc, index)=>{
                  let statusLabel = this.state.getStatusLabel(doc.status).label;
                  return (
                    <tr key={index}>
                      <td>{doc.name}</td>
                      <td>{doc.description}</td>
                      <td className={statusLabel}>{statusLabel}</td>
                      <td align="center">
                        <div className="dropdown">
                          <a className="nav-link dropdown-toggle" href="#" role="button" id="link1" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="false">
                            <span className="far fa-cog"> Actions </span>
                          </a>
                          <div className="dropdown-menu" aria-labelledby="link1">
                            <a className='dropdown-item' href={doc.link} target='_blank'> View </a>
                            {doc.status === 0 && (
                              <div>
                                <span className="dropdown-item Rejected pointer" onClick={() => this.verifyDoc(doc.docAddress, 2)}>Reject</span>
                                <span className="dropdown-item Verified pointer" onClick={() => this.verifyDoc(doc.docAddress, 1)}>Verify</span>
                              </div>
                              )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className='float-right'>
          <button type="button" className="btn-verify" onClick={this.back}>Back</button>
        </div>
        <div className='clear'> </div>
      </div>
    );
  }

};
