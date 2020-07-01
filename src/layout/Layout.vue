<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="isMobile&&!isCollapse" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>

    <div :class="{hasTagsView:needTagsBar}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar/>
        <tags-bar v-if="needTagsBar" />
      </div>

      <app-main/>

      <settings v-if="showSettings" />
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Sidebar from "@/layout/components/Sidebar/Sidebar.vue";
  import AppMain from "@/layout/components/AppMain.vue";
  import ResizeHandler from "@/layout/mixin/ResizeHandler";
  import Navbar from "@/layout/components/Navbar/Navbar.vue";
  import {namespace} from "vuex-class";
  import {DeviceEnum} from "@/store/modules/app";
  import TagsBar from "@/layout/components/TagsBar/TagsBar.vue";
  import Settings from "@/layout/components/Settings/Settings.vue";

  const settingModule = namespace('setting');
  const appModule = namespace('app');

  @Component({
    components: {Navbar, Sidebar, AppMain, TagsBar, Settings},
    mixins: [ResizeHandler]
  })
  export default class layout extends Vue {
    @settingModule.Getter('fixedHeader') fixedHeader!: boolean;
    @settingModule.Getter('tagsBar') needTagsBar!: boolean;
    @settingModule.Getter('showSettings') showSettings!: boolean;
    @appModule.Getter('isCollapse') isCollapse!: boolean;
    @appModule.Getter('device') device!: DeviceEnum;

    handleClickOutside() {
      this.$store.dispatch('app/closeSidebar')
    };

    get classObj() {
      return {
        hideSidebar: this.isCollapse,
        openSidebar: !this.isCollapse,
        mobile: this.device === DeviceEnum.mobile
      }
    };

    get isMobile(): boolean {
      return this.device === DeviceEnum.mobile
    };
  }
</script>

<style scoped lang='scss'>
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$base-left-menu-width});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: fixed;
    z-index: 999;
  }
</style>
