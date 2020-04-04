<template>
    <div class="header">
      <router-link :to="{ path: '/'}" class="logo">博 群</router-link>
      <div class="container">
        <ul class="ul-nav ks_clear">
          <li><router-link :to="{ path: '/home/index'}" :class="{'isActive':$route.path=='/home/index'}" class="tab"><i class="iconfont icon-faxian"></i>发现</router-link><span class="line"></span></li>
          <li><router-link :to="{ path: '/home'}" class="tab"><i class="iconfont icon-icon_A"></i>关注</router-link></li>
          <li><router-link :to="{ path: '/home'}" class="tab"><i class="iconfont icon-dkw_xiaoxi"></i>消息</router-link></li>
          <li class="li-search"><input class="input-search " type="text" placeholder="搜索"><i class="sousuo iconfont icon-soushuo"></i></li>
        </ul>
      </div>
      <div class="right-header">
        
         <Dropdown placement="top-start">
          <div class="head-img">
          <router-link :to="{ path: '/find'}" class="person-center">
            <img src="../../static/img/userName.png" class="img-head">
          </router-link>
        </div>
          <DropdownMenu slot="list">
              <DropdownItem><router-link :to="{ path: '/userHome'}">我的主页</router-link></DropdownItem>
              <DropdownItem divided><router-link :to="{ path: '/find'}">收藏的文章</router-link></DropdownItem>
              <DropdownItem divided><router-link :to="{ path: '/find'}">浏览历史</router-link></DropdownItem>
              <DropdownItem divided><router-link :to="{ path: '/find'}">设置</router-link></DropdownItem>
              <DropdownItem divided>退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="write-page">
          <button class="button-write" @click="show">写文章</button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'showheader',
    created() {
      console.log(this.$route)
    },
    data() {
      return {

      }
    },
    methods: {
      show() {
        this.$Message.info({
                    content: 'Tips for manual closing',
                    duration: 10,
                    closable: true
                });
      }
    }
  }
</script>
<style lang="less" scoped>

.header {
  box-sizing: border-box;
  padding: 0 230px;
  position:relative;
  display: flex;
  justify-content:space-between;
  height:60px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .isActive {
    border-bottom: 2px solid #2d8cf0;
  }
  .logo {
    width:168px;
    height: 56px;
    font-size: 25px;
    text-align: center;
    line-height: 56px;
  }
  .container {
    width:960px;
    .ul-nav {
      height: 58px;
      li {
        float: left;
        height: 100%;
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
          width: 240px;
          height: 36px;
          border: none;
          border-radius: 20px;
          background: #f0f0f0;
          padding-left: 20px;
          padding-right: 25px;
          position: relative;
        }
        .input-search:focus {
          outline:none;
        }
        .sousuo {
          position: absolute;
          right: 10px;
        }
      }
      
    }
  }
  .right-header {
    display: flex;
    align-items: center;
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
      background:#f0f0f0;
    }
    .write-page {
      display:inline-block;
      vertical-align: middle;
      .button-write {  
        width:100px;
        height: 40px;
        background-color: #2D8cF0;
        font-size: 15px;
        color: #fff;
        border: none;
        border-radius: 20px;
      }
      
    }
  }
}
</style>
