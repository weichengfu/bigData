<template>
  <div class="test1">
    <ve-bmap
      height="100vh"
      :settings="chartSettings"
      :series="chartSeries"
      :tooltip="chartTooltip"
      :events="chartEvents"
    ></ve-bmap>
  </div>
</template>
<script>
export default {
  name: "test1",
  data() {
    this.chartSettings = {
      key: "QH8vSzeakpVFQPWYXDH6kHlOvkYcpdWH",
      bmap: {
        center: [120.14322240845, 30.236064370321],
        zoom: 10,
        roam: true,
        mapStyle: {
          styleJson: [
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#009FFD"
                }
            }
          ]
        }
      },
      type: "bmap"
    };
    this.chartEvents = {
      click: function(e) {
        self.name = e.name;
        console.log(e);
      }
    };
    this.chartTooltip = { show: true };
    return {
      chartSeries: [
        {
          name: "活动人数",
          type: "effectScatter",
          coordinateSystem: "bmap",
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
          itemStyle: {
            normal: {
              color: "#FFAA00",
              shadowBlur: 10,
              shadowColor: "#333"
            }
          },
          symbolSize: function(val) {
            return val[2]/20;
          },
          tooltip: {
            trigger: "item",
            formatter: function (params) {
                console.log(params);
                return params.seriesName + '<br>' + params.name + ' : ' + params.value[2];
            }
          }
        }
      ]
    };
  }
};
</script>


