import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import RankingRow from 'components/main/items/rows/RankingRow';

class ProjectRanking extends SubView {

  constructor(props){
    super(props);
    this.init(props);
    this.getProjectRanking();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.projectId = this.store.projects.viewingProject._id;
    this.ranking = this.store.content.rankings[this.projectId];
  }

  getProjectRanking(){
    this.projectId = this.store.projects.viewingProject._id;
    this.ranking = this.store.content.rankings[this.projectId];
    if(!this.ranking){
      this.actions.projects.getRanking(this.projectId);
    }
  }

  rankingList(ranking){
    return ranking.map((student,i)=>{
      return <RankingRow key={i} app={this.app} data={student} index={i}/>
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        {this.ranking && this.rankingList(this.ranking)}
      </div>
    )
  }

}

export default ProjectRanking;
