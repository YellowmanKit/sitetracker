import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import StudentProject from '../../models/StudentProject.js';
import Project from '../../models/Project.js';
import Profile from '../../models/Profile.js';
import Card from '../../models/Card.js';
import Lang from '../../models/Lang.js';

class StudentProjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/studentProject/update', async(req, res)=>{
      const data = req.body.data;
      //console.log(data);
      let err, studentProject;
      [err, studentProject] = await to(StudentProject.findOneAndUpdate({_id: data._id}, {$set: data }, {new: true}));
      if(err || studentProject === null){ return res.json({ result: 'failed' })}
      //console.log(studentProject);

      return res.json({
        result: 'success',
        updatedStudentProject: studentProject
      })
    });

    app.post('/studentProject/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, studentProject, profile, card, lang;
      var _studentProjects = [];
      var _studentProfiles = [];
      var _cards = [];
      var _langs = [];
      for(var i=0;i<list.length;i++){
        [err, studentProject] = await to(StudentProject.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        _studentProjects.splice(0,0, studentProject);

        [err, profile] = await to(Profile.findOne({belongTo: studentProject.student}));
        if(err || profile === null){ return res.json({ result: 'failed' })}
        _studentProfiles.splice(0,0, profile);

        const cardsId = studentProject.cards;
        for(var j=0;j<cardsId.length;j++){
          [err, card] = await to(Card.findById(cardsId[j]));
          if(err || card === null){ return res.json({ result: 'failed' })}
          _cards.splice(0,0,card);

          const langsId = card.langs;
          for(var k=0;k<langsId.length;k++){
            [err, lang] = await to(Lang.findById(langsId[k]));
            if(err || lang === null){ return res.json({ result: 'failed' })}
            _langs.splice(0,0,lang);
          }

        }
      }
      return res.json({
        result:'success',
        studentProjects: _studentProjects,
        profiles: _studentProfiles,
        cards: _cards,
        langs: _langs
      })
    });

    app.get('/studentProject/get/', async (req, res, next)=>{
      const studentId = req.headers.student;
      const projectId = req.headers.project;
      //console.log(studentId)
      //console.log(projectId)

      let err, _studentProject, _project;
      [err, _studentProject] = await to(StudentProject.findOneAndUpdate({student: studentId, project: projectId },{}, {upsert: true, new: true}))
      if(err || _studentProject === null){ return res.json({ result: "failed" });}

      [err, _project] = await to(Project.findById(projectId));
      if(err || _project === null){ return res.json({ result: "failed" });}

      if(!_project.studentProjects.some(sp=>{return sp.equals(_studentProject._id)}) ){
        [err, _project] = await to(Project.findOneAndUpdate({_id: projectId}, { $push:{
          studentProjects: _studentProject._id
        }}, {new: true}));
        if(err || _project === null){ return res.json({ result: "failed" });}
      }

      return res.json({
        result: 'success',
        updatedProject: _project,
        studentProject: _studentProject
      })

    });

  }


}

export default StudentProjectRouter;
