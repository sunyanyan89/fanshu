// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueProgressBar from 'vue-progressbar'
import 'element-ui/lib/theme-chalk/index.css' // 样式文件需单独引入
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)

import App from './App'
import router from './router'
import store from './store'
import api from './api'
import '@/assets/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 通过 Vue.mixin 注册一个全局的生命周期，会为每个组件实例都注入 api 对象
localStorage.setItem('debug', 'leancloud*') // 开启调试模式

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needLogin)) {
    if (!store.state.user) {
      Vue.prototype.$message.error('请先登录')
      next({ path: '/signin' })
    } else {
      next()
    }
  } else {
    next() // 确保一定调用 next()
  }
})

Vue.mixin({
  beforeCreate() {
    if (!this.$api) {
      this.$api = api
    }
  }
})

const options = {
  color: '#20a0ff',
  failedColor: '#874b4b',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

// 只要是调用了注册登录相关的接口，LeanCloud SDK 都会自动缓存登录用户的数据
// 如果不调用 登出 方法，当前用户的缓存将永久保存在客户端。
const user = api.SDK.User.current();
if (user) {
  store.commit('setUser', user)
}

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
