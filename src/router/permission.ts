import router from "./index";
import NProgress from "nprogress";
import store from "@/store";
import {getToken} from "@/utils/auth";
import "nprogress/nprogress.css"
import {RouterModel} from "@/model/router.model";

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

      if (hasRoles) {
        //获取该页面的功能权限码 && 如果store已经有了，则跳过请求进入页面
        if (to.meta.routeId && !store.getters['permission/permissionButton'](to.meta.routeId)) {
          await store.dispatch('permission/setPermissionButtons', to.meta.routeId);
        }
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const {roles} = await store.dispatch('user/getUserInfo');

          // generate accessible routes map based on roles
          let accessRoutes = await store.dispatch('permission/getRoleRouter', roles);
          accessRoutes.push({path: '*', redirect: '/404'});

          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          console.log('addRoutes');
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
