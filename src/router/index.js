import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard'
    }
  }]
},

{
  path: '/userManage',
  component: Layout,
  redirect: '/userManage/index',
  children: [
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'el-icon-user-solid' }
    }
  ]
},
{
  path: '/equipInfomation',
  component: Layout,
  redirect: '/equipInfomation/index',
  children: [
    {
      path: 'equipInfomation',
      name: 'equipInfomation',
      component: () => import('@/views/equipInfomation/index'),
      meta: { title: '器材信息管理', icon: 'el-icon-video-camera-solid' }
    }
  ]
},
{
  path: '/deviceFirmware',
  component: Layout,
  redirect: '/deviceFirmware/index',
  children: [{
    path: 'index',
    name: 'DeviceFirmware',
    component: () => import('@/views/deviceFirmware'),
    meta: { title: '器材固件信息管理', icon: 'el-icon-printer' }
  }]
},
{
  path: '/deviceNews',
  component: Layout,
  redirect: '/deviceNews/index',
  children: [{
    path: 'index',
    name: 'DeviceFirmware',
    component: () => import('@/views/deviceNews'),
    meta: { title: '器材新闻管理', icon: 'el-icon-orange' }
  }]
},
{
  path: '/tutorial-video',
  component: Layout,
  redirect: '/tutorial-video',
  children: [{
    path: '/tutorial-video',
    name: 'tutorial-video',
    component: () => import('@/views/tutorialVideo/index.vue'),
    meta: {
      title: '器材视频教程',
      icon: 'el-icon-film'
    }
  }]
},

{
  path: '/comment',
  component: Layout,
  redirect: '/comment',
  children: [{
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/comment/index.vue'),
    meta: {
      title: '论坛',
      icon: 'el-icon-chat-line-square'
    }
  }, {
    path: '/comment-detail',
    name: 'comment-detail',
    component: () => import('@/views/comment/detail.vue'),
    meta: {
      title: '帖子',
      icon: 'el-icon-chat-line-square'
    },
    hidden: true
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'Nested',
    icon: 'nested'
  }
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
