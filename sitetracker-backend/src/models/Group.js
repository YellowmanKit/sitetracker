import mongoose from 'mongoose';
import randomString from'randomstring';
import to from'../to';

import Profile from './Profile';
import StudentProject from './StudentProject';
import Card from './Card';
import Lang from './Lang';

var ObjectId = mongoose.Schema.Types.ObjectId;
var groupSchema = mongoose.Schema({
  name: {
    type: String
  },
  project: {
    type: ObjectId,
    required: true
  },
  members: [ObjectId],
  leader: {
    type: ObjectId
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

var Group = module.exports = mongoose.model('group', groupSchema);



module.exports.fetchData = async (group, cb)=>{

  let err, data;
  let groupData = { group: group._id }

  let profiles = [];
  [err, data] = await to(Profile.find({ belongTo: group.members }));
  if(err || !data){ cb('failed'); return; }

  let studentProjects = [];
  const members = group.members;
  [err, data] = await to(StudentProject.find({ project: group.project, student: group.members }));
  if(err || !data){ cb('failed'); return; }

  studentProjects = [...studentProjects, ...data];

  let cards = [];
  for(var i=0;i<studentProjects.length;i++){
    [err, data] = await to(Card.find({_id: studentProjects[i].cards}));
    if(err || !data){ cb('failed'); return; }
    cards = [...cards, ...data];
  }

  let langs = [];
  for(var j=0;j<cards.length;j++){
    [err, data] = await to(Lang.find({_id: cards[j].langs}));
    if(err || !data){ cb('failed'); return; }
    langs = [...langs, ...data];
  }

  cb('success', groupData, profiles, studentProjects, cards, langs)

}

module.exports.leaveGroup = async (data, cb)=>{
  let err, group;

  [err, group] = await to(Group.findOneAndUpdate({code: data.groupCode},
    {$pull:{ members: data.userId }}, { new: true }));
  if(!err && group === null){ cb('failed'); return; };

  //console.log(group)
  cb('success', group)
}

module.exports.joinGroup = async (data, cb)=>{
  let err, group;

  [err, group] = await to(Group.findOneAndUpdate({code: data.groupCode},
    {$addToSet:{ members: data.userId }}, { new: true }));
  if(!err && group === null){ cb('failed'); return; };

  //console.log(group)
  cb('success', group)
}

module.exports.addGroup = async (data, cb)=>{
  let err, group;

  var newCode = '';
  for(var i=0;i<99;i++){
    newCode = randomString.generate({
      length: 5,
      charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
    });

    [err, group] = await to(Group.findOne({code: newCode}));
    if(!err && group === null){ break; };
  }

  [err, group] = await to(Group.findOne({project: data.projectId, leader: data.userId}));
  if(group !== null){ cb('failed', null, group); console.log('group existed'); return; };

  [err, group] = await to(Group.create({ name: data.groupName, project: data.projectId, members: [data.userId], leader: data.userId, code: newCode }));
  if(err){ cb('failed'); console.log(err); return; }

  //console.log(group)
  cb('success', group)
}

module.exports.getByProjects = async (projectsId)=>{
  let err, data;
  let groupsId = [];
  let groups = [];

  for(var i=0;i<projectsId.length;i++){
    [err, data] = await to(Group.find({ project: projectsId[i]}));
    if(err){ return [err]; }
    if(data){
      for(var j=0;j<data.length;j++){
        groupsId = [...groupsId, data[j]._id];
      }
      groups = [...groups, ...data];
    }
  }

  return [err, groups, groupsId];
}

module.exports.getByUserAndProjects = async (userId, projectsId)=>{
  let err, group;
  let groupsId = [];
  let groups = [];

  for(var i=0;i<projectsId.length;i++){
    [err, group] = await to(Group.findOne({ members: userId, project: projectsId[i]}));
    if(err){ return [err]; }
    if(group){
      groupsId = [...groupsId, group._id];
      groups = [...groups, group];
    }
  }

  return [err, groups, groupsId];
}
