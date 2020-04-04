<template>
    <div class="toast">
        <p>{{content}}</p>
    </div>
</template>

<script>
export default {
    name: "Toast",
    mounted() {
    this.timer = setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
        }, this.duration);
    },
    data() {
        return {
            content:"123",
            duration: 3000,
            timer: ""
        }
    }
}
</script>

<style lang="less">
    .toast {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        color: #fff;
        z-index: 9999;
        background: transparent;
    > p {
        padding: 12px 22px;
        font-size: 18px;
        border-radius: 4px;
        background: rgba(17, 17, 17, 0.7);
    }
    }
</style>