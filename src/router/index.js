import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Signup from '@/pages/signup'
import Signin from '@/pages/signin'
import ArticleList from '@/pages/article/list'
import ArticleAdd from '@/pages/article/add'
import ArticleDetail from '@/pages/article/detail'
import ArticleEdit from '@/pages/article/edit'
import User from '@/pages/user/index'
import Followee from '@/pages/user/followee'
import Follower from '@/pages/user/follower'
import Friend from '@/pages/user/friend'
import Message from '@/pages/user/message'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/signin', name: 'Signin', component: Signin },
    { path: '/article', name: 'ArticleList', component: ArticleList },
    { path: '/article/add', name: 'ArticleAdd', component: ArticleAdd, meta: { needLogin: true } },
    { path: '/article/detail/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/article/edit/:id', name: 'ArticleEdit', component: ArticleEdit, meta: { needLogin: true } },
    { path: '/user/:id', name: 'User', component: User },
    { path: '/followee', name: 'Followee', component: Followee },
    { path: '/follower', name: 'Follower', component: Follower },
    { path: '/friend', name: 'Friend', component: Friend },
    { path: '/message', name: 'Message', component: Message },
  ]
})
