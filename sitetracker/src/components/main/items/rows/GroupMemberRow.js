import React from 'react';
import Row from './Row';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

import ProfileCell from 'components/main/items/cells/ProfileCell';

class GroupMemberRow extends Row {

  cards(){
    const studentProject = this.func.getById.studentProjectByPair(this.props.userId, this.store.projects.viewingProject._id, this.store);
    return(
      <Cards
      app={this.app}
      cardsId={studentProject.cards}
      onCellClick={()=>{ this.actions.cards.viewCards(studentProject.cards); }}/>
    )
  }

  content = (style)=>(
      <div style={{...this.rowStyle(), ...{
        height: style.height,
        opacity: style.opacity,
        cursor: ''
      }}}>
        {this.verGap('2%')}
        <ProfileCell
        app={this.app}
        data={this.profile}
        onClick={()=>{
          this.actions.profiles.viewProfile(this.profile);
          this.actions.content.pushView('student'); }}/>
        {this.verGap('2%')}
        {this.cards()}
      </div>
  )

  render(){
    this.init(this.props);
    this.profile = this.func.getById.profileByUser(this.props.userId, this.store);
    return this.animatedRow(this.content.bind(this), this.bs.height * 0.425)
  }

}

export default GroupMemberRow;
