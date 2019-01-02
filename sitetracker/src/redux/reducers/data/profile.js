const profileReducer = (
  state = {
    _id : "5b44750c80463c4de838befa",
    name: 'Wong Yan Kit',
    joinedCourses : [],
    cardCount : 0,
    featuredCount : 0,
    belongTo : "5b44750c80463c4de838bef9",
    __v : 0
  }, action)=>{
  switch (action.type) {
    case 'setProfile':
      return action.payload;
    default:
      return state;
  }
}

export default profileReducer;
