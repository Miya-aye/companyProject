<template>
  <div>
    <h4>门禁记录</h4>
    <a-form layout="inline">
      <a-form-item label="起止时间">
        <a-date-picker show-time format="YYYY-MM-DD HH:mm:ss"/>
        <span>~</span>
        <a-date-picker show-time format="YYYY-MM-DD HH:mm:ss"/>
      </a-form-item>
      <a-form-item label="姓名">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="通道组合">
        <a-select :style="{'width':'150px'}">
          <a-select-option value="01">选项一</a-select-option>
          <a-select-option value="02">选项二</a-select-option>
          <a-select-option value="03">选项三</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">搜索</a-button>
        <a-button type="primary" :style="{'margin-left':'20px'}">导出</a-button>
      </a-form-item>
    </a-form>

    <a-table
      :rowKey="record => record.deviceunikey"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','width':'1360px'}"
      @change="handleTableChange"
    ></a-table>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "姓名", width: 150, dataIndex: "devicename", key: "1" },
  { title: "性别", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "人员类型", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "部门", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "通道名称", width: 150, dataIndex: "workmode", key: "6" },
  { title: "人脸", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "时间", width: 150, dataIndex: "remark", key: "9" },
  { title: "状态", width: 100, dataIndex: "remark", key: "5" },
  { title: "指纹", width: 100, dataIndex: "remark", key: "5" },
  { title: "时间", width: 100, dataIndex: "remark", key: "5" },
  { title: "刷卡", width: 100, dataIndex: "remark", key: "5" },
  { title: "时间", width: 100, dataIndex: "remark", key: "5" },
  { title: "状态", width: 100, dataIndex: "remark", key: "5" },
  {
    title: "操作",
    width: 210,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      columns2,
      datalist: [],
      pagination: {}
    };
  },
  methods: {
    handleTableChange() {},
  },
};
</script>

<style scoped>
</style>