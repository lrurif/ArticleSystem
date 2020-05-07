import Vue from 'vue'
import Router from 'vue-router'
import { userInfo } from 'os';
const _import = require('./_import_development')

/* 按需加载 */
const Home = _import('home/home')
const login = _import('login')
const register = _import('register')
const index = _import('home/main/index')
const zhuanlan = _import('home/zhuanlan/index')
const follow = _import('home/follow/index')
const userHome = _import('userHome/index')
const setting = _import('setting/index')
const article = _import('article/index')

const admin = _import('admin/index')
const websiteUser = _import('admin/websiteUser/index')
const vacUser = _import('admin/vacUser/index')
/* 同步加载 */
// const Table = _import('Table@brain');
// const Index = _import('index@brainone');
const write = _import('write/index') //写文章页面

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    hidden: true
  },
  { 
    path: '/login',
    name: 'login',
    component: login, 
    hidden: true 
  },
  { 
    path: '/register',
    name:'register',
    component: register, 
    hidden: true 
  },
  { 
    path: '/write',
    name:'write',
    component: write, 
    hidden: true 
  },
  // 管理员路由
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/websiteUser',
    component: admin,
    children: [
      {
        path: '/admin/websiteUser',
        name: 'websiteUser',
        component: websiteUser
      },
      {
        path: '/admin/vacUser',
        name: 'vacUser',
        component: vacUser
      }
    ]
  },
  //主页路由
  {
    path: '/home',
    name:'home',
    component: Home, 
    hidden: true,
    children: [
      {
        path:'/home/',
        redirect: '/home/index'
      },
      {
        path: '/home/index',
        name: 'finding',
        meta: {
          title: '发现',
        },
        component: index
      },
      {
        path: '/home/zhuanlan',
        name: 'zhuanlan',
        meta: {
          title: '专栏',
        },
        component: zhuanlan
      },
      {
        path: '/home/follow',
        name: 'follow',
        meta: {
          title: '关注',
        },
        component: follow
      }
      
    ]
  },
  //普通用户路由
  {
    path: '/userHome',
    name: 'userHome',
    component: userHome
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  },
  {
    path: '/article/:id',
    name: 'article',
    component: article
  }
]
let router=new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router;