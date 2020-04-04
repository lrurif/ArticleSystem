<template>
  <div class="div-subject">
    <p>推荐专题</p>
    <Carousel v-model="value" autoplay :autoplay-speed=4000 loop>
        <CarouselItem v-for="(item,index) in subjectList" :key="index">
            <img :src="item.url" class="subject-img">
        </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value:1
        }
    },
    props: {
        subjectList: {
        type:Array,
        default() {
            return []
        }
        }
    }

}
</script>

<style lang="less" scoped>
    .div-subject {
        .subject-img {
            width: 100%;
            height: 180px;
        }
    }
</style>