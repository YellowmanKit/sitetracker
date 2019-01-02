const modalReducer = (
  state = {
    status: 'off',
    english: '',
    chinese: '',
    simplified_chinese: '',
    button: 'off',
    onConfirm: null,
    onCancel: null
  }, action)=>{
  switch (action.type) {
    case 'confirm':
      const payload = action.payload;
      return {...state, status: 'on', button: 'confirm', onConfirm: payload.onConfirm, onCancel: payload.onCancel, english: payload.message[0], chinese: payload.message[1], simplified_chinese: payload.message[2]};
    case 'message':
      return {...state, status: 'on', button: 'on', english: action.payload[0], chinese: action.payload[1], simplified_chinese: action.payload[2]};
    case 'loadingMessage':
      return {...state, status: 'on', button: 'off', english: action.payload[0], chinese: action.payload[1], simplified_chinese: action.payload[2]};
    case 'hideModal':
      return {...state, status: 'off', button: 'off'};
    default:
      return state;
  }
}

export default modalReducer;
