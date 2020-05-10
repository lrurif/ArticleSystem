<template>
    <div class="div-setting">
        <headerComponent></headerComponent>
        <div class="person-setting">
            <div class="div-avatar">
                <img src="../../../static/img/loading.jpg" class="avatar">
                <button @click="changeAvatar" class="change-btn">更换头像</button>
                <input type="file" hidden class="input-avatar">
            </div>
            <ul class="ul-setting">
                <li class="li-setting"><span>昵称</span><input placeholder="填写你的昵称" type="text"/></li>
                <li class="li-setting"><span>性别</span>
                    <RadioGroup v-model="sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                    <Radio label="保密"></Radio>
                    </RadioGroup>
                </li>
                <li class="li-setting"><span>个人简介</span><textarea class="person-introduction" placeholder="填写你的个人简介"></textarea></li>
            </ul>
            <button class="save-btn">保存</button>
        </div>
    </div>
</template>

<script>
import headerComponent from "../../components/Header"
export default {
    components: {
        headerComponent
    },
    data() {
        return {
            sex: "男"
        }
    },
    methods: {
        changeAvatar() {
            document.querySelector(".input-avatar").click();
        }
    }
}
</script>

<style lang="less" scoped>
    .div-setting {
        .person-setting {
            width: 1160px;
            margin: 0 auto;
            padding: 20px;
            .div-avatar {
                .avatar {
                    width: 100px;
                    height: 100px;
                    border:1px solid #ddd;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                .change-btn {
                    border: 1px solid #2d8cf0;
                    color: #2d8cf0;
                    margin-left: 60px;
                    background: #fff;
                    padding: 10px 20px;
                    border-radius: 20px;
                    outline: none;
                }
            }
            .ul-setting {
                margin-top: 20px;
                .li-setting {
                    border-bottom: 1px solid #ddd;
                    padding: 20px 0;
                    span {
                        width: 100px;
                        display: inline-block;
                    }
                    input[type="text"] {
                        width: 475px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        padding: 5px 0 5px 10px;
                        outline: none;
                        font-size: 15px;
                    }
                }
                .person-introduction {
                    vertical-align: top;
                    width: 475px;
                    height: 100px;
                    resize: none;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    outline: none;
                    font-size: 18px;
                }
            }
            .save-btn {
                border: 1px solid #05fa18;
                color: #05fa18;
                font-size: 15px;
                padding: 10px 20px;
                background: #fff;
                border-radius: 5px;
                font-weight: 700;
                margin-top: 30px;
                outline: none;
            }
            .save-btn:hover {
                background: #f8f9fa;
            }
        }
    }
</style>