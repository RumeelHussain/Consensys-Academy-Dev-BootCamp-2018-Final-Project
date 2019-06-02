import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Header from './components/menu/Header';
import Routes from './components/menu/Routes';
import Footer from './components/menu/Footer';
import menu from './constants/menu';
import web3 from './constants/web3';
import contracts from './constants/contracts';
import Loader from './components/common/Loader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: menu.routes,
      loader: true
    }
  }

  componentDidCatch(error, info){
    // TODO toast error
    console.log(error, info);
  }

  componentWillMount() {
    // contracts and web3 instances for component level usage. in components use constants/web3 and constants/contracts
    Promise.all([
      web3.init(),
      contracts.init()
      ]).then(()=>{
        this.setState({loader: false});
      })
      .catch(()=>{
        // TODO toast error
        // this.setState({loader: true});
      });
  }
  render() {
    if(this.state.loader)
      return (<Loader/>);
    return (
      <Router>
        <div className="body">
            <Header/>
            <Routes menu={this.state.routes}/>
            <Footer/>
        </div>
      </Router>
    );
  }
}
