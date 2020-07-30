<template>
  <div class="special-column">
      <p class="aside-title">分类专栏</p>
      <div class="link-special clearfix" v-for="(item,index) in specialList" :key="index">
          <img :src="item.zhuanlan_img||'../../static/img/loading.jpg'" class="special-img">
          <div>
              <p class="special-title">{{item.zhuanlan_name}}</p>
              <p class="special-description">{{item.zhuanlan_abstract}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import {getRecommend} from "@/api/zhuanlan"
export default {
    computed: {
        userId() {
            return this.$store.state.userId
        }
    },
    created() {
        getRecommend({
            user_id:this.userId
        }).then(res=> {
            this.specialList = res.data.splice(0,5);
        })
    },
    data() {
        return {
            specialList: [
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    .special-column {
        margin-bottom: 50px;
        .aside-title {
            border-left: 4px solid #2d8cf0;
            padding-left: 10px;
            margin-bottom: 20px;
        }
        .link-special {
            padding: 10px;
            border: 1px solid #ddd;
            margin-bottom: -1px;
            .special-img {
                width: 40px;
                height: 40px;
                float: left;
                margin-right: 10px;
            }
            .special-title {
                color: #009a61;
                font-size: 14px;
                font-weight: 600;
            }
            .special-description {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;


            }
        }
    }
</style>