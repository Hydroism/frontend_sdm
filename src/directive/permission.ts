import store from '@/store'
import {DirectiveBinding} from "vue/types/options";
import {VNode} from "vue/types/umd";
import vue from "@/main"
import {hasPermission} from "@/utils/permission";

export default (Vue: any) => {
  Vue.directive('permission', {
    inserted: function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      const {value} = binding;
      const menuId = vue.$route.meta.routeId;
      const permissionButtonObj = store.getters["permission/permissionButton"](menuId);

      //没有按钮权限码，正常显示
      if (!permissionButtonObj || !permissionButtonObj[value]) {
        return
      }

      //有按钮权限码，与用户权限码做校验
      const temp = {permissionCode: permissionButtonObj[value]};
      const rolePermission = store.getters['user/rolePermission'];
      const isShow = hasPermission(rolePermission, temp);

      if (!isShow) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
