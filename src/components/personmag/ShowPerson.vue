<template>
  <div>
    <div class="top">
      <a-button type="primary">人员管理</a-button>
      <a-button>离职人员</a-button>
      <a-button>分类管理</a-button>
    </div>

    <div class="container">
      <dept-tree/>

      <div class="sildtable">
        <div class="btns1">
          <a-button type="primary" @click="addperson">增加</a-button>
          <a-button type="primary" @click="editperson(selectedRowKeys)">编辑</a-button>
          <a-button type="primary" @click="changePartment">调动</a-button>
          <a-button type="primary" @click="resigned(selectedRowKeys)">离职</a-button>
          <a-button type="primary">发卡</a-button>
          <a-button type="primary">指纹</a-button>
          <a-button type="primary" @click="personmng">特征管理</a-button>
        </div>
        <div class="btns2">
          <a-input-search placeholder="请输入名字" style="width: 240px"/>
          <a-button type="primary">导入</a-button>
          <a-button type="primary">导出</a-button>
        </div>
        <a-table
          :rowKey="record => record.personId"
          :rowSelection="{selectedRowKeys, onChange}"
          :columns="columns"
          :dataSource="data"
          :scroll="{ x: 2155}"
          :pagination="pagination"
          bordered
          :style="{'margin-top':'15px'}"
          @change="handleTableChange"
        >
          <span slot="ckeckphoto" slot-scope="imgPaths">
            <a-button type="primary" size="small" @click="ckeckphoto(imgPaths)">查看</a-button>
          </span>
          <span slot="action">
            <a-button type="primary" size="small">查看</a-button>
          </span>
        </a-table>
      </div>
    </div>


    <add-edit
      ref="personForm"
      :visible="visible"
      :fileList="imgfileList"
      @cancel="handleCancel"
      @create="handleCreate"
      @handelpostimg="uploadimg"
    />
    <person-manage :managevisible="mngVisible" @closemng="modalclose"/>

    <change-dept :deptvisible="personMoveVis" @colsedept="deptmodalclose"/>

    <person-leav ref="personLeave" :personname="perLevName" :resignedvisible="personResigned" @colsePerLeave="PerLeaveModalClose"/>

    <!-- 查看照片 -->
    <a-modal
      :visible="imgshow"
      :footer="null"
      @cancel="()=>this.imgshow=false"
    >
      <div >
            <img :src="modal_img_src" style="width:100%">
      </div>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import PersonManage from "./PersonManage";
import AddEdit from "./AddEdit";
import ChangeDept from "./ChangeDept";
import PersonLeav from "./PersonLeav";
import DeptTree from "@/components/commons/DeptTree";

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
    dataIndex: "person.personName",
    key: "name",
    fixed: "left"
  },
  { title: "部门", dataIndex: "deptId", key: "1", width: 150 },
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
    dataIndex:'person.imgPaths',
    scopedSlots: { customRender: "ckeckphoto" }
  },
  {
    title: "权限",
    key: "root",
    width: 80,
    scopedSlots: { customRender: "action" },
    fixed: "right"
  }
];


export default {
  components: { AddEdit, PersonManage ,ChangeDept,PersonLeav,DeptTree},
  data() {
    return {
      data: [],
      columns,
      pagination: {},
      visible: false,
      selectedRowKeys: [],
      mngVisible: false,
      file: "",
      imgPaths: "",
      msg_person: "",
      personResigned: false,
      personMoveVis:false,
      imgshow:false,
      modal_img_src:'',
      perLevName:'',
      imgfileList:[],
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
      //人员：http://192.168.10.101:8001/org/person/list  员工： http://192.168.10.101:8001/org/staff/list
      axios
        .get("http://192.168.10.101:8001/org/staff/list", {
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
    //弹出特征管理（分发）
    personmng() {
      this.mngVisible = true;
    },
    //弹出添加人员
    addperson() {
      this.visible = true;
    },
    //隐藏对话框
    handleCancel() {
      this.visible = false;
    },
    //隐藏特征管理对话框
    modalclose() {
      this.mngVisible = false;
    },
    //添加人员信息，提交表单
    handleCreate() {
      const form = this.$refs.personForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        //员工：http://192.168.10.101:8001/org/staff/saveOrUpdate 人员：http://192.168.10.101:8001/org/person/saveOrUpdate
        axios
          .put("http://192.168.10.101:8001/org/staff/saveOrUpdate", {
            ...values
          })
          .then(res => {
            //添加用户成功
            this.fetch({ pageSize: 5 });
            this.$notification.success({ message: "用户添加成功" });
          })
          .catch(error => {
            alert("操作失败：" + error);
          });
        form.resetFields();
        this.visible = false;
      });
    },
    //人员列表勾选
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
    },
    //人员编辑操作
    editperson(selectedRowKeys) {
      if (selectedRowKeys.length == 1) {
        //选择的行数大于1时不做操作
        const form = this.$refs.personForm.form;
        this.visible = true;
        setTimeout(() => {
          //人员：http://192.168.10.101:8001/org/person/getByUnikey/  员工：http://192.168.10.101:8001/org/staff/getById/
          axios
            .get(
              "http://192.168.10.101:8001/org/staff/getById/" +
                selectedRowKeys[0]
            )
            .then(res => {
              this.msg_person = res.data.datas;
              console.log(this.msg_person);
              // console.log("11");
              form.setFieldsValue(this.msg_person);
              this.imgfileList.url=this.msg_person.person.imgPaths;
              // console.log(this.imgfileList.url);

              // const address=this.imgfileList.url;
              // console.log(address);

              // var imgfileList={}; 
              // imgfileList=JSON.parse(JSON.stringify(this.imgfileList)); 
              
              // let newVal = { "url":value };
              // this.$set(this.imgfileList, index, newVal);


              // const imgfileList =this.msg_person

              // this.imgfileList.push({
              //   url:this.msg_person.person.imgPaths,
              //   status:'done',
              //   // thumbUrl:this.msg_person.person.imgPaths
              // });
              // console.log(this.imgfileList);

            });
        }, 5);
      }
    },
    //上传图片
    uploadimg(data) {
      const form = this.$refs.personForm.form;
      form.setFieldsValue({ person:{imgPaths: data }});
      this.imgPaths = data;
    },
    //人员调动弹出
    changePartment() {
      this.personMoveVis = true;
    },
    //人员调动关闭
    deptmodalclose() {
      this.personMoveVis = false;
    },
    //弹出离职
    resigned(selectedRowKeys) {
      if(selectedRowKeys.length == 1){
        const form=this.$refs.personLeave.form;
        this.personResigned = true;
        setTimeout(() => {
          axios.get('http://192.168.10.101:8001/org/staff/getById/'+selectedRowKeys[0]).then(res=>{
              let name=res.data.datas.person.personName;
              this.perLevName=name;
              form.setFieldsValue({personId:res.data.datas.personId});
          }).catch(error=>{
            alert("操作失败："+error);
          })
        }, 5);
      }
    },
    PerLeaveModalClose(){
      this.personResigned = false;
    },
    // 查勘照片
    ckeckphoto(res){
      this.imgshow=true;
      this.modal_img_src="http://192.168.10.101:81"+res;
    },
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
