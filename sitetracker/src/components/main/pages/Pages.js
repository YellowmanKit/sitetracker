import React, { Component } from 'react';

import Login from './login/Login';
import Home from './home/Home';
import Capture from './Capture';

class Pages extends Component {

  page(){
    const app = this.props.app;
    switch (app.store.main.status) {
      case 'waitForLogin':
        return <Login app={app}/>
      case 'getNewAccount':
        return <Login app={app}/>
      case 'forgotPassword':
        return <Login app={app}/>
      case 'ready':
        return <Home app={app}/>
      case 'capture':
        return <Capture app={app}/>
      default:
        return <div/>
    }
  }

  render() {
    const app = this.props.app;
    const ui = app.store.ui;
    return(
      <div style={ui.basicStyle}>
        {this.page()}
      </div>
    )
  }
}

export default Pages;
