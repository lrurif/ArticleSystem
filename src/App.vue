<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // window.addEventListener("beforeunload",()=>{
    //   localStorage.setItem("store",JSON.stringify(this.$store.state))
    // })
  localStorage.getItem("store") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("store"))));
  },
  mounted() {
    
  }
}
</script>
<style>
</style>
