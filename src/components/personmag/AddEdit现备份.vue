<template>
  <div>
    <a-modal
      :visible="visible"
      title="新增/修改人员信息"
      okText="确定"
      cancelText="取消"
      width="900px"
      :destroyOnClose="true"
      @cancel="()=>{$emit('cancel')}"
      @ok="()=>{$emit('create')}"
    >
      <a-form :form="form">
        <a-row :gutter="30">
          <a-col :span="6">
            <a-form-item>
              <!-- <input type="file" @change="getFile($event)">
              <input type="hidden" v-decorator="['person.imgPaths']">
              <a-button type="primary" @click="postimg($event)">提交</a-button>
               -->

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
              <a-input type="hidden"  v-decorator="['person.imgPaths']"></a-input>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel_new">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
              <!-- <a-button type="primary" @click="postimg($event)">提交</a-button> -->

            </a-form-item>
          </a-col>
          <a-col :span="18">
            <h4>详细信息</h4>
            <a-row>
              <a-col :span="12">
                <a-form-item label="姓名" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <a-input v-decorator="['person.personName']"></a-input>
                  <a-input type="hidden" v-decorator="['personId']"></a-input>
                </a-form-item>
                <a-form-item label="部门" :labelCol="{span:8}" :wrapperCol="{span:16}">
                  <!-- <a-input v-decorator="['deptId']"></a-input> -->
                  <a-select v-decorator="['deptId']">
                    <a-select-option v-for="(n,index) in deptarr" :key="index" :value="n.deptId">{{n.deptName}}</a-select-option>
                  </a-select>
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
                  <a-input></a-input>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["visible", "file", "imgPaths"],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      deptarr:[]
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created(){
    //部门存到数组
    axios.get('http://192.168.10.101:8001/org/dept/list?size=100').then(res=>{
      this.deptarr=res.data.records;
    })
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
        this.imgPaths=file.response.datas;
        this.$emit("handelpostimg", this.imgPaths);
      }
      if (file.status === "uploading"){
        // console.log("loading");
      }
      this.fileList = fileList;
    },
    // getFile(event) {
    //   this.file = event.target.files[0];
    // },
    // postimg(event) {
    //   //阻止元素发生默认的行为
    //   event.preventDefault();
    //   let formData = new FormData();
    //   formData.append("file", this.file);
    //   axios
    //     .post("http://192.168.10.101:8001/org/person/imgUpload", formData)
    //     .then(response => {
    //       console.log(response);
    //       this.imgPaths = response.data.datas;
    //       this.$emit("handelpostimg", this.imgPaths);
    //       this.$notification.success({ message: "图片添加成功" });
    //     })
    //     .catch(error => {
    //       alert("上传失败" + error);
    //     });
    // }
  }
};
</script>

<style scoped>

</style>