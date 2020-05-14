<template>
  <div class="div-author">
      <div class="title clearfix">
          <span class="span-author">推荐作者</span>
          <span class="span-next"><Icon type="md-refresh" />换一批</span>
      </div>
      <ul class="ul-recommend-author">
          <li v-for="(item,index) in authorList" :key="index" class="li-author clearfix">
              <img :src="item.avatar||'../../static/img/loading.jpg'" class="img-author">
              <span class="span-follow">+关注</span>
              <p class="p-name">{{item.realName}}</p>
              <p class="p-focus-nums">{{item.focus_num}}人已关注</p>
              
          </li>
      </ul>
      <button class="button-check-all">查看全部<Icon type="ios-arrow-forward" /></button>
  </div>
</template>

<script>
import {getUserRecommend} from "@/api/user"
export default {
    props: {
        // authorList: {
        // type:Array,
        // default: []
        // }
    },
    created() {
        getUserRecommend().then(res=> {
            this.authorList = res.data;
            console.log(res)
        })
    },
    data() {
        return {
            authorList: []
        }
    }
}
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
            background:#f7f7f7;
            box-shadow: none;
            border: 1px solid #ddd;
            color: #787878;
            border-radius: 2px;
        }
    }
</style>