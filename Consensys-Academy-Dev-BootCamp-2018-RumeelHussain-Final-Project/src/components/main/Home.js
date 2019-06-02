import React, { Component } from 'react';
import homeImg from '../../assets/images/blockchain.jpg'; 

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
          <div className='align-center' >
            <img className='responsive' src={homeImg} />
            <div className='responsivetexta' ><b>Document Exchange/Verification System</b></div>
            <div className='responsivetextb'>By Rumeel Hussain</div>
           
            
              
          </div>
        );
    }
}

