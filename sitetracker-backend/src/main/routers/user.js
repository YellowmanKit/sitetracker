import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;
import to from '../../to';

import Query from '../../models/Query.js';
import User from '../../models/User.js';
import Profile from '../../models/Profile.js';
import School from '../../models/School.js';
import Course from '../../models/Course.js';
import Subject from '../../models/Subject.js';
import Project from '../../models/Project.js';
import StudentProject from '../../models/StudentProject.js';
import Group from '../../models/Group.js';

import Card from '../../models/Card.js';
import Lang from '../../models/Lang.js';

import Log from '../../models/Log.js';

class UserRouter extends Router {

  constructor(app, mlanghku){
    super(app);
    this.app = app;
    this.mlanghku = mlanghku;
    this.init();
  }

  init(){
    const app = this.app;
    const mlanghku = this.mlanghku;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/user/addAdmin', async(req, res, next)=>{
      const userId = req.body.data.userId;
      //console.log(userId);
      let err, updatedUser;
      [err, updatedUser] = await to(User.findOneAndUpdate({id: userId},{$set:{type:'admin'}},{new: true}))
      if(err){ console.log(err); return res.json({ result: 'failed'})}

      let profiles = [];
      let admins = [];
      [err, profiles, admins] = await User.getProfilesByUsers([updatedUser]);
      if(err){ console.log(err); return res.json({ result: 'failed'})}

      return res.json({
        result: 'success',
        updatedUser: updatedUser,
        profiles: profiles,
        admins: admins
      });
    });

    app.post('/user/update', async(req, res, next)=>{
      const data = req.body.data;
      let err, existedUser;
      [err, existedUser] = await to(User.findOne({id: data.id, pw: data.pw}));
      if(err){ console.log(err); return res.json({ result: 'failed'})}
      if(existedUser && existedUser._id.toString() !== data._id){ console.log('user id/pw already used'); return res.json({ result: 'failed'}) }

      User.findOneAndUpdate({_id: data._id}, { $set: data }, {new: true}, (err, updatedUser)=>{
        return res.json({
          result: (err || !updatedUser)? 'failed':'success' ,
          updatedUser: updatedUser
        });
      });

    });

    app.get('/user/resetPassword/', async (req, res, next)=>{
      const email = req.headers.email;

      User.resetPassword(email, result=>{
        return res.json({ result: result });
      });
    });

    app.get('/user/getNewAccountByCode/', (req, res, next)=>{
      const code = req.headers.code;
      const codeType = req.headers.type;

      User.acquireNewAccountByCode(code, codeType, (result, user)=>{
        console.log(result);
        if(result === 'failed'){ return res.json({result: result})}
        return res.json({ result: result, id: user.id, pw: user.pw });
      });
    });

    app.get('/user/getNewAccount/', (req, res, next)=>{
      const email = req.headers.email;

      User.acquireNewAccount(email, result=>{
        return res.json({ result: result });
      });
    });

    app.get('/user/login/', async (req, res, next)=>{
      const id = req.headers.id;
      const pw = req.headers.pw;

      //console.log(id + ' ' + pw);

      let err, data, user, profile, appUser;
      [err, user, profile] = await User.getUserAndProfile(id, pw);
      if(err){
        [err, appUser] = await mlanghku.login(id, pw);
        if(err){ console.log(err); return res.json({ result: "failed" }); }
        [err, user, profile] = await User.aquireNewAccountByAppAccount(appUser.attributes, pw);
      }
      //console.log(user);
      //console.log(profile);

      Log.createLoginLog(user._id);

      profiles = [profile];

      let profiles = [];
      let schools = [];
      let courses = [];
      let subjects = [];
      let projects = [];
      let studentProjects = [];
      let groups = [];
      let cards = [];
      let langs = [];

      let teacherProfiles;
      [err, data, teacherProfiles] = await Course.getJoined(profile.joinedCourses);
      if(err){ return res.json({ result: "failed" }); }

      courses = [...courses, ...data];
      profiles = [...profiles, ...teacherProfiles];

      var joinedSubjects;
      [err, data, joinedSubjects] = await Subject.getByCourses(data);
      if(err){ return res.json({ result: "failed" }); }

      subjects = [...subjects, ...data];

      var joinedProjects;
      [err, data, joinedProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var joinedStudentProjects;
      [err, data, joinedStudentProjects] = await StudentProject.getByProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      studentProjects = [...studentProjects, ...data];

      var joinedCards;
      [err, data, joinedCards] = await Card.getByStudentProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      cards = [...cards, ...data];

      var joinedGroups;
      [err, data, joinedGroups] = await Group.getByUserAndProjects(user._id, joinedProjects);
      if(err){ return res.json({ result: "failed" }); }

      groups = [...groups, ...data];





      var teachingCourses;
      [err, data, teachingCourses] = await Course.getTeaching(user._id);
      if(err){ return res.json({ result: "failed" });}

      courses = [...courses, ...data];

      var teachingSubjects;
      [err, data, teachingSubjects] = await Subject.getByCourses(data.slice(0).reverse());
      if(err){ return res.json({ result: "failed" });}

      subjects = [...subjects, ...data];

      var teachingProjects;
      [err, data, teachingProjects] = await Project.getBySubjects(data);
      if(err){ return res.json({ result: "failed" }); }

      projects = [...projects, ...data];

      var teachingStudentProjects;
      [err, data, teachingStudentProjects] = await StudentProject.getByProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      studentProjects = [...studentProjects, ...data];

      var teachingCards;
      [err, data, teachingCards] = await Card.getByStudentProjects(data);
      if(err){ return res.json({ result: "failed" }); }

      cards = [...cards, ...data];

      var teachingGroups;
      [err, data, teachingGroups] = await Group.getByProjects(teachingProjects);
      if(err){ return res.json({ result: "failed" }); }

      groups = [...groups, ...data];



      var supervisingSchools;
      [err, data, supervisingSchools] = await School.getByUser(user._id, profile);
      if(err){ return res.json({ result: "failed" });}

      schools = [...schools, ...data];

      var adminUsers;
      [err, data, adminUsers] = await User.getByType('admin');

      var admins = [];

      [err, data, admins] = await User.getProfilesByUsers(data);
      if(err){ return res.json({ result: "failed" });}

      profiles = [...profiles, ...data];





      var profilesId;
      [err, data, profilesId] = await Profile.getByStudentProjects(studentProjects);
      if(err){ return res.json({ result: "failed" }); }

      profiles = [...profiles, ...data];

      var langsId;
      [err, data, langsId] = await Lang.getByCards(cards);
      if(err){ return res.json({ result: "failed" }); }

      langs = [...langs, ...data];

      return res.json({
        result: "success",
        user: user,
        profile: profile,
        profiles: profiles,

        admins: admins,
        supervisingSchools: supervisingSchools,

        teachingCourses: teachingCourses,
        joinedCourses: profile.joinedCourses,

        teachingSubjects: teachingSubjects,
        joinedSubjects: joinedSubjects,

        teachingProjects: teachingProjects,
        joinedProjects: joinedProjects,

        teachingStudentProjects: teachingStudentProjects,
        joinedStudentProjects: joinedStudentProjects,

        teachingCards: teachingCards,
        joinedCards: joinedCards,

        schools: schools,
        courses: courses,
        subjects: subjects,
        projects: projects,
        studentProjects: studentProjects,
        groups: groups,
        cards: cards,
        langs: langs
      })
    });

  }

}

export default UserRouter;
