import axios from 'axios';
import { getRedirectPath } from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT'

const initState={
  redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
  type:'',
  pwd: '',
  // id: '',
}

// reducer
export function user(state=initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state
  }
}


// action
export function login({user, pwd}) {
  if (!user||!pwd) {
    return errorMsg('用户密码必填');
  } else {
    return dispatch => {
      axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status == 200 && res.data.code == 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
    }
  }
}

// 报错action
function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}
// 登录成功
function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data }
}
 

// 注册 action
export function register({ user, pwd, repeatpwd, type }) {
  if (!user||!pwd||!type) {
		return errorMsg('请输入完整');
  } else if (pwd != repeatpwd) {
    return errorMsg('密码和确认密码不同');
  } else {
    return dispatch => {
      axios.post('/user/register', { user, pwd, type })
        .then(res => {
          if (res.status == 200 && res.data.code ===0) {
            dispatch(registerSuccess({user, pwd, type}))
          } else {
            dispatch(errorMsg(res.data.msg))
          }
        })
    }
  }
}

function registerSuccess(data) {
  return { type: AUTH_SUCCESS, payload: data }
}

// 判断登录状态
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}

// boss信息完善
export function update(data) {
  return dispatch => {
    axios.post('/user/updata', data)
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 退出action
export function logoutSubmit() {
  return { type: LOGOUT }
}