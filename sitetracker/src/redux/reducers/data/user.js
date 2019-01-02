const userReducer = (
  state = {
    _id : "5b44750c80463c4de838bef9",
    type : "teacher",
    createdAt : new Date("2018-07-10 08:57:27.687Z"),
    id : "ykwong",
    pw : "abc123",
    email : "wk.93128@gmail.com",
    __v : 0
  }, action)=>{
  switch (action.type) {
    case 'setUser':
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;
