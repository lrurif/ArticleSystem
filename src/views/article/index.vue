<template>
  <div class="article-detail">
    <headerComponent></headerComponent>
    <div class="div-wrapper">
      <loading v-if="isLoading"></loading>
      <Row :gutter="40" v-else>
        <Col span="18">
          <h1 class="title">{{articleDetail.article_title}}</h1>
          <div class="author">
            <img class="avatar" :src="articleDetail.avatar||`../../../static/img/userName.png`" />
            <div class="author-info">
              <p class="author-name">{{articleDetail.realName}}</p>
              <p class="article-time">{{articleDetail.article_time}}</p>
            </div>
            <div class="article-info">
              <p>&nbsp;</p>
              <span>
                <i class="iconfont icon-eye"></i>
                阅读量&nbsp;{{articleDetail.article_reading}}
              </span>
              <span>
                <i class="iconfont icon-collect"></i>
                收藏量&nbsp;{{articleDetail.article_likes_nums}}
              </span>
            </div>
          </div>
          <div class="markdown-body content" v-html="articleDetail.article_content"></div>
        </Col>
        <Col span="6"></Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { addReadNums, getArticleDetail } from "../../api/article";
import headerComponent from "@/components/Header";
import loading from "@/components/loading";
import "highlight.js/styles/github.css";
export default {
  created() {
    addReadNums({
      id: this.$route.params.id
    }).then(res => {
      getArticleDetail({
        id: this.$route.params.id
      }).then(res => {
        this.articleDetail = res.data[0];
        this.isLoading = false;
        console.log(this.articleDetail);
      });
    });
  },
  components: {
    headerComponent,
    loading
  },
  data() {
    return {
      articleDetail: {},
      isLoading: true
    };
  }
};
</script>

<style lang="less" scoped>
.article-detail {
  background-color: #f8f8f8;
  .div-wrapper {
    width: 1160px;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    padding-bottom: 100px;
    .title {
      color: #404040;
      font-weight: 700 !important;
      font-size: 30px;
    }
    .author {
      margin-top: 20px;
      margin-bottom: 50px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #ddd;
        vertical-align: middle;
      }
      .author-info,
      .article-info {
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
        .author-name {
          font-weight: 500;
          font-size: 16px;
        }
        .article-time {
          font-size: 12px;
          color: #676161;
        }
      }
      .article-info {
        vertical-align: middle;
        span {
          font-size: 12px;
          color: #676161;
          margin-right: 10px;
          i {
            font-size: 14px;
            color: #676161;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .content {
  }
}
</style>