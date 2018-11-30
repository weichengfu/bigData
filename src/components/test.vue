<template>
  <div class="page" style="height:100vh;">
    <!-- 主体地图 -->
    <div ref="earth" style="height:100%;"></div>
    <!-- 城市选择下拉框 -->
    <div class="header">
         <span>智慧文化云全省数据大屏</span>
        <el-select v-model="city" placeholder="请选择" style="background:rgba(255,255,255,0);" @change="switchMap">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
    <div class="time">{{currentTime}}</div>
    <div class="left-area">
        <!-- 热门活动框 -->
        <fieldset class="hotActivity border">
          <!-- 右上角 -->
          <div class="hot-tr corner1"></div>
          <!-- 左下角 -->
          <div class="hot-lb corner2"></div>
          <legend class="title"><div class="inner-title">热门活动</div></legend>
          <div class="table">
            <div class="table-col" style="width:33.3%;">
              <div class="table-title">活动名称</div>
              <div class="table-body" v-for="item in tableData" :key="item.name">{{item.name}}</div>
            </div>
            <!-- 渐变线框（用div填空背景色模拟边框） -->
            <div class="jianbian"></div>
            <div class="table-col" style="width:18.1%;">
              <div class="table-title">类型</div>
              <div class="table-body" v-for="item in tableData" :key="item.name">{{item.type}}</div>
            </div>
            <div class="jianbian"></div>
            <div class="table-col" style="width:24.6%;">
              <div class="table-title">所属场馆</div>
              <div class="table-body" v-for="item in tableData" :key="item.name">{{item.address}}</div>
            </div>
            <div class="jianbian"></div>
            <div class="table-col">
              <div class="table-title">报名人数</div>
              <div class="table-body" v-for="item in tableData" :key="item.name"><span class="number">
                <!-- {{item.number}} -->
                <animate-number from="1" :to='item.number'  duration="3000"  easing="easeOutQuad"></animate-number>
                </span></div>
            </div>
          </div>
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
    <div class="right-area">
       <!-- 数据统计框 -->
      <fieldset class="statistics border">
        <div class="statistics-tr corner1"></div>
        <div class="statistics-lb corner2"></div>
        <legend class="title"><div class="inner-title">数据统计</div></legend>
        <div class="statistics-body">
          <div class="sta-row">
            <!-- <div class="statistics-item">到馆<span class="number" style="margin:0 8px;">180</span>人</div> -->
            <div class="statistics-item">到馆<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="1000"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
            <div class="statistics-item">注册<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="3000"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">活动<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="598"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>场</div>
            <div class="statistics-item">报名<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="254"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
            <div class="statistics-item">参与<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="324"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">志愿者<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="598"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
            <div class="statistics-item">志愿项目<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="254"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>个</div>
            <div class="statistics-item">参与<span class="number" style="margin:0 8px;">324</span>人</div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">场地预定<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="598"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>次</div>
            <div class="statistics-item">场地使用<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="1254"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人</div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">服务点单<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="352"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>次</div>
            <div class="statistics-item">覆盖区县<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="263"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>个</div>
          </div>
          <div class="jianbian" style="height: 1px;width: 100%;"></div>
          <div class="sta-row">
            <div class="statistics-item">资讯发布<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="8690"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>篇</div>
            <div class="statistics-item">浏览<span class="number" style="margin:0 8px;">
              <animate-number from="1" to="17953"  duration="3000"  easing="easeOutQuad"></animate-number>
              </span>人次</div>
          </div>
        </div>
      </fieldset>
      <!-- TOP5框 -->
      <div class="topBox border">
        <div class="left-box">
          <div class="box-header" style="margin-bottom:20px;">场馆热力指数TOP5</div>
          <!-- <div class="box-row">浙江图书馆<span class="number right">3094</span></div>
          <div class="box-row">浙江文化馆<span class="number right">2580</span></div>
          <div class="box-row">嘉兴图书馆<span class="number right">1427</span></div>
          <div class="box-row">莲都区文化站<span class="number right">985</span></div>
          <div class="box-row">宁波文化站<span class="number right">906</span></div> -->
          <div class="box-row" v-for="item in stadium" :key="item.name">
            {{item.name}}<span class="number right"><animate-number from="1" :to="item.value"  duration="3000"  easing="easeOutQuad"></animate-number></span>
          </div>
        </div>
        <div class="jianbian" style="height: auto;"></div>
        <div class="right-box">
          <div class="box-header" style="margin-bottom:20px;">场地预定TOP5</div>
          <!-- <div class="box-row">浙江图书馆<span class="right">&nbsp;次</span><span class="number right">45</span></div>
          <div class="box-row">浙江文化馆<span class="right">&nbsp;次</span><span class="number right">39</span></div>
          <div class="box-row">嘉兴图书馆<span class="right">&nbsp;次</span><span class="number right">26</span></div>
          <div class="box-row">莲都区文化站<span class="right">&nbsp;次</span><span class="number right">17</span></div>
          <div class="box-row">宁波文化站<span class="right">&nbsp;次</span><span class="number right">13</span></div> -->
          <div class="box-row" v-for="item in site" :key="item.name">
            {{item.name}}<span class="right">&nbsp;次</span><span class="number right"><animate-number from="1" :to="item.value"  duration="3000"  easing="easeOutQuad"></animate-number></span>
          </div>
        </div>
        <div class="topBox-tr corner1"></div>
        <div class="topBox-lb corner2"></div>
      </div>
      <!-- 图书借还框 -->
      <div class="book border">
        <div ref="book" style="height:100%;width:100%;"></div>
        <div class="book-tr corner1"></div>
        <div class="book-lb corner2"></div>
      </div>
    </div>
    <div class="left-button">
      <div class="button" v-for="(item,index) in leftButton" :key="item.name" @click="leftClick(index)" :class="{'active-button': which==index&&button_area=='left' }">{{item.name}}</div>
    </div>
    <div class="right-button">
      <div class="button" v-for="(item,index) in rightButton" :key="item.name" @click="rightClick(index)" :class="{'active-button': which==index&&button_area=='right' }">{{item.name}}</div>
    </div>
    <!-- 趋势框 -->
    <div class="trend border">
      <div ref="trend" style="width:100%;height:100%;"></div>
      <div class="switch-title"><span class="trend-switch" :class="{'activeTrend': trend=='0'}" @click="switchTrend1">活动报名月趋势</span><span style="margin:0 6px;">/</span><span class="trend-switch" :class="{'activeTrend': trend=='1'}" @click="switchTrend2">服务点单月趋势</span></div>
      <div class="trend-tr corner1"></div>
      <div class="trend-lb corner2"></div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
var cities = require("../cities.json")
var map = require("../map.json");
var zhejiang = require("../zhejiang.json");
var hangzhou = require("../hangzhou.json");
var shaoxing = require("../shaoxing.json");
var huzhou = require("../huzhou.json");
var jiaxing = require("../jiaxing.json");
var jinhua = require("../jiaxing.json");
var lishui = require("../lishui.json");
var ningbo = require("../ningbo.json");
var quzhou = require("../quzhou.json");
var taizhou = require("../taizhou.json");
var wenzhou = require("../wenzhou.json");
var zhoushan = require("../zhoushan.json");
echarts.registerMap("map", cities);
export default {
  name: "page",
  data() {
    return {
      myChart: "",
      tableData: [
        {
          name: "文演",
          type: "文艺",
          address: "杭州",
          number: 569
        },
        {
          name: "小品",
          type: "文艺",
          address: "金华",
          number: 368
        },
        {
          name: "相声",
          type: "文艺",
          address: "温州",
          number: 786
        },
        {
          name: "说书",
          type: "文艺",
          address: "衢州",
          number: 956
        },
        {
          name: "曲艺",
          type: "文艺",
          address: "丽水",
          number: 368
        },
        {
          name: "吹笛",
          type: "文艺",
          address: "杭州",
          number: 498
        },
        {
          name: "诗歌朗诵",
          type: "文艺",
          address: "宁波",
          number: 956
        },
        {
          name: "电影观赏",
          type: "文艺",
          address: "宁波",
          number: 653
        },
        // {
        //   name: "综艺节目",
        //   type: "文艺",
        //   address: "湖州",
        //   number: 866
        // },
        // {
        //   name: "书法大赛",
        //   type: "文艺",
        //   address: "嘉兴",
        //   number: 687
        // }
      ],
      pie1: "",
      pie2: "",
      pie3: "",
      line: "",
      bar: "",
      options: [
        {
          value: "1101",
          label: "浙江省"
        },
        {
          value: "1102",
          label: "杭州市"
        },
        {
          value: "1103",
          label: "湖州市"
        },
        {
          value: "1104",
          label: "嘉兴市"
        },
        {
          value: "1105",
          label: "宁波市"
        },
        {
          value: "1107",
          label: "台州市"
        },
        {
          value: "1106",
          label: "绍兴市"
        },
        {
          value: "1108",
          label: "温州市"
        },
        {
          value: "1109",
          label: "丽水市"
        },
        {
          value: "1110",
          label: "金华市"
        },
        {
          value: "1111",
          label: "衢州市"
        },
        {
          value: "1112",
          label: "舟山市"
        }
      ],
      city: "1101",
      leftButton: [
        {
          name: "活动分布"
        },
        {
          name: "场馆分布"
        },
        {
          name: "场地预定分布"
        },
        {
          name: "服务点单分布"
        },
        {
          name: "志愿者分布"
        }
      ],
      rightButton: [
        {
          name: "活动热力"
        },
        {
          name: "场馆热力"
        },
        {
          name: "场地预定热力"
        },
        {
          name: "服务点单热力"
        },
        {
          name: "志愿者热力"
        }
      ],
      button_area: "left",
      which: 0, //第几个按钮
      trend: "0",
      data1: [820, 932, 901, 934, 1290, 1330, 1320, 690, 780, 1543, 1110, 1200],
      data2: [930, 899, 788, 925, 654, 1230, 1100, 566, 899, 985, 966, 874],
      hangzhouData: [
        {
          name: '滨江区',
          value: [120.2182019597,30.2147153586,300]
        },
        {
          name: '江干区',
          value: [120.2115832226,30.2633516551,200]
        },
        {
          name: '上城区',
          value: [120.1758834947,30.2482541529,123]
        },
        {
          name: '萧山区',
          value: [120.2707054791,30.1908560231,180]
        },
        {
          name: '余杭区',
          value: [120.3059202616, 30.3238430000001,180]
        }
      ],
      shaoxingData: [
        {
          name: '绍兴县',
          value: [120.4456958802, 30.0916047916,180]
        },
        {
          name: '新昌县',
          value: [120.9104264492, 29.5055626135,130]
        },
        {
          name: '诸暨市',
          value: [120.2532442741, 29.7148614199,210]
        },
        {
          name: '嵊州市',
          value: [120.8371869959, 29.5674963982,180]
        }
      ],
      zhejiangData: [
          {
            name: "杭州",
            value: [120.153576, 30.287459, 800]
          },
          {
            name: "湖州",
            value: [120.102398, 30.867198, 500]
          },
          {
            name: "绍兴",
            value: [120.582112, 29.997117, 300]
          },
          {
            name: "金华",
            value: [119.649506, 29.089524, 900]
          }
      ],
      stadium: [
        {
          name: '浙江图书馆',
          value: 3094
        },
        {
          name: '浙江文化馆',
          value: 2580
        },
        {
          name: '嘉兴图书馆',
          value: 1427
        },
        {
          name: '莲都区文化站',
          value: 985
        },
        {
          name: '宁波文化站',
          value: 906
        }
      ],
      site: [
        {
          name: '浙江图书馆',
          value: 45
        },
        {
          name: '浙江文化馆',
          value: 39
        },
        {
          name: '嘉兴图书馆',
          value: 26
        },
        {
          name: '莲都区文化站',
          value: 17
        },
        {
          name: '宁波文化站',
          value: 13
        }
      ],
      currentTime: '',
      zoom: 1     //地图缩放比例
    };
  },
  methods: {
    initEchart: function() {
      this.myChart = echarts.init(this.$refs.earth);
      this.myChart.setOption({
        backgroundColor: "rgba(21,78,144,0)",
        tooltip: {
          // trigger: 'item'
        },
        geo: {
          map: "map",
          // center: [120.498, 29.0918], //以浙江省为中心
          scaleLimit: {
            //缩放限制
            min: 0.5,
            max: 3
          },
          regions: [
            {
                name: '宁波市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '杭州市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '湖州市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '嘉兴市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '丽水市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '台州市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '温州市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '绍兴市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '舟山市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '衢州市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            },
            {
                name: '金华市',
                label: {
                  show: true,
                  color: 'white',
                  // fontSize: 16
                },
                itemStyle: {
                  borderColor: "black"
                }
            }
          ],
          selectedMode: "single",
          label: {
            normal: {
              // show: true,
              color: "white"
            },
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#5CB3FF",
              borderColor: "rgba(0,135,255,0.3)"
            },
            emphasis: {
              areaColor: "dodgerblue"
            }
          }
        },
        // visualMap: {
        //   min: 0,
        //   max: 1000,
        //   calculable: true,
        //   realtime: false,
        //   inRange: {
        //     color: [
        //       "#e0f3f8",
        //       "#ffffbf",
        //       "#fee090",
        //       "#fdae61",
        //       "#f46d43",
        //       "#d73027",
        //       "#a50026"
        //     ]
        //   },
        //   show: false
        // },
        series: [
          {
            name: "活动人数",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: [
              {
                name: "杭州",
                value: [120.153576, 30.287459, 800]
              },
              {
                name: "湖州",
                value: [120.102398, 30.867198, 500]
              },
              {
                name: "绍兴",
                value: [120.582112, 29.997117, 300]
              },
              {
                name: "金华",
                value: [119.649506, 29.089524, 900]
              }
            ],
            symbolSize: function(val) {
              return val[2] / 20;
            },
            showEffectOn: "render", //特效显示
            rippleEffect: {
              brushType: "stroke", //波纹的绘制方式
              period: 2, //动画周期，控制波纹扩展速度
              scale: 3 //波纹的最大缩放比例
            },
            symbol: "circle",
            hoverAnimation: true,
            label: {
              normal: {
                // formatter: "{b}",
                // position: ['50%','50%'],
                formatter: function (params) {
                    return params.value[2];
                },
                top: 'center',
                left: 'center',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#FFAA00",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            tooltip: {
              trigger: "item",
              // formatter: "{a} <br/>{b} : {c1}"
              formatter: function (params) {
                  return params.seriesName + '<br>' + params.name + ' : ' + params.value[2];
              }
            },
          }
          // {
          //   name: "test",
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   silent: true,
          //   data: [
          //     {
          //       name: "衢州市",
          //       value: [118.87263, 28.941708, 120]
          //     },
          //     {
          //       name: "丽水市",
          //       value: [119.921786, 28.451993, 110]
          //     },
          //     {
          //       name: "台州市",
          //       value: [121.428599, 28.661378, 126]
          //     },
          //     {
          //       name: "嘉兴市",
          //       value: [120.750865, 30.762653, 160]
          //     },
          //     {
          //       name: "温州市",
          //       value: [120.672111, 28.000575, 160]
          //     }
          //   ],
          //   symbolSize: function(val) {
          //     return val[2] / 10;
          //   },
          //   showEffectOn: "render", //特效显示
          //   rippleEffect: {
          //     brushType: "stroke", //波纹的绘制方式
          //     period: 2, //动画周期，控制波纹扩展速度
          //     scale: 4 //波纹的最大缩放比例
          //   },
          //   symbol: "circle",
          //   hoverAnimation: true,
          //   label: {
          //     normal: {
          //       formatter: "{b}",
          //       position: "right",
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#ff0000",
          //       shadowBlur: 10,
          //       shadowColor: "#333"
          //     }
          //   }
          // }
        ]
      });
      // 监听点击
      this.myChart.on("click", params => {
        console.log(params);
        if (params.name == "杭州市") {
          this.city = "1102";
          echarts.registerMap("map", hangzhou);
          this.myChart.clear();
          this.initEchart();
          let option = this.myChart.getOption();
          option.series[0].data = this.hangzhouData;
          this.myChart.setOption(option);
        } else if (params.name == "绍兴市") {
          this.city = "1106";
          echarts.registerMap("map", shaoxing);
          this.myChart.clear();
          this.initEchart();
          let option = this.myChart.getOption();
          option.series[0].data = this.shaoxingData;
          this.myChart.setOption(option);
        }
      });
      // 监听缩放
      this.myChart.on('georoam', (params)=>{ 
        // console.log(params);
        if(params.zoom){
          let option = this.myChart.getOption();
          console.log(option);
          this.zoom *= params.zoom;
          if(this.zoom>1.5){
            option.geo[0].label.show = true;
            this.myChart.setOption(option);
          }else{
            option.geo[0].label.show = false;
            this.myChart.setOption(option);
          }
        }
      });
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
            data: [
              {
                value: 335,
                name: "书法",
                itemStyle: {
                  color: "#0087FF"
                }
              },
              {
                value: 310,
                name: "绘画",
                itemStyle: {
                  color: "#FF8800"
                }
              },
              {
                value: 234,
                name: "钢琴",
                itemStyle: {
                  color: "#00BAD6"
                }
              },
              {
                value: 135,
                name: "太极",
                itemStyle: {
                  color: "#5D3DFF"
                }
              }
            ],
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
        roseType: 'radius',
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["服务", "讲座", "演出", "其他"]
        // },
        series: [
          {
            name: "服务类型",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: [
              {
                value: 335,
                name: "服务",
                itemStyle: {
                  color: "#0087FF"
                }
              },
              {
                value: 310,
                name: "讲座",
                itemStyle: {
                  color: "#FF8800"
                }
              },
              {
                value: 234,
                name: "演出",
                itemStyle: {
                  color: "#00BAD6"
                }
              },
              {
                value: 135,
                name: "其他",
                itemStyle: {
                  color: "#5D3DFF"
                }
              }
            ],
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
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["杭州", "金华", "台州", "舟山"]
        // },
        series: [
          {
            name: "分布",
            type: "pie",
            radius: ['30%','60%'],
            center: ["50%", "50%"],
            data: [
              {
                value: 335,
                name: "杭州",
                itemStyle: {
                  color: "#0087FF"
                }
              },
              {
                value: 310,
                name: "金华",
                itemStyle: {
                  color: "#FF8800"
                }
              },
              {
                value: 234,
                name: "台州",
                itemStyle: {
                  color: "#00BAD6"
                }
              },
              {
                value: 135,
                name: "舟山",
                itemStyle: {
                  color: "#5D3DFF"
                }
              }
            ],
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
    initLine: function() {
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
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
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
          bottom: '10%',
          right: '6%'
        },
        legend: {
          data: ["全部", "类型2", "类型3"],
          selectedMode: "single",
          y: 10,
          right: 10,
          inactiveColor: "#ADD9FF",
          textStyle: {
            color: '#00FFFF'
          }
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            name: "全部",
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              690,
              780,
              1543,
              1110,
              1200
            ],
            type: "line",
            itemStyle: {
              color: "#00FFFF"
            },
            // smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,255,255,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,255,255,0)" // 100% 处的颜色
                  }
                ],
                globalCoord: true // 缺省为 false
              }
            }
          },
          {
            name: "类型2",
            data: [
              1200,
              899,
              901,
              934,
              1000,
              1210,
              1002,
              690,
              780,
              1543,
              910,
              880
            ],
            type: "line",
            itemStyle: {
              color: "#0087FF"
            },
            // smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,135,255,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,135,255,0)" // 100% 处的颜色
                  }
                ],
                globalCoord: true // 缺省为 false
              }
            }
          },
          {
            name: "类型3",
            data: [562, 932, 901, 934, 730, 840, 666, 690, 780, 777, 1110, 980],
            type: "line",
            itemStyle: {
              color: "#0087FF"
            },
            // smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,135,255,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,135,255,0)" // 100% 处的颜色
                  }
                ],
                globalCoord: true // 缺省为 false
              }
            }
          }
        ]
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
          // boundaryGap: [0, 0.01]
          splitLine: { show: false },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "white"
            }
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
          inverse: true,
          data: [
            "浙江图书馆",
            "浙江文化馆",
            "嘉兴图书馆",
            "莲都区文化站",
            "宁波文化馆"
          ]
        },
        series: [
          {
            name: "借出图书数量",
            type: "bar",
            stack: "图书",
            data: [-320, -280, -240, -199, -152],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#FFBC70'},
                    {offset: 1, color: '#FF8800'}
                ]
              )
            },
            barCategoryGap: '50%'
          },
          {
            name: "已还图书数量",
            type: "bar",
            stack: "图书",
            data: [320, 280, 240, 199, 152],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                    {offset: 0, color: '#0087FF'},
                    {offset: 1, color: '#5CB3FF'}
                ]
              )
            },
            barCategoryGap: '50%'
          }
        ]
      });
    },
    getMainData: function() {
      this.$axios
        .post("url", this.$qs(参数))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    getHotActivity: function() {
      this.$axios
        .post("url", this.$qs(参数))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    leftClick: function(val) {
      this.which = val;
      this.button_area = "left";
      let option = this.myChart.getOption();
      option.series[0].type = "effectScatter";
      option.visualMap = undefined;
      this.myChart.clear();
      this.myChart.setOption(option);
    },
    rightClick: function(val) {
      this.which = val;
      this.button_area = "right";
      let option = this.myChart.getOption();
      option.series[0].type = "heatmap";
      option.visualMap = {
        min: 0,
        max: 1000,
        calculable: true,
        realtime: false,
        inRange: {
          color: [
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026"
          ]
        },
        show: false
      }
      this.myChart.clear();
      this.myChart.setOption(option);
    },
    /**
     * 下拉框值改变事件
     */
    switchMap: function(val) {
      if (val == "1101") {
        echarts.registerMap("map", zhejiang);
        this.myChart.clear();
        this.initEchart();
        let option = this.myChart.getOption();
        option.series[0].data = this.zhejiangData;
        this.myChart.setOption(option);
      } else if (val == "1102") {
        echarts.registerMap("map", hangzhou);
        this.myChart.clear();
        this.initEchart();
        let option = this.myChart.getOption();
        option.series[0].data = this.hangzhouData;
        this.myChart.setOption(option);
      }else if(val=='1106') {
        echarts.registerMap("map", shaoxing);
        this.myChart.clear();
        this.initEchart();
        let option = this.myChart.getOption();
        option.series[0].data = this.shaoxingData;
        this.myChart.setOption(option);
      }
    },
    /**
     * 趋势数据切换
     */
    switchTrend1: function() {
      this.trend = "0";
      let option = this.line.getOption();
      option.series[0].data = this.data1;
      this.line.clear();
      this.line.setOption(option);
    },
    switchTrend2: function() {
      this.trend = "1";
      let option = this.line.getOption();
      option.series[0].data = this.data2;
      this.line.clear();
      this.line.setOption(option);
    },
    /**
     * 连接服务器函数
     */
    getConect: function() {
      var socket = new WebSocket('ws://www.baidu.com');
      if(socket.readyState==0){
        this.$message({
          message: '正在尝试连接',
          type: 'warning'
        });
      }else if(socket.readyState==1){
        this.$message({
          message: '连接成功，可以通信了',
          type: 'success'
        });
        socket.onopen = function () {
          console.log('123');
        }
        socket.onmessage = function(event) {
          // var data = event.data;
          // 处理数据
        };
      }else if(socket.readyState==2){
        this.$message({
          message: '连接正在关闭',
          type: 'warning'
        });
      }else{
        this.$message({
          message: '连接已经关闭，或者打开连接失败',
          type: 'warning'
        });
      }
    },
    /**
     * 当前时间函数
     */
    getCurrentTime: function() {
      let time = new Date();
      let year = time.getFullYear();
      year = year>9 ? year:'0'+year
      let month = time.getMonth() + 1;
      month = month>9 ? month:'0'+month;
      let day = time.getDate();
      day = day>9 ? day:'0'+day;
      let hour = time.getHours();
      hour = hour>9 ? hour:'0'+hour;
      let minute = time.getMinutes();
      minute = minute>9 ? minute:'0'+minute;
      let second = time.getSeconds();
      second = second>9 ? second: '0'+second;
      this.currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initEchart();
      this.initPie1();
      this.initPie2();
      this.initPie3();
      this.initLine();
      this.initBar();
    });
    // this.getConect();
    this.getCurrentTime();
  }
};
</script>
<style>
  @import "../assets/page.css";
</style>

