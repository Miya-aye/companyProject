<template>
  <div>
    <div class="top">
      <a-button type="primary">人员管理</a-button>
      <a-button>离职人员</a-button>
      <a-button>分类管理</a-button>
    </div>

    <div class="container">
      <div class="sildtree">
        <div>
          <span class="part_title">部门列表</span>
          <a-button type="primary" size="small">增加</a-button>
          <a-button type="primary" size="small">编辑</a-button>
          <a-button type="primary" size="small">删除</a-button>
        </div>
        <a-directory-tree defaultExpandAll>
          <!-- :selectedKeys="['0-0-2']" -->
          <a-tree-node title="湖南捷报信息技术有限公司(10)" key="0-0">
            <a-tree-node title="行政部(2)" key="0-0-1" isLeaf/>
            <a-tree-node title="销售部(2)" key="0-0-2" isLeaf/>
            <a-tree-node title="市场部(2)" key="0-0-3" isLeaf/>
            <a-tree-node title="技术部(2)" key="0-0-4" isLeaf/>
            <a-tree-node title="商务部(2)" key="0-0-5" isLeaf/>
          </a-tree-node>
        </a-directory-tree>
      </div>

      <div class="sildtable">
        <div class="btns1">
          <a-button type="primary" @click="addperson">增加</a-button>
          <a-button type="primary" @click="editperson(selectedRowKeys)">编辑</a-button>
          <a-button type="primary">调动</a-button>
          <a-button type="primary">离职</a-button>
          <a-button type="primary">发卡</a-button>
          <a-button type="primary">指纹</a-button>
          <a-button type="primary">特征管理</a-button>
        </div>
        <div class="btns2">
          <a-input-search placeholder="请输入名字" style="width: 240px"/>
          <a-button type="primary">导入</a-button>
          <a-button type="primary">导出</a-button>
        </div>
        <a-table
          :rowKey="record => record.personUnikey"
          :rowSelection="{selectedRowKeys, onChange}"
          :columns="columns"
          :dataSource="data"
          :scroll="{ x: 2155}"
          :pagination="pagination"
          bordered
          :style="{'margin-top':'15px'}"
          @change="handleTableChange"
        >
          <span slot="action" >
            <a-button type="primary" size="small">查看</a-button>
          </span>
        </a-table>
      </div>
    </div>
    <add-edit ref="personForm" :visible="visible" @cancel="handleCancel" @create="handleCreate" @handelpostimg="uploadimg"/>
    <!-- <person-manage/> -->
  </div>
</template>

<script>
import axios from "axios";
// import PersonManage from "./PersonManage";

const columns = [
  {
    title: "用户id",
    width: 180,
    dataIndex: "personId",
    key: "id",
    fixed: "left"
  },
  {
    title: "姓名",
    width: 100,
    dataIndex: "personName",
    key: "name",
    fixed: "left"
  },
  { title: "部门", dataIndex: "address", key: "1", width: 150 },
  { title: "账号", dataIndex: "address", key: "2", width: 150 },
  { title: "密码", dataIndex: "address", key: "3", width: 150 },
  { title: "权限", dataIndex: "address", key: "4", width: 150 },
  { title: "工号", dataIndex: "address", key: "5", width: 150 },
  { title: "身份证", dataIndex: "address", key: "6", width: 150 },
  { title: "电话", dataIndex: "address", key: "7", width: 150 },
  { title: "车牌", dataIndex: "address", key: "8", width: 150 },
  { title: "职位", dataIndex: "address", key: "9", width: 150 },
  { title: "工位编码", dataIndex: "address", key: "10", width: 150 },
  { title: "失效时间", dataIndex: "address", key: "11", width: 150 },
  {
    title: "照片",
    key: "photo",
    width: 80,
    scopedSlots: { customRender: "action" }
  },
  {
    title: "权限",
    key: "root",
    width: 80,
    scopedSlots: { customRender: "action" },
    fixed: "right"
  }
];

// 添加人员---编辑人员组件
const AddEdit = {
  props: ["visible","file","imgPaths"],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleCancel_new () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList,file }) {
      if(file.status==="done"){
        // console.log(file.response.datas);
        const form=this.form;
        form.setFieldsValue({imgPaths:file.response.datas});

      }
      if (file.status === "uploading"){
        // console.log("loading");
      }
      this.fileList = fileList;
    }
    // getFile(event){
    //   this.file = event.target.files[0];
    // },
    // postimg(event) {
    //     //阻止元素发生默认的行为
    //     event.preventDefault();
    //     let formData = new FormData();
    //     formData.append("file", this.file);
    //       axios.post('http://192.168.10.101:8001/org/person/imgUpload', formData)
    //       .then((response)=> {
    //         this.imgPaths=response.data.datas;
    //         console.log(this.imgPaths);
    //         this.$emit('handelpostimg',this.imgPaths);
    //       })
    //       .catch((error)=>{
    //         alert("上传失败"+error);
    //       });
        
    //   }
  },
  template: `
    <a-modal
      :visible="visible"
      title="新增/修改人员信息"
      okText="确定"
      cancelText="取消"
      width='900px'
      @cancel="()=>{$emit('cancel')}"
      @ok="()=>{$emit('create')}"
    >
      <a-form :form="form" >
        <a-row :gutter="30">
          <a-col :span="6">
            <a-form-item>
              
              <a-upload
                action="http://192.168.10.101:8001/org/person/imgUpload"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-input type="hidden"  v-decorator="['imgPaths']"></a-input>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel_new">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>

            </a-form-item>
          </a-col>
          <a-col :span="18">
            <h4>详细信息</h4>
            <a-row>
              <a-col :span="12">
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input type="number" read-only v-decorator="['personId']"></a-input>
                </a-form-item>
                <a-form-item label="姓名" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input  v-decorator="['personName']"></a-input>
                </a-form-item>
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="用户id" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="身份证号码" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="联系电话" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input ></a-input>
                </a-form-item>
                <a-form-item label="车牌" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="职位" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-select>
                    <a-select-option value="01">组长</a-select-option>
                    <a-select-option value="02">成员</a-select-option>
                    <a-select-option value="03">陪护</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="工位编号" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="失效时间" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
                <a-form-item label="备注" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  `
};

//特征管理组件

export default {
  components: { AddEdit },
  data() {
    return {
      

      data: [],
      columns,
      pagination: {},
      visible: false,
      selectedRowKeys: [],
      mngVisible: true,
      file:'',
      imgPaths:''


    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
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
    fetch(params = {}) {
      //加载表格
      //表格的dataindex必须和json数据对象一一对应才能自动被展示
      axios
        .get("http://192.168.10.101:8001/org/person/list", {
          params: { current: 1, size: 5, ...params }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.pageSize = data.data.datas.size;
          pagination.total = data.data.datas.total;
          this.data = data.data.datas.records;
          this.pagination = pagination;
        });
    },
    addperson() {
      //弹出对话框
      this.visible = true;
    },
    handleCancel() {
      //隐藏对话框
      this.visible = false;
    },
    //
    handleCreate() {
      //提交form表单
      const form = this.$refs.personForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log(values);
        // axios
        //   .post("http://192.168.10.101:8001/org/person/saveOrUpdate", {
        //     ...values
        //   })
        //   .then(res => {
        //     //添加用户成功
        //     this.fetch({ pageSize: 5 });
        //   });
        //   console.log("提交:",form.validateFields());
        // form.resetFields();
        
        // this.visible = false;
      });
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
    },
    editperson(selectedRowKeys) {
      //编辑按钮操作
      // console.log(selectedRowKeys);
      if (selectedRowKeys.length == 1) {
        //选择的行数大于1时不做操作
        this.visible = true;

        const form = this.$refs.personForm.form;
        setTimeout(() => {
          axios
            .get(
              "http://192.168.10.101:8001/org/person/getByUnikey/" +
                selectedRowKeys[0]
            )
            .then(res => {
              this.msg_person = res.data.datas;
              form.setFieldsValue(this.msg_person);
            });
        }, 5);
      }
    },
    uploadimg(data){
      // console.log("触发uploadimg：",data);
      // const form = this.$refs.personForm.form;
      // form.setFieldsValue({imgPaths:data});
      // this.imgPaths=data;
    },
    

  },
  watch: {
  },
};
</script>

<style scoped>
.top {
  margin: 10px;
}
.container {
  margin-top: 20px;
  position: relative;
}
.sildtree {
  float: left;
  width: 250px;
  height: 400px;
  padding: 10px 0;
  margin-left: 10px;
  border: 1px solid #e0e0e0;
}
.sildtree > div:first-child {
  margin-bottom: 10px;
}
.sildtree .part_title {
  display: inline-block;
  width: 80px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #999999;
  margin: 0 5px;
}
.sildtable {
  position: absolute;
  left: 250px;
  top: 0;
  right: 20px;
  margin-left: 20px;
}
.sildtable .btns1,
.sildtable .btns2 {
  margin-top: 15px;
}
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
