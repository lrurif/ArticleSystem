<template>
  <div class="main-area">
    <Row :gutter="40">
      <Col span="16">
        <div class="div-left-area">
          <div v-for="(item,index) in articleList" :key="index" class="link-article">
            <div :class="{'div-content':true,'hasImg':item.image?true:false}">
              <p class="title">{{item.title}}</p>
              <p class="content">{{item.content}}</p>
              <p class="article_nums">
                <span :class="{'btn-like':true,'is-like':item.isLike?true:false}"><Icon type="ios-heart" /> {{item.isLike?"已赞同":"赞同"}} {{item.likes}}</span>
                <span class="article-author">{{item.author}}</span>
                <span><Icon type="md-eye" /> {{item.pageviews}}人浏览</span>
                <span><i class="iconfont">&#xe61b;</i> {{item.comments}}条评论</span>
              </p>
            </div>
            <img v-if="item.image" :src="item.image" class="article-img">
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
export default {
  components: {
    RecommendAuthor,
    asideBox
  },
  data() {
    return {
      editor:"",
      temp_str:'',
      articleList:[{
        author:"小明同学",
        likes:300,
        title:"提高效率必备：超强搜索神器，绝对值得拥有！",
        content:"根据中国互联网络信息中心（CNNIC）近日发布第 44 次《中国互联网络发展状况统计报告》。截至 2019 年 06 月，中国网民规模为 8.5联网络发展状况统计报告》。联网络发展状况统计报告》。联网络发展状况统计报告》。",
        image:"../../../../static/img/loading.jpg",
        pageviews:2000,
        comments:10,
        isLike: true
      },{
        author:"lruri",
        likes:300,
        title:"123123",
        content:"根据中国互联网络信息中心（CNNIC）近日发布第 44 次《中国互联网络发展状况统计报告》。截至 2019 年 06 月，中国网民规模为 8.5联网络发展状况统计报告》。联网络发展状况统计报告》。联网络发展状况统计报告》。",
        pageviews:2000,
        pageviews:2000,
        comments:10,
        isLike: false
      }],
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
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
    .main-area {
        width: 960px;
        margin: 0 auto;
        margin-top: 20px;
        .div-left-area {
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