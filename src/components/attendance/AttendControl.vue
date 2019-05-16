<template>
  <div>
    <attend-times/>
    <attend-days :style="{'margin-top':'30px'}"/>

    <div :style="{'margin-top':'30px'}">
      <h4>
        考勤规则
        <a-button type="primary" @click="showmodal">新增</a-button>
      </h4>
      <a-table
        :rowKey="record => record.deviceunikey"
        :columns="columns2"
        :dataSource="datalist"
        :pagination="pagination"
        bordered
        :style="{'margin-top':'15px','width':'1260px'}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text">
          <a-button type="primary" size="small">编辑</a-button>
          <a-button type="primary" size="small">删除</a-button>
        </span>
      </a-table>
    </div>

    <a-modal
      :visible="visible"
      title="新增/编辑"
      width="400px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.visible=false"
      @ok="()=>this.visible=false"
    >
      <a-form>
        <a-form-item label="规则名称" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="时间段" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="时间段1" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="时间段2" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="时间段3" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="时间段4" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班次管理名称" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="考勤人员" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">意义</a-select-option>
            <a-select-option value="02">意义</a-select-option>
            <a-select-option value="03">意义</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";

import AttendTimes from "./AttendTimes";
import AttendDays from "./AttendDays";

const columns2 = [
  { title: "考勤规则名称", width: 150, dataIndex: "devicename", key: "1" },
  { title: "考勤时间段1", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "考勤时间段1", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "考勤时间段1", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "考勤时间段1", width: 150, dataIndex: "workmode", key: "6" },
  { title: "班次管理名称", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "考勤人员", width: 150, dataIndex: "remark", key: "9" },
  {
    title: "操作",
    width: 210,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  components: { AttendTimes, AttendDays },
  data() {
    return {
      columns2,
      datalist: [],
      pagination: {},
      visible: false
    };
  },
  methods: {
    handleTableChange() {},
    showmodal() {
      this.visible = true;
    }
  }
};
</script>

<style scoped>
</style>