import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import User from '../../models/User.js';
import Course from '../../models/Course.js';

class CourseRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/course/getAllOfTeacher', async(req, res, next)=>{
      const profile = req.body.data;
      //console.log(data)

      let err, course, subject, project, studentProject;
      var courses = [];
      var teachingCourses = [];

      [err, courses] = await to(Course.find({teacher: profile.belongTo}, null, {sort: {createdAt: 'descending'}}));
      if(err || courses === null){ console.log('failed to getcourses'); return res.json({ result: 'failed' })}
      //console.log(courses);
      for(var i=0;i<courses.length;i++){
        teachingCourses.push(courses[i]._id);
      }
      profile['teachingCourses'] = teachingCourses;

      return res.json({
        result: 'success',
        courses: courses,
        profile: profile
      })

    });

    app.post('/course/leave', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.leaveCourse(data, (result, leavedCourse, updatedProfile)=>{
        return res.json({
          result: result,
          leavedCourse: leavedCourse,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/course/join', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.joinCourse(data, (result, joinedCourse, updatedProfile)=>{
        return res.json({
          result: result,
          joinedCourse: joinedCourse,
          updatedProfile: updatedProfile
        })
      })
    });

    app.post('/course/edit', async(req, res, next)=>{
      const course = req.body.data;
      //console.log(data)
      let err, editedCourse;
      [err, editedCourse] = await to(Course.findOneAndUpdate({_id: course._id},{ $set: {
        icon: course.icon,
        title: course.title,
        endDate: course.endDate
      }}, { new: true }));

      return res.json({
        result: err? 'failed': 'success',
        editedCourse: editedCourse
      })
    });

    app.post('/course/add', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Course.addCourse(data, (result, newCourse)=>{
        return res.json({
          result: result,
          newCourse: newCourse
        })
      })
    });

  }

}

export default CourseRouter;
