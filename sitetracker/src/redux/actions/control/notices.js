export const updateNotices = (notices) =>{
  return {
    type: 'updateNotices',
    payload: notices
  }
}

export const removeNotice = (index) =>{
  return {
    type: 'removeNotice',
    payload: index
  }
}

export const killNotice = (index) =>{
  return {
    type: 'killNotice',
    payload: index
  }
}

export const toggleNotice = () =>{
  return {
    type: 'toggleNotice'
  }
}

export const setNotice = (status) =>{
  return {
    type: 'setNotice',
    payload: status
  }
}

export function init(store, actions){
  return function (dispatch) {
    dispatch({type: 'updateNotices', payload: [welcome()] });
  }
}

export function welcome(){
  return {
    _id: 'welcome',
    message: ['Welcome back!', '歡迎回來!', '欢迎回来!']
  }
}

export function newProjectNeedAttention(project, app){
  return {
    type: 'updateNotices',
    payload: [{
      _id: project._id + ' - newProjectNeedAttention',
      message: ['Your teacher has created a new project!', '你的老師創建了新的專題研習!', '你的老师创建了新的专题研习!'],
      onClick: ()=>{
        app.actions.projects.viewProject(project);
        app.actions.content.pushView('project');
      }
    }]
  }
}

export function gradedCardNotReadInProject(project, app){
  console.log('gradedCardNotReadInProject');
  return {
    type: 'updateNotices',
    payload: [{
      _id: project._id + ' - gradedCardNotReadInProject',
      message: ['Your card has been grade by teacher!', '你的卡片已獲評價!', '你的卡片已获评价!'],
      onClick: ()=>{
        app.actions.projects.viewProject(project);
        app.actions.content.pushView('project');
      }
    }]
  }
}

export function failedCardInProject(project, app){
  return {
    type: 'updateNotices',
    payload: [{
      _id: project._id + ' - failedCardInProject',
      message: ['Your card need to be resubmit!', '你需要重新提交你的卡片!', '你需要重新提交你的卡片!'],
      onClick: ()=>{
        app.actions.projects.viewProject(project);
        app.actions.content.pushView('project');
       }
    }]
  }
}

export function newCardInProject(project, app){
  return {
    type: 'updateNotices',
    payload: [{
      _id: project._id,
      message: ['Your students had submitted new cards!', '你的學生提交了新的卡片!', '你的学生提交了新的卡片!'],
      onClick: ()=>{
        app.actions.projects.viewProject(project);
        app.actions.content.pushView('project');
      }
    }]
  }
}
