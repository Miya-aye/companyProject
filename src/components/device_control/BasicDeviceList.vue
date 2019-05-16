<template>
  <div>
    <h4>
      基础设备列表
      <a-button type="primary" @click="createDevice">新建</a-button>
    </h4>
    <div>
      <a-table
        :rowKey="record => record.uuid"
        :columns="columns2"
        :dataSource="datalist"
        :pagination="pagination"
        bordered
        :style="{'margin-top':'15px','width':'1330px'}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" @click="editBasicDev(record)">编辑</a-button>
          <a-button type="primary" size="small" @click="delBasicDev(record)">删除</a-button>
        </span>
        <span slot="devtype" slot-scope="devicetype">
          <span v-if="devicetype=='0'">一体机</span>
          <span v-else-if="devicetype=='1'">自带算法摄像机</span>
          <span v-else-if="devicetype=='2'">指纹机</span>
          <span v-else-if="devicetype=='3'">门磁继电器</span>
          <span v-else-if="devicetype=='4'">太古算法机</span>
          <span v-else>undefined</span>
        </span>
        <span slot="twotype" slot-scope="twolevel">
          <span v-if="twolevel=='0'">普通摄像机</span>
          <span v-else-if="twolevel=='1'">高清摄像机</span>
          <span v-else-if="twolevel=='2'">算法摄像机</span>
          <span v-else-if="twolevel=='3'">继电器-门禁</span>
          <span v-else-if="twolevel=='4'">继电器-警报</span>
          <span v-else>undefined</span>
        </span>
        <span slot="worktype" slot-scope="workmode">
          <span v-if="workmode=='0'">抓拍模式</span>
          <span v-else-if="workmode=='1'">跟踪模式</span>
          <span v-else-if="workmode=='2'">被动模式</span>
          <span v-else-if="workmode=='3'">主动模式</span>
          <span v-else>undefined</span>
        </span>
      </a-table>
    </div>
    <!-- 新建修改设备 -->

    <a-modal
      ref="deviceForm"
      :maskClosable="false"
      :visible="createDeviceVis"
      title="新建/修改基础设备"
      width="800px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.createDeviceVis=false"
      @ok="addDevice"
    >
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="设备名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['devicename']"></a-input>
              <a-input type="hidden" v-decorator="['uuid']"></a-input>
            </a-form-item>
            <a-form-item label="设备型号" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <!-- <a-input v-decorator="['devicemode']"></a-input> -->
              <a-select v-decorator="['devicemode']">
                <a-select-option value="NIREN_MAGNETISM">泥人网络继电器</a-select-option>
                <a-select-option value="YUEMIAN_ALGORITHMIC">阅面繁星远程摄像机</a-select-option>
                <a-select-option value="YUFAN_INTEGRATED">宇泛人脸识别机</a-select-option>
                <a-select-option value="ZKT_CARD_PRINT">指纹打卡机</a-select-option>
                <a-select-option value="JULONG_ALGORITHMIC">巨龙远程对比机</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="二级类型" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select v-decorator="['twolevel']">
                <a-select-option value="0">普通摄像机</a-select-option>
                <a-select-option value="1">高清摄像机</a-select-option>
                <a-select-option value="2">算法摄像机</a-select-option>
                <a-select-option value="3">继电器-门禁</a-select-option>
                <a-select-option value="4">继电器-警报</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="设备品牌" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-decorator="['devicebrand']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="设备类型" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select v-decorator="['devicetype']">
                <a-select-option v-for="(n,index) in devicetypearr" :key="index" :value="n.value">{{n.til}}</a-select-option>
                <!-- <a-select-option value="0">一体机</a-select-option>
                <a-select-option value="1">自带算法摄像机</a-select-option>
                <a-select-option value="2">指纹机</a-select-option>
                <a-select-option value="3">门磁继电器</a-select-option>
                <a-select-option value="4">太古算法机</a-select-option> -->
              </a-select>
            </a-form-item>
            <a-form-item label="工作模式" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select v-decorator="['workmode']">
                <a-select-option value="0">抓拍模式</a-select-option>
                <a-select-option value="1">跟踪模式</a-select-option>
                <a-select-option value="2">被动模式</a-select-option>
                <a-select-option value="3">主动模式</a-select-option>
              </a-select>
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
  { title: "设备名称", width: 180, dataIndex: "devicename", key: "1" },
  { title: "设备型号", width: 180, dataIndex: "devicemode", key: "2" },
  {
    title: "设备类型",
    width: 180,
    dataIndex: "devicetype",
    key: "3",
    scopedSlots: { customRender: "devtype" }
  },
  {
    title: "二级类型",
    width: 120,
    dataIndex: "twolevel",
    key: "4",
    scopedSlots: { customRender: "twotype" }
  },
  {
    title: "工作模式",
    width: 120,
    dataIndex: "workmode",
    key: "6",
    scopedSlots: { customRender: "worktype" }
  },
  { title: "设备品牌", width: 150, dataIndex: "devicebrand", key: "7" },
  { title: "备注", width: 220, dataIndex: "remark", key: "9" },
  {
    title: "操作",
    width: 180,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];

const devicetypearr = [
  { value: 0, til: "一体机" },
  { value: 1, til: "自带算法摄像机" },
  { value: 2, til: "指纹机" },
  { value: 3, til: "门磁继电器" },
  { value: 4, til: "太古算法机" }
];

export default {
  data() {
    return {
      columns2,
      pagination: {},
      datalist: [],
      createDeviceVis: false,
      devicetypearr
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.fetch();
  },
  methods: {
    //重载表格__基本设备
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
    //加载表格__基本设备
    fetch(params = {}) {
      //表格的dataindex必须和json数据对象一一对应才能自动被展示
      axios
        .get("http://192.168.10.101:9898/getBaseDeviceList", {
          params: { limit: 5, page: 1, ...params }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.pageSize = data.data.count;
          pagination.total = data.data.count;
          this.datalist = data.data.data;
          this.pagination = pagination;
        });
    },
    //打开弹出框
    createDevice() {
      this.createDeviceVis = true;
    },
    //新增基础设备
    addDevice() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        axios
          .post(
            "http://192.168.10.101:9898/saveBaseDevice",
            qs.stringify(values)
          )
          .then(res => {
            this.fetch({ limit: 5 });
            form.resetFields();
            this.createDeviceVis = false;
          })
          .catch(error => {
            alert("添加失败:" + error);
          });
      });
    },
    //编辑设备
    editBasicDev(res) {
      this.createDeviceVis = true;
      const form = this.form;
      setTimeout(() => {
        form.setFieldsValue(res);
      }, 50);
    },
    delBasicDev(res) {
      let id = res.uuid;
      let _this = this;
      this.$confirm({
        title: "是否确定删除？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          axios
            .post(
              "http://192.168.10.101:9898/deleteBaseDeviceById",
              qs.stringify({ id })
            )
            .then(res => {
              _this.fetch({ limit: 5 });
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>