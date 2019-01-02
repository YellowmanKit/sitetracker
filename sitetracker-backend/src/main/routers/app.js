import Router from './Router';
import {version} from '../../../package.json';
import path from 'path';
import mongoose from 'mongoose';

import fs from 'fs-extra';

class AppRouter extends Router{

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    const upload = app.get('upload');
    const temp = app.get('temp');
    const storage = app.get('storage');

    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.get('/download/:type/:name', (req,res,next)=>{
      const type = req.params.type;
      const append = this.getAppend(type);
      const fileName = req.params.name;
      const filePath = path.join(storage,append,fileName);

      console.log('Donwloading ' + filePath)

      return res.download(filePath,fileName,(err)=>{
        if(err){ console.log('File download error'); }
      });
    });

    app.post('/upload',upload.array('files'), (req,res, next)=>{
      //console.log('Uploaded ', req.files);

      const type = req.headers.type;
      var append = this.getAppend(type);
      var filenames = [];

      for(var i=0;i<req.files.length;i++){
        var filename = req.files[i].filename;
        const splted = filename.split('-');

        filenames.splice(0,0,filename);

        if(type === 'card'){
            append = splted[1] === 'cardIcon.png'? this.getAppend('cardIcon'): this.getAppend('langAudio');
        }

        fs.move(temp + filename, storage + append + filename, (err)=> {
            if(err){ console.log(err); }
        });
      }

      return res.json({
        result: 'success',
        filenames: filenames
      })
    });

    app.get('/', async (req,res,next)=>{
      return res.status(200).json({
        version: version
      })
    });
  }

}

export default AppRouter;
