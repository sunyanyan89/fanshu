import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import ArticleList from '@/pages/article/list'
import ArticleAdd from '@/pages/article/add'
import ArticleDetail from '@/pages/article/detail'
import ArticleEdit from '@/pages/article/edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/home', name: 'Home', component: Home },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/signin', name: 'Signin', component: Signin },
    { path: '/article', name: 'ArticleList', component: ArticleList },
    { path: '/article/add', name: 'ArticleAdd', component: ArticleAdd, meta: { needLogin: true } },
    { path: '/article/detail/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/article/edit/:id', name: 'ArticleEdit', component: ArticleEdit, meta: { needLogin: true } }
  ]
})
