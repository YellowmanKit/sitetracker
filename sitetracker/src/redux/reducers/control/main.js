const mainReducer = (
  state = {
    status: 'init',

    photoUrl: null,
    photoBlob: null,

    recording: false,
    recordingText: '',
    onRecordStop: null,

    enlarger: 'off',
    enlargeImage: null,
    enlargeText: '',

    defaultImagePicker: 'off',
    prefabPicker: 'off',

    geoLocated: null,

    language: 'simplified_chinese',
    version: 'v1.1.4'
  }, action)=>{
  switch (action.type) {
    case 'setGeoLocated':
      //console.log(action.payload);
      return {...state, geoLocated: action.payload};
    case 'setPrefabPicker':
      return {...state, prefabPicker: action.payload};
    case 'setDefaultImagePicker':
      return {...state, defaultImagePicker: action.payload};
    case 'enlargeText':
      return {...state, enlarger: 'text', enlargeText: action.payload };
    case 'enlargeImage':
      return {...state, enlarger: 'image', enlargeImage: action.payload };
    case 'closeEnlarger':
      return {...state, enlarger: 'off'};
    case 'setAudioRecorder':
      return {...state, recording: action.payload.recording, recordingText: action.payload.recordingText, onRecordStop: action.payload.onRecordStop};
    case 'setStatus':
      return {...state, status: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    case 'setPhoto':
      if(!action.payload){ return state; }
      return {...state, photoUrl: action.payload.url, photoBlob: action.payload.blob};
    default:
      return state;
  }
}

export default mainReducer;
