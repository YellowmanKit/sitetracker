import mongoose from 'mongoose';
import randomString from'randomstring';
import to from'../to';

import Profile from './Profile';

var ObjectId = mongoose.Schema.Types.ObjectId;
var schoolSchema = mongoose.Schema({
  admin: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    required: true
  },
  joinedTeachers: [ObjectId]
})

var School = module.exports = mongoose.model('school',schoolSchema);

module.exports.getByUser = async (userId, profile) =>{
  let err, school;
  let schools = [];
  let supervisingSchools = [];
  let joinedSchools = profile.joinedSchools;

  [err, schools] = await(to(School.find({admin: userId})));
  if(err || schools === null){ return res.json({ result: "failed" });}
  for(var i=0;i<schools.length;i++){
    supervisingSchools.push(schools[i]._id);
  }

  for(var i=0;i<joinedSchools.length;i++){
    [err, school] = await to(School.findById(joinedSchools[i]));
    schools = [...schools, school];
  }

  return [err, schools, supervisingSchools];
}

module.exports.leaveSchool = async (data, cb)=>{
  let err, schoolToLeave, updatedProfile, updatedUser;

  [err, schoolToLeave] = await to(School.findOneAndUpdate({code: data.code}, { $pull: {
    joinedTeachers: data.userId
  }}, {new: true}))
  if(err || schoolToLeave === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $pull: {
    joinedSchools: schoolToLeave._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  if(updatedProfile.joinedSchools.length === 0){
    [err, updatedUser] = await to(User.findOneAndUpdate({_id: data.userId}, { $set: {
      type: 'student'
    }}, {new: true}))
    if(err || updatedUser === null){ cb('failed'); };
  }

  cb('success', schoolToLeave, updatedProfile, updatedUser)
}

module.exports.joinSchool = async (data, cb)=>{
  let err, schoolToJoin, updatedProfile;

  [err, schoolToJoin] = await to(School.findOneAndUpdate({code: data.code}, { $push: {
    joinedTeachers: data.userId
  }}, {new: true}))
  if(err || schoolToJoin === null){ cb('failed'); };

  [err, updatedProfile] = await to(Profile.findOneAndUpdate({belongTo: data.userId}, { $push: {
    joinedSchools: schoolToJoin._id
  }}, {new: true}))
  if(err || updatedProfile === null){ cb('failed'); };

  cb('success', schoolToJoin, updatedProfile)
}

module.exports.addSchool = async (newSchool, cb)=>{
  let err, school;

  var newCode = '';
  for(var i=0;i<99;i++){
    newCode = randomString.generate({
      length: 5,
      charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
    });

    [err, school] = await to(School.findOne({code: newCode}));
    if(!err && school === null){ break; };
  }

  newSchool['code'] = newCode;

  [err, school] = await to(School.create(newSchool));
  if(err){ cb('failed'); console.log(err); return; }

  //console.log(School)
  cb('success', school)
}

module.exports.codeExist = async (code)=>{
  let err, school;
  [err, school] = await to(School.findOne({code: code}));
  if(err || !school){ return false; }
  return true;
}
