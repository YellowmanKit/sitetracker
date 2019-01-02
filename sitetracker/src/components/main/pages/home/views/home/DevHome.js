import React from 'react';
import View from 'components/main/pages/home/views/View';
import Admins from './contents/Admins';

class DevHome extends View {

  render() {
    this.init(this.props);
    return(
      <div id='home' style={this.viewStyle()} onScroll={()=>{this.actions.main.setStatus('ready')}}>
        <Admins app={this.app}/>
      </div>
    )
  }
}

export default DevHome;
