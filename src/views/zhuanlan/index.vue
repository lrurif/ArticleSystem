<template>
  <div class="zhuanlan_detail">
    <headerComponent></headerComponent>
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
    </Modal>
    <div class="main-area">
      <Row :gutter="40">
        <Col span="16">
          <div class="zhuanlan-message">
            <button @click="focus" class="zhuanlan-focus" :class="{'is-focus':isFocus}">{{isFocus?'已关注':'关注'}}&nbsp;{{focus_num}}</button>
            <button class="zhuanlan-read">投稿</button>
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
  </div>
</template>

<script>
import headerComponent from "@/components/Header.vue";
import zhuanlanArticle from "@/components/zhuanlanArticle";
import {getZhuanlanDetail,focus_zhuanlan} from "@/api/zhuanlan"
import { getArticle } from "@/api/article";
import {getTime} from "@/utils/tool"
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
      return this.$store.state.user.userId;
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
      modal1:true
    };
  },
  methods: {
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
        console.log(res.data)
      })
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
</style>