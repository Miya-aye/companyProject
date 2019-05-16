<template>
  <a-modal
    :visible="managevisible"
    :width="1100"
    :destroyOnClose="true"
    :closable="false"
    :footer="null"
  >
    <a-spin :spinning="spinning" tip="Loading..." size="large">
      <a-card
        style="width:100%"
        :tabList="tabList"
        :activeTabKey="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div v-if="noTitleKey=='download'">切换一</div>
        <!-- 上传组件 -->
        <div v-else-if="noTitleKey=='upload'">
          <a-row :gutter="16">
            <a-col :span="5">
              <a-directory-tree defaultExpandAll>
                <!-- :selectedKeys="['0-0-2']" -->
                <a-tree-node title="湖南捷报公司(10)" key="0-0">
                  <a-tree-node title="行政部(2)" key="0-0-1" isLeaf/>
                  <a-tree-node title="销售部(2)" key="0-0-2" isLeaf/>
                  <a-tree-node title="市场部(2)" key="0-0-3" isLeaf/>
                  <a-tree-node title="技术部(2)" key="0-0-4" isLeaf/>
                  <a-tree-node title="商务部(2)" key="0-0-5" isLeaf/>
                </a-tree-node>
              </a-directory-tree>
            </a-col>
            <a-col :span="14">
              <a-table
                :rowKey="record => record.personUnikey"
                :rowSelection="{selectedRowKeys, onChange}"
                :columns="columns"
                :dataSource="data"
                :scroll="{ x: 1930}"
                :pagination="pagination"
                bordered
                :style="{'margin-top':'15px'}"
                size="small"
                @change="handleTableChange"
              ></a-table>
              <a-button type="primary" @click="imgtodevice">选择上传的用户</a-button>
              <a-button @click="closemodal">退出</a-button>
            </a-col>
            <a-col :span="5">
              <a-tree
                checkable
                @expand="onExpand"
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                :treeData="treeData"
              />
            </a-col>
          </a-row>
        </div>
        <div v-else-if="noTitleKey=='delete'">切换三</div>
      </a-card>
    </a-spin>
  </a-modal>
</template>

<script>
import axios from "axios";

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
  { title: "失效时间", dataIndex: "address", key: "11", width: 150 }
];

const treeData = [
  {
    title: "设备组一",
    key: "0-0",
    children: [
      { title: "宇泛人脸识别机", key: "jiebaohardware2019031113890" },
      { title: "巨龙远程对比机", key: "jiebaohardware2019031117890" },
      { title: "阅面繁星远程摄像机", key: "jiebaohardware2019031112890" }
    ]
  }
];

export default {
  props: ["managevisible"],
  data() {
    return {
      tabList: [
        {
          key: "download",
          tab: "下载"
        },
        {
          key: "upload",
          tab: "上传"
        },
        {
          key: "delete",
          tab: "删除"
        }
      ],
      noTitleKey: "upload",
      data: [],
      pagination: {},
      columns,
      selectedRowKeys: [],
      autoExpandParent: true,
      expandedKeys: ["0-0"],
      checkedKeys: [],
      treeData,
      persontodevice: [],
      spinning: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    onTabChange(key, type) {
      //控制tab切换
      this.noTitleKey = key;
    },
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
          params: { size: 5, ...params }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.pageSize = data.data.datas.size;
          pagination.total = data.data.datas.total;
          this.data = data.data.datas.records;
          this.pagination = pagination;
        });
    },
    onChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    //上传用户
    imgtodevice() {
      if (this.selectedRowKeys.length == 0) {
        alert("请选择需要上传的用户！");
        return;
      }
      if (this.checkedKeys.length == 0) {
        alert("请选择需要上传到的设备！");
        return;
      }
      //过滤数组，排除选到的设备组
      const devicearr = [];
      let n = 0;
      for (let i = 0; i <= this.checkedKeys.length; i++) {
        if (this.checkedKeys[i] == "0-0") {
          n++; //每当有匹配项 n+1
        } else {
          devicearr.push(this.checkedKeys[i]);
        }
      }
      devicearr.length = this.checkedKeys.length - n; //重设数组长度，排除undefined的数组项
      this.spinning = true;
      axios
        .post(
          "http://192.168.10.101:8002/eq/queue/addByPersonAndDeviceUnikeys?deviceUnikeys=" +
            devicearr +
            "&personUnikeys=" +
            this.selectedRowKeys
        )
        .then(res => {
          this.spinning = false;
          this.$emit("closemng");
          this.$notification.success({ message: "用户分发成功" });
        })
        .catch(error => {
          this.spinning = false;
          alert("操作失败，" + error);
          console.log("操作失败：" + error);
        });
    },
    // 关闭对话框
    closemodal() {
      this.$emit("closemng");
    }
  },
  watch: {
    managevisible(newValue, oldValue) {
      this.fetch({ pageSize: 5, current: this.pagination.current });
    },
    checkedKeys(newValue, oldValue) {
      console.log("onCheck2", this.checkedKeys);
    }
  }
};
</script>

<style scoped>
</style>