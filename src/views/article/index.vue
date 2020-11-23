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
          <div class="comment">
            <div class="write-content">
              <img class="avatar" :src="avatar?avatar: '../../static/img/userName.png'">
              <Input v-model="write_content" placeholder="写下你的评论" size="large"/>
              <button class="send-comment" @click="addComment">发布</button>
            </div>
            <div v-for="(items,indexes) in commentList" :key="indexes" class="comment-content">
              <img :src="items.sender.avatar" class="comment-avatar">
              <div style="width: 100%">
                <div class="main-content">
                  <router-link class="sender-name" :to="'/userHome/'+items.sender.id">{{items.sender.realName}}</router-link>
                  ：{{items.comment_content}}
                </div>
                <div class="action-bar">
                  <Icon @click="toggleThumbUp(indexes)" :class="{isThumbUp:items.isThumbUp}" type="md-thumbs-up" />{{items.thumbUpNum}}<span class="reply" @click="reply(indexes)">回复</span>{{items.comment_time}}
                </div>
                <div class="comment-children" v-if="items.children.length || items.reply">
                  <div v-for="(item, index) in items.children" :key="index">
                    <div>
                      <router-link :to="'/userHome/'+item.sender.id">{{item.sender.realName}}</router-link>
                      回复<router-link :to="'/userHome/'+item.receiver.id">{{item.receiver.realName}}</router-link>：{{item.comment_content}}
                    </div>
                    <div class="action-bar">
                      <Icon @click="toggleThumbUp(indexes, index)" :class="{isThumbUp:item.isThumbUp}" type="md-thumbs-up" />{{item.thumbUpNum}}<span class="reply" @click="reply(indexes,index,true)">回复</span>{{item.comment_time}}
                    </div>
                  </div>
                  <div v-if="items.reply" class="reply-area clearfix">
                    <textarea  class="reply-input" v-model="items.reply_content" :placeholder="items.placeholder"></textarea>
                    <button @click="submitReplyComment(indexes)" class="submitReply">提交评论</button>
                    <button @click="cancelReply(indexes)" class="cancelReply">取消回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <span @click="showComments">
            <i class="iconfont">&#xe61b;</i>
            {{commentList.length}}条评论
          </span>
          <span class="time" :class="{isCollect: articleDetail.isCollect}" @click="collect"><i class="iconfont icon-collect"></i>
          {{articleDetail.isCollect?"已收藏":"收藏"}}</span>
        </p>
    </div>
  </div>
</template>

<script>
import { addReadNums, getArticleDetail, addBrowsingHistory, addCollection, cancelCollection, likeArticle } from "../../api/article";
import {commentAdd, getAllComments, toggleZan} from "@/api/comment"
import headerComponent from "@/components/Header";
import {getTime} from "@/utils/tool"
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
      return this.$store.state.userId;
    },
    avatar() {
      return this.$store.state.avatar;
    },
    realName() {
      return this.$store.state.realName;
    }
  },
  data() {
    return {
      articleDetail: {},
      isLoading: true,
      write_content: "",
      commentList: []
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
      arr.push(
        getAllComments({
          article_id: this.$route.params.id,
          user_id: this.loginId
        })
      )
      Promise.all(arr).then(res => {
        this.articleDetail = res[1].data[0];
        this.commentList = res[3].data.data;
        this.commentList.forEach(item => {
          this.$set(item, "reply", false);
          this.$set(item, "reply_content", "");
          this.$set(item, "receive_id", null);
          this.$set(item, "placeholder", "");
          item.comment_time = getTime(item.comment_time);
          item.children.forEach(item=> {
            item.comment_time = getTime(item.comment_time);
          })
        })
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
    },
    addComment() {
      commentAdd({
        user_id: this.loginId,
        article_id: this.$route.params.id,
        comment_content: this.write_content
      }).then(res=> {
        if(res.data.message === 'success') {
          this.$Message.success("发布评论成功");
          
          this.commentList.unshift({
            comments_id: res.data.insertId,
            comment_content: this.write_content,
            sender: {
              avatar: this.avatar || `../../../static/img/userName.png`,
              realName: this.realName,
              id: this.loginId,
            },
            comment_time: "刚刚",
            user_id: this.loginId,
            children: [],
            reply: false,
            reply: "",
            receive_id: null,
            placeholder: ""

          })
          this.write_content = "";
        }
      })
    },
    reply(indexes, index, isChild = false) {
      if(isChild) {
        this.commentList[indexes].placeholder = "@"+ this.commentList[indexes].children[index].sender.realName;
        this.commentList[indexes].receive_id = this.commentList[indexes].children[index].sender.id;

      }else {
        this.commentList[indexes].placeholder = "@"+ this.commentList[indexes].sender.realName;
        this.commentList[indexes].receive_id = this.commentList[indexes].sender.id;
      }
      this.commentList[indexes].reply = true;
      this.$nextTick(()=> {
        event.target.closest(".comment-content").querySelector(".reply-input").focus();
      })
      
    },
    cancelReply(index) {
      this.commentList[index].reply = false;
    },
    submitReplyComment(indexes) {
      commentAdd({
        user_id: this.loginId,
        article_id: this.$route.params.id,
        comment_content: this.commentList[indexes].reply_content,
        receive_person_id: this.commentList[indexes].receive_id,
        receive_id: this.commentList[indexes].comments_id
      }).then(res=> {
        if(res.data.message === 'success') {
          this.$Message.success("发布评论成功");
          this.commentList[indexes].children.unshift({
            comment_content: this.commentList[indexes].reply_content,
            comment_time: "刚刚",
            comments_id: res.data.insertId,
            receive_person_id: this.commentList[indexes].receive_id,
            sender: {
              avatar: this.avatar || `../../../static/img/userName.png`,
              realName: this.realName,
              id: this.loginId,
            },
            receiver: {
              id: this.commentList[indexes].receive_id,
              realName: this.commentList[indexes].placeholder.slice(1),
            }
          })
          this.commentList[indexes].reply_content = "";
        }
      })
    },
    showComments() {
      document.documentElement.scrollTop = document.documentElement.scrollTop + document.querySelector(".write-content").getBoundingClientRect().top;
    },
    toggleThumbUp(indexes, index) {
      var insert, comment_id;
      if(index == undefined) {
        insert  = !this.commentList[indexes].isThumbUp;
        this.commentList[indexes].isThumbUp = !this.commentList[indexes].isThumbUp;
        insert?this.commentList[indexes].thumbUpNum++:this.commentList[indexes].thumbUpNum--;
        comment_id = this.commentList[indexes].comments_id;
      }else {
        insert  = !this.commentList[indexes].isThumbUp;
        this.commentList[indexes].children[index].isThumbUp = !this.commentList[indexes].children[index].isThumbUp;
        insert?this.commentList[indexes].children[index].thumbUpNum++:this.commentList[indexes].children[index].thumbUpNum--;
        comment_id = this.commentList[indexes].children[index].comments_id;
      }
      toggleZan({
        user_id: this.loginId,
        comment_id,
        insert
      }).then(res=> {
        console.log(res);
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
.article-detail {
  background-color: #f8f8f8;
  min-height: 100vh;
  .div-wrapper {
    width: 1160px;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    padding-bottom: 100px;
    min-height: calc(100vh - 100px);
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
        .isCollect {
          color: #0084ff;
        }
      }
  }
  .comment {
    border-top: 1px solid #ddd;
    padding-top: 20px;
    margin-top: 100px;
    .write-content {
      display: flex;
      height: 50px;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .send-comment {
        width: 70px;
        height: 40px;
        border: none;
        padding: 10px 12px;
        border-radius: 4px;
        background-color: #0084ff;
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
        box-sizing: border-box;
      }
    }
    .comment-content {
      display: flex;
      align-items: start;
      margin-top: 20px;
      .comment-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .main-content {
        font-size: 16px;
        .sender-name {
          font-weight: 600;
        }
        
      }
      .action-bar {
        margin-top: 7px;
        margin-bottom: 10px;
          .reply {
            margin-left: 10px;
            margin-right: 10px;
            display: inline-block;
            cursor: pointer;
          }
          .isThumbUp {
            color: #0084ff;
          }
        }
      .comment-children {
        padding: 10px;
        width: 100%;
        border-radius: 4px;
        background-color: #f8f9fa;
        margin-top: 10px;
        .reply-area {
          .reply-input {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            outline: 1px solid #ddd;
            height: 100px;
          }
          .cancelReply,.submitReply {
            padding: 5px 10px;
            float: right;
            color: #fff;
            border: none;
            border-radius: 5px;
            background-color: #0084ff;
          }
          .cancelReply {
            background-color:#ec7259;
            border-color: #ec7259;
            margin-right: 10px;
          }
          
        }
      }
    }
  }
}
</style>