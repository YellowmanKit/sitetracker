const contentReducer = (
  state = {
    menu: 'init',
    view: '',
    traces: [],
    previousViews: [],
    subView: '',

    cardBar: false,
    filterOption: 'All',

    cachedUrl: {},

    hints: [],
    closedHints: [],

    rankings:{},
    statistics: {}
  }, action)=>{
  var hints = state.hints;
  var closedHints = state.closedHints;
  var rankings = state.rankings;
  var statistics = state.statistics;
  switch (action.type) {
    case 'setStatistics':
      statistics[action.payload.schoolId] = action.payload.statistics;
      return {...state, statistics: statistics}
    case 'setRanking':
      rankings[action.payload.projectId] = action.payload.ranking;
      return {...state, rankings: rankings}
    case 'pullHint':
      closedHints.push(hints[hints.length - 1].type);
      return {...state, hints: hints.slice(0, state.hints.length - 1), closedHints: closedHints};
    case 'killHint':
      var hint = hints[hints.length - 1];
      hint.dead = true;
      hints[hints.length - 1] = hint;
      return {...state, hints: hints};
    case 'pushHint':
      if(closedHints.includes(action.payload.type)){ return state; }
      return {...state, hints: [...hints, action.payload]};
    case 'setFilter':
      return {...state, filterOption: action.payload}
    case 'cacheUrl':
      var newCachedUrl = state.cachedUrl;
      newCachedUrl[action.payload.filename] = action.payload.url;
     return {...state, cachedUrl: newCachedUrl}
    case 'setSubView':
      return {...state, subView: action.payload}
    case 'backToHome':
      return {...state, traces: state.traces.slice(0, 1), view: state.traces[0]};
    case 'clearView':
      return {...state, traces: [], view: ''};
    case 'pullPreviewsView':
      return {...state, previousViews: state.previousViews.slice(0, state.traces.length - 1)}
    case 'pullView':
      if(state.traces.length === 0){ return state; }
      return {...state, traces: state.traces.slice(0, state.traces.length - 1), previousViews: [...state.previousViews, state.view], view: state.traces[state.traces.length - 2]};
    case 'pushView':
      return {...state, traces: [...state.traces, action.payload], previousViews: [], view: action.payload};
    case 'toggleMenu':
      return {...state, menu: state.menu === 'init'?'on':state.menu === 'off'? 'on': 'off'};
    default:
      return state;
  }
}

export default contentReducer;
