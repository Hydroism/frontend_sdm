import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
import NProgress from 'nprogress';
import "nprogress/nprogress.css"
import store from "@/store"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({x: 0, y: 0}),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = store.getters["user/token"];

  console.log(hasToken, to);

  if (hasToken) {
    if (to.name === "login") {
      next({path: '/'});
      NProgress.done();
    } else {
      next()
    }
  } else {
    next()
  }

});

router.afterEach((to, from) => {
  NProgress.done()
});


export default router
