<template>
  <div class="sildtree" ref="sildtree">
    <div>
      <span class="part_title">部门列表</span>
      <a-button type="primary" size="small">增加</a-button>
      <a-button type="primary" size="small">编辑</a-button>
      <a-button type="primary" size="small">删除</a-button>
    </div>
    <a-directory-tree @rightClick="rightClick" :treeData="treeData" :loadData="onLoadData"></a-directory-tree>

    <ul ref="actions" class="deptclass" v-if="isshow" :style="acStyle">
      <li class="flag" @click="showmodal">添加子部门</li>
      <li class="flag" @click="editDept">修改</li>
      <li class="flag" @click="delDept">删除</li>
    </ul>
    <!-- 新增部门 -->
    <a-modal
      :maskClosable="false"
      :visible="addVisible" 
      title="新增/修改部门"
      width="400px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="()=>this.addVisible=false"
      @ok="addDept"
    >
      <a-form :form="form1">
        <a-form-item label="部门名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input v-decorator="['deptName']"></a-input>
        </a-form-item>
        <a-form-item label="上级部门" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input read-only v-decorator="['showparentname']"></a-input>
          <a-input type="hidden" v-decorator="['parentId']"></a-input>
          <a-input type="hidden" v-decorator="['deptId']"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      treeData: [],
      treeArr: [],
      isshow:false,
      acStyle:{},
      deptkey:'',//存当前节点的key
      depttitle:'',//存当前节点的title
      addVisible:false,
      deptparentkey:'',//存父节点的key
      deptparenttitle:'',//存父节点的title
    };
  },
  beforeCreate() {
    this.form1=this.$form.createForm(this);
  },
  created() {
    //获取部门数据，并存到数组，将最上级树节点添加并初始化
    axios.get("http://192.168.10.101:8001/org/dept/findAll").then(res => {
      let arr = res.data;
      this.treeArr = arr;
      for (let value of arr) {
        if (value.parentId == 0) {
          this.treeData.push({ title: value.deptName, key: value.deptId });
          return;
        }
      }
    });
  },
  mounted(){
      document.addEventListener('click',(e)=>{//鼠标点击任意非树的位置，隐藏树操作
        if(e.target.className!="flag"){
          this.isshow=false;
        }
      })
  },
  methods: {
    //部门树鼠标右键,设置操作栏位置与显隐,deptkey、depttitle存储右键时的当前部门id和名称
    rightClick({event, node}) {
      let x0=event.clientX;
      let y0=event.clientY;
      let x1=this.$refs.sildtree.offsetLeft;
      let y1=this.$refs.sildtree.offsetParent.offsetTop;
      let left=x0-x1;
      let top=y0-y1;
      this.acStyle={left:left+'px',top:top+'px'};
      this.isshow=true;
      this.deptkey=node.eventKey;
      this.depttitle=node.title;
      this.deptparentkey=node.$parent.eventKey;
      this.deptparenttitle=node.$parent.title;
      // console.log(node);
    },
    // 异步加载树的数据项
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        //设置当前选中项的key为父ID
        let parentId = treeNode.eventKey;
        let newArr = [];
        for (let value of this.treeArr) {
          //遍历数组，查找parentId为当前父ID的项，并添加到newArr数组
          if (parentId == value.parentId) {
            newArr.push({ title: value.deptName, key: value.deptId });
          }
        }
        setTimeout(() => {
          //延时加载子节点，
          treeNode.dataRef.children = newArr; //将匹配到的子节点添加到当前项的children中
          this.treeData = [...this.treeData]; //解构新的数组
          resolve();
        }, 50);
      });
    },
    //关闭树右键菜单，弹出新增/修改部门对话框
    showmodal(){
      this.isshow=false;
      this.addVisible=true;
      const form1=this.form1;
      setTimeout(()=>{
        form1.setFieldsValue({parentId:this.deptkey,showparentname:this.depttilte});
      },5);
      
    },
    //新增部门
    addDept(){
      const form1=this.form1;
      form1.validateFields((err,values)=>{
        if(err){
          return;
        }
        // console.log(values);
        axios.post('http://192.168.10.101:8001/org/dept/saveOrUpdate',{...values}).then(res=>{
          this.$notification.success({ message: "添加成功" });
          this.addVisible=false;
        }).catch(error=>{
          alert("操作失败："+error);
        })
      })
    },
    //修改部门
    editDept(){
      this.isshow=false;
      this.addVisible=true;
      const form1=this.form1;
      setTimeout(()=>{
        form1.setFieldsValue({deptId:this.deptkey,deptName:this.depttitle,showparentname:this.deptparenttitle,parentId:this.deptparentkey});
      },5)
    },
    //删除部门
    delDept(){
      this.isshow=false;
      let _this=this;
      this.$confirm({
        title: "是否确定删除？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          axios.delete('http://192.168.10.101:8001/org/dept/removeById/'+_this.deptkey).then((res)=>{
            _this.$notification.success({ message: "删除成功" });
          }).catch(error=>{
            alert("操作失败："+error);
          })
        }
      })
    }
  }
};
</script>

<style scoped>
.sildtree {
  float: left;
  width: 250px;
  height: 400px;
  padding: 10px 0;
  margin-left: 10px;
  border: 1px solid #e0e0e0;
  position: relative;
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
.deptclass{
  width:160px;
  height: auto;
  list-style-type: none;
  padding: 5px 0;
  position: absolute;
  z-index: 999999;
  border: 1px solid #555;
  box-shadow: 0 0 10px #f5f5f5;
  background-color: white;
}
.deptclass li{
  margin: 0 5px;
  height: 35px;
  line-height: 35px;
  border-bottom: 1px dashed #ddd;
  cursor: pointer;
}
.deptclass li:hover{
  color: lightseagreen;
}
</style>