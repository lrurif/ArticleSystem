<template>
  <div class="zhuanlan_detail">
    <headerComponent></headerComponent>
    <div class="main-area">
      <Row :gutter="40">
        <Col span="16">
          <div class="zhuanlan-message">
            <button class="zhuanlan-focus">关注</button>
            <img src="../../../static/img/loading.jpg" class="zhuanlan-img" />
            <div class="div-title">
              <h1 class="zhuanlan-title">阿里技术</h1>
              <p class="zhuanlan-abstract">阿里巴巴官方技术号，关于阿里巴巴经济体的技术创新、实战经验、技术人的成长心得均呈现于此。</p>
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
export default {
  components: {
    headerComponent,
    zhuanlanArticle
  },
  data() {
    return {
      articleList: [
        {
          article_abstract: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          article_id: 4,
          article_img:
            "http://127.0.0.1:3000/images/45ae8751eaf723231e18d95ac5872310.jpg",
          article_reading: 30,
          article_time: "5月5日",
          article_title: "admin的文章",
          avatar: null,
          comments_num: 0,
          isLike: true,
          realName: "admin",
          user_id: 6,
          zhuanlan_id: null,
          article_like_num: 2
        },
        {
          article_abstract: "摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要",
          article_id: 4,
          article_img:
            "http://127.0.0.1:3000/images/45ae8751eaf723231e18d95ac5872310.jpg",
          article_reading: 30,
          article_time: "5月5日",
          article_title: "admin的文章",
          avatar: null,
          comments_num: 0,
          isLike: true,
          realName: "admin",
          user_id: 6,
          zhuanlan_id: null,
          article_like_num: 2
        }
      ]
    };
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