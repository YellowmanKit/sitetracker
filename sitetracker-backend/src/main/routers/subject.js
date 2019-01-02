import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';
import Course from '../../models/Course.js';
import Project from '../../models/Project.js';
import Subject from '../../models/Subject.js';
import StudentProject from '../../models/StudentProject.js';
import Card from '../../models/Card.js';

import Log from '../../models/Log.js';

class SubjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/subject/getAllOfUser', async(req, res)=>{
      const profile = req.body.data;
      //console.log(profile);
      let err, studentProjects, project, subject, card;
      var projects = [];
      var subjects = [];

      [err, studentProjects] = await to(StudentProject.find({student: profile.belongTo}));
      if(err || studentProjects === null){ console.log('failed to get student project'); return res.json({ result: 'failed' })}
      //console.log(studentProjects);
      var studentProjectsList = [];
      var subjectsList = [];
      for(var i=0;i<studentProjects.length;i++){
        const cards = studentProjects[i].cards;
        if(cards.length === 0){ continue; }

        var skip = false;
        for(var j=0;j<cards.length;j++){
          [err, card] = await to(Card.findById(cards[j]._id));
          if(err || !card){ continue; }
          if(card.grade === 'featured'){ break; }
          if(j === cards.length - 1){ skip = true; }
        }
        if(skip){ continue; }

        studentProjectsList.push(studentProjects[i]._id);

        [err, project] = await to(Project.findById(studentProjects[i].project));
        if(err || project === null){ console.log('failed to get project'); return res.json({ result: 'failed' })}
        projects.push(project);

        [err, subject] = await to(Subject.findById(project.subject));
        if(err || subject === null){
          console.log('failed to get subject');
          continue;
        }
        subjects.push(subject);
        if(!(subjectsList.indexOf('' + subject._id) > -1)){
          subjectsList.push('' + subject._id);
        }
      }

      var updatedProfile = profile;
      updatedProfile.subjects = subjectsList;
      updatedProfile.studentProjects = studentProjectsList;

      return res.json({
        result: 'success',
        subjects: subjects,
        projects: projects,
        studentProjects: studentProjects,
        profile: updatedProfile
      })
    });

    app.post('/subject/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, subject;
      var subjects = [];
      for(var i=0;i<list.length;i++){
        [err, subject] = await to(Subject.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        subjects.splice(0,0,subject);
      }
      return res.json({
        result:'success',
        subjects: subjects
      })
    });

    app.post('/subject/edit', async(req, res, next)=>{
      const subject = req.body.data;
      //console.log(data)
      let err, editedSubject;
      [err, editedSubject] = await to(Subject.findOneAndUpdate({_id: subject._id},{ $set: subject }, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedSubject: editedSubject
      })
    });

    app.post('/subject/add', async(req, res)=>{
      const subject = req.body.data.subject;
      //console.log(subject);
      let err, newSubject, updatedCourse;
      [err, newSubject] = await to(Subject.create(subject))
      if(err){ return res.json({ result: 'failed' })}

      [err, updatedCourse] = await to(Course.findOneAndUpdate({_id: subject.course}, { $push: {
        subjects: newSubject._id
      }}, {new: true}))
      if(err || updatedCourse === null){ cb('failed'); };

      //Log.create({ user: data.userId, type: 'addSubject' });

      return res.json({
        result:'success',
        newSubject: newSubject,
        updatedCourse: updatedCourse
      })
    });

  }

}

export default SubjectRouter;
