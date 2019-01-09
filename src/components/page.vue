<template>
  <div class="page" style="height:100vh;">
    <!-- 主体地图 -->
    <div ref="earth" id="earth"></div>
    <!-- 城市选择下拉框 -->
    <div class="header">
      <span>智慧文化云全省数据中心</span>
      <el-select
        v-model="city"
        placeholder="请选择"
        style="background:rgba(255,255,255,0);"
        @change="switchMap"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 散点图和热力图切换框 -->
    <div class="switch-button">
      <div
        class="child-button"
        :class="{'active-father-button': button_area == 'left'}"
        @click="leftClick"
      >分布图</div>
      <div
        class="child-button"
        :class="{'active-father-button': button_area == 'right'}"
        @click="rightClick"
      >热力图</div>
    </div>
    <div class="under-button">
      <div
        class="button"
        v-for="(item,index) in buttonData"
        :key="item.value"
        @click="buttonClick(index,item.value)"
        :class="{'active-button': which==index }"
      >{{item.name}}</div>
    </div>
    <!-- 时间框 -->
    <div class="time">{{currentTime}}</div>
    <!-- 左列框 -->
    <div class="left-area">
      <!-- 热门活动框 -->
      <fieldset class="hotActivity border">
        <legend class="title">
          <div class="inner-title">热门活动</div>
        </legend>
        <div class="table">
          <div class="table-col" style="width:33.3%;">
            <div class="table-title">活动名称</div>
            <div
              class="table-body"
              style="max-width:120px;"
              v-for="item in tableData"
              :key="item.activity_id"
            >
              <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                <span style="cursor:pointer;">{{item.name}}</span>
              </el-tooltip>
            </div>
          </div>
          <!-- 渐变线框（用div填空背景色模拟边框） -->
          <div class="jianbian"></div>
          <div class="table-col" style="width:18.1%;">
            <div class="table-title">类型</div>
            <div class="table-body" v-for="item in tableData" :key="item.activity_id">{{item.type}}</div>
          </div>
          <div class="jianbian"></div>
          <div class="table-col" style="width:24.6%;">
            <div class="table-title">所属场馆</div>
            <div
              class="table-body"
              style="max-width:80px;"
              v-for="item in tableData"
              :key="item.activity_id"
            >
              <el-tooltip class="item" effect="dark" :content="item.stadium" placement="top">
                <span style="cursor:pointer;">{{item.stadium}}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="jianbian"></div>
          <div class="table-col">
            <div class="table-title">报名人数</div>
            <div class="table-body" v-for="item in tableData" :key="item.activity_id">
              <span class="number">
                <!-- {{item.number}} -->
                <countTo :startVal="1" :endVal="item.peopleNum" :duration="3000"></countTo>
              </span>
            </div>
          </div>
        </div>
        <!-- 右上角 -->
        <div class="hot-tr corner1" ref="hotTr"></div>
        <!-- 左下角 -->
        <div class="hot-lb corner2"></div>
      </fieldset>
      <!-- 喜爱情况框 -->
      <div class="love border" ref="love">
        <div ref="loveforactivity" style="width:50%;height:100%;"></div>
        <div ref="loveforservice" style="width:50%;height:100%;"></div>
        <div class="love-tr corner1"></div>
        <div class="love-lb corner2"></div>
      </div>
      <!-- 志愿者分布框 -->
      <div class="volunteer border">
        <div ref="volunteer" style="width:100%;height:100%;"></div>
        <div class="volunteer-tr corner1"></div>
        <div class="volunteer-lb corner2"></div>
      </div>
    </div>
    <!-- 右列框 -->
    <div class="right-area">
      <!-- 数据统计框 -->
      <fieldset class="statistics border">
        <div class="statistics-tr corner1" ref="statisticsTr"></div>
        <div class="statistics-lb corner2"></div>
        <legend class="title">
          <div class="inner-title">数据统计</div>
        </legend>
        <div class="statistics-body" v-if="statisticData">
          <div class="sta-row">
            <!-- <div class="statistics-item">到馆<span class="number" style="margin:0 8px;">180</span>人</div> -->
            <!-- <div class="statistics-item">到馆
              <span class="number" style="margin:0 8px;">
                <animate-number from="1" :to="statisticData" duration="3000" easing="easeOutQuad"></animate-number>
              </span>人
            </div>-->
            <div class="statistics-item">
              注册
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.registerNum" :duration="3000"></countTo>
              </span>人
            </div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">
              活动
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.activityNum" :duration="3000"></countTo>
              </span>场
            </div>
            <div class="statistics-item">
              报名
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.activityApplyNum" :duration="3000"></countTo>
              </span>人
            </div>
            <div class="statistics-item">
              参与
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.activityJoinNum" :duration="3000"></countTo>
              </span>人
            </div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">
              志愿者
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.volunteerNum" :duration="3000"></countTo>
              </span>人
            </div>
            <div class="statistics-item">
              志愿项目
              <span class="number" style="margin:0 8px;">
                <countTo
                  :startVal="1"
                  :endVal="statisticData.volunteerActivityNum"
                  :duration="3000"
                ></countTo>
              </span>个
            </div>
            <div class="statistics-item">
              参与
              <span class="number" style="margin:0 8px;">
                <countTo
                  :startVal="1"
                  :endVal="statisticData.volunteerActivityApplyNum"
                  :duration="3000"
                ></countTo>
              </span>人
            </div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">
              场地预定
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.spaceAppointNum" :duration="3000"></countTo>
              </span>次
            </div>
            <div class="statistics-item">
              场地使用
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.spaceUsedNum" :duration="3000"></countTo>
              </span>人
            </div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">
              服务点单
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.serviceNum" :duration="3000"></countTo>
              </span>次
            </div>
            <div class="statistics-item">
              覆盖区县
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.serviceCoverNum" :duration="3000"></countTo>
              </span>个
            </div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">
              资讯发布
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.informationNum" :duration="3000"></countTo>
              </span>篇
            </div>
            <div class="statistics-item">
              浏览
              <span class="number" style="margin:0 8px;">
                <countTo :startVal="1" :endVal="statisticData.informationSum" :duration="3000"></countTo>
              </span>人次
            </div>
          </div>
        </div>
      </fieldset>
      <!-- TOP5框 -->
      <div class="topBox border">
        <div class="left-box">
          <div class="box-header" style="margin-bottom:20px;">场馆热力指数TOP5</div>
          <div class="box-row" v-for="item in stadium" :key="item.id">
            <el-tooltip
              v-if="item.name&&item.name.length>5"
              class="item"
              effect="dark"
              :content="item.name"
              placement="top"
            >
              <span style="cursor:pointer;">
                {{item.name|cutString}}
                <span style="font-weight:bold;">...</span>
              </span>
            </el-tooltip>
            <span v-else>{{item.name}}</span>
            <span class="number right">
              <countTo :startVal="1" :endVal="item.value" :duration="3000"></countTo>
            </span>
          </div>
        </div>
        <div class="jianbian" style="height: auto;"></div>
        <div class="right-box">
          <div class="box-header" style="margin-bottom:20px;">场地预定TOP5</div>
          <div class="box-row" v-for="item in site" :key="item.id">
            <el-tooltip
              v-if="item.name&&item.name.length>5"
              class="item"
              effect="dark"
              :content="item.name"
              placement="top"
            >
              <span style="cursor:pointer;">
                {{item.name|cutString}}
                <span style="font-weight:bold;">...</span>
              </span>
            </el-tooltip>
            <span v-else>{{item.name}}</span>
            <span class="right">&nbsp;次</span>
            <span class="number right">
              <countTo :startVal="1" :endVal="item.value" :duration="3000"></countTo>
            </span>
          </div>
        </div>
        <div class="topBox-tr corner1"></div>
        <div class="topBox-lb corner2"></div>
      </div>
      <!-- 图书借还框 -->
      <div class="book border">
        <div ref="book" style="height:100%;width:100%;text-align:left;"></div>
        <div class="book-tr corner1"></div>
        <div class="book-lb corner2"></div>
      </div>
    </div>
    <!-- 趋势框 -->
    <div class="trend border">
      <div ref="trend" style="width:100%;height:100%;"></div>
      <div class="switch-title">
        <span
          class="trend-switch"
          :class="{'activeTrend': trend=='0'}"
          @click="switchTrend1"
        >活动报名月趋势</span>
        <span style="margin:0 6px;">/</span>
        <span
          class="trend-switch"
          :class="{'activeTrend': trend=='1'}"
          @click="switchTrend2"
        >服务点单月趋势</span>
      </div>
      <div class="trend-tr corner1"></div>
      <div class="trend-lb corner2"></div>
    </div>
    <!-- 详情页 -->
    <div class="activityPage" v-if="show">
      <child :message="childInfo" v-on:gotoParent="closePage"></child>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
import child from "@/components/details";
import countTo from "vue-count-to";
export default {
  name: "page",
  components: {
    child,
    countTo
  },
  data() {
    return {
      colors: [
        "#33A0FF",
        "#FFA033",
        "#55E3ED",
        "#7083FF",
        "#ADE4FF",
        "#5CC9FF",
        "#93F5D4",
        "#C2FFFB",
        "#B17ACC",
        "#D6D6FF"
      ],
      tableData: [],
      pie1: "",
      pie1Data: [],
      pie2: "",
      pie2Data: [],
      pie3: "",
      line: "",
      bar: "",
      options: [
        {
          value: "浙江省",
          label: "浙江省"
        },
        {
          value: "杭州市",
          label: "杭州市"
        },
        {
          value: "湖州市",
          label: "湖州市"
        },
        {
          value: "嘉兴市",
          label: "嘉兴市"
        },
        {
          value: "宁波市",
          label: "宁波市"
        },
        {
          value: "台州市",
          label: "台州市"
        },
        {
          value: "绍兴市",
          label: "绍兴市"
        },
        {
          value: "温州市",
          label: "温州市"
        },
        {
          value: "丽水市",
          label: "丽水市"
        },
        {
          value: "金华市",
          label: "金华市"
        },
        {
          value: "衢州市",
          label: "衢州市"
        },
        {
          value: "舟山市",
          label: "舟山市"
        }
      ],
      city: "浙江省",
      buttonData: [],
      leftButton: [
        {
          name: "活动分布",
          value: "activity"
        },
        {
          name: "场馆分布",
          value: "stadium"
        },
        {
          name: "场地预定分布",
          value: "space"
        },
        {
          name: "服务点单分布",
          value: "service"
        },
        {
          name: "志愿者分布",
          value: "volunteer"
        }
      ],
      rightButton: [
        {
          name: "活动热力",
          value: "activity"
        },
        {
          name: "场馆热力",
          value: "stadium"
        },
        {
          name: "场地预定热力",
          value: "space"
        },
        {
          name: "服务点单热力",
          value: "service"
        },
        {
          name: "志愿者热力",
          value: "volunteer"
        }
      ],
      button_area: "left",
      which: 0, //第几个按钮
      trend: "0",
      stadium: [],
      site: [],
      currentTime: "",
      monthData: [],
      lineData: [],
      legendData: [],
      ageData: [],
      typeData: [],
      map: "",
      place: "浙江省",
      type: "activity",
      mapData: [],
      statisticData: "",
      barData: [],
      block: false, //用于标记是否到县区级别
      show: false,
      childInfo: {},
      timeCount: 60,
      timer: "",
      j: 1
    };
  },
  methods: {
    initEchart: function() {
      this.map = new BMap.Map("earth", { enableMapClick: false, minZoom: 6 });
      this.map = new BMap.Map("earth", { minZoom: 6 });
      this.map.centerAndZoom("浙江省", 8);
      this.map.enableScrollWheelZoom();
      this.map.disableDoubleClickZoom();
      this.map.enableKeyboard();
      let width = document.body.clientWidth;
      let height = document.body.clientHeight;
      let w = width * 0.28; //缩放组件相对屏幕的位置（左）
      let h = height * 0.43; //                     （上）
      var navigation = new BMap.NavigationControl({
        offset: new BMap.Size(w, h),
        type: BMAP_NAVIGATION_CONTROL_SMALL
      });
      this.map.addControl(navigation);
      var geocoder = new BMap.Geocoder();
      // 拖拽后获取中心点坐标
      this.map.addEventListener("dragend", e => {
        // console.log(this.map.getZoom());
        // console.log(this.map.getCenter());
        let zoom = this.map.getZoom();
        let center = this.map.getCenter();
        geocoder.getLocation(center, res => {
          this.block = false;
          if (zoom < 11) {
            if (this.place != "浙江省") {
              this.city = "浙江省";
              this.place = "浙江省";
              this.refresh();
            }
          } else if (zoom < 13) {
            if (res.addressComponents.province == "浙江省") {
              if (this.place != res.addressComponents.city) {
                this.place = res.addressComponents.city;
                this.city = res.addressComponents.city;
                this.refresh();
              }
            }
          } else {
            if (res.addressComponents.province == "浙江省") {
              this.block = true;
              if (this.place != res.addressComponents.district) {
                this.place = res.addressComponents.district;
                this.city = res.addressComponents.city;
                this.refresh();
              }
            }
          }
        });
      });
      // 缩放结束
      this.map.addEventListener("zoomend", e => {
        // console.log("e", e);
        let zoom = this.map.getZoom();
        let center = this.map.getCenter();
        this.block = false;
        if (zoom < 11) {
          if (this.place != "浙江省") {
            this.city = "浙江省";
            this.place = "浙江省";
            this.refresh();
          }
        } else if (zoom < 13) {   
          geocoder.getLocation(center, res => {
            if (res.addressComponents.province == "浙江省") {
              if (this.place != res.addressComponents.city) {
                this.place = res.addressComponents.city;
                this.city = res.addressComponents.city;
                this.refresh();
              }
            }
          });
        } else {
          geocoder.getLocation(center, res => {
            //获取位置
            if (res.addressComponents.province == "浙江省") {
              this.block = true;
              if (this.place != res.addressComponents.district) {
                this.place = res.addressComponents.district;
                this.city = res.addressComponents.city;
                this.refresh();
              }
            }
          });
        }
      });
      var mapStyleJson = {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#044161"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#004981"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#064f85"
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              color: "#004981"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#005b96",
              lightness: 1
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#004981"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#00508b"
            }
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              color: "#056197",
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry.fill",
            stylers: {
              color: "#029fd4"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#1a5787"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.fill",
            stylers: {
              color: "#ffffff"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff40"
            }
          }
        ]
      };
      // var mapStyle={  style : "midnight" }
      // this.map.setMapStyle(mapStyle);
      this.map.setMapStyle(mapStyleJson);
    },
    initPie1: function() {
      this.pie1 = echarts.init(this.$refs.loveforactivity);
      this.pie1.setOption({
        title: {
          text: "活动类型受喜爱情况",
          x: "center",
          y: 10,
          textStyle: {
            fontFamily: "PingFangSC-Medium",
            fontSize: "12px",
            color: "#ADD9FF"
          }
        },
        color: this.colors,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        selectedMode: "single",
        series: [
          {
            name: "活动类型",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: this.pie1Data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    initPie2: function() {
      this.pie2 = echarts.init(this.$refs.loveforservice);
      this.pie2.setOption({
        title: {
          text: "服务类型受喜爱情况",
          textStyle: {
            fontFamily: "PingFangSC-Medium",
            fontSize: "12px",
            color: "#ADD9FF"
          },
          x: "center",
          y: 10
        },
        selectedMode: "single",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: this.colors,
        // roseType: "radius",
        series: [
          {
            name: "服务类型",
            type: "pie",
            radius: "50%",
            radius: ["30%", "60%"],
            center: ["50%", "60%"],
            data: this.pie2Data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    initPie3: function() {
      this.pie3 = echarts.init(this.$refs.volunteer);
      this.pie3.setOption({
        title: {
          textStyle: {
            fontFamily: "PingFangSC-Medium",
            fontSize: "12px",
            color: "#ADD9FF"
          },
          text: "志愿者分布",
          x: "center",
          y: 10
        },
        selectedMode: "single",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: "30%",
            center: ["50%", "50%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            data: this.ageData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            name: "类型分布",
            type: "pie",
            radius: ["40%", "60%"],
            data: this.typeData
          }
        ]
      });
    },
    initLine: function() {
      let width = document.body.clientWidth;
      let y = 10;
      if (width < 1680) {
        y = 30;
      }
      this.line = echarts.init(this.$refs.trend);
      this.line.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#D6ECFF"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(214,236,255,0.32)"
            }
          },
          data: this.monthData
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#D6ECFF"
            }
          }
        },
        grid: {
          bottom: "10%",
          right: "6%"
        },
        legend: {
          data: this.legendData,
          selectedMode: "single",
          y: y,
          right: 10,
          inactiveColor: "#ADD9FF",
          textStyle: {
            color: "#00FFFF"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        series: this.lineData
      });
    },
    initBar: function() {
      this.bar = echarts.init(this.$refs.book);
      this.bar.setOption({
        title: {
          text: "图书借还TOP5",
          x: "center",
          y: 10,
          textStyle: {
            fontFamily: "PingFangSC-Medium",
            fontSize: "12px",
            color: "#ADD9FF"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            let txt = params[0].name + "<br>";
            for (let i = 0; i < params.length; i++) {
              if (i == 0) {
                params[i].marker =
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FFBC70;'></span>";
              } else {
                params[i].marker =
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0087FF;'></span>";
              }
              txt +=
                params[i].marker +
                params[i].seriesName +
                ": " +
                Math.abs(params[i].data) +
                "<br>";
            }
            return txt;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          top: "40px",
          containLabel: true
        },
        xAxis: {
          type: "value",
          // scale: true,
          // boundaryGap: [0, 0.01]
          splitLine: { show: false },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            formatter: function(data) {
              if (Math.abs(data) > 9999) {
                return Math.abs(data) / 10000 + "万";
              } else {
                return Math.abs(data);
              }
            },
            rotate: 45,
            showMinLabel: true
          }
        },
        yAxis: {
          type: "category",
          onZero: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            formatter: function(data) {
              // console.log(data);
              if (data.length > 5) {
                return data.slice(0, 5) + "...";
              } else {
                return data;
              }
            },
            rotate: -45
          },
          inverse: true,
          // data: [
          //   "浙江图书馆",
          //   "浙江文化馆",
          //   "嘉兴图书馆",
          //   "莲都区文化站",
          //   "宁波文化馆"
          // ]
          data: this.barData.name
        },
        series: [
          {
            name: "借出图书数量",
            type: "bar",
            stack: "图书",
            // data: [-320, -280, -240, -199, -152],
            data: this.barData.borrowNum,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#FFBC70" },
                { offset: 1, color: "#FF8800" }
              ])
            },
            barCategoryGap: "50%",
            label: {
              formatter: function(value) {
                return Math.abs(value.data);
              }
            }
          },
          {
            name: "已还图书数量",
            type: "bar",
            stack: "图书",
            // data: [320, 280, 240, 199, 152],
            data: this.barData.repayNum,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#0087FF" },
                { offset: 1, color: "#5CB3FF" }
              ])
            },
            barCategoryGap: "50%"
          }
        ]
      });
    },
    getHotActivity: function() {
      this.$axios
        .post(
          "/BigScreen/Index/hotActivityList",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          // console.log(res);
          if (res.data.CODE == "ok") {
            let data = res.data.DATA.slice(0, 8);
            for (let i = 0; i < data.length; i++) {
              data[i].peoplenum = Number(data[i].peoplenum);
            }
            this.tableData = data;
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
    getLoveData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/hotActivityType",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          // console.log(res);
          if (res.data.CODE == "ok") {
            this.pie1Data = res.data.DATA;
            // for (let i = 0; i < this.pie1Data.length; i++) {
            //   this.pie1Data[i].itemStyle = { color: this.colors[i] };
            // }
            this.initPie1();
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
      this.$axios
        .post(
          "/BigScreen/Index/hotServiceType",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.pie2Data = res.data.DATA;
            // for (let i = 0; i < this.pie2Data.length; i++) {
            //   this.pie2Data[i].itemStyle = { color: this.colors[i] };
            // }
            this.initPie2();
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
    leftClick: function() {
      if (this.button_area == "right") {
        this.button_area = "left";
        this.buttonData = this.leftButton;
        this.getMapData();
      }
    },
    rightClick: function() {
      if(this.block){
        return
      }else{
        if (this.button_area == "left") {
          this.button_area = "right";
          this.buttonData = this.rightButton;
          this.getMapData();
        }
      }
    },
    buttonClick: function(val, val1) {
      this.which = val;
      console.log(this.which);
      if (this.type != val1) {
        // console.log(val1);
        this.type = val1;
        this.getMapData();
      }
    },
    /**
     * 下拉框值改变事件
     */
    switchMap: function(val) {
      if (this.place != val) {
        this.place = val;
        if (val == "浙江省") {
          this.map.centerAndZoom("浙江省", 8);
          this.refresh();
        } else {
          this.map.centerAndZoom(val, 11);
          this.refresh();
        }
      }
    },
    /**
     * 趋势数据切换
     */
    switchTrend1: function() {
      if (this.trend == "1") {
        this.trend = "0";
        let url = "/BigScreen/Index/preMonthActivity";
        this.changeTrendData(url);
        clearTimeout(this.timer);
      }
    },
    switchTrend2: function() {
      if (this.trend == "0") {
        this.trend = "1";
        let url = "/BigScreen/Index/preMonthService";
        this.changeTrendData(url);
        clearTimeout(this.timer);
      }
    },
    /**
     * 当前时间函数
     */
    getCurrentTime: function() {
      let time = new Date();
      let year = time.getFullYear();
      year = year > 9 ? year : "0" + year;
      let month = time.getMonth() + 1;
      month = month > 9 ? month : "0" + month;
      let day = time.getDate();
      day = day > 9 ? day : "0" + day;
      let hour = time.getHours();
      hour = hour > 9 ? hour : "0" + hour;
      let minute = time.getMinutes();
      minute = minute > 9 ? minute : "0" + minute;
      let second = time.getSeconds();
      second = second > 9 ? second : "0" + second;
      this.currentTime =
        year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    /**
     * 获得月数据
     */
    getMonthData: function() {
      this.monthData = [];
      let time = new Date();
      let startMonth = time.getMonth() - 10;
      for (let i = 0; i < 12; i++) {
        let month = startMonth + i;
        if (month < 1) {
          month += 12;
        }
        month += "月";
        this.monthData.push(month);
      }
    },
    /**
     * 获得趋势数据
     */
    getTrendData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/preMonthActivity",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.lineData = res.data.DATA;
            this.legendData = [];
            for (let i = 0; i < this.lineData.length; i++) {
              this.legendData.push(this.lineData[i].name);
              this.lineData[i].data = this.lineData[i].value;
              this.lineData[i].type = "line";
              if (i == 0) {
                this.lineData[i].itemStyle = { color: "#00FFFF" };
                this.lineData[i].areaStyle = {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0,255,255,1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0,255,255,0)"
                      }
                    ],
                    globalCoord: true
                  }
                };
              } else {
                this.lineData[i].itemStyle = { color: "#0087FF" };
                this.lineData[i].areaStyle = {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0,135,255,1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0,135,255,0)"
                      }
                    ],
                    globalCoord: true
                  }
                };
              }
            }
            // console.log(this.lineData);
            if (this.line) {
              this.line.clear();
            }
            this.initLine();
            clearTimeout(this.timer);
            this.moveLine();
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
    /**
     * 切换趋势重新获取数据
     */
    changeTrendData: function(url) {
      clearTimeout(this.timer);
      this.j = 1;
      this.$axios
        .post(url, this.$qs.stringify({ place: this.place }))
        .then(res => {
          if (res.data.CODE == "ok") {
            this.lineData = res.data.DATA;
            this.legendData = [];
            for (let i = 0; i < this.lineData.length; i++) {
              this.legendData.push(this.lineData[i].name);
              this.lineData[i].data = this.lineData[i].value;
              this.lineData[i].type = "line";
              if (i == 0) {
                this.lineData[i].itemStyle = { color: "#00FFFF" };
                this.lineData[i].areaStyle = {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0,255,255,1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0,255,255,0)"
                      }
                    ],
                    globalCoord: true
                  }
                };
              } else {
                this.lineData[i].itemStyle = { color: "#0087FF" };
                this.lineData[i].areaStyle = {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(0,135,255,1)"
                      },
                      {
                        offset: 1,
                        color: "rgba(0,135,255,0)"
                      }
                    ],
                    globalCoord: true
                  }
                };
              }
            }
            this.line.clear();
            this.initLine();
            this.moveLine();
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
    /**
     * 动画线型图
     */
    moveLine: function() {
      this.timer = setTimeout(() => {
        let option = this.line.getOption();
        let selected = {};
        for (let i = 0; i < this.legendData.length; i++) {
          if (this.j == i) {
            selected[this.legendData[i]] = true;
          } else {
            selected[this.legendData[i]] = false;
          }
        }
        this.line.clear();
        option.legend[0].selected = selected;
        this.line.setOption(option);
        this.j += 1;
        if (this.j == this.legendData.length) {
          this.j = 0;
        }
        this.moveLine();
      }, 5000);
    },
    /**
     * 获取志愿者分布数据
     */
    getVolunteerData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/volunteerDistribution",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.ageData = res.data.DATA.age;
            this.typeData = res.data.DATA.type;
            for (let i = 0; i < this.ageData.length; i++) {
              this.ageData[i].itemStyle = { color: this.colors[i] };
            }
            for (let i = 0; i < this.typeData.length; i++) {
              this.typeData[i].itemStyle = { color: this.colors[i] };
            }
            this.initPie3();
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
    /**
     * 获取地图数据
     */
    getMapData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/mapData",
          this.$qs.stringify({ place: this.place, type: this.type })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.mapData = res.data.DATA;
            this.map.clearOverlays();
            this.getBoundary(this.place);
            if (this.block) {
              let array = [];
              for (let i = 0; i < this.mapData.length; i++) {
                let y=0;
                let point = new BMap.Point(
                  this.mapData[i].lng,
                  this.mapData[i].lat
                );
                for(let j=0;j<array.length;j++){
                  if(array[j].lng==point.lng && array[j].lat==point.lat){
                    y += 10;
                  }
                };
                array.push(point);
                let marker = new BMap.Marker(point,{offset:new BMap.Size(0,y)}); // 创建标注
                this.map.addOverlay(marker);
                // let myIcon = new BMap.Icon("https://static-public.hz.backustech.com/1544089445631", new BMap.Size(48,48),{anchor: new BMap.Size(20,70)});
                // var marker1 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                // this.map.addOverlay(marker1);
                // 复杂的自定义覆盖物
                function ComplexCustomOverlay(point, text, text1) {
                  this._point = point;
                  this._text = text;
                  this._text1 = text1;
                }
                ComplexCustomOverlay.prototype = new BMap.Overlay();
                var that = this;
                ComplexCustomOverlay.prototype.initialize = function(map1) {
                  this._map = map1;
                  var div = (this._div = document.createElement("div"));
                  div.style.position = "absolute";
                  div.style.backgroundColor = "rgba(0,0,0,0.5)";
                  div.style.color = "white";
                  div.style.height = "32px";
                  div.style.padding = "5px 10px";
                  div.style.whiteSpace = "nowrap";
                  div.style.fontSize = "12px";
                  div.style.borderRadius = "5px";
                  var span = document.createElement("span");
                  div.appendChild(span);
                  span.appendChild(document.createTextNode(this._text));
                  var br = document.createElement("br");
                  div.appendChild(br);
                  var span1 = document.createElement("span");
                  div.appendChild(span1);
                  span1.appendChild(document.createTextNode(this._text1));
                  that.map.getPanes().labelPane.appendChild(div);
                  return div;
                };
                ComplexCustomOverlay.prototype.draw = function() {
                  var map1 = this._map;
                  var pixel = map1.pointToOverlayPixel(this._point);
                  this._div.style.left = pixel.x + 10 + "px";
                  this._div.style.top = pixel.y - 30 + y + "px";
                };
                if (this.type == "activity") {
                  var txt = "活动名称：" + this.mapData[i].name;
                } else {
                  var txt = "场馆名称：" + this.mapData[i].name;
                }
                var txt1 = "地址：" + this.mapData[i].address;
                let myCompOverlay = new ComplexCustomOverlay(point, txt, txt1);
                this.map.addOverlay(myCompOverlay);
                myCompOverlay.hide();
                marker.enableDragging();
                // marker.setAnimation(BMAP_ANIMATION_BOUNCE)
                marker.addEventListener("mouseover", () => {
                  myCompOverlay.show();
                });
                marker.addEventListener("mouseout", () => {
                  myCompOverlay.hide();
                });
                marker.addEventListener("click", () => {
                  this.childInfo.id = this.mapData[i].id;
                  this.childInfo.type = this.type;
                  this.show = true;
                });
              }
            } else {
              if (this.button_area == "left") {
                for (let i = 0; i < this.mapData.length; i++) {
                  let offsetLeft = -5;
                  if (this.mapData[i].value[2] > 9) {
                    offsetLeft = -10;
                  } else if (this.mapData[i].value[2] > 99) {
                    offsetLeft = -20;
                  } else if (this.mapData[i].value[2] > 999) {
                    offsetLeft = -25;
                  } else if (this.mapData[i].value[2] > 9999) {
                    offsetLeft = -30;
                  }
                  let point = new BMap.Point(
                    this.mapData[i].value[0],
                    this.mapData[i].value[1]
                  );
                  let opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(offsetLeft, -10) //设置文本偏移量
                  };
                  let label = new BMap.Label(this.mapData[i].value[2], opts); // 创建文本标注对象
                  label.setStyle({
                    color: "white",
                    fontSize: "14px",
                    fontFamily: "微软雅黑",
                    border: "none",
                    background: "none"
                  });
                  this.map.addOverlay(label); //添加标签
                  label.addEventListener("click", () => {
                    var geocoder = new BMap.Geocoder();
                    let zoom = this.map.getZoom();
                    geocoder.getLocation(point, res => {
                      //根据坐标解析地名
                      // this.block = false;
                      if(zoom < 11) {
                        this.city = res.addressComponents.city;
                        this.place = res.addressComponents.city;
                        this.map.centerAndZoom(point, 11);
                        this.refresh();
                      }else {
                        this.place = res.addressComponents.district;
                        this.city = res.addressComponents.city;
                        this.map.centerAndZoom(point, 14);
                        this.block = true;
                        this.refresh();
                      }
                    });
                  });
                  let zoom = this.map.getZoom();
                  let value = this.mapData[i].value[2] * 200;
                  if (zoom < 11) {
                    if (value < 7000) {
                      value = 7000;
                    }
                  } else {
                    value = this.mapData[i].value[2] * 100;
                    if (value < 1000) {
                      value = 1000;
                    }
                  }
                  var circle = new BMap.Circle(point, value, {
                    fillColor: "#FFAA00",
                    strokeColor: "orange",
                    strokeOpacity: 0.7
                  });
                  let position = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(10, -10) //设置文本偏移量
                  };
                  let text = this.mapData[i].name + " : " + this.mapData[i].value[2]; 
                  let overLable = new BMap.Label(text, position); // 创建文本标注对象
                  overLable.setStyle({
                    color: "white",
                    fontSize: "14px",
                    fontFamily: "微软雅黑",
                    border: "none",
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "5px",
                    padding: "10px"
                  });
                  this.map.addOverlay(overLable);
                  overLable.hide();
                  this.map.addOverlay(circle);
                  circle.addEventListener("mouseover", () => {
                    overLable.show();
                  });
                  circle.addEventListener("mouseout", () => {
                    overLable.hide();
                  });
                  circle.addEventListener("click", () => {
                    var geocoder = new BMap.Geocoder();
                    let zoom = this.map.getZoom();
                    geocoder.getLocation(point, res => {
                      //根据坐标解析地名
                      // this.block = false;
                      if (zoom < 11) {
                        this.city = res.addressComponents.city;
                        this.place = res.addressComponents.city;
                        this.refresh();
                        this.map.centerAndZoom(point, 11);
                      } else {
                        this.place = res.addressComponents.district;
                        this.city = res.addressComponents.city;
                        this.map.centerAndZoom(point, 14);
                        this.block = true;
                        this.refresh();
                      }
                    });
                  });
                }
              } else {
                let points = [];
                for (let i = 0; i < this.mapData.length; i++) {
                  let point = {
                    lng: this.mapData[i].value[0],
                    lat: this.mapData[i].value[1],
                    count: this.mapData[i].value[2]
                  };
                  points.push(point);
                }
                let heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 30 });
                this.map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({ data: points, max: 100 });
              }
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
    /**
     * 获取统计数据
     */
    getStatisticsData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/dataStatistic",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            //  console.log(res);
            if (this.statisticData != res.data.DATA) {
              this.statisticData = res.data.DATA;
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
    /**
     * 获取top5数据
     */
    getTopData1: function() {
      this.$axios
        .post(
          "/BigScreen/Index/hopStadium",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            //  console.log(res);
            this.stadium = res.data.DATA;
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
    getTopData2: function() {
      this.$axios
        .post(
          "/BigScreen/Index/hotSpace",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            this.site = res.data.DATA;
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
    /**
     * 图书接还数据
     */
    getBookData: function() {
      this.$axios
        .post(
          "/BigScreen/Index/hotBookCirculate",
          this.$qs.stringify({ place: this.place })
        )
        .then(res => {
          if (res.data.CODE == "ok") {
            // console.log('book');
            //  console.log(res);
            this.barData = res.data.DATA;
            this.initBar();
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
    /**
     * 更新地点执行函数
     */
    refresh: function() {
      this.getMapData();
      this.getHotActivity();
      this.getStatisticsData();
      this.getLoveData();
      this.initBar();
      this.getTrendData();
      this.getVolunteerData();
      this.getTopData1();
      this.getTopData2();
      this.getBookData();
      this.getCurrentTime();
      this.timeCount = 60;
      this.trend = "0";
      this.j = 1;
    },
    /**
     * 关闭活动页
     */
    closePage: function(data) {
      if (data == "closePage") {
        this.show = false;
      }
    },
    /**
     * 倒计时函数
     */
    countDown: function() {
      setTimeout(() => {
        this.timeCount = 0;
        // console.log(this.timeCount);
        if (this.timeCount == 0) {
          this.refresh();
          this.getCurrentTime();
        }
        this.countDown();
      }, 60000);
    },
    /**
     * 获取高亮区域边界
     */
    getBoundary: function(place) {
      var bdary = new BMap.Boundary();    //一个行政区域的边界
      bdary.get(place, rs => {
        var ply = new BMap.Polygon(rs.boundaries[0], {     
          strokeWeight: 2,
          strokeColor: "Aqua",
          fillColor: ''
        }); //建立多边形覆盖物
        this.map.addOverlay(ply); //添加覆盖物
      });
    }
  },
  created() {
    this.buttonData = this.leftButton;
    this.getMonthData();
    this.getHotActivity();
    this.getStatisticsData();
  },
  mounted() {
    this.$nextTick(function() {
      this.initEchart();
      this.getLoveData();
      this.initBar();
      this.getTrendData();
      this.getVolunteerData();
      this.getMapData();
      this.getTopData1();
      this.getTopData2();
      this.getBookData();
      var brower = navigator.userAgent;
      if (brower.indexOf("Firefox") > -1) {
        //判断是否为火狐浏览器
        this.$refs.hotTr.style.top = -32 + "px";
        this.$refs.statisticsTr.style.top = -32 + "px";
      }
    });
    this.getCurrentTime();
    this.countDown();
  },
  filters: {
    cutString: function(val) {
      if (val && val.length > 5) {
        return val.substr(0, 5);
      }
    }
  }
};
</script>
<style>
@import "../assets/page.css";
</style>

