<template>
  <div>
    <h4>
      位置设备组列表
      <a-button type="primary" @click="showModal">新建</a-button>
    </h4>
    <div class="tab1">
      <a-table
        :rowKey="record => record.eqgId"
        :columns="columnsgroup"
        :dataSource="datagroup"
        :pagination="pagination"
        bordered
        :style="{'margin-top':'15px'}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" @click="editgroup(record)">编辑</a-button>
          <a-button type="primary" size="small" @click="delgroup(record)">删除</a-button>
        </span>
      </a-table>
    </div>

    <!-- 设备列表组件 -->
    <basic-device-list />

    <!-- 设备组操作弹出框 -->
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    
  </div>
</template>

<script>
import axios from "axios";
import BasicDeviceList from "./BasicDeviceList";

const columnsgroup = [
  { title: "组名", dataIndex: "eqgName", key: "1" },
  { title: "上级主机", dataIndex: "name", key: "2" },
  { title: "功能类别", dataIndex: "eqgDesc", key: "3" },
  {
    title: "操作",
    key: "root",
    scopedSlots: { customRender: "action" }
  }
];


//设备组
const CollectionCreateForm = {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      centered
      title="新建设备组"
      :visible="visible"
      okText="确定"
      cancelText="取消"
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <div style="max-width:600px;">
        <a-form :form="form">
          <a-form-item label="组名称" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-input v-decorator="['eqgName']"></a-input>
            <a-input type="hidden" v-decorator="['eqgId']"></a-input>
            <a-input type="hidden" v-decorator="['deviceUnikeys']"></a-input>
          </a-form-item>
          <a-form-item label="上级主机" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['name']">
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="功能类别" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['eqgDesc']">
              <a-select-option value="巡控室">巡控室</a-select-option>
              <a-select-option value="对象房">对象房</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  `
};

//设备列表
// const Divice
export default {
  components: { CollectionCreateForm ,BasicDeviceList},
  data() {
    return {
      columnsgroup,
      pagination: {},
      datagroup: [],
      visible: false,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    //重载表格__设备组
    handleTableChange(pagination) {
      //表格操作触发,重载表格
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        size: pagination.pageSize,
        current: pagination.current
      });
    },
    //加载表格__设备组
    fetch(params = {}) {
      //表格的dataindex必须和json数据对象一一对应才能自动被展示
      axios
        .get("http://192.168.10.101:8002/eq/group/list", {
          params: { current: 1, size: 5, ...params }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.pageSize = data.data.datas.size;
          pagination.total = data.data.datas.total;
          this.datagroup = data.data.datas.records;
          this.pagination = pagination;
        });
    },
    //新建设备组
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        axios
          .post("http://192.168.10.101:8002/eq/group/saveOrUpdate", {
            ...values
          })
          .then(res => {
            this.fetch({ pageSize: 5 });
          });
        form.resetFields();
        this.visible = false;
      });
    },
    //删除设备组
    delgroup(res) {
      let eqgId = res.eqgId;
      let eqgName = res.eqgName;
      let _this = this;
      this.$confirm({
        title: "是否确定删除？",
        content: "将要删除设备组：" + eqgName,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          axios
            .delete("http://192.168.10.101:8002/eq/group/removeById/" + eqgId)
            .then(res => {
              _this.fetch({ pageSize: 5 });
            });
        }
      });
    },
    //编辑表格
    editgroup(res) {
      let eqgId = res.eqgId;
      this.visible = true;
      const form = this.$refs.collectionForm.form;
      setTimeout(() => {
        axios
          .get("http://192.168.10.101:8002/eq/group/findById/" + eqgId)
          .then(res => {
            form.setFieldsValue(res.data.datas);
          });
      }, 15);
    },
  }
};
</script>

<style scoped>
.tab1 {
  max-width: 600px;
}
</style>