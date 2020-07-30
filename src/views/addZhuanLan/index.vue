<template>
  <div class="write">
    <div class="write-head">
      <div class="wirte-head-body">
        <router-link :to="{ path: '/'}" class="logo">博 群</router-link>
        <h1 class="title">新增专栏</h1>
        <button class="publish-zhuanlan" @click="publish_zhuanlan">发布专栏</button>
      </div>
    </div>
    <div class="write-body">
      <input type="text" v-model="zhuanlan.title" placeholder="请输入标题" class="input-title" />
        <img v-if="zhuanlan.img" :src="zhuanlan.img" @click="add_img" class="covers" title="封面图" />
      <p v-else class="add-img" title="封面图" @click="add_img">+</p>
      <input hidden type="file" name="imageFile" @change="uploadImg" class="uploadFile" accept="image/*"/>
      <textarea class="textarea-abstract" placeholder="请输入专栏简介，最大字数200" v-model="zhuanlan.abstract"></textarea>
      <div :class="{'fontNum':true,'isOver':fontNum > 200}">{{fontNum}}/200</div>
    </div>
    
  </div>
</template>

<script>
import { uploadSingle, uploadMultiple } from "../../api/upload";
import {add} from "../../api/zhuanlan"
export default {
  mounted() {
    this.zhuanlan.userId = this.userId;
  },
  computed: {
      userId() {
          return this.$store.state.userId;
      },
      fontNum() {
        return this.zhuanlan.abstract.length;
      }
  },
  data() {
    return {
      value: "",
      imgFile: {},
      zhuanlan: {
          title: '',
          img: "",
          abstract:'',
      }
    };
  },
  methods: {
    publish_zhuanlan() {
      if(this.zhuanlan.title === '') {
        this.$Message.warning("标题不能为空");
        return;
      }else if(this.zhuanlan.img === '') {
        this.$Message.warning("专栏标题必须上传");
        return;
      }else if(this.zhuanlan.abstract === '' ) {
        this.$Message.warning("专栏简介不能为空")
        return;
      }else if(this.zhuanlan.abstract.length > 200) {
        this.$Message.warning("专栏简介字数不能超过200");
        return;
      }else if(this.zhuanlan.title.length > 30) {
        this.$Message.warning("专栏标题字数不能超过30");
        return;
      }
        add(this.zhuanlan).then(res=> {
          if(res.data.message === "success") {
            this.$Message.success("发布成功");
            setTimeout(()=> {
              this.$router.push("/home/zhuanlan");
            },1000)
          }else {
            this.$Message.error("发布失败");
            setTimeout(()=> {
              this.$router.push("/home/zhuanlan");
            },1000)
          }
        })
    },
    add_img() {
      document.querySelector(".uploadFile").click();
    },
    uploadImg() {
      if (!document.querySelector(".uploadFile").files[0]) {
        return;
      }
      var formData = new FormData();
      var file = document.querySelector(".uploadFile").files[0];
      if(!file.type.includes("image")) {
        this.$Message.error("图片类型错误");
        return;
      }
      formData.append("imageFile", file);
      uploadSingle(formData).then(res => {
        this.zhuanlan.img = res.data.path;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.write {
  .write-head {
    height: 60px;
    margin-bottom: 20px;
    .wirte-head-body {
      width: 1160px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      // line-height: 60px;
      align-items: center;
      .logo {
        line-height: 60px;
        font-size: 25px;
      }
      .title {
        display: inline-block;
      }
      .publish-zhuanlan {
        height: 40px;
        line-height: 40px;
        background: #2d8cf0;
        color: #fff;
        font-size: 15px;
        width: 100px;
        border-radius: 20px;
        box-shadow: none;
        border: none;
        outline: none;
      }
      .publish-zhuanlan:hover {
        background: #1d70c7;
      }
    }
  }
  .write-body {
    width: 1160px;
    margin: 0 auto;
    .input-title {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 10px 20px;
      font-size: 25px;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin-bottom: 20px;
    }
    .add-img {
      display: inline-block;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border: 1px solid #ddd;
      font-size: 50px;
      color: #ddd;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .covers {
      display: inline-block;
      width: 100px;
      height: 100px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      margin-bottom: 20px;
      position: relative;
    }
    .add-btn {
      display: inline-block;
    }
    .textarea-abstract {
      width: 100%;
      resize: none;
      font-size: 20px;
      margin-bottom: 20px !important;
      padding: 10px 20px;
      border-radius: 5px;
      border: 1px solid #ddd;
      height: 145px;
    }
    .markdown-body {
      min-height: 560px;
    }
    .fontNum {
      float: right;
      font-size: 20px;
    }
    .isOver {
      color: red;
    }
  }
}
</style>