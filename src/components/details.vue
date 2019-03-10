<template>
  <div class="details" @click.self="closePage">
    <fieldset class="border details-wrap">
      <!-- 右上角 -->
      <div class="hot-tr corner1" ref="hotTr"></div>
      <!-- 左下角 -->
      <div class="hot-lb corner2"></div>
       <!-- tab切换框 -->
        <div class="switch-button detailsButton" ref="detailsButton" v-if="message.type=='stadium'||message.type=='smartTerminal'">
            <div
                class="child-button"
                :class="{'active-father-button': activeButton == 1}"
                @click="switchButton(1)"
            >场馆详情</div>
            <div
                class="child-button"
                :class="{'active-father-button': activeButton == 2}"
                @click="switchButton(2)"
            >智能终端</div>
            <div
                class="child-button"
                :class="{'active-father-button': activeButton == 3}"
                @click="switchButton(3)"
            >实时监控</div>
        </div>
      <legend class="title">
        <div class="inner-title" style="cursor:pointer;" @click="closePage">返回</div>
      </legend>
      <div class="details-content"  ref="detailsContent" v-if="activeButton==1">
        <div class="left-content">
          <el-tooltip
            v-if="details.title&&details.title.length>8"
            class="item"
            effect="dark"
            :content="details.title"
            placement="top"
          >
            <div class="content-title" style="cursor:pointer;">
              {{details.title|cutString}}
              <span style="font-weight:bold;">...</span>
            </div>
          </el-tooltip>
          <div v-else class="content-title" style="cursor:pointer;">{{details.title}}</div>
          <div v-if="message.type=='activity'">
            <div class="content-time" style="margin-bottom:8px;">
              <img width="20" height="20" style="vertical-align:text-top;" src="../assets/time.png">
              &nbsp;{{details.time}}
            </div>
            <div class="content-time" style="margin-bottom:24px;">
              <img width="20" height="20" style="vertical-align:text-top;" src="../assets/icon.png">
              &nbsp;{{details.place}}
            </div>
          </div>
          <div v-else>
            <div class="content-time" style="margin-bottom:8px;">
              <img width="20" height="20" style="vertical-align:text-top;" src="../assets/icon.png">
              &nbsp;地址:&nbsp;{{details.place}}
            </div>
            <div class="content-time" style="margin-bottom:24px;">
              <img width="20" height="20" style="vertical-align:text-top;" src="../assets/time.png">
              &nbsp;开放时间:&nbsp;{{details.time}}
            </div>
          </div>
          <div class="jianbian" style="height:1px;width:100%;"></div>
          <div v-if="message.type=='activity'">
            <div class="content-info" style="margin-top:15px;">主办方:&nbsp;{{details.sponsor}}</div>
            <div class="content-info" style="margin:8px 0;">发布方:&nbsp;{{details.issuer}}</div>
            <div class="content-info" style="margin-bottom:15px;">联系电话:&nbsp;{{details.phone}}</div>
          </div>
          <div v-else>
            <div
              class="content-info"
              style="margin-top:15px;margin-bottom:8px;"
            >联系电话:&nbsp;{{details.phone}}</div>
            <div class="content-info" style="margin-bottom:15px;">官方链接:&nbsp;{{details.officalLink}}</div>
          </div>
          <div class="jianbian" style="height:1px;width:100%;"></div>
          <div v-if="message.type=='activity'">
            <div
              class="content-info"
              style="margin-top:24px;margin-bottom:8px;"
            >报名日期:&nbsp;{{details.enterTime}}</div>
            <div class="content-info" style="margin-bottom:40px;">报名人数:&nbsp;{{details.enterPeople}}</div>
            <div class="content-video">
              <video
                id="myPlayer"
                height="216"
                style="width:100%;"
                poster
                controls
                playsinline
                webkit-playsinline
                autoplay
              >
                <source
                  v-if="details.video_data && details.video_data.length"
                  :src="details.video_data[0].param.url"
                  type
                >
                <source ref="source" :src="src1" type="application/x-mpegURL">
              </video>
            </div>
          </div>
          <div v-else>
            <div class="content-time" style="margin:16px 0;">微信公众号</div>
            <img v-if="details.img" :src="details.img" height="120" width="120" alt>
            <div v-else class="content-time">暂无</div>
          </div>
        </div>
        <div v-if="message.type=='activity'" class="right-content" v-html="details.h5"></div>
        <div v-else class="right-content">
          <div v-if="details.introduce"
            style="font-size: 24px;color: #D6ECFF;margin-bottom: 24px;font-family: PingFangSC-Medium;"
          >场馆介绍</div>
          <img :src="details.img" alt style="margin-bottom:40px;">
          <div
            style="font-family: PingFangSC-Regular;font-size: 18px;color: #ADD9FF;line-height: 30px;"
          >{{details.introduce}}</div>
        </div>
      </div>
      <div v-else-if="activeButton==2" class="details-content">
          <div class="wrap-module" v-if="smartTerminal">
              <div class="statisticsModule">
                <div v-for="(item,index) in smartTerminal.peopleCounting" :key="index" class="statistic-item">
                    <div class="statistic-item-key">{{item.key}}</div>
                    <div class="statistic-item-value">{{item.value}}</div>
                </div>
              </div>
              <div class="tableModule" v-if="smartTerminal.equipmentList && smartTerminal.equipmentList.length">
                  <div class="tableModule-title">
                      <img src="../assets/intelligence_icon_equipment.png" style="vertical-align:middle;" alt="">
                      设备列表
                  </div>
                  <div class="tableModule-header">
                      <div class="tableModule-header-item" v-for="(item,index) in header" :class="index==2?'formatTime':''" :key="index">{{item.title}}</div>
                  </div>
                  <div class="tableModule-body">
                      <div v-for="(item,index) in smartTerminal.equipmentList" :key="index">
                          <div class="tableModule-body-row">
                              <div>{{item.equipment_title}}</div>
                              <div>{{item.equipment_type_title}}</div>
                              <div class="formatTime"><div class="statusDot" :class="item.status==1?'green':'red'"></div>{{item.status|getStatus}}</div>
                              <div>{{item.service_time}}</div>
                          </div>
                          <div class="jianbian" style="height:1px;width:100%;"></div>
                      </div>
                  </div>
              </div>
              <div class="tableModule" v-if="smartTerminal.visitorsRecord && smartTerminal.visitorsRecord.length">
                  <div class="tableModule-title">
                      <img src="../assets/intelligence_icon_visitor.png" style="vertical-align:middle;" alt="">
                      访客记录
                  </div>
                  <div class="tableModule-header">
                      <div class="tableModule-header-item" v-for="(item,index) in header1" :class="index==2?'formatTime':''" :key="index">{{item.title}}</div>
                  </div>
                  <div class="tableModule-body">
                      <div v-for="(item,index) in smartTerminal.visitorsRecord" :key="index">
                          <div class="tableModule-body-row">
                              <div><img :src="item.avatar" alt="" class="avatar"></div>
                              <div>{{item.user_name}}</div>
                              <div class="formatTime">{{item.visitor_time|formatTime}}</div>
                              <div>{{item.status}}</div>
                          </div>
                          <div class="jianbian" style="height:1px;width:100%;"></div>
                      </div>
                  </div>
              </div>
          </div>
          <div v-else class="noDataPage">
              <img src="../assets/universally_icon_terminalunit.png" alt="">
              <div class="markedWords">未安装智能终端设备</div>
          </div>
      </div>
      <div v-else class="details-content">
          <div class="wrap-video-box" v-if="monitoring && monitoring.length">
              <div class="video-item" v-for="item in monitoring" :key="item.video_id">
                  <video
                    :id="bindId(item.video_id)"
                    style="width:100%;"
                    height="240"
                    poster
                    controls
                    playsinline
                    webkit-playsinline
                    autoplay
                  >
                    <source
                    v-if="item.video_data"
                    :src="item.video_data.url"
                    type
                    >
                    <source ref="source" :src="item.video_data.url" type="application/x-mpegURL">
                </video>
                <div class="video-title">{{item.video_title}}</div>
              </div>
          </div>
          <div v-else class="noDataPage">
            <img src="../assets/universally_icon_webcam.png" alt="">
            <div class="markedWords">未添加监控摄像头</div>
          </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  name: "detailPage",
  props: ["message"],
  data() {
    return {
      details: "",    //接收活动详情和场馆详情的数据
      smartTerminal: "",   //接收智能终端的数据
      monitoring: "",     //接收实时监控的数据
      src1: "http://hls.open.ys7.com/openlive/4692d42076d842c485d7fd6da42546ec.m3u8",     //临时地址待数据完善
      src: "rtmp://rtmp.open.ys7.com/openlive/4692d42076d842c485d7fd6da42546ec",
      // src: 'rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b',
      player: "",
      videoPlayer: "",
      activeButton: "",
      equipmentList: [
          {
              name: '门禁摄像头',
              type: '摄像机',
              status: '在线',
              time: 678
          },
          {
              name: '门禁摄像头',
              type: '摄像机',
              status: '在线',
              time: 678
          },
          {
              name: '门禁摄像头',
              type: '摄像机',
              status: '在线',
              time: 678
          }
      ],
      header: [
          {title: '设备名称'},
          {title: '设备类型'},
          {title: '设备状态'},
          {title: '累计服务时长'}
      ],
      header1: [
          {title: '头像'},
          {title: '用户名'},
          {title: '访问时间'},
          {title: '状态'}
      ]
    };
  },
  created() {
    //   this.$axios
    // .post("https://open.ys7.com/api/lapp/live/address/get",this.$qs.stringify({
    //     accessToken: 'at.4v752uhj7oew8cpkaw4j655h617nmo5t-1hpv7s0z9j-0hqdr3w-cnbxsym69'
    //  }))
    // .then((res)=>{
    //     console.log(res);
    //   }).catch((res)=>{
    //       console.log(res)
    //   })
    if(this.message.type == 'stadium'){
      this.activeButton = 1;
      this.getStadiumAndSmartTerminalData();
    }else if(this.message.type == 'smartTerminal'){
      this.activeButton = 2;
      this.getStadiumAndSmartTerminalData();
    }else{
      this.activeButton = 1;
      this.getDetailData();
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.message.type == "activity") {
        this.player = new EZUIPlayer("myPlayer");
      }
      var brower = navigator.userAgent;
      let safari = false;
      if (!(brower.indexOf("Chrome") > -1) && brower.indexOf("Safari") > -1) {
        safari = true;           //苹果浏览器
      }
      if (brower.indexOf("Firefox") > -1 || safari) {     //做浏览器兼容
        //判断是否为火狐浏览器或safari浏览器
        this.$refs.hotTr.style.top = -32 + "px";
        this.$refs.detailsButton.style.top = 30 + "px";
        this.$refs.detailsContent.style.marginTop = 90 + "px";
      }
      let h = document.body.clientHeight;
      if (h < 720) {
        document.getElementById("myPlayer").style.height = 140 + "px";
      }
    });
  },
  updated() {
      if(this.activeButton == 3){
          for(let i=0;i<this.monitoring.length;i++){
              let id = this.bindId(this.monitoring[i].video_id)
            this.videoPlayer = new EZUIPlayer(id);
          }
      }
  },
  methods: {
    closePage: function() {
      this.$emit("gotoParent", "closePage");
      var brower = navigator.userAgent;
      let safari = true;
      if (!(brower.indexOf("Chrome") > -1) && brower.indexOf("Safari") > -1) {
        safari = false;
      }
      if (this.message.type == "activity" && safari) {
        this.player.stop();
      }
    },
    getDetailData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/mapDetail",
          this.$qs.stringify({
            id: this.message.id,
            type: this.message.type
          })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.details = res.data.DATA.details;
          } else {
            this.$message({
              message: res.data.MESSAGE,
              type: "error"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    switchButton: function(val){
       this.activeButton = val;
       this.getStadiumAndSmartTerminalData();
    },
    getStadiumAndSmartTerminalData: function(){
      let type;
      if(this.activeButton == 1){
        type = 'stadium';
      }else if(this.activeButton == 2){
        type = 'smartTerminal';
      }else{
        type = 'monitoring';
      };
      this.$axios
        .get(
          "/BigScreen/Index/mapDetail?type=" + type + '&id=706'
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            if(this.activeButton == 1){
              this.details = res.data.DATA.details; 
            }else if(this.activeButton == 2){
              this.smartTerminal = res.data.DATA;
            }else{
              this.monitoring = res.data.DATA.monitoringList;
            }
          } else {
            this.$message({
              message: res.data.MESSAGE,
              type: "error"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    bindId: function(val){
        return 'player' + val;
    }
  },
  filters: {
    cutString: function(val) {
      if (val && val.length > 8) {
        return val.substr(0, 8);
      }
    },
    formatTime: function(val) {
      let time = new Date(val*1000);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      month = month>10? month : '0'+ month;
      day = day>10? day : '0' + day;
      hour = hour>10? hour : '0' + hour;
      minute = minute>10? minute: '0' + minute;
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute; 
    },
    getStatus: function(val){
      if(val==0){
        return '离线'
      }else if(val==1){
        return '在线'
      }else{
        return '停用'
      }
    }
  }
};
</script>
<style>
@import "../css/page.css";
.details {
  width: 100vw;
  height: 100vh;
  padding-top: 28px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.7);
}
.details-wrap {
  width: 62.5%;
  height: 92%;
  margin: auto;
  padding: 0 40px;
  text-align: left;
  position: relative;
}
.details-content {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  overflow-y: auto;
}
.details-content::-webkit-scrollbar {
        width: 10px;     
        height: 10px;
    }
.details-content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(255,255,255,0.30);
    }
.details-content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
    }
.right-content::-webkit-scrollbar {
        width: 10px;     
        height: 10px;
    }
.right-content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(255,255,255,0.30);
    }
.right-content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
    }
.left-content {
  width: 30.1%;
  height: 100%;
}
.right-content {
  width: 64.2%;
  height: 100%;
  overflow-y: auto;
}
.content-title {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #d6ecff;
  margin-bottom: 32px;
}
.content-time {
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #add9ff;
}
.content-info {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #add9ff;
}
.right-content {
  color: #d6ecff;
}
.right-content img {
  max-width: 100% !important;
}
.detailsButton{
    top: 50px;
    text-align: center;
}
.statisticsModule{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 78px;
}
.statistic-item{
    width: 19.4%;
    height: 233px;
    background-image: linear-gradient(-180deg, rgba(0,135,255,0.24) 0%, rgba(0,135,255,0.00) 100%);
    border: 1px solid #ADD9FF;
    box-shadow: 0 0 8px 0 rgba(0,135,255,0.50);
    border-radius: 2px;
    text-align: center;
}
.statistic-item-key{
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ADD9FF;
    margin-top: 68px;
    margin-bottom: 32px;
}
.statistic-item-value{
    font-family: Helvetica;
    font-size: 35px;
    color: #FFCC00;
    text-shadow: 0 0 4px rgba(255,238,0,0.50);
}
.wrap-module{
    width: 100%;
    padding: 0 5%;
}
.tableModule{
    margin-top: 120px;
}
.tableModule-title{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #00FFFF;
}
.tableModule-header{
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #D6ECFF;
    margin-top: 32px;
    justify-content: space-between;
}
.tableModule-header-item{
    width: 12%;
    text-align: center;
}
.tableModule-body-row{
    display: flex;
    justify-content: space-between;
    text-align: center;
    height: 62px;
    line-height: 62px;
}
.tableModule-body-row div{
     width: 12%;
}
.tableModule-body{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ADD9FF;
}
.wrap-video-box{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding-top: 50px;
}
.video-item{
    width: 40%;
    padding: 10px;
    box-sizing: border-box;
}
.statusDot{
  width: 16px !important;
  height: 16px;
  border-radius: 50%;
  background-color: #00FFFF;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.video-title{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #D6ECFF;
  margin: 16px 0;
}
.avatar{
  height: 45px;
  width: 45px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
}
.formatTime{
  width: 26% !important;
}
.red{
 background: #D0021B;
}
.green{
  background: #26D321;
}
.noDataPage{
  text-align: center;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
}
.markedWords{
  font-family: PingFangSC-Regular;
  font-size: 22px;
  color: #FFFFFF;
  margin-top: 16px;
}
@media screen and (max-width: 1690px) {
    .statistic-item{
        width: 24%;
    }
}
@media screen and (max-width: 1440px) {
  .statistic-item{
    width: 26%;
  }
  .details-wrap{
    width: 70%;
  }
}
</style>


