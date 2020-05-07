<template>
  <div class="article-detail">
    <headerComponent></headerComponent>
      <span>{{$route.params.id}}</span>
      <div class="div-wrapper">
        
      </div>
      <div class="markdown-body content" v-html="articleDetail.article_content"></div>
  </div>
</template>

<script>

import {addReadNums,getArticleDetail} from '../../api/article'
import headerComponent from '@/components/Header';
import "highlight.js/styles/github.css";
export default {
  created() {
    addReadNums({
      id: this.$route.params.id
    });
    getArticleDetail({
      id: this.$route.params.id
    }).then(res=> {
      this.articleDetail = res.data[0]
      console.log(this.articleDetail)
    }) 
  },
  components: {
    headerComponent
  },
  data() {
    return {
      articleDetail:{}
    }
  }
}
</script>

<style lang="less" scoped>
  .article-detail {
    background-color:#f8f8f8;
    .content {
      width: 960px;
      margin: 0 auto;
      background: #fff;

      padding: 20px;
      border-radius: 10px;
    }
  }
</style>