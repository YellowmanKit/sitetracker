import mongoose from 'mongoose';
import to from '../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var studentProjectSchema = mongoose.Schema({
  project: {
    type: ObjectId,
    required: true
  },
  student: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  cards: [ObjectId]
})

var StudentProject = module.exports = mongoose.model('studentProject', studentProjectSchema);

module.exports.getByProjects = async (projects) =>{
  let err, studentProject;
  let studentProjectsId = [];
  let studentProjects = [];

  for(var i=0;i<projects.length;i++){
    studentProjectsId = [...studentProjectsId, ...projects[i].studentProjects];
  }

  for(var i=0;i<studentProjectsId.length;i++){
    [err, studentProject] = await to(StudentProject.findById(studentProjectsId[i]));
    studentProjects.push(studentProject)
  }

  return [err, studentProjects, studentProjectsId];
}
