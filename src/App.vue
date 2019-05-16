<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-link :to="{name:'ShowMember',params:{id:'223'}}">前台展示</router-link>|
      <router-link to="/showperson">人员管理(新)</router-link>|
      <router-link to="/device">设备组/基本设备管理</router-link>|
      <router-link to="/devicelist">设备列表</router-link>|
      <router-link to="/ceshi">测试</router-link>|
      <router-link to="/resigned">离职人员</router-link>|
      <!--<router-link to="/entrancerule">门禁规则</router-link>|
     <router-link to="/inforule">通知事件规则</router-link>|
      <router-link to="/warningrule">警告事件规则</router-link>|-->
      <router-link to="/attendcontrol">考勤管理</router-link>|
      <router-link to="/visitor">访客管理</router-link>|
      <router-link to="/visitorrule">访客规则</router-link>|
      <router-link to="/strangerwarning">陌生人报警规则</router-link>|
      <router-link to="/blacklistwarning">黑名单报警规则</router-link>|
      <router-link to="/pathanalysis">轨迹分析</router-link>|
      <router-link to="/snaprecord">抓拍记录</router-link>|
      <router-link to="/casemanager">案件管理</router-link>|
      
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

export default {
  name: "App",
  data() {
    return {
      zh_CN
    };
  }
};
</script>

<style>

</style>
