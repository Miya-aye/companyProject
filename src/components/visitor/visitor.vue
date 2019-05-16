<template>
  <div>
    <h4>
      访客管理
      <a-button type="primary">批量导入</a-button>
      <a-button type="primary">批量导出</a-button>
    </h4>
    <div>
      成员列表
      <a-select :style="{'width':'140px'}">
        <a-select-option value="01">选项一</a-select-option>
        <a-select-option value="02">选项一</a-select-option>
        <a-select-option value="03">选项一</a-select-option>
      </a-select>
      <a-button type="primary">搜索</a-button>
      <a-button type="primary" @click="showmodal">新建</a-button>
      <a-button type="primary">修改</a-button>
      <a-button type="danger">删除</a-button>
    </div>
    <a-table
      :rowKey="record => record.devicetype"
      :rowSelection="{selectedRowKeys, onChange}"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      :scroll="{x:1895}"
      bordered
      :style="{'margin-top':'15px'}"
      @change="handleTableChange"
    >
      <span slot="look" slot-scope="remark">
        <a-button type="primary" size="small">查看</a-button>
      </span>
    </a-table>

    <a-modal
      :visible="visible"
      title="新增/编辑"
      width="900px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.visible=false"
      @ok="()=>this.visible=false"
    >
      <a-form>
        <a-row :gutter="20">
          <a-col :span="6">
            <h4>访客规则</h4>
            <a-checkbox-group :options="plainOptions" v-model="value" @change="checked"></a-checkbox-group>
            <a-divider/>
            <a-button type="primary">新建访客规则</a-button>
          </a-col>
          <a-col :span="9">
            <h4>详细信息</h4>
            <a-form-item label="姓名" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="访客类型" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-select>
                <a-select-option value="001">普通访客</a-select-option>
                <a-select-option value="002">领导/嘉宾</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="分组" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="职务称谓" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="公司名称" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="联系电话" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item>
              <input type="file">
              <a-button type="primary">提交</a-button>
            </a-form-item>
            <a-form-item label="身份证号码" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="受访者" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="失效时间" :labelCol="{span:7}" :wrapperCol="{span:12}">
              <a-date-picker/>
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
  { title: "用户id", width: 150, dataIndex: "devicename", key: "1" },
  { title: "姓名", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "访客类型", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "分组", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "职务称谓", width: 150, dataIndex: "workmode", key: "6" },
  { title: "公司名称", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "联系电话", width: 150, dataIndex: "remark", key: "9" },
  { title: "身份证", width: 100, dataIndex: "remark", key: "5" },
  { title: "拜访人", width: 100, dataIndex: "remark", key: "8" },
  { title: "失效时间", width: 110, dataIndex: "remark", key: "10" },
  { title: "访客规则", width: 180, dataIndex: "remark", key: "12" },
  { title: "备注", width: 180, dataIndex: "remark", key: "13" },
  {
    title: "照片",
    width: 100,
    dataIndex: "remark",
    key: "14",
    scopedSlots: { customRender: "look" }
  }
];

export default {
  data() {
    return {
      columns2,
      datalist: [{ workmode: "0", devicetype: "04" }],
      pagination: {},
      visible: false,
      selectedRowKeys: [],
      plainOptions: ["f1", "f2", "f3"],
      value: []
    };
  },
  methods: {
    handleTableChange() {},
    onChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    showmodal() {
      this.visible = true;
    },
    checked(checkedValues) {
      this.value = checkedValues;
    }
  }
};
</script>

<style scoped>
</style>