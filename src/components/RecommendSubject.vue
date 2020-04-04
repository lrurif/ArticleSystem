<template>
  <div class="div-subject">
      <div class="title clearfix">
          <span class="span-subject">推荐专题</span>
          <span class="span-next"><Icon type="md-refresh" />换一批</span>
      </div>
      <ul class="ul-recommend-subject">
          <li v-for="(item,index) in subjectList" :key="index" class="li-subject clearfix">
              <img :src="item.url" class="img-subject">
              <span class="span-follow">+关注</span>
              <p class="p-name">{{item.name}}</p>
              <p class="p-focus-nums">{{item.focus}}篇文章 . {{item.focus}}人已关注</p>
              
          </li>
      </ul>
      <button class="button-check-all">查看全部<Icon type="ios-arrow-forward" /></button>
  </div>
</template>

<script>
export default {
    props: {
        subjectList: {
        type:Array,
        default: []
        }
    }
}
</script>

<style lang="less" scoped>
    .div-subject {
        .title {
            margin-bottom: 20px;
            .span-subject {
                float: left;
            }
            .span-next {
                float: right;
                cursor: pointer;
            }
        }
        .ul-recommend-subject {
            .li-subject {
                margin-top: 10px;
                .img-subject {
                    width: 48px;
                    height: 48px;
                    border-radius: 3px;
                    float: left;
                    margin-right: 10px;
                }
                .span-follow {
                    float: right;
                    line-height: 50px;
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