const uiReducer = (
  state = {
    minWidth: 360,
    maxWidth: 840,
    minHeight: 540,
    maxHeight: 1440,
    windowWidth: 0,
    windowHeight: 0,
    basicStyle: {
      width: 0,
      height: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    },
    styles: {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '100% 100%',
        flexShrink: 0
      },
      containerY: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
      },
      area: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row warp'
      },
      areaY: {
        width: '95%',
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flex-start',
        overflow: 'auto',
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
      },
      button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        backgroundSize: '100% 100%'
      },
      border: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'grey'
      },
      list: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
      },
      modal: {
        borderRadius: '20px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        color: 'black',
        fontSize: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '5%',
        writingMode: 'horizontal-lr'
      },
      cloud: {
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        color: 'grey',
        cursor: 'pointer'
      }
    },
    colors: {
      mlangGreen: '#91c33b',
      ultraLightGrey: '#f3f3f3',
      lightGrey: '#ededed',
      grey: '#9b9b9b',
      darkGrey: '#dbdbdb',
      deepDarkGrey: '#777777',
      selectedGrey: '#444444',
      gradientBasic: 'linear-gradient(to right, white 0%, #ededed 100%)',
      gradientReverse: 'linear-gradient(to left, white 0%, #ededed 100%)'
    }
  }, action)=>{
  switch (action.type) {
    case 'setDimension':
      const _windowWidth = action.payload.width;
      const _windowHeight = action.payload.height;
      const _basicStyle =
      {...state.basicStyle,
        width:
        _windowWidth < state.minWidth? state.minWidth:
        _windowWidth > state.maxWidth? state.maxWidth:
        _windowWidth * 0.9999,
        height:
        _windowHeight < state.minHeight? state.minHeight:
        _windowHeight > state.maxHeight? state.maxHeight:
        _windowHeight * 0.9999};
      return {...state,
              windowWidth: _windowWidth,
              windowHeight: _windowHeight,
              basicStyle: _basicStyle};
    default:
      return state;
  }
}

export default uiReducer;
