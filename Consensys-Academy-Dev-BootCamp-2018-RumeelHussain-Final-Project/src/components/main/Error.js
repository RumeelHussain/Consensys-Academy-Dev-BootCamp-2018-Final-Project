import React, { Component } from 'react';
import img404 from '../../assets/images/404.png';
import {Redirect} from 'react-router-dom';
import menu from "../../constants/menu";

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      home: menu.home.url
    };
  }
	render() {
    if(this.state.redirect){
      return (<Redirect to={this.state.home}/>)
    }
	  return (
	    <div className='container align-center'>
				<h2><strong>Error:</strong> Path does not <span className='italic'> {this.props.history.location.pathname} </span></h2>
        <img src={img404} className='width-100 pointer' onClick={() => (this.setState({redirect: true}))}/>
	    </div>
	  );
	}

};
