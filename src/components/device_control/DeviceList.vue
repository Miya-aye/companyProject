<template>
  <div>
    <h4>
      设备列表
      <a-button type="primary" @click="createDevice">新建</a-button>
    </h4>
    <div>
      <a-table
        :rowKey="record => record.deviceunikey"
        :columns="columns2"
        :dataSource="datalist"
        :pagination="pagination"
        :scroll="{x:1230}"
        bordered
        :style="{'margin-top':'15px','max-width':'1230px'}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" @click="editDevice(record)">编辑</a-button>
          <a-button type="primary" size="small" @click="delDevice(record)">删除</a-button>
        </span>
        <span slot="status" slot-scope="devicestatus">
          <span v-if="devicestatus=='0'">正常</span>
          <span v-else-if="devicestatus=='1'">未启用</span>
          <span v-else-if="devicestatus=='2'">损坏</span>
          <span v-else-if="devicestatus=='3'">未连接</span>
          <span v-else-if="devicestatus=='4'">已连接</span>
          <span v-else>undefined</span>
        </span>
      </a-table>
    </div>
    <a-modal
      ref="deviceListForm"
      :maskClosable="false"
      :visible="visible" 
      title="新增/修改设备信息"
      width="800px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.visible=false"
      @ok="addDevice"
    >
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="设备名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select v-decorator="['basedeviceuuid']" @change="finduuid" >
                <a-select-option v-for="(n,index) in devicearr" :key="index" :value="n.uuid.toString()">{{n.devicename}}</a-select-option>
              </a-select>
              <a-input type="hidden" v-decorator="['devicecallback']"></a-input>
              <a-input type="hidden" v-decorator="['uuid']"></a-input>
            </a-form-item>
            <a-form-item label="通道号" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['devicechannel']"></a-input>
            </a-form-item>
            <a-form-item label="设备IP地址" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceip']"></a-input>
            </a-form-item>
            <a-form-item v-if="deviceID=='NIREN_MAGNETISM'" label="设备延时操作" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceperatortime']"></a-input>
            </a-form-item>
            <a-form-item label="设备硬件码" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceuuid']"></a-input>
            </a-form-item>
            <a-form-item label="ftp账号" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['ftpaccout']"></a-input>
            </a-form-item>
            <a-form-item label="ftp密码" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['ftppwd']"></a-input>
            </a-form-item>
            
          </a-col>
          <a-col :span="12">
            <a-form-item label="设备地址" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceaddress']"></a-input>
            </a-form-item>
            <a-form-item v-if="deviceID=='NIREN_MAGNETISM'?true:deviceID=='ZKT_CARD_PRINT'" label="设备调用模式" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['devicemodel']"></a-input>
            </a-form-item>
            <a-form-item label="设备端口" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceport']"></a-input>
            </a-form-item>
            <a-form-item label="设备预览账号" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['deviceaccout']"></a-input>
            </a-form-item>
            <a-form-item label="设备账号密码" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['devicepwd']"></a-input>
            </a-form-item>
            <a-form-item label="备注" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-textarea v-decorator="['remark']"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

const columns2 = [
  // { title: "基础设备key", width: 140, dataIndex: "basedeviceuuid", key: "1" },
  { title: "设备名称", width: 180, dataIndex: "devicename", key: "7" },
  { title: "设备地址", width: 180, dataIndex: "deviceaddress", key: "2" },
  { title: "通道号", width: 80, dataIndex: "devicechannel", key: "3" },
  { title: "设备ip地址", width: 170, dataIndex: "deviceip", key: "4" },
  // { title: "mac地址", width: 80, dataIndex: "devicemac", key: "5" },
  // { title: "设备调用模式", width: 140, dataIndex: "devicemodel", key: "6" },
  // {title: "设备延时操作",width: 120,dataIndex: "deviceperatortime",key: "8"},
  { title: "设备端口", width: 100, dataIndex: "deviceport", key: "9" },
  { title: "当前状态", width: 100, dataIndex: "devicestatus", key: "10" ,scopedSlots: { customRender: "status" }},
  // { title: "设备key", width: 300, dataIndex: "deviceunikey", key: "11" },
  // { title: "设备组信息", width: 120, dataIndex: "devicegroup", key: "12" },
  // { title: "设备uuid", width: 190, dataIndex: "deviceuuid", key: "13" },
  // { title: "ftp账号", width: 120, dataIndex: "ftpaccout", key: "14" },
  // { title: "ftp密码", width: 100, dataIndex: "ftppwd", key: "15" },
  // { title: "预览账号", width: 120, dataIndex: "deviceaccout", key: "16" },
  // { title: "预览账号密码", width: 100, dataIndex: "devicepwd", key: "17" },
  { title: "备注", width: 220, dataIndex: "remark", key: "18" },
  {
    title: "操作",
    width: 200,
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
      visible:false,
      devicearr:[],
      deviceID:'',
      defaultValue:'22'
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.fetch();
    //将基本设备表存到数组中
    axios.get('http://192.168.10.101:9898/getBaseDeviceList').then(res=>{
      this.devicearr=res.data.data;
    })
  },
  methods: {
    //重载表格__设备
    handleTableChange(pagination) {
      //表格操作触发,重载表格
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        limit: pagination.pageSize,
        page: pagination.current
      });
    },
    //加载表格__设备
    fetch(params = {}) {
      //表格的dataindex必须和json数据对象一一对应才能自动被展示
      axios
        .get("http://192.168.10.101:9898/getHardwareDeviceInfoList", {
          params: { limit: 5, page: 1, ...params }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.pageSize = data.data.pageSize;
          pagination.total = data.data.total;
          this.datalist = data.data.list;
          this.pagination = pagination;
        });
    },
    createDevice() {
      this.visible=true;
    },
    addDevice(){
      const form=this.form;
      form.validateFields((err,values)=>{
        if(err){
          return;
        }
        axios.post('http://192.168.10.101:9898/saveHardwareDeviceInfo',qs.stringify(values)).then(res=>{
          this.fetch({ limit: 5 ,page:this.pagination.current});
          form.resetFields();
          this.visible = false;
          this.$notification.success({ message: "添加成功" });
        }).catch(error=>{
          alert("操作失败："+error);
        })
      })
    },
    //根据选择的基础设备id判断是否显示devicemodel等切换显示的选项
    finduuid(value){
      for(let i of this.devicearr){
        if(i.uuid==value){
          this.deviceID=i.devicemode;
          return;
        }
      }
    },
    editDevice(res){
      this.visible=true;
      const form=this.form;
      setTimeout(()=>{
        form.setFieldsValue(res);
        this.defaultValue=res.uuid;
        
      },50)
    },
    delDevice(res){
      console.log(res);
    }
  }
};
</script>

<style scoped>
</style>