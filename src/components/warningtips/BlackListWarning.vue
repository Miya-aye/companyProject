<template>
  <div>
    <h4>
      黑名单报警规则管理
      <a-button type="primary" @click="showmodal">新增</a-button>
    </h4>
    <a-table
      :rowKey="record => record.devicename"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      :scroll="{x:1660}"
      bordered
      :style="{'margin-top':'15px','max-width':'1660px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="primary" size="small">删除</a-button>
      </span>
      <span slot="check" slot-scope="text">
        <a-button type="primary" size="small">查看</a-button>
      </span>
    </a-table>

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
        <a-form-item label="规则名称" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="报警类型" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-select>
            <a-select-option value="01">陌生人报警</a-select-option>
            <a-select-option value="02">黑名单报警</a-select-option>
            <a-select-option value="03">停留报警</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="报警地址组" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-select>
            <a-select-option value="01">选项一</a-select-option>
            <a-select-option value="02">选项二</a-select-option>
            <a-select-option value="03">选项三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="目标人群" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-select>
            <a-select-option value="01">选项一</a-select-option>
            <a-select-option value="02">选项二</a-select-option>
            <a-select-option value="03">选项三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关联监控" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-radio-group>
            <a-radio value="true">是</a-radio>
            <a-radio value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="报警时长" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="报警语" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-select>
            <a-select-option value="01">选项一</a-select-option>
            <a-select-option value="02">选项二</a-select-option>
            <a-select-option value="03">选项三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="照片显示方式" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-select>
            <a-select-option value="01">只显示底库图</a-select-option>
            <a-select-option value="02">只显示抓拍图</a-select-option>
            <a-select-option value="03">显示底库和抓拍图</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="背景图" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="报警通知方式" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="停留时长" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="失效条件" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="备注" :labelCol="{span:10}" :wrapperCol="{span:10}">
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
const columns2 = [
  { title: "规则名称", width: 150, dataIndex: "devicename", key: "1" },
  { title: "类型", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "地址组", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "目标人群", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "关联监控视频", width: 150, dataIndex: "workmode", key: "6" },
  { title: "报警时长", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "报警语", width: 150, dataIndex: "remark", key: "9" },
  { title: "照片显示方式", width: 100, dataIndex: "remark", key: "5" },
  {
    title: "背景图",
    width: 100,
    dataIndex: "remark",
    key: "8",
    scopedSlots: { customRender: "check" }
  },
  { title: "通知", width: 100, dataIndex: "remark", key: "10" },
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
      datalist: [{ devicename: "wefqwr" }],
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
form .ant-form-item {
  margin-bottom: 8px;
}
</style>