export const setGeoLocated = (state) =>{
  return {
    type: 'setGeoLocated',
    payload: state
  }
}

export const setPrefabPicker = (state) =>{
  return {
    type: 'setPrefabPicker',
    payload: state
  }
}


export const setDefaultImagePicker = (state) =>{
  return {
    type: 'setDefaultImagePicker',
    payload: state
  }
}

export const enlargeText = (text) =>{
  return {
    type: 'enlargeText',
    payload: text
  }
}

export const enlargeImage = (image) =>{
  return {
    type: 'enlargeImage',
    payload: image
  }
}

export const closeEnlarger = () =>{
  return {
    type: 'closeEnlarger'
  }
}

export const setAudioRecorder = (record) =>{
  return {
    type: 'setAudioRecorder',
    payload: record
  }
}


export const setPhoto = (photo) =>{
  return {
    type: 'setPhoto',
    payload: photo
  }
}

export const setStatus = (status) =>{
  return {
    type: 'setStatus',
    payload: status
  }
}

export const setLanguage = (lang) =>{
  return {
    type: 'setLanguage',
    payload: lang
  }
}

export const setModal = (modal) =>{
  return {
    type: 'setModal',
    payload: modal
  }
}
