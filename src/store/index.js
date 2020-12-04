import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cache from '@/utils/serve/cache'

Vue.use(Vuex);

function initState () {
  return {
    isLogin: true,
    user: {
      username: 'test',
      id: '',
    },
    token: '',
    routerMap: [], // 路由
    menus: [], // 可访问菜单
    operations: [], // 操作权限
  }
}

export default new Vuex.Store({
  state: () => {
    const oldState = Cache.get('state');
    if (oldState) {
      axios.defaults.headers.common['Authorization'] = oldState.token;
    }
    return oldState || initState()
  },
  getters: {
    routerMap: state => state.routerMap,
    username: state => (state.user && state.user.username) || '',
    userId: state => (state.user && state.user.userId) || '',
    currentMenus: state => state.menus,
    operations: state => state.operations,
    token: state => state.token,
  },
  mutations: {
    setToken:(state,data)=>{
      state.token = data;
      axios.defaults.headers.common['Authorization'] = data;
    },
    setUser:(state, user) => {
      state.user = user;
    },
    setLoginStatus: (state, bool) => {
      state.isLogin = bool;
    },
    logout (state) {
      const oldState = initState()
      for (const key in oldState) {
        state[key] = oldState[key]
      }
      location.reload()
    },
    /** 权限相关 */
    // 设置路由缓存
    setRouterMap (state, routerMap) {
      state.routerMap = routerMap
    },
    // 侧边栏菜单
    setMenus (state, menus) {
      state.menus = menus;
    },
    // 页面权限
    setOperations (state, operations) {
      state.operations = operations
    },
  },
  actions: {
  },
  modules: {
  }
})
