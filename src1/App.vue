<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h4>ddddd</h4> -->

    <!-- <router-link to="/">首页</router-link>·
    
    <router-link to="/helloworld">helloworld</router-link>·
    
    <router-link to="/addperson">addperson</router-link>·
    
    <router-link to="/device">device</router-link>·
    
    <router-link to="/showmember">showmember</router-link>·
    
    <router-link to="/personalcenter">personalcenter</router-link>· -->

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
