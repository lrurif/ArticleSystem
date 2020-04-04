<template>
  <div class="div-admin-wrapper">
      <div class="admin-header">
          <p class="boqun-system">博群后台管理系统</p>
          <p class="welcome-sentence">欢迎您！超级管理员</p>
          <ul class="ul-operation">
              <li><i class="iconfont">&#xe63d;</i> 修改密码</li>
              <li><i class="iconfont">&#xe668;</i> 退出系统</li>
          </ul>
      </div>
      <div>
          <div class="link-menu">
               <Menu active-name="1-1" :open-names="['1','2']">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            用户管理
                        </template>
                            <MenuItem name="1-1">网站用户</MenuItem>
                            <MenuItem name="1-4">用户封禁</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-filing" />
                            文章管理
                        </template>
                        <MenuItem name="2-1">所有文章</MenuItem>
                        <MenuItem name="2-2">文章发布</MenuItem>
                    </Submenu>
                </Menu>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .div-admin-wrapper {
        .admin-header {
            height: 60px;
        // background:linear-gradient(to right, #2d8cf0, #fff);
        background: #2d8cf0;
        padding: 0 20px;
        color: #fff;
        .boqun-system {
            font-size: 20px;
            line-height: 60px;
            display: inline-block;
        }
        .welcome-sentence {
            display: inline-block;
            margin-left: 100px;
        }
        .ul-operation {
            float: right;
            margin-right: 50px;
            line-height: 60px;
            color: #eadfdf;
            li {
                float: left;
                margin-right: 20px;
                font-size: 16px;
                cursor: pointer;
            }
        }
        }
        .link-menu {
            min-height: 877px;
            .ivu-menu {
                font-size: 18px!important;
                font-weight: 600;
                height: 100%;
            }
        }
        
    }
</style>