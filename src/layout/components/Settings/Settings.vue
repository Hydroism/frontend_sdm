<template>
  <div>
    <div class="handle-button" :style="{'background-color':theme}" @click="drawerVisible=!drawerVisible">
      <i class="el-icon-setting"/>
    </div>

    <el-drawer title="主题配置" :visible.sync="drawerVisible" direction="rtl" append-to-body size="250px">

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange"/>
      </div>

      <div class="drawer-item">
        <span>标签页</span>
        <el-switch v-model="tagsBar" class="drawer-switch"/>
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch"/>
      </div>

      <div class="drawer-item">
        <span>Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch"/>
      </div>

    </el-drawer>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import {namespace} from "vuex-class";
import ThemePicker from "@/components/ThemePicker/ThemePicker.vue";

const settingModule = namespace('setting');

@Component({
  components:{ThemePicker}
})
export default class RightPanel extends Vue {
  @settingModule.Getter('theme') theme!: string;
  @settingModule.Getter('fixedHeader') fixedHeader!: boolean;
  @settingModule.Getter('tagsBar') tagsBar2!: boolean;

  drawerVisible: boolean = false;
  sidebarLogo:boolean = true;

  get tagsBar():boolean{
    return this.tagsBar2
  };

  set tagsBar(val:boolean){
    this.$store.dispatch('setting/changeSetting', {key:'tagsBar', value:val})
  }

  // todo 功能后面在做
  themeChange(){}
}
</script>

<style scoped lang='scss'>
  .handle-button {
    width: 48px;
    height: 48px;
    position: fixed;
    right: 0;
    top: 300px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;

    i {
      font-size: 24px;
      line-height: 48px;
    }
  }

  .el-drawer{
    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      padding: 20px;
      line-height: 20px;
    }

    .drawer-switch {
      float: right
    }
  }

</style>
