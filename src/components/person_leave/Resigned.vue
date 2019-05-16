<template>
<!-- 离职人员 -->
  <div class="container">
    <div class="sildtree">
      <div>
        <span class="part_title">部门列表</span>
        <a-button type="primary" size="small">增加</a-button>
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="primary" size="small">删除</a-button>
      </div>
      <a-directory-tree defaultExpandAll>
        <!-- :selectedKeys="['0-0-2']" -->
        <a-tree-node title="湖南捷报信息技术有限公司(10)" key="0-0">
          <a-tree-node title="行政部(2)" key="0-0-1" isLeaf/>
          <a-tree-node title="销售部(2)" key="0-0-2" isLeaf/>
          <a-tree-node title="市场部(2)" key="0-0-3" isLeaf/>
          <a-tree-node title="技术部(2)" key="0-0-4" isLeaf/>
          <a-tree-node title="商务部(2)" key="0-0-5" isLeaf/>
        </a-tree-node>
      </a-directory-tree>
    </div>

    <div class="sildtable">
      <div class="btns1">
        <a-button type="primary">删除</a-button>
        <a-button type="primary">复制</a-button>
        <a-button type="primary">指定部门复职</a-button>
        <a-button type="primary">导出</a-button>
      </div>
      <div class="btns2">
        <label>离职时间：</label><a-range-picker/>
        <a-select :style="{'width':'120px'}">
          <a-select-option value="001">姓名</a-select-option>
          <a-select-option value="002">门禁号</a-select-option>
        </a-select>
        <a-button type="primary"><a-icon type="search" />搜索</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="data"
        :scroll="{ x: 2090}"
        :pagination="pagination"
        bordered
        :style="{'margin-top':'15px'}"
      >
        <span slot="action" slot-scope="text">
          <a-button type="primary" size="small">查看</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>

const columns = [
  {
    title: "用户id",
    width: 180,
    dataIndex: "personId",
    key: "id",
    fixed: "left"
  },
  {
    title: "姓名",
    width: 100,
    dataIndex: "personName",
    key: "name",
    fixed: "left"
  },
  { title: "部门", dataIndex: "address", key: "1", width: 150 },
  { title: "账号", dataIndex: "address", key: "2", width: 150 },
  { title: "密码", dataIndex: "address", key: "3", width: 150 },
  { title: "权限", dataIndex: "address", key: "4", width: 150 },
  { title: "工号", dataIndex: "address", key: "5", width: 150 },
  { title: "身份证", dataIndex: "address", key: "6", width: 150 },
  { title: "电话", dataIndex: "address", key: "7", width: 150 },
  { title: "车牌", dataIndex: "address", key: "8", width: 150 },
  { title: "职位", dataIndex: "address", key: "9", width: 150 },
  { title: "工位编码", dataIndex: "address", key: "10", width: 150 },
  { title: "失效时间", dataIndex: "address", key: "11", width: 150 },
  {
    title: "照片",
    key: "photo",
    width: 80,
    scopedSlots: { customRender: "action" }
  },
  {
    title: "权限",
    key: "root",
    width: 80,
    scopedSlots: { customRender: "action" },
    fixed: "right"
  }
];

export default {
  data() {
    return {
      data: [],
      pagination:{},
      columns,

    }
  },
};
</script>

<style scoped>
.top {
  margin: 10px;
}
.container {
  margin-top: 20px;
  position: relative;
}
.sildtree {
  float: left;
  width: 250px;
  height: 400px;
  padding: 10px 0;
  margin-left: 10px;
  border: 1px solid #e0e0e0;
}
.sildtree > div:first-child {
  margin-bottom: 10px;
}
.sildtree .part_title {
  display: inline-block;
  width: 80px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #999999;
  margin: 0 5px;
}
.sildtable {
  position: absolute;
  left: 250px;
  top: 0;
  right: 20px;
  margin-left: 20px;
}
.sildtable .btns1,
.sildtable .btns2 {
  margin-top: 15px;
}

</style>