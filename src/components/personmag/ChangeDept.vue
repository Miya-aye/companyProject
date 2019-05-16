<template>
  <div>
    <a-modal
      :visible="deptvisible"
      title="人员调动"
      width="400px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="deptCancle"
      @ok="deptOk"
    >
      <a-directory-tree defaultExpandAll>
        <a-tree-node title="湖南捷报信息技术有限公司(10)" key="0-0">
          <a-tree-node title="行政部(2)" key="0-0-1" isLeaf/>
          <a-tree-node title="销售部(2)" key="0-0-2" isLeaf/>
          <a-tree-node title="市场部(2)" key="0-0-3" isLeaf/>
          <a-tree-node title="技术部(2)" key="0-0-4" isLeaf/>
          <a-tree-node title="商务部(2)" key="0-0-5" isLeaf/>
        </a-tree-node>
      </a-directory-tree>
    </a-modal>
  </div>
</template>

<script>
export default {
  props:['deptvisible'],
  methods: {
    deptCancle() {
      this.$emit("colsedept");
    },
    deptOk() {
      this.$emit("colsedept");
    },
  },
};
</script>

<style scoped>
</style>