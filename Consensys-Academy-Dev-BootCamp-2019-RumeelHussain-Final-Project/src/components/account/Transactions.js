import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/user';

@connect((store) => {
  return {
    user: store.user,
    transactions: store.user.transactions
  };
})

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getTransactions({account: this.props.user.details.account}));
  }

  render() {
    return (
      <div className="container">
      <div className="row">
        <table className="table " >
        <thead className="thead-dark">
          <tr>
          <th className=" col-sm-1 no">Number</th>
          <th className=" col-sm-7 no1">Transaction Hash</th>
          <th className=" col-sm-2 no1">Gas Used</th>
          <th className=" col-sm-2 no1">Gas Limit</th>
          </tr> 
          </thead>
          </table>
          </div>
        {this.props.transactions.map((transaction, index)=>{
          return (<div className="row" key={index}>
            
            <td className="col-sm-1 no1" >{transaction.number}</td>
            <td className="col-sm-7 no1">{transaction.hash}</td>
            <td className="col-sm-2 no1">{transaction.gasUsed}</td>
            <td className="col-sm-2 no1">{transaction.gasLimit}</td>
          </div>);
        })}
        {!this.props.transactions.length && (<div className="row">
          <div className="col-12">No Transactions ...</div>
        </div>)}
        
        
        </div>
    );
  }

};
