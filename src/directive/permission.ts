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


      if (!permissionButtonObj || !permissionButtonObj[value]) {
        console.log(value, "没有查到权限码,不受限制");
        return
      }

      const temp = {permissionCode: permissionButtonObj[value]};

      const isShow = hasPermission('123,123,,,,,,1', temp);

      console.log(value, "显示？", isShow);

      if (!isShow) {
        el.parentNode && el.parentNode.removeChild(el)
      }

    }
  })
}
