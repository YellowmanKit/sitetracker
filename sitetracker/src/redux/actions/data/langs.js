
export const setLangAudio = (audio) =>{
  return {
    type: 'setLangAudio',
    payload: audio
  }
}

export const setEditLang = (editLang) =>{
  return {
    type: 'setEditLang',
    payload: editLang
  }
}

export const setEditLangs = (editLangs) =>{
  return {
    type: 'setEditLangs',
    payload: editLangs
  }
}

export const killEditLangsItem = (index) =>{
  return {
    type: 'killEditLangsItem',
    payload: index
  }
}

export const removeEditLangsItem = (index) =>{
  return {
    type: 'removeEditLangsItem',
    payload: index
  }
}

export const pushEditLangs = (lang) =>{
  return {
    type: 'pushEditLangs',
    payload: lang
  }
}
