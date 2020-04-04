<template>
  <div class="special-column">
      <p class="aside-title">分类专栏</p>
      <div class="link-special" v-for="(item,index) in specialList" :key="index">
          <img :src="item.url" class="special-img">
          <div>
              <p class="special-title">{{item.title}}</p>
              <p class="special-description">{{item.description}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            specialList: [
                {
                    url:"../../../../static/img/loading.jpg",
                    title: "前端笔记本",
                    description: "此后如没有炬火，我便是唯一的光🔥"
                },
                {
                    url:"../../../../static/img/loading.jpg",
                    title: "前端笔记本",
                    description: "此后如没有炬火，我便是唯一的光🔥"
                },
                {
                    url:"../../../../static/img/loading.jpg",
                    title: "前端笔记本",
                    description: "此后如没有炬火，我便是唯一的光🔥"
                },
                {
                    url:"../../../../static/img/loading.jpg",
                    title: "前端笔记本",
                    description: "此后如没有炬火，我便是唯一的光🔥"
                },{
                    url:"../../../../static/img/loading.jpg",
                    title: "前端笔记本",
                    description: "此后如没有炬火，我便是唯一的光🔥"
                }
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