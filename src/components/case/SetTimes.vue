<template>
  <div>
    <h4>
      时间段设置
      <a-button type="primary" @click="showmodal">新增</a-button>
    </h4>
    <a-table
      :rowKey="record => record.z1"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','width':'1100px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="primary" size="small">删除</a-button>
      </span>
      <span slot="datas" slot-scope="z1">
        <span v-if="z1==1" style="color:green;font-size:18px;">√</span>
        <span v-else style="color:red;font-size:18px;">×</span>
      </span>
    </a-table>

    <a-modal
      :visible="visible"
      title="新增/编辑"
      width="300px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.visible=false"
      @ok="()=>this.visible=false"
    >
      <a-form>
        <a-form-item label="时间段编号" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-input-number></a-input-number>
        </a-form-item>
        <a-form-item label="时间段名称" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="通行开始时间" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-time-picker></a-time-picker>
        </a-form-item>
        <a-form-item label="通行结束时间" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-time-picker></a-time-picker>
        </a-form-item>
        <a-form-item label="有效期至" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-date-picker format="HH:mm"></a-date-picker>
        </a-form-item>
        <a-form-item label="时间段编号" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-checkbox>启用（注：****）</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "时间段编号", width: 150, dataIndex: "devicename", key: "5" },
  { title: "时间段名称", width: 150, dataIndex: "devicename", key: "1" },
  { title: "开始时间", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "结束时间", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "有效期", width: 150, dataIndex: "twolevel", key: "4" },
  {
    title: "启用",
    width: 150,
    dataIndex: "z1",
    key: "55",
    scopedSlots: { customRender: "datas" }
  },
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
      datalist: [{ z1: 0, z2: 1, z3: 1, z4: 0 ,workmode:'workmode'}],
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