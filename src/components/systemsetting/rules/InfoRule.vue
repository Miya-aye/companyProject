<template>
  <div>
    <h4>通知事件规则</h4>
    <a-button type="primary" @click="showmodal">新增</a-button>
    <a-table
      :rowKey="record => record.name"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
      :style="{'margin-top':'15px','max-width':'1110px'}"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text,record">
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="danger" size="small">删除</a-button>
      </span>
      <span slot="checkword" slot-scope="text,record">
        <a-tooltip >
          <template slot="title">prompt text#DDDdfafaslhahlk</template>
          <div :style="{'width':'100px','overflow':'hidden','white-space':'nowrap'}">aksfkjkjknxakjnkfabkbkj</div>
        </a-tooltip>
      </span>
      <span slot="checkviews" slot-scope="text,record">
        <a-button type="primary" size="small" @click="showCheckViews(record)">查看</a-button>
      </span>
    </a-table>
    <!-- 新增/编辑 -->
    <a-modal
      :visible="addeditvisible"
      title="新增/编辑"
      okText="确定"
      cancelText="取消"
      width="400px"
      :destroyOnClose="true"
      @cancel="()=>this.addeditvisible=false"
      @ok="()=>this.addeditvisible=false"
    >
      <a-form>
        <a-form-item label="规则名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="位置名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="地址组名" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="01">组一</a-select-option>
            <a-select-option value="02">组二</a-select-option>
            <a-select-option value="03">组三</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="欢迎辞" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu"/>
              <a-divider style="margin: 4px 0;"/>
              <a-input
                v-if="inputVisible"
                ref="input"
                type="text"
                size="small"
                :inputValue="inputValue"
                @pressEnter="pushWords"
                @keyup="ifvalue"
              />
              <div v-else style="padding: 8px; cursor: pointer;" @click="additem">
                <a-icon type="plus"/>Add item
              </div>
            </div>
            <a-select-option v-for="(item,index) in options" :key="index" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="显示画面" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select>
            <a-select-option value="0111">通道一</a-select-option>
            <a-select-option value="0222">通道二</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-textarea></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>

    <!--  -->
  </div>
</template>

<script>
const columns = [
  { title: "规则名称", width: 180, dataIndex: "name", key: "id" },
  { title: "位置名称", width: 100, dataIndex: "name", key: "77" },
  { title: "地址组名", width: 100, dataIndex: "name", key: "88" },
  { title: "显示账号", dataIndex: "address", key: "1", width: 150 },
  {
    title: "欢迎辞",
    key: "2",
    width: 100,
    scopedSlots: { customRender: "checkword" }
  },
  {
    title: "显示画面",
    key: "3",
    width: 100,
    scopedSlots: { customRender: "checkviews" }
  },
  { title: "备注", dataIndex: "address", key: "5", width: 200 },
  {
    title: "操作",
    key: "root",
    width: 180,
    scopedSlots: { customRender: "action" }
  }
];
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  data() {
    return {
      columns,
      pagination: {},
      data: [{ name: "f1f1f1", address: "ff5f55f5f" }],
      addeditvisible: false,
      inputVisible: false,
      inputValue: "",
      options: ["欢迎辞一", "欢迎辞二", "欢迎辞三"]
    };
  },
  methods: {
    handleTableChange() {},
    showmodal() {
      this.addeditvisible = true;
    },
    //查看欢迎辞
    showCheckWord(res) {
      console.log(res);
    },
    //查看显示画面
    showCheckViews(res) {},
    additem() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    //回车键添加欢迎辞到选项组
    pushWords(e) {
      let value = e.target.value;
      this.options.push(value);
      this.inputVisible = false;
      this.inputValue = "";
    },
    //控制新建欢迎辞的输入字符长度
    ifvalue(e) {
      let length = e.target.value.length;
      let xxx = e.target.value.slice(0, 30);
      if (length >= 30) {
        this.$message.warning("只允许最大输入30个字！");
        e.target.value = xxx;
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>