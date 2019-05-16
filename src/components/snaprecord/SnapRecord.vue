<template>
  <div>
    <h4>抓拍记录</h4>
    <a-form layout="inline">
      <a-form-item label="起止时间">
        <a-date-picker show-time format="YYYY-MM-DD HH:mm:ss"/>
        <span>~</span>
        <a-date-picker show-time format="YYYY-MM-DD HH:mm:ss"/>
      </a-form-item>
      <a-form-item label="姓名">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="通道组合">
        <a-select :style="{'width':'150px'}">
          <a-select-option value="01">选项一</a-select-option>
          <a-select-option value="02">选项二</a-select-option>
          <a-select-option value="03">选项三</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">搜索</a-button>
        <a-button type="primary" :style="{'margin-left':'20px'}">导出</a-button>
      </a-form-item>
    </a-form>

    <a-divider :style="{'margin-botton':'10px'}"></a-divider>
    <div style="padding:0 20px;">
      <a-row :gutter="20">
        <a-col :span="4" v-for="n in 10" :key="n">
          <a-card :bodyStyle="{'padding':'0'}" style="margin-top:30px;">
            <div class="showimg">
              <div>
                <img
                  src="https://ss0.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4246895599,3650759375&fm=23&gp=0.jpg"
                >
                <p>抓拍图片</p>
              </div>
              <div>
              <img src="https://ss0.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4246895599,3650759375&fm=23&gp=0.jpg"/>
              <p>底库图片</p>
              </div>
            </div>
            <p class="footp">
              <label>姓名:</label>
              <span>张三</span>
            </p>
            <p class="footp">
              <label>相似度:</label>
              <span>98%</span>
            </p>
            <p class="footp">
              <label>抓拍时间:</label>
              <span>04-05 15:14</span>
            </p>
            <p class="footp">
              <label>通道组名:</label>
              <span>地址组一</span>
            </p>
            <div style="text-align:center;">
              <a-button type="primary" size="small">抓拍入库</a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <a-divider :style="{'margin-botton':'10px'}"></a-divider>
      <!-- 分页 -->
      <a-pagination v-model="current" :total="50" :style="{'margin-top':'15px','text-align':'right'}"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current:1
    };
  }
};
</script>

<style scoped>
.showimg {
  width: 100%;
  text-align: center;
}
.showimg div {
  width: 45%;
  display: inline-block;
}
.showimg div p {
  text-align: center;
  margin-bottom: 5px;
}
.showimg div img {
  width: 100%;
}
.footp {
  margin-bottom: 0px;
}
.footp > * {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footp label {
  width: 48%;
  text-align: right;
}
.footp span {
  width: 48%;
  text-align: left;
  font-weight: bold;
}
</style>