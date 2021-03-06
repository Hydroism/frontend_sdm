import {RouteConfig} from "vue-router";
import Layout from "@/layout/Layout.vue";

export const constantRoutes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'redirect/:path(.*)',
        component: () => import('@/views/redirect/redirect.vue')
      }
    ]
  },
];


export const asyncRoutes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue')
      }
    ]
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'about2',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue')
      },
      {
        path: '401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    children: [
      {
        path: '401',
        name: '401',
        component: () => import('@/views/nested/index.vue'),
        children: [
          {
            path: 'asdf',
            name: '401',
            component: () => import('@/views/About.vue')
          }
        ]
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue')
      },
      {
        path: '401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
];

export default [...constantRoutes]
