<template>
  <div class="main-area">
    <Row :gutter="40">
      <Col span="16">
        <div class="div-left-area">
          <div v-for="(item,index) in articleList" :key="index" class="link-article">
            <div :class="{'div-content':true,'hasImg':item.article_img?true:false}">
              <p @click="check_detail(item.article_id)" class="title">{{item.article_title}}</p>
              <p class="content">{{item.article_abstract}}</p>
              <p class="article_nums">
                <span @click="agree(index)" :class="{'btn-like':true,'is-like':item.isLike?true:false}"><Icon type="ios-heart" /> {{item.isLike?"已赞同":"赞同"}} {{item.likes}}</span>
                <span class="article-author">{{item.realName}}</span>
                <span><Icon type="md-eye" /> {{item.article_reading}}人浏览</span>
                <span><i class="iconfont">&#xe61b;</i> {{item.comments_num}}条评论</span>
              </p>
            </div>
            <img v-if="item.article_img" :src="item.article_img" class="article-img">
          </div>
        </div>
      </Col>
      <Col span="8">
        <aside-box></aside-box>
        <RecommendAuthor :authorList="authorList"></RecommendAuthor>
      </Col>
    </Row>
  </div>
</template>

<script>
import RecommendAuthor from "@/components/RecommendAuthor.vue"
import asideBox from "@/components/aside-box.vue"
import {getArticle, likeArticle} from "../../../api/article"
export default {
  components: {
    RecommendAuthor,
    asideBox
  },
  created() {
    if(!this.userId) {
      this.$router.push("/login")
    }
    getArticle({
      page:1,
      size:10,
      id:this.userId
    }).then(res=> {
      this.articleList = res.data.data;
    })
  },
  mounted() {
  },
  computed: {
    userId() {
          return this.$store.state.user.userId;
      }
  },
  data() {
    return {
      editor:"",
      temp_str:'',
      articleList:[],
      authorList: [
        {
          url:"../../../static/img/userName.png",
          name:"lruri",
          focus:1311
        },
        {
          url:"../../../static/img/loading.jpg",
          name:"lruri",
          focus:1311
        },
        {
          url:"../../../static/img/loading.jpg",
          name:"lruri",
          focus:1311
        },
        {
          url:"../../../static/img/loading.jpg",
          name:"lruri",
          focus:1311
        }
      ]
    }
  },
  methods: {
    check_detail(id) {
      this.$router.push('/article/'+id)
    },
    agree(index) {
      if(this.articleList[index].isLike) {
        likeArticle({
          id: this.userId,
          article_id: this.articleList[index].article_id,
          type: 'cancel'
        }).then(res=> {

        })
      }else {
        likeArticle({
          id: this.userId,
          article_id: this.articleList[index].article_id,
          type: 'add'
        }).then(res=> {
          
        })
      }
      this.articleList[index].isLike = !this.articleList[index].isLike;
    }
  }
}
</script>

<style lang="less" scoped>
    .main-area {
        width: 1160px;
        margin: 0 auto;
        margin-top: 20px;
        .div-left-area {
          min-height: 20px;
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
                margin-top:10px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .article_nums {
                margin-top: 20px;
                span {
                  margin-right: 10px;
                }
                .btn-like {
                  background: rgba(0,132,255,.1);
                  padding: 10px 12px;
                  color: #0084ff;
                  cursor: pointer;
                  border-radius: 4px;
                }
                .btn-like:hover {
                  background: rgba(0,132,255,.2);
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
    }
</style>