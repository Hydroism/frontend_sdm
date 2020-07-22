import router from "./index";
import NProgress from "nprogress";
import store from "@/store";
import {getToken} from "@/utils/auth";
import "nprogress/nprogress.css"

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();

  console.log(hasToken, to);

  if (hasToken) {
    if (to.name === "login") {
      next({path: '/'});
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters['user/roles'] && store.getters['user/roles'].length > 0;

      console.log("这里获取权限可以吗", to);

      console.log(hasRoles);
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const {roles} = await store.dispatch('user/getUserInfo');

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/getRoleRouter', roles);

          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // @ts-ignore
          next({...to, replace: true})
        } catch (e) {
          // todo
          // await store.dispatch('user/resetToken');
          next();
        }
      }
    }

  } else {
    /* has no token*/
    next()

  }

});

router.afterEach((to, from) => {
  NProgress.done()
});
