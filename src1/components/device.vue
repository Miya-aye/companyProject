<template>
  <div>
    <h4>
      位置设备组列表
      <a-button type="primary" @click="showModal">新建</a-button>
    </h4>
    <div class="tab1">
      <a-table
        rowKey="id"
        :columns="columns1"
        :dataSource="data"
        bordered
        :style="{'margin-top':'15px'}"
      >
        <span slot="action" slot-scope="text">
          <a-button type="primary" size="small">编辑</a-button>
          <a-button type="primary" size="small">删除</a-button>
        </span>
      </a-table>
    </div>
    <h4>
      设备列表
      <a-button type="primary" @click="buliding('bulid_list')">新建</a-button>
    </h4>
    <div class="tab2">
      <a-table
        rowKey="id"
        :columns="columns2"
        :dataSource="data"
        bordered
        :scroll="{ x: 2210}"
        :style="{'margin-top':'15px'}"
      >
        <span slot="action" slot-scope="text">
          <a-button type="primary" size="small">编辑</a-button>
          <a-button type="primary" size="small">删除</a-button>
        </span>
      </a-table>
    </div>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <!-- <a-modal
      centered
      title="新建设备组"
      v-model="bulid_group"
      okText="确定"
      cancelText="取消"
      @submit="submit1"
    >
      <div style="max-width:600px;">
        <a-form :form="form">
          <a-form-item label="组名称" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-input v-decorator="['name',{rules: [{required: true,message: '请输入组名称!'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="上级主机" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['b_num',{rules: [{required: true,message: '请输入组名称!'}]}]">
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="功能类别" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['class',{rules: [{required: true,message: '请输入组名称!'}]}]">
              <a-select-option value="01">巡控室</a-select-option>
              <a-select-option value="02">对象房</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal> -->
  </div>
</template>

<script>
const columns1 = [
  { title: "组名", dataIndex: "id", key: "1" },
  { title: "上级主机", dataIndex: "name", key: "2" },
  { title: "功能类别", dataIndex: "address", key: "3" },
  {
    title: "操作",
    key: "root",
    scopedSlots: { customRender: "action" }
  }
];

const columns2 = [
  { title: "设备名称", width: 150, dataIndex: "id", key: "1" },
  { title: "所属组", width: 150, dataIndex: "name", key: "2" },
  { title: "设备类型", width: 150, dataIndex: "address", key: "3" },
  { title: "二级分类", width: 150, dataIndex: "address", key: "4" },
  { title: "设备品牌", width: 150, dataIndex: "address", key: "5" },
  { title: "设备型号", width: 150, dataIndex: "address", key: "6" },
  { title: "IP地址", width: 200, dataIndex: "address", key: "7" },
  { title: "端口号", width: 150, dataIndex: "address", key: "8" },
  { title: "通道号", width: 120, dataIndex: "address", key: "9" },
  { title: "预览账号", width: 200, dataIndex: "address", key: "10" },
  { title: "密码", width: 200, dataIndex: "address", key: "11" },
  { title: "图片路径", width: 250, dataIndex: "address", key: "12" },
  {
    title: "操作",
    width: 210,
    key: "root",
    fixed: "right",
    scopedSlots: { customRender: "action" }
  }
];

const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate () {
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
            <a-input v-decorator="['name',{rules: [{required: true,message: '请输入组名称!'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="上级主机" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['b_num',{rules: [{required: true,message: '请输入组名称!'}]}]">
              <a-select-option value="1">1</a-select-option>
              <a-select-option value="2">2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="功能类别" :label-col="{span:5}" :wrapper-col="{ span: 12 }">
            <a-select v-decorator="['class',{rules: [{required: true,message: '请输入组名称!'}]}]">
              <a-select-option value="01">巡控室</a-select-option>
              <a-select-option value="02">对象房</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  `,
};

export default {
  components: { CollectionCreateForm },
  data() {
    return {
      columns1,
      columns2,
      data: [
        // { id: 1, name: "xxxx", address: "ffwwaeawa" },
        // { id: 2, name: "xxxx", address: "ffwwaeawa" },
        // { id: 3, name: "xxxx", address: "ffwwaeawa" },
        // { id: 4, name: "xxxx", address: "ffwwaeawa" }
      ],
      bulid_group: false,
      bulid_list: false,
      visible:false
    };
  },
  created(){//http://172.16.0.88:8001/org/person/list?current=1&size=10
    this.$http.get('http://172.16.0.88:8001/org/person/list?current=1&size=10').then(
      (res)=>{
        console.log(res);
        this.data.push({
          id:res.body.datas.records["0"].carNumber,
          name:res.body.datas.records["0"].personName,
          address:res.body.datas.records["0"].personBirth
        })
      },
      (res)=>{
        alert("xxxx");
      }
    )
  },
  methods: {
    buliding(sw) {
      if (sw == "bulid_group") {
        this.bulid_group = true;
        console.log('xxx0');
      } else if (sw == "bulid_list") {
        this.bulid_list = true;
      }
    },
    showModal(){
        this.visible=true;
    },
    handleCancel(){
        this.visible = false;
    },
    handleCreate(){
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        this.$http.post('http://172.16.0.88:8001/org/person/saveOrUpdate',{carNumber:'dddd',personName:'wrrr'}).then(
          (res)=>{console.log(res)}
        )
        console
        this.data.push({id:values.name,name:values.b_num,address:values.class})
        form.resetFields();
        this.visible = false;
      });
    }
  }
};
</script>

<style scoped>
.tab1 {
  max-width: 600px;
}
</style>