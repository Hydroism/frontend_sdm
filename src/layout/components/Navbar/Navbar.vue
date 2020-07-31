<template>
  <div class="nav-bar">
    <hamburger/>

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
<!--      <template v-if="device !== 'mobile'">-->
<!---->
<!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->
<!--      </template>-->

      <el-dropdown class="avatar-container">
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
import {namespace} from "vuex-class";

const userModule = namespace('user');

@Component({
  components: {Hamburger, Breadcrumb}
})

export default class Navbar extends Vue {
  @userModule.Getter('avatar') avatar!:string;

  async logout(){
    await this.$store.dispatch('user/logout');
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  };

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
