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
    <div class="bottom-tool">
      <p class="article_nums">
          <span :class="{'btn-like':true,'is-like':articleDetail.isLike}" @click="like">
            <Icon type="ios-heart" />
            {{articleDetail.isLike?"已点赞":"点赞"}}
          </span>
          <span>
            <i class="iconfont">&#xe61b;</i>
            1000条评论
          </span>
          <span class="time" @click="collect"><i class="iconfont icon-collect"></i>
          {{articleDetail.isCollect?"已收藏":"收藏"}}</span>
        </p>
    </div>
  </div>
</template>

<script>
import { addReadNums, getArticleDetail,addBrowsingHistory,addCollection,cancelCollection,likeArticle } from "../../api/article";
import headerComponent from "@/components/Header";
import loading from "@/components/loading";
import "highlight.js/styles/github.css";
export default {
  created() {
    this.init();
  },
  components: {
    headerComponent,
    loading
  },
  computed: {
    loginId() {
      return this.$store.state.user.userId;
    }
  },
  data() {
    return {
      articleDetail: {},
      isLoading: true
    };
  },
  methods: {
    init() {
      var arr = [];
      arr.push(
        addReadNums({
          id: this.$route.params.id
        })
      );
      arr.push(
        getArticleDetail({
          id: this.$route.params.id,
          userId: this.loginId
        })
      );
      arr.push(
        addBrowsingHistory({
          userId: this.loginId,
          articleId: this.$route.params.id
        })
      )
      Promise.all(arr).then(res => {
        this.articleDetail = res[1].data[0];
        this.isLoading = false;
      });
    },
    collect() {
      if(this.articleDetail.isCollect) {
        cancelCollection({
          userId: this.loginId,
          articleId: this.$route.params.id
        }).then(res=> {
          this.$Message.success('已取消收藏');
        })
      }else {
        addCollection({
          userId: this.loginId,
          articleId: this.$route.params.id
        }).then(res=> {
          this.$Message.success('收藏成功');
        })
      }
      this.articleDetail.isCollect = !this.articleDetail.isCollect;
    },
    like() {
      if(this.articleDetail.isLike) {
        likeArticle({
          type: "cancel",
          article_id: this.$route.params.id,
          id: this.loginId
        }).then(res=> {
          this.$Message.success('取消点赞');
        })
      }else {
        likeArticle({
          type: "like",
          article_id: this.$route.params.id,
          id: this.loginId
        }).then(res=> {
          this.$Message.success('点赞成功');
        })
      }
      this.articleDetail.isLike = !this.articleDetail.isLike;
    }
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
  .bottom-tool {
    background: #fff;
    height: 54px;
    line-height: 54px;
    margin-top: 20px;
    box-shadow: 0 -1px 3px 0 rgba(26,26,26,.1);
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    .article_nums {
      width: 1160px;
      margin: 0 auto;
      padding: 0 20px;
        span {
          margin-right: 25px;
        }
        .btn-like {
          background: rgba(0, 132, 255, 0.1);
          padding: 10px 12px;
          color: #0084ff;
          cursor: pointer;
          border-radius: 4px;
        }
        .btn-like:hover {
          background: rgba(0, 132, 255, 0.2);
        }
        .is-like {
          background: #0084ff;
          color: #fff;
        }
        .is-like:hover {
          background: #0084ff;
        }
        .article-author {
          cursor: pointer;
          color: #515a6e;
        }
        .time {
          color: #000;
          font-weight: 500;
        }
      }
  }
}
</style>