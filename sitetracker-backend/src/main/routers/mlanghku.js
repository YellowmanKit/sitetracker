import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
import to from '../../to';
import Parse from 'parse/node';
import request from 'request';

class mlanghkuRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    Parse.initialize(process.env.PARSE_APP_ID, process.env.DOTNET_KEY);
    Parse.serverURL = process.env.PARSE_SERVER;

    app.get('/mlanghku/download/:filenameUpper/:filenameLower', async(req, res, next)=>{
      const url = 'http://147.8.219.237:1337/parse/files/' + req.params.filenameUpper + '/' + req.params.filenameLower;
      //console.log(url);
      request(url).pipe(res);
    })

    app.post('/mlanghku/fetch', async(req, res, next)=>{
      const data = req.body.data;

      let err, dataRes;
      const query = new Parse.Query(data.className);
      //query.equalTo('project', { __type: 'Pointer', className: 'Project', objectId: req.body.data.projectId });
      query.equalTo(data.field, data.value);
      [err, dataRes] = await to(query.find());
      if(err){ res.json({ result: 'failed' }) }

      res.json({
        result: 'success',
        data: dataRes
      })
    })

    app.post('/mlanghku/login', async(req, res, next)=>{

      const data = req.body.data;
      //console.log(data);
      let err, dataRes, user;
      [err, user] = await to(Parse.User.logIn(data.id, data.pw));
      if(err){ console.log(err); res.json({ result: 'failed to login'}); return; }
      //console.log(user);

      const timestamp =  this.timestamp();
      //[err, dataRes] = await to(Parse.Cloud.run('RenewUser', { timestamp: timestamp }));
      this.runParseCloudFunction("RenewUser", user.attributes.sessionToken, { timestamp: timestamp },
      (err, dataRes, body)=>{

        if(err){ console.log(err); res.json({ result: 'failed to RenewUser'}); return;}

        //console.log(body);
        const jsonBody = JSON.parse(body);
        //console.log(jsonBody);

        res.json({
          result: 'success',
          user: user,
          body: jsonBody.result
        })
      });

    });

  }

  async login(id, pw){
    let err, user;
    [err, user] = await to(Parse.User.logIn(id, pw));
    if(err){ console.log(err.message); return ['error']; }
    //console.log(user.attributes);
    return [null, user];
  }

  timestamp(){
    //return '000000000';
    return Math.floor(new Date().getTime() / 1000);
  }

  async runParseCloudFunction(urlPath, token, params, cb) {
    if (!params) {
        params = {};
    }

    //var buildVariables = config.buildVariables(buildEnvironment);
    //var publicServerURL = buildVariables.publicServerURL;

    urlPath = urlPath.indexOf('/') == 0 ? urlPath.substring(1) : urlPath;
    var url = process.env.PARSE_SERVER + "/functions/" + urlPath;

    var headers = {
        'X-Parse-Application-Id': process.env.PARSE_APP_ID,
        'X-Parse-REST-API-Key': process.env.DOTNET_KEY,
        'X-Parse-Client-Key': process.env.DOTNET_KEY,
        'X-Parse-Javascript-Key': process.env.DOTNET_KEY,
        'Content-Type': 'application/json;charset=utf-8'
    };

    if (token) {
        headers['X-Parse-Session-Token'] = token;
    }

    //let err, res;
    request({
        url: url,
        method: "POST",
        headers: headers,
        qs: params
    }, (err, res, body)=>{
      cb(err, res, body);
    });
  };

}

export default mlanghkuRouter;
