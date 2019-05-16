<template>
  <div>
    <h4>报警事件规则</h4>
    <a-button type="primary" @click="showmodal">新增</a-button>
    <a-table
      :rowKey="record => record.name"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','max-width':'1110px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="danger" size="small">删除</a-button>
      </span>
    </a-table>
    <!-- 新增/编辑 -->
    <a-modal 
      :visible="addeditvisible" 
      title="新增/编辑"
      okText="确定"
      cancelText="取消"
      width='400px'
      :destroyOnClose="true"
      @cancel="()=>this.addeditvisible=false"
      @ok="()=>this.addeditvisible=false"
    >
      <a-form>
        <a-form-item label="规则名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="位置名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="所属设备组" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="01">组一</a-select-option>
            <a-select-option value="02">组二</a-select-option>
            <a-select-option value="03">组三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="调用事件" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="01">设备一</a-select-option>
            <a-select-option value="02">设备二</a-select-option>
            <a-select-option value="03">设备三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="通道选择" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="01">通道一</a-select-option>
            <a-select-option value="02">通道二</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="报警时长" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input type="number"></a-input>
        </a-form-item>
        <a-form-item label="匹配人员" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="01">通道一</a-select-option>
            <a-select-option value="02">通道二</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-textarea></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

const columns = [
  { title: "规则名称", width: 180, dataIndex: "name", key: "id" },
  { title: "位置名称", width: 100, dataIndex: "name", key: "name" },
  { title: "地址组名", width: 100, dataIndex: "name", key: "4" },
  { title: "设备", dataIndex: "address", key: "1", width: 150 },
  { title: "通道选择", dataIndex: "address", key: "2", width: 100 },
  { title: "报警时长", dataIndex: "address", key: "3", width: 100 },
  { title: "备注", dataIndex: "address", key: "5", width: 200 },
  {
    title: "操作",
    key: "root",
    width: 180,
    scopedSlots: { customRender: "action" },
  }
];
export default {
  data() {
    return {
      columns,
      pagination: {},
      data: [{name:'f1f1f1',address:'ff5f55f5f'}],
      addeditvisible:false,
      devicegroup:''
    };
  },
  methods: {
    handleTableChange() {

    },
    showmodal(){
      this.addeditvisible=true;
    },
    selDeviceGroup(value){
      this.devicegroup=value;
    }
  }
};
</script>

<style scoped>
</style>