import {RouteConfig} from "vue-router";
import Layout from "@/layout/Layout.vue";

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue')
      }
    ]
  }
];

export default routes
