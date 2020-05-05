<template>
  <div class="register-wrapper">
		<div class="register-head">
			<router-link :to="{ name: 'login'}" class="login">登录</router-link>
			<b>.</b>
			<router-link :to="{ name: 'register'}" class="register actived">注册</router-link>
		</div>
		<div class="register-form">
			<div class="user-name">
				<input type="text" v-model="userName" name="userName" placeholder="请输入用户名">
			</div>
			<div class="password" style="border-radius:0;border-bottom:none;">
				<input type="password" v-model="password" name="password" placeholder="设置密码">
			</div>
			<div class="password">
				<input type="password" v-model="repassword" name="rePassword" placeholder="请输入重复密码">
			</div>
				<input type="button" value="注册" class="submit register-btn" @click="register">
		</div>
	</div>
</template>

<script>
import {register} from "../api/user"
export default {
    created() {
        document.title = "注册";
    },
    data() {
        return {
            userName: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        register() {
            if(this.userName.length<4) {
                this.$Message.error("用户名长度不能小于4位");
                return;
                this.$Message.error("密码长度不能小于8位");
                return;
            }else if(this.repassword!==this.password) {
                this.$Message.error("密码与确认密码不同");
                return;
            }else {
                var data = {};
                data.userName = this.userName;
                data.password = this.password;
                register(data).then(res=> {
                    if(res.data.message==='用户名已被注册') {
                        this.$Message.error("用户名已被注册");
                    }else {
                         this.$Message.success("注册成功");
                    }
                    this.userName = '';
                    this.password = '';
                    this.repassword = '';
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .register-wrapper {
        width: 400px;
        margin: 60px auto 0;
        text-align: center;
        padding: 50px;
        background: #fff;
        box-sizing: border-box;
        position:relative;
        .register-head {
            .login,.register {
                padding: 10px;
                color: #969696;
                display:inline-block;
                font-size: 18px;
                cursor:pointer;
                box-sizing: border-box; 
            }
            b {
                padding: 10px;
            }
            .register:hover,.login:hover {
                border-bottom: 2px solid #ea6f5a;
                cursor: pointer;
            }
            .actived {
                border-bottom: 2px solid #ea6f5a;
                font-weight: 700;
                color: #ea6f5a!important;
            }
        }
    }
    .register-form {
        margin-top:50px;
    }
    .register-form input[type="text"],input[type="password"]{
        display:block;
        width:300px;
        padding: 4px 12px 4px 35px;
        box-sizing: border-box;
        height: 50px;
        background: hsla(0,0%,71%,.1);
        line-height:50px;
        border:none;
    }
    .register-form .user-name {
        border-radius: 4px 4px 0 0;
        border: 1px solid #c8c8c8;
        border-bottom:none;
        position: relative;
    }
    .register-form .password {
        border-radius: 0 0 4px 4px;
        position: relative;
        border: 1px solid #c8c8c8;
    }
    .register-form .user-name::after {
        content:"";
        position:absolute;
        top:13px;
        left:10px;
        z-index:2;
        width:18px;
        height:18px;
        background: url("../../static/img/userName.png");
        background-size:contain;
    }
    .register-form .password::after {
        content:"";
        position:absolute;
        top:13px;
        left:10px;
        z-index:2;
        width:18px;
        height:18px;
        background: url("../../static/img/password.png");
        background-size:contain;
    }
    .register-form .submit {
        width:100%;
        height:50px;
        margin-top:30px;
        background:rgb(49,148,208);
        color:#fff;
        border-radius:25px;
        border:none;
        cursor:pointer;
        font-size:18px;
    }
    .submit:hover {
        background:#187cb7;
    }
    .register-form .register-btn {
        background: #42c02e;
    }
    .register-form .register-btn:hover {
        background: #3db922;
    }
</style>