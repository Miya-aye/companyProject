<template>
  <div>
    <a-directory-tree :treeData="treeData" :loadData="onLoadData"></a-directory-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData:[],
      
    }
  },
};
</script>

<style scoped>
</style>