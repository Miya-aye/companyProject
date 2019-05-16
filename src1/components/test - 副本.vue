<template>
  <a-upload
    name="file"
    :multiple="true"
    action="http://192.168.10.101:8001/org/person/imgUpload"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <a-icon type="upload"/>Click to Upload
    </a-button>
  </a-upload>
</template>
<script>
export default {
  data() {
    return {
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
      console.log(info.fileList[0].response.datas);
      }
    }
  }
};
</script>

