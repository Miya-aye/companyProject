<template>
  <div>
    <h4>
      考勤时间段管理
      <a-button type="primary" @click="showmodal">新增</a-button>
    </h4>
    <a-table
      :rowKey="record => record.deviceunikey"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','width':'1360px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="primary" size="small">删除</a-button>
      </span>
    </a-table>

    <a-modal
      :visible="visible"
      title="新增/编辑"
      width="700px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.visible=false"
      @ok="()=>this.visible=false"
    >
      <a-form>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="时间段名称" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="上班时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item label="记迟到时间(分钟)" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="开始签到时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item label="开始签退时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-checkbox>必须签到</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="计数(工作日)" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="下班时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item label="记早退时间(分钟)" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="结束签到时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item label="结束签退时间" :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-time-picker/>
            </a-form-item>
            <a-form-item :labelCol="{span:10}" :wrapperCol="{span:10}">
              <a-checkbox>必须签退</a-checkbox>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "时间段名称", width: 150, dataIndex: "devicename", key: "1" },
  { title: "上班时间", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "下班时间", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "开始签到时间", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "结束签到时间", width: 150, dataIndex: "workmode", key: "6" },
  { title: "开始签退时间", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "结束签退时间", width: 150, dataIndex: "remark", key: "9" },
  { title: "计数", width: 100, dataIndex: "remark", key: "5" },
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