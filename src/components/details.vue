<template>
    <div class="details">
        <fieldset class="border details-wrap">
        <!-- 右上角 -->
        <div class="hot-tr corner1"></div>
        <!-- 左下角 -->
        <div class="hot-lb corner2"></div>
            <legend class="title"><div class="inner-title" style="cursor:pointer;" @click="closePage">返回</div></legend>
            <div class="details-content">
                <div class="left-content">
                    <div class="content-title">{{details.title}}</div>
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
                        <video :src="details.vido" controls="controls" height="216" width="100%"></video>
                    </div>
                </div>
                <div class="right-content" v-html="details.h5"></div>
            </div>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'details',
    props : ['message'],
    data(){
        return {
            details: {
                title: '活动标题',
                time: '2018-03-17 09:30~11:30',
                place: '浙江省图书馆二楼集体视听室',
                sponsor: '浙江省图书馆',
                issuer: '发布方名称',
                phone: '0571-87988338',
                enterTime: '截至2018-03-04 16:00',
                enterPeople: '25/100',
                video: '',
                h5: '<div>hello world</div>'
            }
        }
    },
    created(){
        this.$axios.post('',this.$qs.stringify({})).then(res=>{

        })
    },
    mounted(){

    },
    methods: {
         closePage: function(){
            this.$emit("gotoParent","closePage");
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
</style>


