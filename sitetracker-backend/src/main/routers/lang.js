import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;

import to from '../../to';

import Lang from '../../models/Lang.js';

class LangRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    /*app.post('/lang/add', async(req, res, next)=>{
      const data = req.body.data;

    })*/

  }


}

export default LangRouter;
