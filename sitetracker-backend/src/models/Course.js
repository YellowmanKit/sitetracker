import mongoose from 'mongoose';
import randomString from'randomstring';
import Model from './Model';
import to from '../to';

import Profile from './Profile';

var ObjectId = mongoose.Schema.Types.ObjectId;
var courseSchema = mongoose.Schema({
  teacher: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  endDate: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    required: true
  },
  joinedStudents: [ObjectId],
  subjects: [ObjectId]
})

var Course = module.exports = mongoose.model('course',courseSchema);

module.exports.getBySchool = async (school)=>{
  let err, data;
  let coursesId = [];
  let courses = [];

  const teachers = school.joinedTeachers;
  for(var i=0;i<teachers.length;i++){
    [err, data] = await to(Course.find({teacher: teachers[i]}));
    courses = [...courses, ...data];
  }
  for(var i=0;i<courses.length;i++){
    coursesId = [...coursesId, courses[i]._id];
  }
  return [err, courses, coursesId];
}

module.exports.getTeaching = async (teacherId)=>{
  let err, course;
  let courses = [];
  let teachingCourses = [];

  [err, courses] = await to(Course.find({teacher: teacherId}, null, {sort: {endDate: 'descending'}}));
  for(var i=0;i<courses.length;i++){
    teachingCourses.push(courses[i]._id);
  }

  return [err, courses, teachingCourses];
}

module.exports.getJoined = async (joinedCourses)=>{
  let err, course, profile;
  let courses = [];
  let profiles = [];

  for(var i=0;i<joinedCourses.length;i++){
    [err, course] = await to(Course.findById(joinedCourses[i]));
    if(err || course === null){ return ['error']; }

    courses.push(course);

    [err, profile] = await to(Profile.findOne({belongTo: course.teacher}));
    if(err || profile === null){ return ['error']; }
    profiles.push(profile);
  }

  return [err, courses, profiles];
}

module.exports.leaveCourse = async (data, cb)=>{
  let err, courseToLeave, updatedProfile;

  [err, courseToLeave] = await to(Course.findOneAndUpdate({code: data.code}, { $pull: {
    joinedStudents: data.userId
  }}, {new: true}))
  if(err || courseToLeave === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $pull: {
    joinedCourses: courseToLeave._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  cb('success', courseToLeave, updatedProfile)
}

module.exports.joinCourse = async (data, cb)=>{
  let err, courseToJoin, updatedProfile;

  [err, courseToJoin] = await to(Course.findOne({code: data.code}));
  if(err || courseToJoin === null){ cb('failed'); };

  if(courseToJoin.joinedStudents.indexOf(data.userId) > -1){ cb('failed - course already joined'); return; }

  [err, courseToJoin] = await to(Course.findOneAndUpdate({code: data.code}, { $push: {
    joinedStudents: data.userId
  }}, {new: true}))
  if(err || courseToJoin === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $push: {
    joinedCourses: courseToJoin._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  cb('success', courseToJoin, updatedProfile);
}

module.exports.addCourse = async (newCourse, cb)=>{
  let err, course;

  var newCode = '';
  for(var i=0;i<99;i++){
    newCode = randomString.generate({
      length: 5,
      charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
    });

    [err,course] = await to(Course.findOne({code: newCode}));
    if(!err && course === null){ break; };
  }

  newCourse['code'] = newCode;

  [err, course] = await to(Course.create(newCourse));
  if(err){ cb('failed'); console.log(err); return; }

  //console.log(course)
  cb('success', course)
}

module.exports.codeExist = async (code)=>{
  let err, course;
  [err, course] = await to(Course.findOne({code: code}));
  if(err || !course){ return false; }
  return true;
}
