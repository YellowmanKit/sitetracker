import mongoose from 'mongoose';
import to from'../to';

var ObjectId = mongoose.Schema.Types.ObjectId;
var langSchema = mongoose.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  audio: {
    type: String
  }
})

var Lang = module.exports = mongoose.model('lang', langSchema);

module.exports.getByCards = async (cards)=>{
  let err, lang;
  let langsId = [];
  let langs = [];

  for(var i=0;i<cards.length;i++){
    langsId = [...langsId, ...cards[i].langs];
  }

  for(var i=0;i<langsId.length;i++){
    [err, lang] = await to(Lang.findById(langsId[i]));
    langs = [...langs, lang];
  }

  return [err, langs, langsId];
}
