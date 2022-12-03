import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async function(to, from, next) {
  // 进度条开启
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // 如果没有id, 表示当前用户资料没有获取过
        await store.dispatch('user/getUserInfo')
        // 如果说后续,需要根据用户获取数据的化,这里必须改成同步
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 解决手动更换地址
  NProgress.done()
})
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
