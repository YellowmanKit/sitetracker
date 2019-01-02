export const killHint = () =>{
  return {
    type: 'killHint'
  }
}

export const pullHint = () =>{
  return {
    type: 'pullHint'
  }
}

export const pushHint = (hint) =>{
  return {
    type: 'pushHint',
    payload: hint
  }
}

export const toggleCardBar = () =>{
  return {
    type: 'toggleCardBar'
  }
}

export const setFilter = (filterOption) =>{
  return {
    type: 'setFilter',
    payload: filterOption
  }
}

export const cacheUrl = (filename, url) =>{
  return {
    type: 'cacheUrl',
    payload: { filename: filename, url: url }
  }
}

export const setSubView = (subView) =>{
  return {
    type: 'setSubView',
    payload: subView
  }
}

export const backToHome = () =>{
  return {
    type: 'backToHome'
  }
}

export const clearView = () =>{
  return {
    type: 'clearView'
  }
}

export function pushView(view){
  //console.log(newUser)
  return async function (dispatch) {
    dispatch({type: 'setAnimation', payload: {type: 'row', state: true}});
    dispatch({type: 'pushView', payload: view});
  }
}

export const pullView = () =>{
  return {
    type: 'pullView'
  }
}

export const toggleMenu = () =>{
  return {
    type: 'toggleMenu'
  }
}
