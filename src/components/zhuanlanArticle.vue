<template>
  <div class="article-component">
    <div v-for="(item,index) in articleList" :key="index" class="link-article">
      <div :class="{'div-content':true,'hasImg':item.article_img?true:false}">
        <p @click="check_detail(item.article_id,index)" class="title">{{item.article_title}}</p>
        <p class="author">
          <router-link :to="{path: `/userHome/${item.user_id}`}" v-if="author">
            <img class="avatar" src="../../static/img/loading.jpg"><span class="article-author">{{item.realName}}</span>
          </router-link>
          <span class="time">{{item.article_time}}</span>
          </p>
        <p class="content">{{item.article_abstract}}</p>
        <p class="article_nums">
          <span @click="agree(index)" :class="{'btn-like':true,'is-like':item.isLike?true:false}">
            <Icon type="ios-heart" />
            {{item.isLike?"已点赞":"点赞"}} {{item.article_like_num}}
          </span>
          
          <span>
            <Icon type="md-eye" />
            {{item.article_reading}}人浏览
          </span>
          <span>
            <i class="iconfont">&#xe61b;</i>
            {{item.comments_num}}条评论
          </span>
          
        </p>
      </div>
      <img v-if="item.article_img" :src="item.article_img" class="article-img" />
    </div>
  </div>
</template>

<script>
import {getArticle, likeArticle} from "../api/article"
export default {
  props: {
    articleList: {
      type: Array,
      default: []
    },
    author: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  computed: {
    userId() {
          return this.$store.state.user.userId;
      }
  },
  methods: {
    check_detail(id,index) {
      this.articleList[index].article_reading++;
    //   编程式新建窗口
      let routeUrl = this.$router.resolve({
          path: "/article/"+id,
     });
     window.open(routeUrl .href, '_blank');
    },
    agree(index) {
      if (this.articleList[index].isLike) {
        this.articleList[index].article_like_num--;
        likeArticle({
          id: this.userId,
          article_id: this.articleList[index].article_id,
          type: "cancel"
        }).then(res => {});
      } else {
        this.articleList[index].article_like_num++;
        likeArticle({
          id: this.userId,
          article_id: this.articleList[index].article_id,
          type: "add"
        }).then(res => {});
      }
      this.articleList[index].isLike = !this.articleList[index].isLike;
    }
  }
};
</script>

<style lang="less" scoped>
.article-component {
  .link-article {
    position: relative;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 30px;
    margin-top: 10px;
    .div-content {
      .title {
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
      }
      .title:hover {
        color: #175199;
      }
      .content {
        font-size: 13px;
        color: #999;
        margin-top: 10px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .author {
        margin-top: 6px;
      }
      .time {
          color: #000;
          font-weight: 500;
          display: inline-block; 
          margin-left: 10px;
        }
        .article-author {
          cursor: pointer;
          color: #515a6e;
          font-weight: 600;
        }
        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }
      .article_nums {
        margin-top: 20px;
        span {
          margin-right: 10px;
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
        
        
      }
    }
    .article-img {
      width: 150px;
      height: 100px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -50px;
      border: 1px solid #f0f0f0;
      border-radius: 4px;
    }
    .hasImg {
      padding-right: 160px;
    }
  }
}
</style>