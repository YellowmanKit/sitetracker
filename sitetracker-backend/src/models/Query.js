import to from '../to';
import Profile from './Profile';
import User from './User';
import School from './School';
import Course from './Course';
import Subject from './Subject';
import Project from './Project';
import Card from './Card';
import Lang from './Lang';

module.exports.getStatistics = async (schoolId)=>{
  let err, data, school;
  var statistics= {
    schoolTeachers: [],
    schoolStudents: [],
    schoolCourses: [],
    schoolSubjects: [],
    schoolProjects: [],
    schoolCards: [],
    schoolLangs: [],
    profiles: [],
    courses: [],
    subjects: [],
    projects: [],
    cards: [],
    langs: [],
    featured: 0
  };

  [err, school] = await to(School.findById(schoolId));
  let coursesId = [];
  [err, data, coursesId] = await Course.getBySchool(school);

  statistics['schoolCourses'] = coursesId;
  statistics['courses'] = data;

  let subjectsId = [];
  [err, data, subjectsId] = await Subject.getByCourses(data, true);

  statistics['schoolSubjects'] = subjectsId;
  statistics['subjects'] = data;

  let projectsId = [];
  [err, data, projectsId] = await Project.getBySubjects(data);

  statistics['schoolProjects'] = projectsId;
  statistics['projects'] = data;

  let cardsId = [];
  let featured = 0;
  [err, data, cardsId, featured] = await Card.getByProjects(data);

  statistics['schoolCards'] = cardsId;
  statistics['cards'] = data;
  statistics['featured'] = featured;

  let langsId = [];
  [err, data, langsId] = await Lang.getByCards(data);

  statistics['schoolLangs'] = langsId;
  statistics['langs'] = data;

  let profilesId = [];
  [err, data, profilesId] = await Profile.getTeachers(schoolId);

  statistics['schoolTeachers'] = profilesId;
  statistics['profiles'] = data;

  [err, data, profilesId] = await Profile.getStudents(statistics.schoolCourses);

  statistics['schoolStudents'] = profilesId;
  statistics['profiles'] = [...statistics['profiles'], ...data];

  return [err, statistics];
}
