<template>
  <div class="login-container">
    <div class="login-logo"></div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-form ref="loginForm" class="login-form" :model="loginFormData" :rules="loginRules" auto-complete="off" label-position="left">
          <div class="title">Hello !</div>
          <div class="title-tips">欢迎来到 vue-element-admin !</div>

          <el-form-item prop="username">
            <span class="svg-container svg-container-admin">
              <svg-icon icon-class="user"/>
            </span>
            <el-input v-model.trim="loginFormData.username" placeholder="请输入用户名" type="text"/>
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container svg-container-pass">
              <svg-icon icon-class="password"/>
            </span>
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="请输入密码"
              ref="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"/>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
            </span>
          </el-form-item>

          <el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin">登陆</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator"
import {loginFormDataModel} from "@/model/user.model";
import {elValidateUsername, elValidatePassword} from "@/utils/validateEl"
import userService from "@/api/userService";
import routerService from "@/api/routerService";
import {Route} from "vue-router";

@Component
export default class login extends Vue {
  loginFormData: loginFormDataModel = {
    username: '',
    password: ''
  };
  loginRules: object = {
    username: [
      {validator: elValidateUsername, trigger: 'blur'}
    ],
    password: [
      {validator: elValidatePassword, trigger: 'blur'}
    ]
  };

  passwordType: string = 'password';
  loading: boolean = false;
  redirect: any = undefined;
  otherQuery: any = {};

  @Watch('$route')
  changeRoute(route: Route): void {
    const query = route.query;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  handleLogin(): void {
    const loginFormRef: any = this.$refs.loginForm;
    loginFormRef.validate((valid: boolean) => {
      if (valid) {
        this.submitForm();
      }
    })
  };

  async submitForm() {
    this.loading = true;

    try {
      await userService.postLogin(this.loginFormData);
      await routerService.getRoleRouter();

      await this.$router.push({path: this.redirect || '/', query: this.otherQuery});
      this.loading = false
    }catch (e) {
      this.loading = false
    }
  };

  showPwd(): void {
    const pswRef: any = this.$refs.password;
    this.passwordType = this.passwordType === 'password' ? '' : 'password';
    this.$nextTick(() => {
      pswRef.focus();
    })
  };

  getOtherQuery(query: any) {
    return Object.keys(query).reduce((acc: any, cur: string) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {})
  }
}
</script>

<style scoped lang='scss'>
  .login-container {
    height: 100vh;
    min-height: 600px;
    background: url("/static/login_images/background.jpg") center center fixed no-repeat;
    background-size: cover;

    .title {
      height: 50px;
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      height: 24px;
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-logo {
      position: absolute;
      top: 45px;
      left: 45px;

      img {
        width: 180px;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: 22vh 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-pwd {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
