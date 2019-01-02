import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import SchoolRow from 'components/main/items/rows/SchoolRow';

class AdminSchools extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getSchools();
  }

  getSchools(){
    const profile = this.store.profiles.viewingAdminProfile;

    const schoolsToGet = [];
    const schoolsToShow = profile.supervisingSchools;

    for(var i=0;i<schoolsToShow.length;i++){
      if(this.func.getById.school(schoolsToShow[i], this.store) === null){
        schoolsToGet.splice(0,0, schoolsToShow[i]);
      }
    }
    if(schoolsToGet.length > 0){
      this.actions.schools.getSchools(schoolsToGet);
    }
  }

  schoolsList(){
    const schools = this.store.profiles.viewingAdminProfile.supervisingSchools;
    return schools.map((schoolId, i)=>{
      const school = this.func.getById.school(schoolId, this.store);
      return (
      <SchoolRow
      app={this.app}
      school={school}
      key={i}
      onClick={()=>{ this.actions.schools.viewSchool(school); this.actions.content.pushView('school');}}/>)
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div style={{...this.bs, ...this.ui.styles.list}}>
          {this.schoolsList()}
        </div>
      </div>
    )
  }

}

export default AdminSchools;
