<template>
  <div class="nav-bar">
    <hamburger/>

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="!isMobile">
        <settings id="setting" class="right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <refresh id="refresh" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" alt="" />
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="personalCenter">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import Hamburger from "@/layout/components/Navbar/Hamburger.vue";
import Breadcrumb from "@/layout/components/Navbar/Breadcrumb.vue";
import Screenfull from "@/layout/components/Navbar/Screenfull.vue";
import Refresh from "@/layout/components/Navbar/Refresh.vue";
import {namespace} from "vuex-class";
import {DeviceEnum} from "@/store/modules/app";
import Settings from "@/layout/components/Navbar/Settings.vue";

const userModule = namespace('user');
const appModule = namespace('app');

@Component({
  components: {Hamburger, Breadcrumb, Screenfull, Refresh, Settings}
})

export default class Navbar extends Vue {
  @userModule.Getter('avatar') avatar!:string;
  @appModule.Getter('device') device!: DeviceEnum;

  async logout(){
    await this.$store.dispatch('user/logout');
    this.$router.push(`/login`)
  };

  get isMobile():boolean{
    return this.device === DeviceEnum.mobile
  }

  personalCenter(){
    console.log('前往个人中心');
  };
}
</script>

<style scoped lang='scss'>
.nav-bar{
  height: $base-nav-bar-height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .breadcrumb-container {
    float: left;
  }

  .right-menu{
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 20px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
