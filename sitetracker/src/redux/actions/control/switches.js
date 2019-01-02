
export const setAnimation = (type, state) =>{
  return {
    type: 'setAnimation',
    payload: {type: type, state: state}
  }
}

export const setHide = (type, state) =>{
  return {
    type: 'setHide',
    payload: { type: type, state: state}
  }
}

export const toggleHide = (type) =>{
  return {
    type: 'toggleHide',
    payload: type
  }
}
