// 权限拦截器 导航守卫

import router from '@/router'
import store from '@/store' // 引入sotre实例 和组件中的this.$store是一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出 以为只需要代码执行即可
// 前置守卫
// next是前置守卫必须执行的钩子 next必须执行 如果不执行 页面就死了

// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的页面是登录页
      next('/') // 跳转到主页
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况下
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
