import https from 'https';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import AppRouter from './routers/app.js';
import SchoolRouter from './routers/school.js';
import UserRouter from './routers/user.js';
import ProfileRouter from './routers/profile.js';
import CourseRouter from './routers/course.js';
import SubjectRouter from './routers/subject.js';
import ProjectRouter from './routers/project.js';
import StudentProjectRouter from './routers/studentProject.js';
import GroupRouter from './routers/group.js';

import CardRouter from './routers/card.js';
import LangRouter from './routers/lang.js';

import mlanghkuRouter from './routers/mlanghku.js';

//const temp = 'C:/data/temp/';
//const storage = 'C:/data/storage/';

class CreateApp {

  constructor(appName, port, useHttps, useUbuntu, devMode){
    this.createApp(appName, port, useHttps, useUbuntu, devMode);
  }

  createApp(appName, port, useHttps, useUbuntu, devMode){
    const temp = path.join(__dirname, '../../../data/temp/');
    const storage = path.join(__dirname, '../../../data/storage/');

    var storageConfig = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, temp);
      },
      filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname);
      }
    });

    var upload = multer({ storage: storageConfig });

    const app = express();
    if(useHttps){
      const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, '../ssl', devMode? 'dev-server.crt':'server.crt' )),
        key: fs.readFileSync(path.join(__dirname, '../ssl',  devMode? 'dev-server.key':'server.key' )),
        ca: fs.readFileSync(path.join(__dirname, '../ssl', devMode? 'dev-server-ca.crt':'server-ca.crt' ))
      }
      app.server = https.createServer(httpsOptions, app);
    }else{
      app.server = http.createServer(app);
    }

    app.use(morgan('dev'));
    app.use(cors({exposeHeaders: "*"}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname,'../../' + appName + '/')));

    app.set('root',__dirname);
    app.set('config', storageConfig);
    app.set('upload',upload);
    app.set('temp',temp);
    app.set('storage',storage);

    const mlanghku = new mlanghkuRouter(app);

    new AppRouter(app);
    new SchoolRouter(app);
    new UserRouter(app, mlanghku);
    new ProfileRouter(app);
    new CourseRouter(app);
    new ProjectRouter(app);
    new StudentProjectRouter(app);
    new CardRouter(app);
    new LangRouter(app);
    new SubjectRouter(app);
    new GroupRouter(app);

    app.server.listen(port, ()=>{console.log('App is running on port ' + app.server.address().port);});
  }


}

export default CreateApp;
