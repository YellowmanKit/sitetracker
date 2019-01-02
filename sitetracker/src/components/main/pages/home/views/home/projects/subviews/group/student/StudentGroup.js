import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';

import CreateOrJoin from './CreateOrJoin';
import GroupMemberRow from 'components/main/items/rows/GroupMemberRow';

class StudentGroup extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    const group = this.group();
    if(group && !this.store.groups.data[group._id]){
      this.actions.groups.fetchGroupData(group);
    }
  }

  group(){
    return this.func.getById.joinedGroupByProject(this.store.projects.viewingProject._id, this.store);
  }

  memberRows(group){
    return group.members.map((member, i)=>{
      if(member === group.leader){ return null; }
      return <GroupMemberRow key={i} app={this.app} userId={member}/>
    })
  }

  render(){
    this.init(this.props);

    const group = this.group();
    if(!group){
      return <CreateOrJoin app={this.app}/>
    }

    return(
      <div style={this.subViewStyle()}>
        {this.gap('5%')}

        {this.subTitle(['Group name','小組名稱','小组名称'])}
        {this.sep()}
        {this.textDisplay(group.name)}
        {this.gap('2%')}

        {this.subTitle(['Leader','組長','组长'])}
        {this.sep()}
        <GroupMemberRow app={this.app} userId={group.leader}/>
        {this.gap('2%')}

        {this.subTitle(['Members','組員','组员'])}
        {this.sep()}
        {this.memberRows(group)}
        {this.gap('2%')}

        {this.subTitle(['Code','代碼','代码'])}
        {this.sep()}
        {this.textDisplay(group.code)}
        {this.gap('2%')}
        {this.buttons.rectRed(['Leave group','退出小組','退出小组'],
        ()=>{this.actions.modal.confirm(['Confirm to lease group?','確定退出小組?','确定退出小组?'], ()=>{
            this.actions.groups.leaveGroup(
              this.store.user._id,
              group.code
            );
          })}
        )}
        {this.gap('6%')}
      </div>
    )
  }
}

export default StudentGroup;
