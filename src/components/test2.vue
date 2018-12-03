<template>
    <div class="test2" ref="test" style="width:100vw;height:100vh;">
        <div id="allmap" style="height:100%;width:100%;"></div>
    </div>
</template>
<script>
export default {
    name: 'test2',
    data(){

    },
    methods: {
        innitMap: function(){
            var map = new BMap.Map("allmap");
	        map.centerAndZoom(new BMap.Point(120.14322240845, 30.236064370321), 10);
            map.enableScrollWheelZoom();
            var geocoder= new BMap.Geocoder(); 
            // 拖拽后获取中心点坐标
            map.addEventListener('dragend', function(e) {
                console.log(map.getZoom());
                console.log( map.getCenter());
                geocoder.getLocation(map.getCenter(),function(rs){
                    console.log(rs)       //位置信息
                })
            });
            //缩放开始
            map.addEventListener("zoomstart", function (e) {
                console.log('e',e);
                console.log(map.getZoom());
            })
            // 缩放结束
            map.addEventListener("zoomend", function (e) {
                console.log('e',e);
                console.log(map.getZoom());
            })
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.innitMap();
        })
    }
}
</script>

