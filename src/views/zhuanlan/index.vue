<template>
  <div class="zhuanlan_detail">
    <headerComponent></headerComponent>
    <div class="main-area">
      <Row :gutter="40">
        <Col span="16">
          <div class="zhuanlan-message">
            <button @click="focus" class="zhuanlan-focus" :class="{'is-focus':isFocus}">{{isFocus?'已关注':'关注'}}&nbsp;{{focus_num}}</button>
            <button class="zhuanlan-read" @click="contribution">投稿</button>
            <img :src="avatar?avatar:'../../../static/img/loading.jpg'" class="zhuanlan-img" />
            <div class="div-title">
              <h1 class="zhuanlan-title">{{title}}</h1>
              <p class="zhuanlan-abstract">{{abstract}}</p>
            </div>
          </div>
          <div>
            <zhuanlanArticle :articleList="articleList"></zhuanlanArticle>
          </div>
        </Col>
        <Col span="8"></Col>
      </Row>
    </div>
    <Modal v-model="showModal" @on-ok="submitArticle" @on-cancel="cancelSumbit">
      <template v-slot:header>
        <p class="contribution-title">投稿文章</p>
      </template>
      <div class="contribution-content">
        <Input v-if="!isChosen" v-model="searchWord" size="large" placeholder="搜索" @on-focus	="showArticle" @on-blur="closeList" @on-change="searchDebounce"/>
        <p v-else class="hasChosen">{{chosenArticle.article_title}}<Icon type="md-close" class="cancelChosen" @click="isChosen=false"/></p>
        <div class="contribution-list" v-show="isLook">
          <div v-for="(item, index) in contributionList" :key="index" class="contribution-item" @mousedown="selectArticle(index)">
            {{item.article_title}}
          </div>
        </div>
      </div>
      
      
    </Modal>
  </div>
</template>

<script>
import headerComponent from "@/components/Header.vue";
import zhuanlanArticle from "@/components/zhuanlanArticle";
import {getZhuanlanDetail, focus_zhuanlan, addArticle} from "@/api/zhuanlan"
import { getArticle, getSubmitArticle } from "@/api/article";
import {getTime, debounce} from "@/utils/tool"
export default {
  created() {
    getZhuanlanDetail({
      id:this.$route.query.id,
      user_id: this.userId
    }).then(res=> {
      this.title = res.data.zhuanlan.zhuanlan_name;
      this.avatar = res.data.zhuanlan.zhuanlan_img;
      this.abstract = res.data.zhuanlan.zhuanlan_abstract;
      this.focus_num = res.data.focus_num;
      this.isFocus = res.data.isFocus;
    })
    getArticle({
          page: 1,
          id: this.userId,
          zhuanlan_id: this.$route.query.id
        }).then(res => {
          this.articleList = res.data.data;
          this.articleList.forEach(item => {
            item.article_time = getTime(item.article_time);
          });
        });
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  components: {
    headerComponent,
    zhuanlanArticle
  },
  data() {
    return {
      articleList: [],
      title: '',
      avatar: '',
      abstract: '',
      focus_num:"",
      isFocus: false,
      showModal:false,
      searchWord: "",
      isChosen: false,
      contributionList: [{article_title:"12345"},{title:"llllll"}],
      isLook: false,
      chosenArticle: {
        article_title:"",
        article_id: ""
      }
    };
  },
  methods: {
    closeList() {
      this.isLook = false
    },
    focus() {
      var type = '';
      if(this.isFocus) {
        this.focus_num--;
        type = 'cancel';
      }else {
        this.focus_num++;
        type = 'add';
      }
      
      this.isFocus = !this.isFocus;
      focus_zhuanlan({
        user_id: this.userId,
        zhuanlan_id: this.$route.query.id,
        type
      }).then(res=> {
      })
    },
    contribution() {
      this.showModal = true;
      getSubmitArticle({
        user_id: this.userId,
        zhuanlan_id: this.$route.query.id,
      }).then(res => {
        this.contributionList = res.data.data;
      })
    },
    showArticle() {
      this.isLook = true;
    },
    selectArticle(index) {
      this.chosenArticle.article_title = this.contributionList[index].article_title;
      this.chosenArticle.article_id = this.contributionList[index].article_id;
      this.isChosen = true;
    },
    submitArticle() {
      if(!this.isChosen) return;
      addArticle({
        zhuanlan_id: this.$route.query.id,
        article_id: this.chosenArticle.article_id
      }).then(res => {
        this.isChosen = false;
        this.searchWord = "";
        getArticle({
          page: 1,
          id: this.userId,
          zhuanlan_id: this.$route.query.id
        }).then(res => {
          this.articleList = res.data.data;
          this.articleList.forEach(item => {
            item.article_time = getTime(item.article_time);
          });
        });
      })
    },
    searchDebounce: debounce(function() {
      getSubmitArticle({
        user_id: this.userId,
        zhuanlan_id: this.$route.query.id,
        search_word: this.searchWord
      }).then(res => {
        this.contributionList = res.data.data;
      })
    }, 1000),
    cancelSumbit() {
      this.isChosen = false;
      this.searchWord = "";
    }
  }
};
</script>

<style lang="less" scoped>
.zhuanlan_detail {
  .main-area {
    width: 1160px;
    margin: 0 auto;
    margin-top: 30px;
    .zhuanlan-message {
      border-bottom: 1px solid #ddd;
      padding-bottom: 30px;
      .zhuanlan-img {
        width: 50px;
        height: 50px;
        vertical-align: top;
      }
      .zhuanlan-focus {
        float: right;
        background: #5cb85c;
        padding: 6px 20px;
        border: none;
        border-radius: 5px;
        color: #fff;
      }
      .zhuanlan-read {
        float: right;
        background: #fff;
        padding: 6px 20px;
        border: none;
        border-radius: 5px;
        color: #5cb85c;
        border:1px solid #5cb85c;
        margin-right: 10px;
      }
      .is-focus {
        background: #ddd;
      }
      .div-title {
        display: inline-block;
        margin-left: 20px;
        height: 50px;
        .zhuanlan-title {
          color: #000;
          font-size: 24px;
          line-height: 24px;
        }
        .zhuanlan-abstract {
          font-size: 13px;
          color: #737373;
          margin-top: 7px;
        }
      }
    }
  }
  
  
}
.contribution-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  .hasChosen {
    box-sizing: border-box;
    height:40px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 6px 7px;
    line-height: 26px;
    color: #1a1a1a;
    border-radius: 3px;
    .cancelChosen {
      float: right;
      cursor: pointer;
      margin-top: 6px;
    }
  }
  .contribution-content {
    position: relative;
    .contribution-list {
      position: absolute;
      left: 0px ;
      top: 45px;
      background: #fff;
      width: 100%;
      box-shadow:0px 0px 10px rgba(0, 0, 0, .2);
      border-radius: 6px;
      .contribution-item {
        padding: 10px;
        cursor: pointer;
      }
      .contribution-item:hover {
        background-color: #f6f6f6;
      }
    }
  }
  
</style>