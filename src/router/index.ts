import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";

Vue.use(VueRouter);

const router:VueRouter = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({x: 0, y: 0}),
  routes
});


export function resetRouter() {
  //@ts-ignore
  const {matcher} = new VueRouter({
    mode: "hash",
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,
  });
  //@ts-ignore
  router.matcher = matcher;
}

export default router
