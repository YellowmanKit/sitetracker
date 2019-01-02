import React from 'react';
import SubView from 'components/main/pages/home/views/SubView';
import StudentProjectRow from 'components/main/items/rows/StudentProjectRow';

class StudentProjects extends SubView {

  constructor(props){
    super(props);
    this.state = {
      studentProjects: []
    }
  }

  componentDidMount(){
    this.init(this.props);
    if(this.state.studentProjects.length === 0){
      this.initStudentProjects(this.props);
    }
    this.setListScroll('studentProjectList');
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    //if(this.state.studentProjects.length === 0){
      this.initStudentProjects(newProps);
    //}
  }

  initStudentProjects(props){
    var studentProjects = this.store.projects.viewingProject.studentProjects.slice(0);

    for(var i=0;i<studentProjects.length;i++){
      studentProjects[i] = this.func.getById.studentProject(studentProjects[i], this.store);
      //console.log(studentProjects[i])
      if(studentProjects[i] === null){ console.log('no studentProjects'); return; }
      var total = 0;
      var featured = 0;
      var alert = 0;
      const cardsId = studentProjects[i].cards;
      total = cardsId.length;
      for(var j=0;j<cardsId.length;j++){
        const card = this.func.getById.card(cardsId[j], this.store);
        if(card === null){ console.log('no card data'); return; }
        if(!card.grade || card.grade === 'notGraded'){
          alert++;
        }
        if(card.grade && card.grade === 'featured'){
          featured++;
        }
      }
      studentProjects[i] = {...studentProjects[i], total: total, featured: featured, alert: alert}
    }
    this.setState({
      studentProjects: studentProjects
    });
  }

  studentProjectsList(){
    if(this.state.studentProjects.length === 0){
      return this.subTitle(['No submitted cards','沒有任何已提交的卡片','没有任何已提交的卡片'])
    }
    return this.state.studentProjects.map((studentProject, i)=>{
      return(
        <StudentProjectRow
        app={this.app}
        studentProject={studentProject}
        key={studentProject._id}
        byStudent={true}
        onClick={()=>{ this.actions.studentProjects.viewStudentProject(studentProject); this.actions.content.pushView('gradingCards'); }}/>
      )
    })
  }

  render() {
    this.init(this.props);
    return(
      <div style={this.subViewStyle()}>
        <div id={'studentProjectList'} onScroll={()=>{ this.onScroll('studentProjectList'); }} style={{...this.bs, ...this.ui.styles.list}}>
          {this.studentProjectsList()}
        </div>
      </div>
    )
  }

}

export default StudentProjects;
