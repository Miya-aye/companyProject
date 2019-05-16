<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="企业信息" key="1">
        <div class="company">
          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="12" class="company_main">
              <a-row>
                <a-col :span="8">商户名称：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14" class="underline">湖南捷报信息技术有限公司</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">公司logo：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                  <a-upload action="//jsonplaceholder.typicode.com/posts/" listType="picture" >
                    <a-button>
                      <a-icon type="upload" /> 上传公司logo
                    </a-button>
                  </a-upload>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">公司执照：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                  <a-upload action="//jsonplaceholder.typicode.com/posts/" listType="picture" class="upload-list-inline">
                    <a-button>
                      <a-icon type="upload" /> 上传营业执照
                    </a-button>
                  </a-upload>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">修改密码：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                  <a-form-item>
                      <a-input
                        v-decorator="[
                          'password',
                          { rules: [{ required: true, message: '管理员账号密码' }] }
                        ]"
                        type="password"
                        placeholder="管理员账号密码"
                      >
                      </a-input>
                    </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">联系人：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14" class="underline">联系人</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">手机：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14" class="underline">号码</a-col>
              </a-row>
              <a-row>
                <a-col :span="8">邮箱：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14" class="underline">邮箱号码</a-col>
              </a-row>
              <a-row>
                  <a-col :span="8">地理位置：</a-col>
                  <a-col :span="2"></a-col>
                  <a-col :span="14">
                    <a-cascader style="width:100%;" :options="options" @change="onChange" placeholder="请选择地址"></a-cascader>
                  </a-col>
                </a-row>
              <a-row>
                <a-col :span="8">详细地址：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14" class="underline">详细地址</a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-button type="primary" @click="showModal">修改</a-button>
                  <ChangeCompanyInfo
                  :visibleA="appear"
                  @cancel="handleCancel"
                  @amend="handleAmend">
                  </ChangeCompanyInfo>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6"></a-col>
          </a-row>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="个人信息" key="2" forceRender>
        <div class="person">
          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="12" class="person_main">
              <a-row>
                <a-col :span="24">
                  <p class="person_title">个人中心</p>
                </a-col>
                <a-col :span="24" class="change_info">
                  <a-button @click="showdialog">修改</a-button>
                  <ChangePersonalInfo 
                  :visibleB="show" 
                  @save="handleSave" 
                  @close="handleClose"></ChangePersonalInfo>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="6">
                  <div class="user_img">
                    <img src="../../assets/user.jpg">
                  </div>
                  <div class="user_name">
                    张三丰
                  </div>
                  <div class="user_name">
                    用户名：uid
                  </div>
                  <div class="user_change">
                    <a-button type="primary" @click="changePassword">修改密码</a-button>
                    <a-modal 
                    centered
                    :visible="visiblec"
                    title="修改密码"
                    okText="确定"
                    cancelText="取消"
                    @cancel="handlecancelC"
                    @ok="handleSubmit"
                    >
                      <div>
                        <a-form>
                          <a-form-item>
                            <label class="passowrdLabel">原密码</label>
                            <a-input type="password" placeholder="请输入原密码" class="passowrdInput"></a-input>
                          </a-form-item>
                          <a-form-item>
                            <label class="passowrdLabel">新密码</label>
                            <a-input type="password" placeholder="请输入新密码" class="passowrdInput"></a-input>
                          </a-form-item>
                        </a-form>
                      </div>
                    </a-modal>
                  </div>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="8">
                  <a-row class="underline">
                    <a-col :span="12">用户名</a-col>
                    <a-col :span="12">uid</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">姓名</a-col>
                    <a-col :span="12">张三丰</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">部门</a-col>
                    <a-col :span="12">技术部</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">工号</a-col>
                    <a-col :span="12">001</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">身份证号码</a-col>
                    <a-col :span="12">4330022000145200001</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">年龄</a-col>
                    <a-col :span="12">28</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">性别</a-col>
                    <a-col :span="12">男</a-col>
                  </a-row>
                </a-col>
                <a-col :span="1"></a-col>
                <a-col :span="8">
                  <a-row class="underline">
                    <a-col :span="12">联系电话</a-col>
                    <a-col :span="12">13561001335</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">车牌</a-col>
                    <a-col :span="12">湘A44562</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">部门</a-col>
                    <a-col :span="12">技术部</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">工位编号</a-col>
                    <a-col :span="12">001</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">入职时间</a-col>
                    <a-col :span="12">20180112</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">有效期</a-col>
                    <a-col :span="12">20200101</a-col>
                  </a-row>
                  <a-row class="underline">
                    <a-col :span="12">备注</a-col>
                    <a-col :span="12">外包</a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="6"></a-col>
          </a-row>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
  
</template>

<script>
  import ChangeCompanyInfo from '@/components/personal_center/change_company_info'
  import ChangePersonalInfo from '@/components/personal_center/change_personal_info'

  export default {
    name: 'Personalcenter',
    components: {
      ChangeCompanyInfo,
      ChangePersonalInfo,
    },
    data() {
      return {
        appear:false,
        show:false,
        visiblec:false,
        // 省级联动
        options: [{
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
              value: 'xihu',
              label: 'West Lake',
            }],
          }],
        }, {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            }],
          }],
        }],
      };
    },
    methods: {
      callback (key) {
        console.log(key)
      },
      onChange(value) {
        console.log(value);
      },
      showModal() {
        //弹出对话框
        this.appear = true;
      },
      handleCancel(e) {
        //隐藏对话框
        this.appear = false;
      },
      handleAmend(e) {
        // 提交表单
        this.appear = false;
      },
      showdialog(e) {
        //弹出对话框
        this.show = true;
      },
      handleSave(e) {
        //隐藏对话框
        this.show = false;
      },
      handleClose(e) {
        //隐藏对话框
        this.show = false;
      },
      changePassword(e) {
        this.visiblec= true ;
      },
      handleSubmit(e) {
        this.visiblec= false ;
      },
      handlecancelC(e) {
        this.visiblec= false ;
      }

    },
  };
</script>
<style scoped>
    /* tile uploaded pictures */
    .upload-list-inline >>> .ant-upload-list-item {
      float: left;
      width: 200px;
      margin-right: 8px;
    }
    .upload-list-inline >>> .ant-upload-animate-enter {
      animation-name: uploadAnimateInlineIn;
    }
    .upload-list-inline >>> .ant-upload-animate-leave {
      animation-name: uploadAnimateInlineOut;
    }
    html,body {
      width:100%;
      height:100;
    }
    .company {
      margin-top:25px;
    }
    .company_main {
      padding:3% 2%;
      border:1px solid #ececec;
    }
    .company_main .ant-row {
      margin-bottom:20px;
      height:30px;
      line-height:30px;
    }
    .company_main .ant-row .underline {
      border-bottom:1px solid #a29d9d;
    }
    .company_main .ant-row .ant-col-8 {
      text-align:right;
    } 
    .company_main .ant-row .ant-col-14 {
      text-align:left;
    }
    .company_main .ant-row .ant-col-14 .ant-form-item {
      margin-bottom:0;
    }
    .person_main {
      padding:2%;
      border:1px solid #ececec;
    }
    .person_main .person_title {
      font-size:24px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom:16px;
      font-weight:bold;
    }
    .person_main .change_info {
      text-align:right
    }
    .person_main .user_img {
      width:120px;
      height:120px;
      margin: 0 auto;
    }
    .person_main .user_name {
      text-align:center;
      height:30px;
      line-height:30px;
    } 
    .person_main .user_change {
      margin-top:10px;
      text-align:center;
    }
    .person_main .underline {
      height:36px;
      line-height:36px;
      border-bottom:1px solid #a29d9d;
    }
    .passowrdLabel {
      width:16%;
      margin-left:5%;
      float:left;
    }
    .passowrdInput {
      width:70%;
      float:left;
    }
</style>