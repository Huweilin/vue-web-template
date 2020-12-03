// 需要根据权限加载的动态路由表
export function getAsyncRouterMap() {
  let asyncRouterMap = [{
    path: '/',
    name: '/',
    redirect: 'home',
    component: resolve => require(['../views/index.vue'], resolve),
    children: [
      {
        path: 'home',
        meta: {
          name: '路由A',
          iconClass: 'fa fa-cube'
        },
        component: resolve => require(['../views/home.vue'], resolve),
      },
      {
        path: 'home2',
        meta: {
          name: '路由B',
          iconClass: 'fa fa-cube'
        },
        component: resolve => require(['../views/home.vue'], resolve),
      },
    ]
  }, ];
  return asyncRouterMap;
}

// 获取当前传入的异步路由的path
export function getCurrentAsyncRouterPath(arr) {
  let result = [];
  for (let item of arr[0].children) {
    let prefix = '/' + item.path;
    if (item.children) {
      item.children.forEach(lv2 => {
        if (lv2.children) {
          lv2.children.forEach(lv3=>{
            if(lv3.path){
              result.push(prefix + '/' + lv2.path+'/' + lv3.path)
            }
          })
        }else{
          result.push(prefix + '/' + lv2.path)
        }
        
      })
    } else {
      result.push(prefix);
    }
  }
  return result;
}