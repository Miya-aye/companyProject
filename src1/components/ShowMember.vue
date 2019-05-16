<template>
  <!-- style="max-width:1200px;padding:10px;margin:0 auto;" -->
  <div>
    <a-radio-group :defaultValue="defaultValue" @change="onChange" buttonStyle="solid">
      <a-radio-button value="resulet">识别结果</a-radio-button>
      <a-radio-button value="adv">广告展示</a-radio-button>
    </a-radio-group>
    <div v-if="isshow" :style="{'margin-top':'15px'}">
      <a-card>
        <!-- 视频监控 -->
        <a-row :gutter="30">
          <a-col :span="8" :style="{'height':'100%'}">
              <!-- ddd -->
              <object
                type="application/x-vlc-plugin"
                id="vlc_1"
                events="True"
                width="100%"
                height="400"
                codebase="axvlc.cab"
                value="111"
                alt="1111"
              >
                <embed
                  type="application/x-vlc-plugin"
                  pluginspage="http://www.videolan.org"
                  name="vlc"
                >

                <param name="mrl" value="rtsp://192.168.10.10:554/media/live/1/1">

                <param name="volume" value="50">

                <param name="autoplay" value="true">

                <param name="loop" value="false">

                <param name="fullscreen" value="true">
                <param name="mute" value="true">
                <!--静音-->
              </object>
          </a-col>
          <a-col :span="8">

          </a-col>
          <a-col :span="8">

          </a-col>
        </a-row>

        <a-divider/>
        <a-checkbox :checked="checked" @change="if_check">是否显示实时监控对比画面</a-checkbox>

        <!-- 监控画面 -->
        <a-row :gutter="16" :style="{'margin-top':'30px'}">
          <!-- 实时监控 -->
          <a-col :span="3" v-for="(arr,index) in arrs" :key="index">
            <a-card style="width:100%;margin-top:30px;">
              <img
                :src="arr.src"
                :alt="arr.name"
                slot="cover"
                @click="show_modal(arr.name,arr.src)"
                class="img_cursor"
              >
              <p slot="cover" class="show_name">{{arr.name}}</p>
              <a-button slot="cover">查看监控</a-button>
            </a-card>
          </a-col>

          <!-- 照片对比 -->
          <div class="photo_contrast" v-if="checked">
            <h3 class="contrast_til">张三</h3>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-card :bodyStyle="{'padding':'0'}" :bordered="false">
                  <div class="imgs">
                    <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png">
                  </div>
                  <p class="show_name">抓拍图片</p>
                </a-card>
              </a-col>
              <a-col :span="12">
                <a-card :bodyStyle="{'padding':'0'}" :bordered="false">
                  <div class="imgs">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png">
                  </div>
                  <p class="show_name">原始图片</p>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-row>

        <!-- 监控弹出大图 -->
        <a-modal centered :title="modal_img_name" v-model="visible" okText="查看监控" cancelText="取消">
          <div style="max-width:600px;">
            <img :src="modal_img_src" style="width:100%">
          </div>
        </a-modal>
      </a-card>
    </div>

    <!-- 广告画面 -->
    <div v-else>vvv</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowMenber",
  data() {
    return {
      defaultValue: "resulet",
      isshow: true,
      visible: false,
      modal_img_src: "",
      modal_img_name: "",
      checked: false,
      arrs: [
        // {
        //   name: "1",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "2",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "3",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "4",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "5",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "6",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "7",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "8",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "9",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "10",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "11",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "12",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "13",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "14",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // },
        // {
        //   name: "15",
        //   src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        // },
        // {
        //   name: "16",
        //   src:
        //     "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        // }
        // {name:'17',src:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        // {name:'18',src:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'}
      ],
      websock: null
    };
  },
  created() {
    this.initWebSocket();
    let _this = this;
    axios
      .get(
        "http://192.168.10.101:8002/eq/identify-record/getByDeviceUnikey?current=1&deviceUnikey=jiebaohardware2019031112890&size=16"
      )
      .then(function(res) {
        for (let i = 0; i < 16; i++) {
          let name = res.data.datas.records[i].createTime.slice(-8); //personName
          let img_src = res.data.datas.records[i].snapImage;
          _this.arrs.push({
            name: name,
            src: "http://192.168.10.101:81" + img_src
          });
        }
      });
  },
  methods: {
    onChange(e) {
      //切换显示广告或识别结果
      if (e.target.value == "resulet") {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
      this.defaultValue = e.target.value;
    },
    show_modal(name, src) {
      // 展示模态框,配置大图和名称
      this.visible = true;
      this.modal_img_src = src;
      this.modal_img_name = name + " 抓拍画面";
    },
    if_check(e) {
      // 是否展示实时监控画面
      this.checked = e.target.checked;
    },
    initWebSocket() {//初始化websockt
      this.websock = new WebSocket(
        "ws://192.168.10.101:8002/eq/socket/get/jiebaohardware2019031112890"
      );
      this.websock.onmessage = this.websocketonmessage;
    },
    websocketonmessage(e) {//链接成功时，不添加数据，更新信息时，添加数据
      let _this = this;
      if (event.data == "连接成功") {
      } else {
        axios
          .get(
            "http://192.168.10.101:8002/eq/identify-record/getByDeviceUnikey?current=1&deviceUnikey=jiebaohardware2019031112890&size=16"
          )
          .then(function(res) {
            for (let i = 0; i < 1; i++) {
              let name = res.data.datas.records[i].createTime.slice(-8); //personName
              let img_src = res.data.datas.records[i].snapImage;
              _this.arrs.unshift({
                name: name,
                src: "http://192.168.10.101:81" + img_src
              });
            }
          });
      }
    }

  },
  watch: {
    arrs(newValue, oldValue) {
      if (this.arrs.length > 16) {
        this.arrs.pop();
      }
    }
  }
};
</script>

<style scoped>
.show_name {
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 0;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
}
.img_cursor {
  cursor: pointer;
  height: 210px;
}
.photo_contrast {
  width: 500px;
  height: 420px;
  position: absolute;
  top: 30px;
  left: 50%;
  margin-left: -250px;
  background-color: white;
  padding: 30px;
  border: 1px solid rgb(232, 232, 232);
  box-shadow: 0px 0px 20px #aaa;
}
.photo_contrast .imgs img {
  width: 100%;
  height: 260px;
}
.contrast_til {
  line-height: 50px;
  text-align: center;
  font-size: 22px;
  /* letter-spacing: 5px; */
}
</style>
