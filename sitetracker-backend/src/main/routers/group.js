import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';

import Group from '../../models/Group.js';

class GroupRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/group/fetchData', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Group.fetchData(data.group, (result, groupData, profiles, studentProjects, cards, langs)=>{
        return res.json({
          result: result,
          groupData: groupData,
          profiles: profiles,
          studentProjects: studentProjects,
          cards: cards,
          langs: langs
        })
      })
    });

    app.post('/group/join', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Group.joinGroup(data, (result, newGroup)=>{
        return res.json({
          result: result,
          group: newGroup
        })
      })
    });

    app.post('/group/leave', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Group.leaveGroup(data, (result, newGroup)=>{
        return res.json({
          result: result,
          group: newGroup
        })
      })
    });

    app.post('/group/add', async(req, res, next)=>{
      const data = req.body.data;
      //console.log(data)

      Group.addGroup(data, (result, newGroup, existedGroup)=>{
        return res.json({
          result: result,
          group: newGroup,
          existedGroup: existedGroup
        })
      })
    });
  }

}

export default GroupRouter;
