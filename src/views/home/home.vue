<template>
    <div class="home-wrapper">
        <headerComponent></headerComponent>
        <router-view></router-view>
    </div>
</template>

<script>
import headerComponent from '@/components/Header';
export default {
    name: 'home',
    components: {
        headerComponent
    },
    data() {
        return {
            
        }
    },
    mounted () {
        console.log(this.$store.getters.getId);
    },
    methods: {
        
    }
}
</script>
<style scoped>
    body {
        background:#fff;
    }
</style>
