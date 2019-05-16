<template>
  <a-modal
  centered 
  width="900px" 
  title="企业信息" 
  :visible="visibleA" 
  @cancel="()=>{$emit('cancel')}" 
  @ok="()=>{$emit('amend')}" 
  cancelText="取消" 
  okText="保存">
    <div class="company">
        <a-row>
            <a-col :span="24" class="company_main">
                <a-row>
                <a-col :span="8">商户名称：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                    <a-input placeholder="请输入商户名称"/>
                </a-col>
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
                <a-col :span="14">
                    <a-input placeholder="请输入联系人名称"/>
                </a-col>
                </a-row>
                <a-row>
                <a-col :span="8">手机：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                    <a-input placeholder="请输入手机号码"/>
                </a-col>
                </a-row>
                <a-row>
                <a-col :span="8">邮箱：</a-col>
                <a-col :span="2"></a-col>
                <a-col :span="14">
                    <a-input placeholder="请输入邮箱"/>
                </a-col>
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
                    <a-col :span="14">
                        <a-input placeholder="请输入详细地址"/>
                    </a-col>
                </a-row>
            </a-col>
            </a-row>
        </div>
  </a-modal>
</template>

<script>
export default {
    props: {
        visibleA:Boolean,
    },
    name: 'ChangeCompanyInfo',
    data() {
      return {
        // visible:true,
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
        }]
      };
    },
    methods: {
      onChange(value) {
        console.log(value);
      },
    },
}
</script>

<style scoped>
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
</style>
