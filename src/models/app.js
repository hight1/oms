import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { message } from 'antd'
import { updateCenter, query, logout } from '../services/app'
import { config, menu } from '../utils'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menu: menu,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    modalVisible: false,
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })
        if (data.isAdmin === false) {
          const permissionCodes = data.permissionCodes
          const newMenuList = menu.filter((m) => {
            if (m.permission) {
              if (permissionCodes.indexOf(m.permission) > -1) {
                return true
              } else {
                return false
              }
            } else {
              return true
            }
          })
          yield put({
            type: 'updateMenu',
            payload: newMenuList,
          })
        }
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/'))
        }
      } else {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          yield put(routerRedux.push(`/login?from=${from}`))
          // window.location = `${location.origin}/login?from=${from}`
        }
      }
    },
    *update ({ payload }, { call, put }) {
      const data = yield call(updateCenter, { ...payload })
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success('修改成功！')
      } else {
        throw data
      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    showModal (state) {
      return {
        ...state,
        modalVisible: true,
      }
    },
    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      }
    },
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

    updateMenu (state, { payload }) {
      return {
        ...state,
        menu: payload,
      }
    },
  },
}
