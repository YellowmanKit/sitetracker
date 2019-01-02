import Router from './Router';
import path from 'path';
import mongoose from 'mongoose';
var ObjectId = require('mongoose').Types.ObjectId;
//import multer from 'multer';

import fs from 'fs-extra';
import to from '../../to';

import Card from '../../models/Card.js';
import Lang from '../../models/Lang.js';
import Project from '../../models/Project.js';
import StudentProject from '../../models/StudentProject.js';
import Profile from '../../models/Profile.js';

class CardRouter extends Router {

  constructor(app){
    super(app);
    this.app = app;
    this.init();
  }

  init(){
    const app = this.app;
    const upload = app.get('upload');
    //const config = app.get('config');
    //var upload = multer({ storage: config }).single('avatar')

    const temp = app.get('temp');
    const storage = app.get('storage');
    mongoose.connect('mongodb://localhost/sitetracker');
    var db = mongoose.connection;

    app.post('/card/studentRead', async(req,res)=>{
      const cardId = req.body.data.cardId;
      let err, card;
      [err, card] = await(to(Card.findOneAndUpdate({_id: cardId},{$set:{
        studentRead: true
      }}, {new: true})));
      if(err || card === null){ console.log('failed to update card'); return res.json({ result: 'failed to update card'}) }

      return res.json({
        result: 'success',
        updatedCard: card
      })
    })

    app.post('/card/edit', async(req, res)=>{
      const cardToUpdate = req.body.data.card;
      var langs = req.body.data.langs;
      //console.log(cardToUpdate);
      //console.log(langs);
      let err, lang, card;
      var langsId = [];
      for(var i=0;i<langs.length;i++){
        [err, lang] = await(to(Lang.findOneAndUpdate({_id: langs[i]._id},{$set:{
          key: langs[i].key,
          text: langs[i].text,
          audio: langs[i].audio,
          card: cardToUpdate._id
        }}, {new: true, upsert: true})));
        if(err || lang === null){ console.log('failed to update lang'); return res.json({ result: 'failed to update lang'}) }
        //console.log(lang);
        langs[i]._id = lang._id;
        langsId.splice(0,0,langs[i]._id);
      }

      [err, card] = await(to(Card.findOneAndUpdate({_id: cardToUpdate._id},{$set:{
        langs: langsId,
        icon: cardToUpdate.icon,
        geoLocated: cardToUpdate.geoLocated
      }}, {new: true})));
      if(err || card === null){ console.log('failed to update card'); return res.json({ result: 'failed to update card'}) }

      return res.json({
        result: 'success',
        updatedLangs: langs,
        updatedCard: card
      })
    });

    app.post('/card/grade', async(req, res)=>{
      const data = req.body.data;
      const cards = data.cards;
      //console.log(cards);
      let err, card, featuredCount, profile, studentProject;
      var updatedCards = [];
      for(var i=0;i<cards.length;i++){
        [err, card] = await to(Card.findOneAndUpdate({_id: cards[i]}, { $set: {
          grade: cards[i].grade,
          comment: cards[i].comment,
          audioComment: cards[i].audioComment,
          resubmitted: false,
          studentRead: false
        }}, {new: true}));
        if(err || card === null){ console.log('no such card!'); return res.json({ result: 'failed' })}
        updatedCards.splice(0,0,card);
      }

      if(cards.length > 0){
        [err, featuredCount] = await to(Card.count({author: cards[0].author, grade: 'featured'}));
        if(err || featuredCount === null){ console.log('err on getting featuredCount!'); }

        [err, profile] = await to(Profile.findOneAndUpdate({belongTo: cards[0].author}, { $set:{
          featuredCount: featuredCount
        }}, {new: true}))
        if(err || profile === null){ console.log('err on updating featuredCount!'); }
      }

      return res.json({
        result: 'success',
        updatedCards: updatedCards,
        updatedProfile: profile
      })
    });

    app.post('/card/getMultiple', async(req, res)=>{
      const cards = req.body.data.cards;
      //console.log(cards);
      let err, card, langs, profile;
      var _cards = [];
      var _profiles = [];
      for(var i=0;i<cards.length;i++){
        [err, card] = await to(Card.findById(cards[i]));
        if(err || card === null){ console.log('no such card!'); return res.json({ result: 'failed' })}
        _cards.splice(0,0,card);

        [err, profile] = await to(Profile.findOne({belongTo: card.author}));
        if(err || profile === null){ return res.json({ result: 'failed' })}
        _profiles.splice(0,0, profile);
      }

      var _langs = [];
      for(var j=0;j<_cards.length;j++){
        [err, langs] = await to(Lang.find({card: cards[j]}));
        if(err || langs === null || langs.length === 0){ console.log('card hv no lang!'); return res.json({ result: 'failed' })}
        _langs = [..._langs, ...langs]
      }

      return res.json({
        result: 'success',
        cards: _cards,
        langs: _langs,
        profiles: _profiles
      })
    });

    app.post('/card/add', async(req, res, next)=>{
      const data = req.body.data;
      var card = data.card;
      var langs = data.langs;

      let err, project, studentProject, createdCard, createdLang, cardCount, profile;

      //console.log(card);

      [err, createdCard] = await to(Card.create(card))
      if(err || createdCard === null){ console.log(err); return res.json({ result: "failed to create card" });}

      var createdLangs = [];
      var createdLangsId = [];
      for(var i=0;i<langs.length;i++){
        langs[i].card = createdCard._id;
        [err, createdLang] = await to(Lang.create(langs[i]));
        if(err || createdLang === null){ return res.json({ result: "failed to create lang" });}
        createdLangs.splice(0,0,createdLang);
        createdLangsId.splice(0,0,createdLang._id);
      }

      [err, createdCard] = await to(Card.findOneAndUpdate({_id: createdCard._id}, { $set: {
        langs: createdLangsId
      }}, {new: true}))
      if(err || createdCard === null){ return res.json({ result: "failed to update langs in card" });}

      if(data.isTeacher){
        [err, studentProject] = await to(StudentProject.findOneAndUpdate({student: card.author, project: data.project }, {$push: {
          cards: createdCard._id
        }}, {upsert: true, new: true}))
        if(err || studentProject === null){ return res.json({ result: "failed to create student project" });}

        [err, project] = await to(Project.findById(studentProject.project));
        if(err || project === null){ return res.json({ result: "failed to find project" });}

        if(!project.studentProjects.some(sp=>{return sp.equals(studentProject._id)}) ){
          [err, project] = await to(Project.findOneAndUpdate({_id: studentProject.project}, { $push:{
            studentProjects: studentProject._id
          }}, {new: true}));
          if(err || project === null){ return res.json({ result: "failed to update project" });}
        }
      }else{
        [err, studentProject] = await to(StudentProject.findOneAndUpdate({_id: card.studentProject._id}, { $push: {
          cards: createdCard._id
        }}, {new: true}))
        if((err || createdCard === null) && !data.isTeacher){ return res.json({ result: "failed to find student project" });}
      }

      [err, cardCount] = await to(Card.count({author: card.author}));
      if(!err && cardCount){
        [err, profile] = await to(Profile.findOneAndUpdate({belongTo: card.author}, { $set:{
          cardCount: cardCount
        }}, {new: true}))
      }

      let resubmitCard;
      if(data.resubmitCard){
        [err, resubmitCard] = await to(Card.findOneAndUpdate({_id: data.resubmitCard}, {$set:{resubmitted: true}}));
        if(err || !resubmitCard){ return res.json({ result: "failed to update resubmitCard!" });}
      }

      return res.json({
        result: 'success',
        card: createdCard,
        langs: createdLangs,
        updatedStudentProject: studentProject,
        updatedProject: project,
        updatedProfile: profile,
        updatedCard: resubmitCard,
      })

    })

  }

}

export default CardRouter;
