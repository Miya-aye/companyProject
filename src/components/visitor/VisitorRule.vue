<template>
  <div>
    <h4>
      访客规则
      <a-button type="primary" @click="showmodal">新增</a-button>
    </h4>
    <a-table
      :rowKey="record => record.devicename"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      :scroll="{x:1450}"
      bordered
      :style="{'margin-top':'15px','max-width':'1450px'}"
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
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "规则名称", width: 120, dataIndex: "devicename", key: "1" },
  { title: "适用对象", width: 120, dataIndex: "devicemode", key: "2" },
  { title: "受访人", width: 120, dataIndex: "devicetype", key: "3" },
  { title: "地址组", width: 120, dataIndex: "twolevel", key: "4" },
  { title: "摆放时间", width: 120, dataIndex: "workmode", key: "6" },
  { title: "有效次数", width: 120, dataIndex: "devicebrand", key: "7" },
  { title: "开门时长", width: 120, dataIndex: "remark", key: "9" },
  { title: "欢迎辞", width: 100, dataIndex: "remark", key: "5" },
  { title: "显示方式", width: 100, dataIndex: "remark", key: "8" },
  { title: "背景图", width: 100, dataIndex: "remark", key: "10" },
  { title: "备注", width: 100, dataIndex: "remark", key: "11" },
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
      datalist: [{devicename:'f5f5f55'}],
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