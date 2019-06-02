import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import defaultImg from '../../assets/images/defaultUser.png';
import menuConst from '../../constants/menu';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user
  };
})

class Header extends Component {
  constructor(props) {
    super(props);
    this.menu = [];
    this.active = '';
  }
  shouldComponentUpdate(nextProps){
    return nextProps.user !== this.props.user || this.props.location.pathname !== nextProps.location.pathname;
  }
  dropDown = () => {
    if(!isEmpty(this.menu.dropDown)){
      return (
        <ul className="navbar-nav min-width-130">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <img className="header-img1" onError={(e)=>{e.target.src=defaultImg}} src={this.props.user.details.image}/> {this.props.user.details.name || 'N.A'}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {
                Object.keys(this.menu.dropDown).map((item) => (<Link key={item} to={this.menu.dropDown[item].url} className='dropdown-item'>{this.menu.dropDown[item].label}</Link>))
              }
            </div>
          </li>
        </ul>
      )
    }
  };

  render() {
    this.menu = this.props.user.isAuthenticated ? menuConst.private : menuConst.public;
    this.active = this.props.history.location.pathname || this.props.menu.home.url;
    return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-clr'>
      <a className="navbar-brand" href={this.menu.list.home.url}>
        <h3>Rumeel Hussain</h3>
      </a>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto' >
          {
            Object.keys(this.menu.list).map((item) => {
              return (
                <li className={this.active === this.menu.list[item].url ? 'nav-item active' : 'nav-item'} key={item}>
                  {this.menu.list[item].menu && (<Link to={this.menu.list[item].url} className='nav-link'>{this.menu.list[item].label}</Link>)}
                </li>
              );
            })
          }
        </ul>
        {this.dropDown()}
      </div>
    </nav>
    );
  }
}

export default withRouter(Header);