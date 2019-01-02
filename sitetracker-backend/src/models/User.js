import mongoose from 'mongoose';
import randomString from'randomstring';
import nodemailer from 'nodemailer';
import to from'../to';
import dotenv from'dotenv';
dotenv.config();

import School from './School';
import Course from './Course';
import Profile from './Profile';

var schema = mongoose.Schema({
  id: {
    type: String
  },
  pw: {
    type: String
  },
  mlanghkuId: {
    type: String
  },
  mlanghkuPw: {
    type: String
  },
  email: {
    type: String
  },
  type: {
    type: String,
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

var User = module.exports = mongoose.model('user',schema);

module.exports.getProfilesByUsers = async (users)=>{
  let err,data;

  let profile = [];
  let profiles = [];
  let profilesId = [];

  for(var i=0;i<users.length;i++){
    [err, profile] = await to(Profile.findOne({ belongTo: users[i]._id }) );

    if(users[i].type === 'admin'){
      let supervisingSchools = [];
      [err, data, supervisingSchools] = await School.getByUser(users[i], profile);
      profile = {...profile._doc, supervisingSchools: supervisingSchools};
    }
    profiles = [...profiles, profile];
    profilesId = [...profilesId, profile._id];
  }
  return [err, profiles, profilesId];
}

module.exports.getByType = async (type)=>{
  let err, users;
  let usersId = [];

  [err, users] = await to(User.find({type: type}));
  if(err || !users){ console.log(err); return ['error']; }
  for(var i=0;i<users.length;i++){
    usersId = [...usersId, users[i]._id];
  }
  return [null , users, usersId]
}

module.exports.getUserAndProfile = async (id, pw) =>{
  let err, user, profile;

  [err, user] = await to(User.findOne({id, pw}));
  if(err || !user){ return ['error']; }

  [err, profile] = await to(Profile.findOne({belongTo: user._id}));
  if(err || !profile){ return ['error']; }

  return [null , user, profile]
}

module.exports.resetPassword = async (email, cb)=>{
  let err, user, info;

  [err,user] = await to(User.findOne({email: email}));
  if(err || user === null){ cb('failed'); return; };

  const randomPassword = randomString.generate(6);
  const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Your mlang account password has been reset!',
      html:
      '<p>Dear user,</p>' +
      '<p>Thanks for using mlang!</p>' +
      '<p>Your account id is ' +  user.id + '</p>' +
      '<p>and your new password is <b>' + randomPassword + '</b>.</p>'+
      '<p>Have fun!</p>' +
      '<p>Regard,</p>' +
      '<p>mlang developer team</p>'+
      '<p>For any suggestions or bug report please send email to mlang.socail@gmail.com</p>'
  };

  [err, info] = await to(transporter.sendMail(mailOptions));
  if(err){ cb('failed'); console.log('err: mail cannot be sent'); return; }

  user.set({ pw: randomPassword });
  user.save();
  cb('success');
}

module.exports.aquireNewAccountByAppAccount = async (appUser, appPw)=>{

  const existUser = await User.findOne({id: appUser.username, pw: appPw});
  if(existUser !== null){ return ['error'] }

  let err, user, profile;

  const newUser = {
    id: appUser.username,
    pw: appPw,
    mlanghkuId: appUser.username,
    mlanghkuPw: appPw,
    email: appUser.email,
    type: appUser.identity === 2? 'teacher': 'student'
  };

  [err, user] = await to(User.create(newUser));
  if(err){ console.log('cant create user'); return ['error'] }

  var newProfile = {
    belongTo: user._id
  };

  [err, profile] = await to(Profile.create(newProfile));
  if(err){ console.log('cant create profile'); return ['error'] }

  return [null, user, profile];
}

module.exports.acquireNewAccountByCode = async (code, codeType, cb)=>{
  let err, result, exist, user, profile;

  if(codeType === 'course'){
    [err, exist] = await to(Course.codeExist(code));
  }else{
    [err, exist] = await to(School.codeExist(code));
  }

  if(err || !exist){ console.log('no such course'); cb('failed'); return; }


  const newUser = {
    id: 'DefaultId',
    pw: randomPassword(),
    email: '@',
    type: codeType === 'course'? 'student': 'teacher'
  };

  [err, user] = await to(User.create(newUser));
  if(err){ console.log('cant create user'); cb('failed'); console.log(err); return; }

  var newProfile = {
    belongTo: user._id
  };

  [err, profile] = await to(Profile.create(newProfile));
  if(err){ console.log('cant create profile'); cb('failed'); console.log(err); return; }

  if(codeType === 'course'){
    Course.joinCourse({ userId: user._id, code: code}, (result)=>{
      cb(result, user);
    });
  }else if(codeType === 'school'){
    School.joinSchool({ userId: user._id, code: code}, (result)=>{
      cb(result, user);
    });
  }
}

module.exports.acquireNewAccount = async (email, cb)=>{
  const existUser = await User.findOne({email: email});
  if(existUser !== null){ cb('failed'); return; }

  var defaultId = email.substring(0, email.lastIndexOf("@"));
  const newUser = {
    id: defaultId,
    pw: randomPassword(),
    email: email
  }

  const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Your mlang account is ready!',
      html:
      '<p>Dear user,</p>' +
      '<p>Thanks for using mlang!</p>' +
      '<p>Your account id is ' +  newUser.id + '</p>' +
      '<p>and your password is <b>' + randomPassword + '</b></p>'+
      '<p>Have fun!</p>' +
      '<p>Regard,</p>' +
      '<p>mlang developer team</p>' +
      '<p>For any suggestions or bug report please send email to mlang.socail@gmail.com</p>'
  };

  let err, info, user, profile;

  /*[err, info] = await to(transporter.sendMail(mailOptions));
  if(err){ cb('failed'); console.log(err); console.log('err: mail cannot be sent'); return; }*/

  [err, user] = await to(User.create(newUser));
  if(err){ cb('failed'); console.log(err); return; }

  var newProfile = {
    belongTo: user._id
  };

  [err, profile] = await to(Profile.create(newProfile));
  if(err){ cb('failed'); console.log(err); return; }
  cb('success');
}

//console.log(process.env.GMAIL_ID);
//console.log(process.env.GMAIL_PW);

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
     user: process.env.GMAIL_ID,
     pass: process.env.GMAIL_PW
    }
});

function randomPassword(){
  return randomString.generate({
    length: 6,
    charset: 'abcdefghjkmnopqrstuvwxyz234567890'
  });
}

/*const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    //requireTLS: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW
    }
});*/
