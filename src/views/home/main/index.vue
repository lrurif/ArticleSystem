<template>
  <div class="main-area">
    <loading v-show="isLoading"></loading>
    <Row :gutter="40" v-show="!isLoading">
      <Col span="16">
        <div class="div-left-area">
          <articleList :articleList = articleList></articleList>
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
import {getTime, throttle} from "@/utils/tool"
export default {
  components: {
    RecommendAuthor,
    asideBox,
    articleList,
    loading
  },
  created() {
    getArticle({
      page:1,
      size:10,
      id:this.userId
    }).then(res=> {
      this.isLoading = false;
      this.articleList = res.data.data;
      this.articleList.forEach(item=> {
        item.article_time = getTime(item.article_time);
      })

    })
  },
  mounted() {
    window.addEventListener("scroll", this.throttleScroll)
  },
  beforeDestroy() {
    console.log(1234)
    window.removeEventListener("scroll", this.throttleScroll)
  },
  computed: {
    userId() {
          return this.$store.state.userId;
      },
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
      isLoading: true,
      page: 1
    }
  },
  methods: {
    scrollObserve() {
      if(document.documentElement.scrollTop + window.innerHeight + 30 > document.body.offsetHeight) {
        getArticle({
          page: ++this.page,
          size:10,
          id:this.userId
        }).then(res=> {
          this.articleList.push(...res.data.data);
      })
    }
  },
  throttleScroll: throttle("scrollObserve", 200)
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