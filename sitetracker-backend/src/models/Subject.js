import mongoose from 'mongoose';
import Model from './Model';
import to from '../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var subjectSchema = mongoose.Schema({
  course: {
    type: ObjectId,
    required: true
  },
  projects: {
    type: [ObjectId]
  },
  icon: {
    type: String
  },
  title: {
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
  }
})

var Subject = module.exports = mongoose.model('subject',subjectSchema);

module.exports.getByCourses = async (courses, all) =>{
  let err, subject;
  let subjectsId = [];
  let subjects = [];

  for(var i=0;i<courses.length;i++){
    if(!all && Model.outDated(courses[i].endDate)){ continue; }
    subjectsId = [...subjectsId, ...courses[i].subjects];
  }

  for(var i=0;i<subjectsId.length;i++){
    [err, subject] = await to(Subject.findById(subjectsId[i]));
    subjects.push(subject)
  }

  return [err, subjects, subjectsId];
}
