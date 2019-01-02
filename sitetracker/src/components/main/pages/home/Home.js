import React from 'react';
import View from 'components/main/pages/home/views/View';

//import background2 from 'resources/images/general/background2.png';

import NavBar from './NavBar';
import Menu from './Menu';

import Account from './views/menu/Account';
import Profile from './views/menu/Profile';
import Credit from './views/menu/Credit';

import TeacherHome from './views/home/TeacherHome';
import StudentHome from './views/home/StudentHome';
import AdminHome from './views/home/AdminHome';
import DevHome from './views/home/DevHome';

import AddCourse from './views/home/courses/AddCourse';
import JoinCourse from './views/home/courses/JoinCourse';
import Course from './views/home/courses/Course';

import AddSubject from './views/home/subjects/AddSubject';
import Subject from './views/home/subjects/Subject';

import AddProject from './views/home/projects/AddProject';
import Project from './views/home/projects/Project';

import AddCard from './views/home/cards/AddCard';
import ViewCards from './views/home/cards/ViewCards';
import SlideShow from './views/home/cards/SlideShow';
import GradingCards from './views/home/cards/gradingCards/GradingCards';

import Student from './views/home/student/Student';
import StudentSubject from './views/home/student/StudentSubject';
import StudentProject from './views/home/student/StudentProject';

import AddSchool from './views/home/schools/AddSchool';
import JoinSchool from './views/home/schools/JoinSchool';
import School from './views/home/schools/School';

import Teacher from './views/home/teacher/Teacher';
import Admin from './views/home/admin/Admin';
import AddAdmin from './views/home/admin/AddAdmin';

import Group from './views/home/groups/Group';

import DefaultImagePicker from './pickers/DefaultImagePicker';
import PrefabPicker from './pickers/PrefabPicker';

import Enlarger from './extends/Enlarger';
//import Hints from './extends/Hints';
import Trace from './extends/Trace';
import Notice from './extends/notice/Notice';
import GeoLocated from './extends/GeoLocated';

import Footer from './extends/Footer';

class Home extends View {

  componentWillReceiveProps(newProps){
    this.setState({
      view: newProps.app.store.content.view,
      deadView: this.state.view !== newProps.app.store.content.view? this.state.view: this.state.deadView
    });
  }

  views(view, animatedStyle){
    const app = this.app;
    app.animatedStyle = animatedStyle;
    if(view === ''){
      return null;
    }
    switch (view) {
      case 'account':
        return <Account app={app}/>;
      case 'forceAccount':
        return <Account app={app}/>;
      case 'profile':
        return <Profile app={app}/>;
      case 'forceProfile':
        return <Profile app={app}/>;
      /*case 'setting':
        return null;*/
      case 'credit':
        return <Credit app={app}/>;
      case 'teacherHome':
        return <TeacherHome app={app}/>;
      case 'studentHome':
        return <StudentHome app={app}/>;
      case 'adminHome':
        return <AdminHome app={app}/>;
      case 'devHome':
        return <DevHome app={app}/>;
      case 'addCourse':
        return <AddCourse app={app}/>;
      case 'editCourse':
        return <AddCourse editMode={true} app={app}/>;
      case 'joinCourse':
        return <JoinCourse app={app}/>;
      case 'course':
        return <Course app={app}/>;
      case 'subject':
        return <Subject app={app}/>;
      case 'addSubject':
        return <AddSubject app={app}/>;
      case 'editSubject':
        return <AddSubject editMode={true} app={app}/>;
      case 'addProject':
        return <AddProject app={app}/>;
      case 'editProject':
        return <AddProject editMode={true} app={app}/>;
      case 'project':
        return <Project app={app}/>;
      case 'addCard':
        return <AddCard app={app}/>;
      case 'editCard':
        return <AddCard editMode={true} app={app}/>;
      case 'resubmitCard':
        return <AddCard editMode={true} resubmit={true} app={app}/>;
      case 'viewCards':
        return <ViewCards app={app}/>;
      case 'gradingCards':
        return <GradingCards app={app}/>;
      case 'slideShow':
        return <SlideShow app={app}/>;
      case 'student':
        return <Student app={app}/>;
      case 'studentSubject':
        return <StudentSubject app={app}/>;
      case 'studentProject':
        return <StudentProject app={app}/>;
      case 'addSchool':
        return <AddSchool app={app}/>;
      case 'editSchool':
        return <AddSchool editMode={true} app={app}/>;
      case 'joinSchool':
        return <JoinSchool app={app}/>;
      case 'school':
        return <School app={app}/>;
      case 'teacher':
       return <Teacher app={app}/>;
      case 'admin':
        return <Admin app={app}/>;
      case 'addAdmin':
         return <AddAdmin app={app}/>;
      case 'group':
        return <Group app={app}/>
      default:
        return null;
    }
  }

  render() {
    this.init(this.props);
    const pageStyle = {...this.ui.basicStyle, ...{
      justifyContent: 'flex-start',
      //backgroundImage: 'url(' + background2 + ')',
      background: this.ui.colors.ultraLightGrey,
      backgroundSize: '100% 100%',
      position: 'relative'
    }}
    const deadView = this.state.deadView;
    const view = this.state.view;
    //console.log(deadView);
    //console.log(view);
    return(
      <div style={pageStyle}>
        <NavBar app={this.app}/>
        {this.animatedView(this.views.bind(this), deadView? deadView: view, deadView? false: true)}
        <Trace app={this.app}/>
        <Footer app={this.app}/>
        <Menu app={this.app}/>
        <Notice app={this.app}/>

        <Enlarger app={this.app}/>
        <GeoLocated app={this.app}/>

        <PrefabPicker app={this.app}/>
        <DefaultImagePicker app={this.app}/>
      </div>
    )
  }

}

export default Home;
