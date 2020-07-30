<template>
  <div>
    <headerComponent></headerComponent>
    <div class="user-component">
      <Row :gutter="40">
        <Col span="16">
          <div class="div-info-wrapper">
            <router-link to="/" class="router-avatar">
              <img :src="userInfo.avatar||'../../../static/img/userName.png'" class="avatar" />
            </router-link>
            <div class="user-info">
              <div class="user-name">
                {{userInfo.userName}}
                <Icon class="sex" type="md-male" v-if="userInfo.sex=='男'" />
                <Icon class="sex" type="md-female" v-else-if="userInfo.sex=='女'" />
              </div>
              <div class="user-nums">
                <ul class="ul-list">
                  <li class="li-info">
                    <p class="p-nums">{{userInfo.focusNum}}</p>
                    <p class="p-info">
                      关注
                      <Icon type="ios-arrow-forward" />
                    </p>
                  </li>
                  <li class="li-info">
                    <p class="p-nums">{{userInfo.fansNum}}</p>
                    <p class="p-info">
                      粉丝
                      <Icon type="ios-arrow-forward" />
                    </p>
                  </li>
                  <li>
                    <p class="p-nums">{{userInfo.articleNum}}</p>
                    <p class="p-info">
                      文章
                      <Icon type="ios-arrow-forward" />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="div-user-content">
              <Tabs :animated="false" v-model="currentKey" @on-click="getMessage">
                <TabPane label="文章" name="article">
                  <div class="div-article">
                    <articleList :articleList="articleList" :author="false" :like="false"></articleList>
                  </div>
                </TabPane>
                <TabPane label="收藏" name="collect" v-if="userId==loginId">
                  <div class="div-collection">
                    <articleList :articleList="collectList" :like="false"></articleList>
                  </div>
                </TabPane>
                <TabPane label="浏览历史" name="history" v-if="userId==loginId">
                  <div class="div-history">
                    <div v-for="(item,index) in historyList" :key="index" class="history">
                      <p @click="check_detail(item.article_id)" class="article-title">{{item.article_title}}</p><p class="browsing-time">浏览于{{item.browsing_time}}</p>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Col>
        <Col span="8">
          <!-- <test :subjectList="authorList"></test> -->
          <RecommendAuthor :authorList="authorList"></RecommendAuthor>
          <!-- <RecommendSubject :subjectList="authorList"></RecommendSubject> -->
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import headerComponent from "@/components/Header.vue";
import RecommendAuthor from "@/components/RecommendAuthor.vue";
import RecommendSubject from "@/components/RecommendSubject.vue";
import articleList from "@/components/articleList";
import { getUserInfoById } from "@/api/user";
import { getArticle, getCollectArticle,getBrowsingArticle } from "@/api/article";
import { getTime } from "@/utils/tool";
export default {
  created() {
    getUserInfoById({
      userId: this.userId
    }).then(res => {
      this.userInfo = res.data;
    });
    this.getMessage(this.currentKey);
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    loginId() {
      return this.$store.state.userId;
    }
  },
  watch: {
    $route(to, from) {
      this.currentKey = "article";
      getUserInfoById({
        userId: this.userId
      }).then(res => {
        this.userInfo = res.data;
      });
      this.getMessage(this.currentKey);
    }
  },
  data() {
    return {
      userInfo: {},
      currentKey: "article",
      authorList: [],
      articleList: [],
      collectList: [],
      historyList: []
    };
  },
  components: {
    headerComponent,
    RecommendAuthor,
    RecommendSubject,
    articleList
  },
  methods: {
    getMessage(keyWord) {
      if (keyWord == "article") {
        getArticle({
          author_id: this.userId,
          page: 1,
          id: this.loginId
        }).then(res => {
          res.data.data.forEach(item => {
            item.article_time = getTime(item.article_time);
          });
          this.articleList = res.data.data;
        });
      } else if (keyWord == "collect") {
        getCollectArticle({
          userId: this.userId,
          page: 1
        }).then(res => {
          this.collectList = res.data.data;

        });
      }else if(keyWord == 'history') {
        getBrowsingArticle({
          userId:this.loginId,
          page:1
        }).then(res=> {
          res.data.data.forEach(item=> {
            item.browsing_time = getTime(item.browsing_time)
          })
          this.historyList = res.data.data;
        })
      }
    },
    check_detail(id) {
    //   编程式新建窗口
      let routeUrl = this.$router.resolve({
          path: "/article/"+id,
     });
     window.open(routeUrl .href, '_blank');
    }
  }
};
</script>

<style lang="less" scoped>
.user-component {
  width: 1160px;
  margin: 0 auto;
  margin-top: 30px;
  .div-info-wrapper {
  }
  .router-avatar {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }
  }
  .user-info {
    display: inline-block;
    height: 80px;
    margin-left: 30px;
    .user-name {
      height: 40px;
      font-size: 21px;
      font-weight: 700;
      color: #333;
      .sex {
        margin-left: 5px;
        color: #2d8cf0;
      }
    }
    .user-nums {
      height: 40px;
      .ul-list li {
        float: left;
        padding: 0 10px;
        .p-nums {
          font-size: 15px;
          color: #333;
        }
        .p-info {
          color: #969696;
          font-size: 12px;
        }
      }
      .li-info {
        border-right: 1px solid #ddd;
      }
    }
  }
  .div-user-content {
    margin-top: 30px;
    .div-history {
      margin-top: -18px;
      .history {
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        .article-title {
          cursor: pointer;
          font-size: 20px;
          font-weight: 500;
        }
        .article-title:hover {
          color: #2d8cf0;
        }
        .browsing-time {
        }
      }
    }
  }
}
</style>