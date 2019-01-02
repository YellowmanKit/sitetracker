import React from 'react';
import View from 'components/main/pages/home/views/View';

import Schools from './contents/Schools';
import Courses from './contents/Courses';
import Subjects from './contents/Subjects';

class StudentHome extends View {

  render() {
    this.init(this.props);
    return(
      <div id='home' style={this.viewStyle()} onScroll={()=>{this.actions.main.setStatus('ready')}}>
        <Schools app={this.app}/>
        <Courses app={this.app}/>
        <Subjects app={this.app}/>
      </div>
    )
  }
}

export default StudentHome;
