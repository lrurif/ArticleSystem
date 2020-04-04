import Vue from 'vue'
import Router from 'vue-router'
import { userInfo } from 'os';
const _import = require('./_import_development')

/* 按需加载 */
const Home = _import('home/home')
const login = _import('login')
const register = _import('register')
const index = _import('home/main/index')
const userHome = _import('userHome/index')

const admin = _import('admin/index')
/* 同步加载 */
// const Table = _import('Table@brain');
// const Index = _import('index@brainone');

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
    path: '/admin',
    name: 'admin',
    component: admin
  },
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
      
    ]
  },
  {
    path: '/userHome',
    name: 'userHome',
    component: userHome
  }
]
let router=new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router;