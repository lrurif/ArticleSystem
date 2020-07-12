<template>
  <div class="div-author">
    <div class="title clearfix">
      <span class="span-author">推荐作者</span>
      <span class="span-next" @click="init">
        <Icon type="md-refresh" />换一批
      </span>
    </div>
    <ul class="ul-recommend-author">
      <li v-for="(item,index) in authorList" :key="index" class="li-author clearfix">
        <img :src="item.avatar||'../../static/img/loading.jpg'" class="img-author" />
        <span class="span-follow" @click="focus(index)">{{item.isFocus?"已关注":"+关注"}}</span>
        <p class="p-name">{{item.realName}}</p>
        <p class="p-focus-nums">{{item.focus_num}}人已关注</p>
      </li>
    </ul>
    <button class="button-check-all">
      查看全部
      <Icon type="ios-arrow-forward" />
    </button>
  </div>
</template>

<script>
import { getUserRecommend, toggleFocus } from "@/api/user";
export default {
  props: {
    // authorList: {
    // type:Array,
    // default: []
    // }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId;
    }
  },
  created() {
      this.init();
  },
  data() {
    return {
      authorList: []
    };
  },
  methods: {
    init() {
      getUserRecommend({
        user_id: this.userId
      }).then(res => {
        this.authorList = res.data;
      });
    },
    focus(index) {
      var type = "";
      this.$set(
        this.authorList[index],
        "isFocus",
        this.authorList[index].isFocus ? false : true
      );
      type = this.authorList[index].isFocus ? "add" : "cancel";
      toggleFocus({
        user_id: this.userId,
        person_id: this.authorList[index].id,
        type
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.div-author {
  .title {
    margin-bottom: 20px;
    .span-author {
      float: left;
    }
    .span-next {
      float: right;
      cursor: pointer;
    }
  }
  .ul-recommend-author {
    .li-author {
      margin-top: 10px;
      .img-author {
        width: 48px;
        height: 48px;
        border: 1px solid #ddd;
        border-radius: 50%;
        float: left;
        margin-right: 10px;
      }
      .span-follow {
        float: right;
        line-height: 50px;
        cursor: pointer;
        color: #42c02e;
      }
      .p-name {
        font-size: 16px;
        margin-left: 5px;
      }
      .p-focus-nums {
        font-size: 12px;
        color: #969696;
      }
    }
  }
  .button-check-all {
    width: 100%;
    display: block;
    height: 38px;
    box-sizing: border-box;
    margin-top: 20px;
    background: #f7f7f7;
    box-shadow: none;
    border: 1px solid #ddd;
    color: #787878;
    border-radius: 2px;
  }
}
</style>