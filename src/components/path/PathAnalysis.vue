<template>
  <div>
    <h4>轨迹分析</h4>
    <a-form layout="inline">
      <a-form-item label="人员类型">
        <a-select style="width:150px;" defaultValue="01">
          <a-select-option value="01">全部</a-select-option>
          <a-select-option value="02">库内人员</a-select-option>
          <a-select-option value="03">访客</a-select-option>
          <a-select-option value="04">黑名单</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="位置">
        <a-select style="width:150px;" defaultValue="01">
          <a-select-option value="01">全部</a-select-option>
          <a-select-option value="02">库内人员</a-select-option>
          <a-select-option value="03">访客</a-select-option>
          <a-select-option value="04">黑名单</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="姓名">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="时间段">
        <a-date-picker/>
        <span>~</span>
        <a-date-picker/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider :style="{'margin-botton':'10px'}"/>
    <a-table
      :rowKey="record => record.devicename"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','width':'850px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text">
        <a-button type="primary" size="small">生成路线图</a-button>
        <a-button type="primary" size="small">查看详细轨迹</a-button>
        <a-button type="primary" size="small">门禁识别统计</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import axios from "axios";

const columns2 = [
  { title: "人员", width: 150, dataIndex: "devicename", key: "1" },
  { title: "人员类型", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "部门", width: 150, dataIndex: "devicetype", key: "3" },
  {
    title: "操作",
    width: 400,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns2,
      datalist: [{ devicename: "daaa" }],
      pagination: {}
    };
  },
  methods: {
    handleTableChange() {}
  }
};
</script>

<style scoped>
</style>