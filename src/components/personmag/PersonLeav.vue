<template>
  <div>
    <!-- 离职 -->
    <a-modal
      :visible="resignedvisible"
      title="人员离职"
      width="400px"
      okText="确定"
      cancelText="取消"
      :destroyOnClose="true"
      @cancel="resignedCancle"
      @ok="resignedOk"
    >
      <a-form :form="form">
        <a-form-item label="离职人员" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <span>{{personname}}</span>
          <a-input type="hidden" v-decorator="['personId']"></a-input>
        </a-form-item>
        <a-form-item label="离职时间" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-date-picker v-decorator="['quitTime']" style="width: 100%" @change="onChange"/>
        </a-form-item>
        <a-form-item label="离职类型" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-select v-decorator="['quitType']">
            <a-select-option value="0">辞职</a-select-option>
            <a-select-option value="1">解雇</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="离职备注" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-textarea v-decorator="['quitRemark']"></a-textarea>
        </a-form-item>
        <a-form-item label="是否退卡" :labelCol="{span:8}" :wrapperCol="{span:16}">
          <a-checkbox v-decorator="['isReturncard']">退卡</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  props: ["resignedvisible", "personname"],
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    resignedCancle() {
      this.$emit("colsePerLeave");
    },
    resignedOk() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        let _this = this;
        let ischeck = values.isReturncard == true ? "Y" : "N";
        let date = values["quitTime"].format("YYYY-MM-DD");
        const newarr = {
          ...values,
          isReturncard: ischeck,
          quitTime: date
        };
        this.$confirm({
          title: "是否确定办理离职？",
          okText: "确定",
          okType: "danger",
          cancelText: "取消",
          onOk() {
            axios
              .delete(
                "http://192.168.10.101:8001/org/staff/quitById",
                qs.stringify(newarr)
              )
              .then(res => {
                _this.$notification.success({ message: "操作成功" });
                _this.$emit("colsePerLeave");
              }).catch(errot=>{
                alert("操作失败："+error);
              });
          }
        });
      });
    },
    //设置离职时间
    onChange(date, dateString) {
      // const form=this.form;
      // form.setFieldsValue({quitTime:dateString});
    }
  }
};
</script>

<style scoped>
</style>