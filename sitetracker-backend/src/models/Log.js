import mongoose from 'mongoose';
import to from'../to';
import Model from './Model';

var ObjectId = mongoose.Schema.Types.ObjectId;
var logSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  }
})

var Log = module.exports = mongoose.model('log', logSchema);

module.exports.createLoginLog = async (userId)=>{
  let err, log;
  [err, log] = await to(Log.findOne({ user: userId , type: 'login' }, null, {sort: {createdAt: -1 }}));
  if(err){ return; }
  if(log){
    if(Model.deltaMinute(new Date(), log.createdAt) < 60){ return; }
  }
  Log.create({type: 'login', user: userId, createdAt: new Date()});
}
