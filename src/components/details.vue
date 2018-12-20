<template>
    <div class="details" @click.self="closePage">
        <fieldset class="border details-wrap">
        <!-- 右上角 -->
        <div class="hot-tr corner1" ref="hotTr"></div>
        <!-- 左下角 -->
        <div class="hot-lb corner2"></div>
            <legend class="title"><div class="inner-title" style="cursor:pointer;" @click="closePage">返回</div></legend>
            <div class="details-content">
                <div class="left-content">
                    <el-tooltip v-if="details.title&&details.title.length>8" class="item" effect="dark" :content="details.title" placement="top">
                        <div class="content-title" style="cursor:pointer;">{{details.title|cutString}}<span style="font-weight:bold;">...</span></div>
                    </el-tooltip>
                    <div v-else class="content-title" style="cursor:pointer;">{{details.title}}</div>
                    <div class="content-time" style="margin-bottom:8px;"><img width="20" height="20" style="vertical-align:text-top;" src="../assets/time.png">{{details.time}}</div>
                    <div class="content-time" style="margin-bottom:24px;"><img width="20" height="20" style="vertical-align:text-top;" src="../assets/icon.png">{{details.place}}</div>
                    <div class="jianbian" style="height:1px;width:100%;"></div>
                    <div class="content-info" style="margin-top:15px;">主办方:{{details.sponsor}}</div>
                    <div class="content-info" style="margin:8px 0;">发布方:{{details.issuer}}</div>
                    <div class="content-info" style="margin-bottom:15px;">联系电话:{{details.phone}}</div>
                    <div class="jianbian" style="height:1px;width:100%;"></div>
                    <div class="content-info" style="margin-top:24px;">报名日期:{{details.enterTime}}</div>
                    <div class="content-info" style="margin-bottom:40px;">报名人数:{{details.enterPeople}}</div>
                    <div class="content-video">
                        <!-- <video :src="details.vido" controls="controls" height="216" width="100%"></video> -->
                        <video id="myPlayer" height="216" width="100%" poster="" controls playsInline webkit-playsinline autoplay>
                            <!-- <source src="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b" type="" /> -->
                            <source src="http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8" type="application/x-mpegURL" />
                            <!-- <source src="[这里填入从开放平台官网获取到的ws协议URL]"  /> -->
                        </video>
                    </div>
                </div>
                <div class="right-content" v-html="details.h5"></div>
            </div>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'detailPage',
    props : ['message'],
    data(){
        return {
            details: ''
        }
    },
    created(){
        // console.log(this.message);
        this.$axios
        .get("/BigScreen/Index/activityDetail?id="+this.message.id)
        .then((res)=>{
                if (res.data.CODE == "ok") {
                    // console.log(res)
                    this.details = res.data.DATA.details;
                } else {
                    this.$message({
                    message: res.data.MESSAGE,
                    type: "error"
                    });
                }
          }).catch((res)=>{
              console.log(res)
          })
        //   this.$axios
        // .post("https://open.ys7.com/api/lapp/live/address/get",this.$qs.stringify({ 
        //     accessToken: 'at.4v752uhj7oew8cpkaw4j655h617nmo5t-1hpv7s0z9j-0hqdr3w-cnbxsym69'
        //  }))
        // .then((res)=>{
        //     console.log(res);
        //   }).catch((res)=>{
        //       console.log(res)
        //   })
    },
    mounted(){
        this.$nextTick(function(){
            var player = new EZUIPlayer('myPlayer');
            var brower = navigator.userAgent;
            if (brower.indexOf("Firefox") > -1) {        //判断是否为火狐浏览器
                this.$refs.hotTr.style.top = -32 + 'px';
            };
            let h = document.body.clientHeight;
            if(h<720){
                document.getElementById('myPlayer').style.height = 160 + 'px';
            }
        })
    },
    methods: {
         closePage: function(){
            this.$emit("gotoParent","closePage");
        },
        getDetailData: function(){
             this.$axios.post('',this.$qs.stringify({})).then(res=>{
                
            })
        }
    },
    filters: {
        cutString: function(val) {
            if (val && val.length > 8) {
                return val.substr(0,8);
            }
        }
    }
}
</script>
<style>
    @import "../assets/page.css";
    .details{
        width: 100vw;
        height: 100vh;
        padding-top: 28px;
        box-sizing: border-box;
        background: rgba(0,0,0,0.70);
    }
    .details-wrap{
        width: 62.5%;
        height: 92%;
        margin: auto;
        padding: 0 40px;
        text-align: left;
        position: relative;
    }
    .details-content{
        width: 100%;
        height: 85%;
        display: flex;
        justify-content: space-between;
        margin-top: 39px;
    }
    .left-content{
        width: 30.1%;
        height: 100%;
    }
    .right-content{
        width: 64.2%;
        height: 100%;
        overflow-y: auto;
    }
    .content-title{
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #D6ECFF;
        margin-bottom: 32px;
    }
    .content-time{
        font-family: HelveticaNeue;
        font-size: 16px;
        color: #ADD9FF;
    }
    .content-info{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ADD9FF;
    }
    .right-content{
        color: #D6ECFF;
    }
    .right-content img{
        max-width: 100% !important;
    }
</style>


