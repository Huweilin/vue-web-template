import Vue from 'vue'
import VueRouter from 'vue-router'
import Cache from '@/utils/serve/cache'
import { getAsyncRouterMap, getCurrentAsyncRouterPath } from './asyncRouterMap'
let customAsyncRouterMap = getAsyncRouterMap()
const allAsyncRouterPath = getCurrentAsyncRouterPath(customAsyncRouterMap)

Vue.use(VueRouter);

const routes = [
  {
    path: '/404',
    name: '未找到页面',
    component: resolve => require(['../views/404.vue'], resolve)
  },
  {
    path: '/401',
    name: '权限页面',
    component: resolve => require(['../views/401.vue'], resolve)
  },
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['../views/login.vue'], resolve)
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

import store from '../store/index.js'

// 动态路由
let routersArr = []
let customPathArr = [] // 可访问的path值
router.beforeEach((to, from, next) => {
  if (['/login', '/401', '/404'].includes(to.path)) {
    next()
  } else {
    if (!store.state.isLogin) {
      Cache.clear()
      next('/login')
    } else { // 权限验证
      if (routersArr.length === 0) {
        try {
          routersArr = [routerMatch(customAsyncRouterMap, store.state.menus)] // views为后端返回的访问权限
          store.commit('setRouterMap', routersArr)
          customPathArr = getCurrentAsyncRouterPath(routersArr) // 更新path值
          router.addRoutes(routersArr)
          router.options.routes.unshift(routersArr[0]) // addRoutes后这里不会改变，手动添加(侧边和顶部展示使用)
          next({
            path: to.path,
            query: to.query
          })
        } catch (err) {
          customAsyncRouterMap = getAsyncRouterMap()
          customPathArr = []
          routersArr = []
          next('/login')
        }
      } else if (customPathArr.includes(to.path)) {
        next()
      } else {
        // 判断404还是401页面
        if (allAsyncRouterPath.includes(to.path)) {
          next('401')
        } else {
          next('404')
        }
      }
    }
  }
});
// 根据页面标识删减路由
function routerMatch (asyncRouterMap_ = [], menus_ = []) {
  let newRouter = Object.assign({}, asyncRouterMap_[0])
  function createRouter (Router) {
    // let i = 0
    // while (i < Router.children.length) {
    //   let router = Router.children[i]
    //   if (router.meta && router.meta.name) {
    //     let has = false
    //     if (hasRole(menus_, router.meta.name)) { // 页面访问判断
    //       has = true
    //     }
    //     if (has) {
    //       i++
    //     } else {
    //       Router.children.splice(i, 1)
    //     }
    //   } else {
    //     i++
    //   }
    //   if (router.children && (!router.meta || !router.meta.isLastJurisdiction)) { // 叶子菜单或isLastJurisdiction为true则不需要往下判断
    //     createRouter(router)
    //   }
    // }
  }
  createRouter(newRouter)
  // 重定向
  let i = newRouter.children.length
  let newMap = newRouter.children
  while (i--) {
    if (newMap[i].children && newMap[i].children.length > 1) {
      if (newMap[i].children[0].redirect !== newMap[i].children[1].path) {
        newMap[i].children[0].redirect = newMap[i].children[1].path
      }
    } else if (newMap[i].children && newMap[i].children.length <= 1) {
      newMap.splice(i, 1)
    }
  }
  if (newRouter.redirect !== newRouter.children[0].path) {
    newRouter.redirect = newRouter.children[0].path
  }
  return newRouter
}
// 是否存在页面唯一标识
function hasRole (menus_, key) {
  return menus_.includes(key)
}

//  以下为了修复重复点击同一个路由地址出现报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router