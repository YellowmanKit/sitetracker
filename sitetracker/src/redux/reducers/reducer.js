
var reducer = {
  updateElements: function (originals, newElements, idOnly, append){
    //console.log(originals);
    if(!newElements || newElements.length === 0){
      return originals;
    }
    var updatedArray = originals.slice(0);
    if(updatedArray.length === 0){
      updatedArray = [newElements[0]];
    }

    for(var i=0;i<newElements.length;i++){
      if(!newElements[i]){ continue; }
      for(var j=0;j<updatedArray.length;j++){
        if(!idOnly && (updatedArray[j]._id === newElements[i]._id)){
          updatedArray[j] = {...updatedArray[j], ...newElements[i]};
          break;
        }
        if(idOnly && (updatedArray[j] === newElements[i])){
          updatedArray[j] = newElements[i];
          break;
        }
        if(j === updatedArray.length - 1){
          if(append){
            updatedArray.splice(updatedArray.length,0,newElements[i]);
          }else{
            updatedArray.splice(0,0,newElements[i]);
          }
          break;
        }
      }
    }
    return updatedArray;
  },
  getElementIndex: function (data, element){
    for(var i=0;i<data.length;i++){
      if(data[i]._id === element._id){ return i; }
    }
  }








}

module.exports = reducer;
