import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import Cards from 'components/main/pages/home/views/home/contents/Cards';

class SubmittedCards extends SubView {

  componentDidMount(){
    this.init(this.props);
    this.getStudentProject();
  }

  getStudentProject(){
    const viewingProject = this.store.projects.viewingProject;
    const studentProject = this.func.getById.studentProjectByPair(this.store.user._id, viewingProject._id, this.store)
    if(studentProject === null){
      this.actions.studentProjects.getStudentProject(this.store.user._id, viewingProject._id, this.store.studentProjects.studentProjects.length)
    }else {
      this.actions.studentProjects.viewStudentProject(studentProject);
    }
  }

  cardCells(){
    const outDated = this.func.outDated(this.store.projects.viewingProject.endDate);
    const studentProject = this.store.studentProjects.viewingStudentProject;
    //console.log(studentProject.cards);
    if(studentProject.cards){
      return <Cards app={this.app} cardsId={studentProject.cards} onAdd={outDated? null: this.onAdd.bind(this)}/>
    }else{
      //console.log('no viewingStudentProject cards!')
    }
  }

  onAdd(){
    return this.buttons.cellAdd(()=>{this.actions.content.pushView('addCard')})
  }

  render() {
    this.init(this.props);

    return(
      <div style={this.subViewStyle()}>
        {this.cardCells()}
      </div>
    )
  }

}

export default SubmittedCards;
