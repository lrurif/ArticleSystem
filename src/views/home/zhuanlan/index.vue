<template>
  <div class="div-zhuanlan">
    <div class="zhuanlan-top clearfix">
      <h1 class="zhuanlan-title"><i class="iconfont icon-edit"></i>专栏·发现</h1>
      <button class="btn-add" title="添加你的专栏" @click="go_addZhuanLan">
        <i class="iconfont icon-refresh"></i>&nbsp;&nbsp;添加专栏
      </button>
    </div>
    <loading v-if="isLoading" class="loading"></loading>
    <div v-else class="zhuanlan-body">
      <div v-for="(item,index) in test_data" :key="index" class="zhuanlan-content">
        <img :src="item.zhuanlan_img" class="zhuanlan-img" />
        <p class="zhuanlan-name">{{item.zhuanlan_name}}</p>
        <p class="zhuanlan-describe">{{item.zhuanlan_abstract}}</p>
        <p class="zhuanlan-num">
          <span>{{item.focus_num}}人关注</span>&nbsp;|&nbsp;
          <span>{{item.article_num}}篇文章</span>
        </p>
        <router-link :to="{path:'../zhuanlanDetail',query:{id:item.zhuanlan_id}}"><button class="zhuanlan-btn">进入专栏</button></router-link>
      </div>
    </div>
    <div class="zhuanlan-change" @click="change">
      <button class="btn-change" title="换一批">
        <i class="iconfont icon-refresh"></i>&nbsp;&nbsp;换一批
      </button>
    </div>
  </div>
</template>

<script>
import {getRecommend} from "@/api/zhuanlan"
import loading from "@/components/loading.vue"
export default {
  created() {
    this.init();
  },
  data() {
    return {
      test_data: [],
      isLoading: true
    };
  },
  components: {
    loading
  },
  methods: {
    init() {
      getRecommend().then(res=> {
      this.test_data = res.data;
        this.isLoading = false;
      
    })
    },
    go_addZhuanLan() {
      this.$router.push("/addZhuanLan");
    },
    change() {
      this.isLoading = true;
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.div-zhuanlan {
  width: 1160px;
  margin: 0 auto;
  .zhuanlan-top {
    margin-top: 20px;
    .zhuanlan-title {
      font-size: 20px;
      float: left;
      .icon-edit {
        color: #2d8cf0;
        margin-right: 17px;
        font-size: 20px;
      }
    }
    .btn-add {
      float: right;
      border: 1px solid #009966;
      color: #009966;
      padding: 10px 20px;
      background: #fff;
      border-radius: 4px;
    }
  }
  .loading {
    height: 1180px;
  }
  .zhuanlan-body {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin-top: 20px;
    .zhuanlan-content {
      width: 24%;
      height: 250px;
      border: 1px solid #ddd;
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      .zhuanlan-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: block;
      }
      .zhuanlan-name {
        font-size: 18px;
        font-weight: 700;
        margin-top: 10px;
      }
      .zhuanlan-describe {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: center;
        height: 37px;
        font-size: 13px;
      }
      .zhuanlan-num {
        overflow: hidden;
        margin-top: 10px;
      }
      .zhuanlan-btn {
        margin-top: 20px;
        border: 1px solid #2d8cf0;
        color: #2d8cf0;
        padding: 7px 10px;
        border-radius: 5px;
        background: #fff;
      }
    }
    .zhuanlan-content:not(:nth-child(4n)) {
      margin-right: 15px;
    }
  }
  .zhuanlan-change {
    margin-top: 50px;
    text-align: center;
    .btn-change {
      border: 1px solid #000;
      color: #000;
      padding: 10px 20px;
      background: #fff;
      outline: none;
      border-radius: 4px;
    }
    .btn-change:hover {
      background: #faf9f9;
    }
  }
}
</style>