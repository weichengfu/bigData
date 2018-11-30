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
              featureType: "poi",
              elementType: "all",
              stylers: {
                visibility: "off"
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
              featureType: "label",
              elementType: "all",
              stylers: {
                visibility: "off"
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
    return {
      chartSeries: [
        {
          type: "heatmap",
          coordinateSystem: "bmap",
          data: [
            [120, 30, 1], //
            [120.14322240845, 30.236064370321, 100],
            [120.14322240845, 30.23606, 200],
            [120.14322, 30.236064370321, 300]
          ]
        }
      ]
    };
  }
};
</script>


