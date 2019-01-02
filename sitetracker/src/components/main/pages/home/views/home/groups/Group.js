import React from 'react';
import View from 'components/main/pages/home/views/View';
import GroupMemberRow from 'components/main/items/rows/GroupMemberRow';

class Group extends View {

  constructor(props){
    super(props);
    this.init(props);
    const group = this.store.groups.viewingGroup;
    if(group && !this.store.groups.data[group._id]){
      this.actions.groups.fetchGroupData(group);
    }
  }

  memberRows(group){
    return group.members.map((member, i)=>{
      if(member === group.leader){ return null; }
      return <GroupMemberRow key={i} app={this.app} userId={member}/>
    })
  }

  render(){
    this.init(this.props);
    const group = this.store.groups.viewingGroup;

    const title = group.name;

    return(
      <div style={this.viewStyle()}>
        {this.tabBar([title, title, title])}
        {this.gap('2%')}

        {this.subTitle(['Leader','組長','组长'])}
        {this.sep()}
        <GroupMemberRow app={this.app} userId={group.leader}/>
        {this.gap('2%')}

        {this.subTitle(['Members','組員','组员'])}
        {this.sep()}
        {this.memberRows(group)}
        {this.gap('6%')}
      </div>
    )
  }
}

export default Group;
