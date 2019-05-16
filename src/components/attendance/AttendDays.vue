<template>
  <div>
    <h4>
      班次管理
      <a-button type="primary" @click="showmodal">新增</a-button>
    </h4>
    <a-table
      :rowKey="record => record.z1"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','width':'1060px'}"
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
      <span slot="datas" slot-scope="z2">
        <span v-if="z2==1" style="color:green;font-size:18px;">√</span>
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
        <a-form-item label="班次名称">
          <a-input :style="{'width':'200px'}"></a-input>
        </a-form-item>
        <a-divider :style="{'margin':'2px 0'}"/>
        <a-form-item>
          <a-checkbox>星期一</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期二</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期三</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期四</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期五</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期六</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-checkbox>星期天</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "班次名称", width: 150, dataIndex: "name", key: "name" },
  {
    title: "周一",
    width: 100,
    dataIndex: "z1",
    key: "1",
    scopedSlots: { customRender: "datas" }
  },
  { title: "周二", width: 100, dataIndex: "z2", key: "2" ,scopedSlots: { customRender: "datas" }},
  { title: "周三", width: 100, dataIndex: "z3", key: "3" },
  { title: "周四", width: 100, dataIndex: "z4", key: "4" },
  { title: "周五", width: 100, dataIndex: "workmode", key: "6" },
  { title: "周六", width: 100, dataIndex: "devicebrand", key: "7" },
  { title: "周日", width: 100, dataIndex: "remark", key: "9" },
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
.ant-row.ant-form-item{
  margin-bottom: 5px;
}
</style>