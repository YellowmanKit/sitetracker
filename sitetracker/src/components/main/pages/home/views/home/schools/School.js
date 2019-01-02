import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import SchoolDetail from './subviews/SchoolDetail';
import SchoolTeachers from './subviews/SchoolTeachers';
import SchoolStatistics from './subviews/SchoolStatistics';

class School extends View {

  componentDidMount(){
    if(!this.store.content.subView.includes('school')){
      //this.actions.content.setSubView(this.store.user.type === 'admin'?'schoolTeachers':'schoolDetail');
      if(this.store.user.type !== 'student'){
        this.actions.content.setSubView('schoolTeachers');
      }else{
        this.actions.content.setSubView('schoolDetail');
      }
    }
  }

  subView(subView, animatedStyle){
    const app = {...this.app, ...{ animatedStyle: animatedStyle}}
    switch (subView) {
      case 'schoolTeachers':
        return <SchoolTeachers app={app}/>
      case 'schoolDetail':
        return <SchoolDetail app={app}/>
      case 'schoolStatistics':
        return <SchoolStatistics app={app}/>
      default:
        return null;
    }
  }

  schoolSubNav(){
    const type = this.store.user.type;
    var options = [
      {
        tag:['Detail','詳細資訊','详细资讯'],
        subView: 'schoolDetail'
      }
    ];
    if(type === 'developer' || type === 'admin'){
      options = [
        { tag:['Statistics','統計','统计'],
          subView: 'schoolStatistics' }, ...options]
    }
    if(type === 'developer' || type === 'admin' || type === 'teacher'){
      options = [
        { tag:['Leader','隊長','队长'],
          subView: 'schoolTeachers' }, ...options]
    }

    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    const school = this.store.schools.viewingSchool;

    const deadView = this.state.deadView;
    const view = this.state.view;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([school.name,school.name,school.name])}
        {this.schoolSubNav()}
        {this.sep()}
        {this.animatedSubView(this.subView.bind(this), deadView? deadView: view, deadView? false: true)}
      </div>
    )
  }
}

export default School;
