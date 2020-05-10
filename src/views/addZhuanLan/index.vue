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
      <input hidden type="file" name="imageFile" @change="uploadImg" class="uploadFile" />
      <textarea class="textarea-abstract" placeholder="请输入专栏简介，最大字数200" maxlength="200" v-model="zhuanlan.abstract"></textarea>
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
          return this.$store.state.user.userId;
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
        add(this.zhuanlan).then(res=> {
          if(res.data.code === 200) {
            this.$Message.success("发布成功");
            setTimeout(()=> {
              this.$route.push("/home/zhuanlan");
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
      formData.append("imageFile", file);
      uploadSingle(formData).then(res => {
        this.zhuanlan.img = res.data.path;
      });
      //   let files = document.querySelector(".uploadFile").files;
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("imageFile", files[i]);
      //   }
      //   uploadMultiple(formData).then(res => {});
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
  }
}
</style>