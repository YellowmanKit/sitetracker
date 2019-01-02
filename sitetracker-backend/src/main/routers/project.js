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
import Profile from '../../models/Profile.js';

class ProjectRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/project/getRanking', async(req, res)=>{
      const projectId = req.body.data;
      console.log(projectId);
      let err, project, studentProjects, card, profile;
      var profiles = [];
      var rankings = [];

      [err, studentProjects] = await to(StudentProject.find({project: projectId}));
      if(err || !studentProjects){ return res.json({ result: 'failed' })}

      for(var i=0;i<studentProjects.length;i++){
        const student = studentProjects[i].student;
        const cards = studentProjects[i].cards;
        var total = 0;
        var featured = 0;
        for(var j=0;j<cards.length;j++){
          [err, card] = await to(Card.findById(cards[j]._id));
          if(err || !card){ return res.json({ result: 'failed' })}
          total += card.grade === 'passed'? 1: 0;
          total += card.grade === 'featured'? 1: 0;
          featured += card.grade === 'featured'? 1: 0;
        }

        [err, profile] = await to(Profile.findOne({belongTo: student}));
        if(err || !profile){ return res.json({ result: 'failed' })}

        profiles.push(profile);

        rankings.push({
          student: student,
          total: total,
          featured: featured,
          score: total + featured * 2
        })
      }

      rankings.sort((a, b)=> {
          return b.score - a.score;
      });

      //console.log(rankings);

      return res.json({
        result:'success',
        ranking: rankings,
        profiles: profiles
      })
    });

    app.post('/project/getMultiple', async(req, res)=>{
      const list = req.body.data;
      //console.log(list);
      let err, project;
      var _projects = [];
      for(var i=0;i<list.length;i++){
        [err, project] = await to(Project.findById(list[i]));
        if(err){ return res.json({ result: 'failed' })}
        _projects.splice(0,0,project);
      }
      return res.json({
        result:'success',
        projects: _projects
      })
    });

    app.post('/project/edit', async(req, res, next)=>{
      const project = req.body.data;
      //console.log(data)
      let err, editedProject;
      [err, editedProject] = await to(Project.findOneAndUpdate({_id: project._id},{ $set: project }, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedProject: editedProject
      })
    });

    app.post('/project/add', async(req, res)=>{
      const project = req.body.data;
      console.log(project);
      let err, newProject, updatedSubject;
      [err, newProject] = await to(Project.create(project))
      if(err){ return res.json({ result: 'failed' })}

      [err, updatedSubject] = await to(Subject.findOneAndUpdate({_id: project.subject}, { $push: {
        projects: newProject._id
      }}, {new: true}))
      if(err || updatedSubject === null){ cb('failed'); };

      //Log.create({ user: data.userId, type: 'addProject' });

      return res.json({
        result:'success',
        newProject: newProject,
        updatedSubject: updatedSubject
      })
    });

  }

}

export default ProjectRouter;
