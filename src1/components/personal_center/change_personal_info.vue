<template>
    <a-modal
    centered 
    :visible="visibleB" 
    title="个人中心" 
    width="900px" 
    okText="保存" 
    cancelText="取消"
    @ok="()=>{$emit('save')}"
    @cancel="()=>{$emit('close')}" >
        <div class="person">
          <a-row>
            <a-col :span="24" class="person_main">
              <a-row>
                <a-col :span="24">
                  <p class="person_title">个人中心</p>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="4">
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
                    <a-upload action="//jsonplaceholder.typicode.com/posts/" listType="picture" >
                      <a-button type="primary">
                         更改图片
                      </a-button>
                    </a-upload>
                  </div>
                </a-col>
                <a-col :span="10">
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">用户名</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入用户名"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">姓名</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入姓名"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">部门</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入部门"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">工号</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入工号"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">身份证号码</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入身份证号"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">年龄</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入年龄"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">性别</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入性别"/>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="10">
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">联系电话</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入联系电话"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">车牌</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入车牌号"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">部门</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入部门"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">工位编号</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入工位编号"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">入职时间</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入入职时间"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">有效期</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入有效期"/>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">备注</a-col>
                    <a-col :span="16">
                        <a-input placeholder="请输入备注"/>
                    </a-col>
                  </a-row>
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
        visibleB:Boolean,
    },
    name:'ChangePersonalInfo',
    data() {
        return {
            // show:true,
        }
    }
}
</script>
<style scoped>
    .person_main {
      padding:2%;
      border:1px solid #ececec;
    }
    .person_main .person_title {
      font-size:24px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom:16px;
      font-weight:bold;
      text-align:center;
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
    .person_main .ant-row {
      margin-bottom:8px;
    }
</style>