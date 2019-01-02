import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import GroupRow from 'components/main/items/rows/GroupRow';

class TeacherGroup extends SubView {

  render(){
    this.init(this.props);
    const groups = this.func.getById.groupsByProject(this.store.projects.viewingProject._id, this.store);
    //console.log(groups);
    return(
      <div style={this.subViewStyle()}>
        {groups.length === 0 && this.gap('2%')}
        {groups.length === 0 && this.subTitle(['No group in this project','此專題研習未有任何小組','此专题研习未有任何小组'])}
        {groups.map((group, i)=>{
          if(group.members.length === 0){ return null; }
          return(
          <GroupRow key={i}
          app={this.app}
          group={group}
          onClick={()=>{
            this.actions.groups.viewGroup(group);
            this.actions.content.pushView('group');
          }}/>)
        })}
      </div>
    )
  }
}

export default TeacherGroup;
