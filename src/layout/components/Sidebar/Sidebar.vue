<template>
  <div :class="{'has-logo':isShowLogo}">
    <logo v-if="isShowLogo" :isCollapse="collapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes" :key="route.path" :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
//@ts-ignore
import variables from "@/styles/variables.scss"
import {Component, Prop, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class";
import Logo from "@/layout/components/Sidebar/Logo.vue";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue";
import {RouteConfig} from "vue-router";

const settingModule = namespace('setting');
const permissionModule = namespace('permission');
const appModule = namespace('app');

@Component({
  components: {Logo, SidebarItem}
})
export default class Sidebar extends Vue {
  @appModule.Getter('isCollapse') isCollapse!: boolean;
  @settingModule.Getter('sidebarLogo') sidebarLogo!: boolean;
  @permissionModule.Getter('routes') permissionRoutes!: RouteConfig[];

  get isShowLogo() {
    return this.sidebarLogo
  };

  get activeMenu() {
    const route = this.$route;
    const {meta, path} = route;
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  };

  get collapse() {
    return this.isCollapse
  };

  get variables() {
    return variables
  };
}
</script>

<style scoped lang='scss'>

</style>
