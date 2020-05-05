<template>
  <div class="write">
    <div class="write-head">
      <div class="wirte-head-body">
        <router-link :to="{ path: '/'}" class="logo">博 群</router-link>
        <h1 class="title">写文章</h1>
        <button class="publish-article" @click="publish_article">发布文章</button>
      </div>
    </div>
    <div class="write-body">
      <input type="text" placeholder="请输入标题" class="input-title" />
      <div v-if="img">
        <img :src="img" @click="add_img" class="covers" title="封面图" />
      </div>
      <p v-else class="add-img" title="封面图" @click="add_img">+</p>
      <input hidden type="file" name="imageFile" @change="uploadImg" class="uploadFile" />
      <textarea class="textarea-abstract" placeholder="请输入文章摘要，最大字数200" maxlength="200"></textarea>
      <mavon-editor
        v-model="value"
        ref="mdEditor"
        :shortCut="false"
        :ishljs="true"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
      />
    </div>

    <div class="markdown-body" v-html="readmeContent"></div>
  </div>
</template>

<script>
import { uploadSingle, uploadMultiple } from "../../api/upload";
// import marked from "marked";
// import hljs from "highlight.js";
import "highlight.js/styles/github.css";
export default {
  mounted() {
    this.$refs.mdEditor.change = function(value, render) {};
  },
  data() {
    return {
      value: "",
      img: "",
      imgFile: {},
      readmeContent: ""
    };
  },
  methods: {
    publish_article() {},
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
        this.img = res.data.path;
      });
      //   let files = document.querySelector(".uploadFile").files;
      //   for (let i = 0; i < files.length; i++) {
      //     formData.append("imageFile", files[i]);
      //   }
      //   uploadMultiple(formData).then(res => {});
    },
    handleEditorImgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("imageFile", $file);
      this.imgFile[pos] = $file;
      uploadSingle(formdata).then(res => {
        if (res.data.code === 200) {
          this.$Message.success("上传");
          let url = res.data.path;
          let name = $file.name;
          if (name.includes("-")) {
            name = name.replace(/-/g, "");
          }
          let content = this.value;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            let oStr = `(${pos})`;
            let nStr = `(${url})`;
            let index = content.indexOf(oStr);
            let str = content.replace(oStr, "");
            let insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start);
            };
            this.value = insertStr(str, index, nStr);
          }
        }
      });
    },
    handleEditorImgDel(pos) {
      delete this.imgFile[pos];
      console.log(this.value);
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
      .publish-article {
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
      .publish-article:hover {
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
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border: 2px solid #ddd;
      font-size: 50px;
      color: #ddd;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .covers {
      width: 150px;
      height: 100px;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
      margin-bottom: 20px;
      position: relative;
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