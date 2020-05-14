<template>
  <div class="main-area">
    <Row :gutter="40">
      <Col span="16">
        <div class="div-left-area">
          <articleList :articleList = articleList></articleList>
          <loading v-show="isLoading"></loading>
        </div>
      </Col>
      <Col span="8">
        <aside-box></aside-box>
        <RecommendAuthor></RecommendAuthor>
      </Col>
    </Row>
  </div>
</template>

<script>
import RecommendAuthor from "@/components/RecommendAuthor.vue"
import articleList from "@/components/articleList"
import loading from "@/components/loading"
import asideBox from "@/components/aside-box.vue"
import {getArticle, likeArticle} from "../../../api/article"
export default {
  components: {
    RecommendAuthor,
    asideBox,
    articleList,
    loading
  },
  created() {
    if(!this.userId) {
      this.$router.push("/login")
    }
    getArticle({
      page:1,
      size:10,
      id:this.userId
    }).then(res=> {
      this.isLoading = false;
      this.articleList = res.data.data;
    })
  },
  mounted() {
  },
  computed: {
    userId() {
          return this.$store.state.user.userId;
      }
  },
  data() {
    return {
      editor:"",
      temp_str:'',
      articleList:[],
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
      ],
      isLoading: true
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
    .main-area {
        width: 1160px;
        margin: 0 auto;
        margin-top: 20px;
        .div-left-area {
          min-height: 20px;
        }
    }
</style>