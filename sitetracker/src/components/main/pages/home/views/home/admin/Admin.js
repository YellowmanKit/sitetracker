import React from 'react';
import View from 'components/main/pages/home/views/View';

import SubNav from 'components/main/items/SubNav';
import Profile from '../student/subviews/Profile';
import AdminSchools from './subviews/AdminSchools';

class Admin extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    this.profile = this.store.profiles.viewingAdminProfile;
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.profile = this.store.profiles.viewingAdminProfile;
  }

  componentDidMount(){
    this.init(this.props);
    if(!this.store.content.subView.includes('admin')){
      this.actions.content.setSubView('adminSchools');
    }
  }

  subView(){
    const subView = this.store.content.subView;

    switch (subView) {
      case 'adminProfile':
        return <Profile app={this.app} profile={this.profile}/>
      case 'adminSchools':
        return <AdminSchools app={this.app}/>;
      default:
        return null;
    }
  }

  adminSubNav(){
    const options = [
      {
        tag:['Schools','學校','学校'],
        subView: 'adminSchools'
      },
      {
        tag:['Profile','個人檔案','个人档案'],
        subView: 'adminProfile'
      }
    ]
    return <SubNav app={this.app} options={options} />
  }

  render(){
    this.init(this.props);
    return(
      <div style={this.viewStyle()}>
        {this.tabBar([this.profile.name, this.profile.name, this.profile.name])}
        {this.adminSubNav()}
        {this.sep()}
        {this.subView()}
      </div>
    )
  }

}

export default Admin;
