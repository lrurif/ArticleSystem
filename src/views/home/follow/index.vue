
<template>
  <div class="div-follow">
    <Row :gutter="40">
      <Col span="8">
        <div class="div-left-area">
          <Select v-model="currentType" style="width:200px" @on-change="changeType">
            <Option
              v-for="item in chooseList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <ul class="follow-list">
            <li
              class="li-follow"
              :class="{'current-type':currentAuthor=='作者文章'}"
              @click="find_zhuanlan_article('','作者文章',)"
            >
              <img src="../../../../static/img/loading.jpg" class="avatar" />
              <div class="follow-name">作者文章</div>
            </li>
            <li
              v-for="(item,index) in currentList"
              :key="index"
              class="li-follow"
              :class="{'current-type':currentAuthor==(item.zhuanlan_name||item.userName)}"
              @click="find_zhuanlan_article(item.focus_zhuanlan_id || item.focus_person_id,item.zhuanlan_name || item.userName,item.focus_zhuanlan_id?'zhuanlan':'author')"
            >
              <div v-if="item.focus_zhuanlan_time">
                <img :src="item.zhuanlan_img" class="avatar" />
                <div class="follow-name">{{item.zhuanlan_name}}</div>
                <div class="follow-type isZhuanlan">专栏主页</div>
              </div>
              <div v-else>
                <img
                  :src="item.avatar?item.avatar:'../../../../static/img/loading.jpg'"
                  class="avatar"
                />
                <div class="follow-name">{{item.userName}}</div>
                <div class="follow-type">作者主页</div>
              </div>
            </li>
          </ul>
        </div>
      </Col>
      <Col span="16">
        <div class="div-right-area">
          <articleList :articleList="articleList" :author="authorIsShow"></articleList>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getFocusData } from "@/api/focus";
import { getArticle } from "@/api/article";
import articleList from "@/components/articleList";
import { getTime } from "@/utils/tool";
export default {
  created() {
    this.init();
  },
  computed: {
    userId() {
      return this.$store.state.user.userId;
    }
  },
  components: {
    articleList
  },
  data() {
    return {
      chooseList: [
        {
          value: "all",
          label: "全部关注"
        },
        {
          value: "zhuanlan",
          label: "专栏"
        },
        {
          value: "author",
          label: "作者"
        }
      ],
      currentAuthor: "作者文章",
      currentType: "all",
      followList: [],
      currentList: [],
      articleList: [],
      authorIsShow: true
    };
  },
  methods: {
    init() {
      getFocusData({
        userId: this.userId
      }).then(res => {
        res.data.articleList.forEach(item => {
          item.article_time = getTime(item.article_time);
        });
        this.followList = res.data.userList
          .concat(res.data.zhuanlanList)
          .sort((a, b) => {
            return (
              new Date(a.focus_person_time || a.focus_zhuanlan_time).getTime() -
              new Date(b.focus_person_time || b.focus_zhuanlan_time).getTime()
            );
          });
        this.currentList = JSON.parse(JSON.stringify(this.followList));
        this.articleList = res.data.articleList;
      });
    },
    changeType(value) {
      if (value == "all") {
        this.currentList = this.followList;
      } else if (value == "zhuanlan") {
        this.currentList = this.followList.filter(item => {
          return item.zhuanlan_name;
        });
        console.log(this.currentList);
      } else if (value == "author") {
        this.currentList = this.followList.filter(item => {
          return !item.zhuanlan_name;
        });
      }
    },
    find_zhuanlan_article(id, name, type) {
      this.currentAuthor = name;
      if (type == "zhuanlan") {
        this.authorIsShow = true;
        getArticle({
          page: 1,
          id: 6,
          zhuanlan_id: id
        }).then(res => {
          this.articleList = res.data.data;
          this.articleList.forEach(item => {
            item.article_time = getTime(item.article_time);
          });
        });
      } else if (type == "author") {
        this.authorIsShow = false;
        getArticle({
          page: 1,
          id: 6,
          author_id: id
        }).then(res => {
          this.articleList = res.data.data;
          this.articleList.forEach(item => {
            item.article_time = getTime(item.article_time);
          });
        });
      } else {
        this.init();
        this.authorIsShow = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.div-follow {
  width: 1160px;
  margin: 0 auto;
  margin-top: 20px;
  .div-left-area {
    .follow-list {
      margin-top: 20px;
      .li-follow {
        height: 60px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        border-radius: 2px;
        position: relative;
      }
      .li-follow:hover {
        background: #f6faff;
      }
      .current-type {
        background: #f6faff;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .follow-name {
        display: inline-block;
        margin-left: 20px;
      }
      .follow-type {
        display: inline-block;
        border: 1px solid #2d8cf0;
        color: #2d8cf0;
        padding: 3px 10px;
        border-radius: 5px;
        position: absolute;
        right: 10px;
        top: 17px;
      }
      .isZhuanlan {
        border: 1px solid #1affb5;
        color: #1affb5;
      }
    }
  }
  .div-right-area {
  }
}
</style>