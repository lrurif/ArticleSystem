<template>
  <div class="header">
    <router-link :to="{ path: '/'}" class="logo">博 群</router-link>
    <div class="container">
      <ul class="ul-nav ks_clear">
        <li>
          <router-link
            :to="{ path: '/home/index'}"
            :class="{'isActive':$route.path=='/home/index'}"
            class="tab"
          >
            <i class="iconfont icon-faxian"></i>发现
          </router-link>
          <span class="line"></span>
        </li>
        <li>
          <router-link
            :to="{ path: '/home/follow'}"
            :class="{'isActive':$route.path=='/home/follow'}"
            class="tab"
          >
            <i class="iconfont icon-icon_A"></i>关注
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/home/zhuanlan'}"
            :class="{'isActive':$route.path=='/home/zhuanlan'}"
            class="tab"
          >
            <i class="iconfont icon-dkw_xiaoxi"></i>专栏
          </router-link>
        </li>
        <li class="li-search">
          <input class="input-search" type="text" placeholder="搜索" />
          <i class="sousuo iconfont icon-soushuo"></i>
        </li>
      </ul>
    </div>
    <div class="right-header" v-if="userId">
      <Dropdown placement="top-start" @on-click="loginOut">
        <div class="head-img">
          <router-link :to="{ path: `/userHome/${userId}`}" class="person-center">
            <img src="../../static/img/userName.png" class="img-head" />
          </router-link>
        </div>
        <DropdownMenu slot="list">
          <router-link :to="{ path: `/userHome/${userId}`}">
            <DropdownItem>我的主页</DropdownItem>
          </router-link>
          <router-link :to="{ path: '/setting'}">
            <DropdownItem divided>设置</DropdownItem>
          </router-link>
          <DropdownItem divided name="out">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div class="write-page">
        <button class="button-write" @click="go_write()">写文章</button>
      </div>
    </div>
    <div v-else class="right-header">
      <!-- <button class="login-in" @click="">登录</button> -->
      <router-link :to="{ path: '/login'}" class="login-in">登录</router-link>
      <router-link :to="{ path: '/register'}" class="register">免费注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "showheader",
  created() {},
  computed: {
    userId() {
      return this.$store.state.user.userId;
    }
  },
  data() {
    return {};
  },
  methods: {
    go_write() {
      this.$router.push("/write");
    },
    loginOut(name) {
      if (name == "out") {
        this.$store.commit("setUserId", "");
        this.$store.commit("setRealName", "");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 30px;
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  .isActive {
    border-bottom: 2px solid #2d8cf0;
  }
  .logo {
    width: 168px;
    height: 56px;
    font-size: 25px;
    text-align: center;
    line-height: 56px;
    min-width: 80px;
  }
  .container {
    width: 1160px;
    overflow: hidden;
    min-width: 300px;
    .ul-nav {
      height: 58px;
      li {
        float: left;
        height: 100%;
        // box-sizing: border-box;
      }
      .tab {
        font-size: 17px;
        height: 58px;
        display: inline-block;
        padding: 19px;
        box-sizing: border-box;
        margin-right: 10px;
        i {
          margin-right: 10px;
        }
      }
      .tab:hover {
        background: #f0f0f0;
      }
      .li-search {
        line-height: 58px;
        position: relative;
        .input-search {
          width: 150px;
          height: 36px;
          border: none;
          border-radius: 5px;
          background: #f0f0f0;
          padding-left: 20px;
          padding-right: 25px;
          position: relative;
          transition: width 1s ease;
        }
        .input-search:focus {
          outline: none;
          width: 240px;
        }
        .sousuo {
          position: absolute;
          right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .right-header {
    display: flex;
    align-items: center;
    .login-in {
      border: none;
      background: #fff;
      color: #2d8cf0;
      font-size: 16px;
      padding: 5px 10px;
      border-radius: 5px;
      margin-right: 10px;
      outline: none;
    }
    .login-in:hover {
      background: #f7f2f2;
    }
    .register {
      border: none;
      background: #2d8cf0;
      color: #fff;
      font-size: 16px;
      padding: 5px 10px;
      border-radius: 5px;
      outline: none;
    }
    .register:hover {
      background: #0c77e7;
    }
    .head-img {
      display: inline-block;
      height: 58px;
      margin-right: 10px;
      .person-center {
        display: inline-block;
        height: 100%;
        padding: 9px;
        .img-head {
          width: 40px;
          border-radius: 50%;
          border: 1px solid #f0f0f0;
          box-sizing: border-box;
        }
      }
    }
    .head-img:hover {
      background: #f0f0f0;
    }
    .write-page {
      display: inline-block;
      vertical-align: middle;
      .button-write {
        width: 100px;
        height: 40px;
        background-color: #2d8cf0;
        font-size: 15px;
        color: #fff;
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
