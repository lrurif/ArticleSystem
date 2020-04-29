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
          <input type="text" placeholder="请输入标题" class="input-title">
          <textarea class="textarea-abstract" placeholder="请输入文章摘要，最大字数200" maxlength="200">

          </textarea>
          <mavon-editor v-model="value" ref="mdEditor" :shortCut="false"/>
      </div>
  </div>
</template>

<script>
export default {
    mounted() {
        this.$refs.mdEditor.change = function(value,render) {
            }
    },
    data() {
        return {
            value:""
        }
    },
    methods: {
        publish_article() {
            
        }
    }
}
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
                justify-content:space-between;
                // line-height: 60px;
                align-items:center;
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
                    background: #2D8cF0;
                    color: #fff;
                    font-size: 15px;
                    width: 100px;
                    border-radius: 20px;
                    box-shadow: none;
                    border: none;
                    outline: none;
                }
                .publish-article:hover {
                    background:#1d70c7;
                }
            }
        }
        .write-body {
            width: 1160px;
            margin: 0 auto;
            .input-title {
                width:100%;
                height: 50px;
                box-sizing: border-box;
                padding: 10px 20px;
                font-size: 25px;
                border-radius: 5px;
                border: 1px solid #ddd;
                margin-bottom: 20px;
            }
            .textarea-abstract {
                width: 100%;
                resize: none; 
                font-size: 20px;
                margin-bottom: 20px!important;
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