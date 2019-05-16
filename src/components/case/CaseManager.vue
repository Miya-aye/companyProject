<template>
  <div>
    <set-times/>
    
    <h4>门禁管理<a-button type="primary" @click="showmodal">新增</a-button></h4>
    <a-table
      :rowKey="record => record.devicename"
      :columns="columns2"
      :dataSource="datalist"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'30px','width':'1110px'}"
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
        <a-form-item label="规则名称" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="设备组选择" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-row :gutter="10">
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
            <a-col :span="8"><a-checkbox>设备组一</a-checkbox></a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="匹配组织成员" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-radio-group v-model="value">
            <a-radio value="01">按部门</a-radio>
            <a-radio value="02">按个人</a-radio>
          </a-radio-group>
          <div v-if="true" style="border:1px solid #333;height:300px;overflow:auto;">
            <div style="display:inline-block;width:200px;border:1px solid red;height:200px;"></div>
            <a-divider type="vertical" :style="{'height':'100%'}"></a-divider>
            <div style="display:inline-block;width:100px;border:1px solid green;"></div>
          </div>
        </a-form-item>
        <a-form-item label="时间段设置" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-time-picker></a-time-picker>
          <span>~</span>
          <a-time-picker></a-time-picker>
        </a-form-item>
        <a-form-item label="开门时长" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-input-number step="100"></a-input-number>
        </a-form-item>
        <a-form-item label="开门认证方式" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-select>
            <a-select-option value="01">人脸或者指纹或者刷卡</a-select-option>
            <a-select-option value="02">人脸+指纹</a-select-option>
            <a-select-option value="03">人脸+刷卡</a-select-option>
            <a-select-option value="04">刷卡+指纹</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" :labelCol="{span:8}" :wrapperCol="{span:14}">
          <a-textarea></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import SetTimes from './SetTimes';

const columns2 = [
  { title: "门禁规则名称", width: 150, dataIndex: "devicename", key: "5" },
  { title: "通道组", width: 150, dataIndex: "devicename", key: "1" },
  { title: "匹配部门", width: 150, dataIndex: "devicemode", key: "2" },
  { title: "匹配个人", width: 150, dataIndex: "devicetype", key: "3" },
  { title: "时间段", width: 150, dataIndex: "twolevel", key: "4" },
  { title: "开门时长", width: 150, dataIndex: "twolevel", key: "6" },
  {
    title: "操作",
    width: 210,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  components:{SetTimes},
  data() {
    return {
      columns2,
      datalist: [],
      pagination: {},
      visible: false,
      value:'01'
    };
  },
  methods: {
    handleTableChange() {},
    showmodal() {
      this.visible = true;
    }
  },
};
</script>

<style scoped>
.ant-row.ant-form-item{
  margin-bottom: 5px;
}
</style>