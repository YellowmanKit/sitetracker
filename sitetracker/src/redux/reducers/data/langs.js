import * as reducer from '../reducer';

const langsReducer = (
  state = {
    editLangs:[],
    langs: [],
    langKeys: [
      {
        key: 'chinese_written',
        name: ['Chinese(Written)','中文(書面語)','中文(书面语)'],
        use: true
      },
      {
        key: 'english',
        name: ['English','英文','英文'],
        use: true
      },
      {
        key: 'chinese_spoken',
        name: ['Chinese(Spoken)','中文(口語)','中文(口语)'],
        use: true
      },
      {
        key: 'pth_written',
        name: ['PTH(Written)','普通話(書面語)','普通话(书面语)'],
        use: true
      },
      {
        key: 'pth_spoken',
        name: ['PTH(Spoken)','普通話(口語)','普通话(口语)'],
        use: true
      },
      {
        key: 'hindi',
        name: ['Hindi','印度語','印度语'],
        use: true
      },
      {
        key: 'urdu',
        name: ['Urdu','烏爾都語','乌尔都语'],
        use: true
      },
      {
        key: 'nepalese',
        name: ['Nepalese','尼泊爾語','尼泊尔语'],
        use: true
      },
      {
        key: 'tagalog',
        name: ['Tagalog','他加祿語','他加禄语'],
        use: true
      },
      {
        key: 'japanese',
        name: ['Japanese','日語','日语'],
        use: true
      },
      {
        key: 'spanish',
        name: ['Spanish','西班牙語','西班牙语'],
        use: true
      },
      {
        key: 'german',
        name: ['German','德語','德语'],
        use: true
      },
      {
        key: 'french',
        name: ['French','法語','法语'],
        use: true
      },
      {
        key: 'korean',
        name: ['Korean','韓語','韩语'],
        use: true
      },
      {
        key: 'vietnamese',
        name: ['Vietnamese','越南語','越南语'],
        use: true
      }
    ]
  }, action)=>{
  const newEditLangs = state.editLangs.slice(0);
  switch (action.type) {
    case 'updateLangs':
      return {...state, langs: reducer.updateElements(state.langs, action.payload)};
    case 'setLangAudio':
      const index = action.payload.index;
      newEditLangs[index] = {...newEditLangs[index], audioBlob: action.payload.blob}
      newEditLangs[action.payload.index]['edited'] = true;
      return {...state, editLangs: newEditLangs}
    case 'setEditLang':
      newEditLangs[action.payload.index] = action.payload.editLang;
      newEditLangs[action.payload.index]['edited'] = true;
      return {...state, editLangs: newEditLangs};
    case 'setEditLangs':
      return {...state, editLangs: action.payload};
    case 'killEditLangsItem':
      newEditLangs[action.payload].killed = true;
      return {...state, editLangs: newEditLangs};
    case 'removeEditLangsItem':
      newEditLangs.splice(action.payload,1);
      return {...state, editLangs: newEditLangs};
    case 'pushEditLangs':
      return {...state, editLangs: [...state.editLangs, action.payload]};
    default:
      return state;
  }
}

export default langsReducer;
