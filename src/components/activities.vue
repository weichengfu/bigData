<template>
    <div>
        <div v-if="activityPage" class="activity">
            <fieldset class="border wrapper">
                <!-- 右上角 -->
                <div class="hot-tr corner1"></div>
                <!-- 左下角 -->
                <div class="hot-lb corner2"></div>
                <legend class="title"><div class="inner-title" style="cursor:pointer;" @click="closePage">返回</div></legend>
                <div class="wrap-video">
                    <div class="video" v-for="item in videoData" :key="item.video">
                        <video width="100%" height="100%" :src="item.video" controls="controls">您的浏览器不支持 video 标签。</video>
                        <div class="video-title">{{item.title}}<span class="video-time">{{item.time}}</span></div>
                        <div class="video-place">{{item.place}}</div>
                    </div>
                </div>
                <div class="list-table">
                    <div class="list-item" v-for="(item,index) in listData" :key="item.title">
                        <div class="wrap-item">
                            <div class="video-title"><img width="23px" style="margin-right:8px;vertical-align:middle;" height="20px" v-if="item.type=='video'" src="../assets/video.png"><span style="cursor:pointer;" :class="{'clickedTitle':activeItem == index}" @click="gotoDetail(index)">{{item.title}}</span><span class="video-time">{{item.time}}</span></div>
                            <div class="video-place">{{item.activity}}</div>
                        </div>
                        <div class="jianbian" style="width:100%;height:1px;"></div>
                    </div>
                </div>
                <div class="pagination">
                    <div class="page-button" @click="previous">&lt;上一页</div>
                    <div class="page-button" @click="index=item" v-for="item in 6" :key="item" :class="{'active-button': item==index}">{{item}}</div>
                    <div class="page-button" @click="next">下一页&gt;</div>
                </div>
            </fieldset>
        </div>
        <div v-else class="details">
            <fieldset class="border details-wrap">
            <!-- 右上角 -->
            <div class="hot-tr corner1"></div>
            <!-- 左下角 -->
            <div class="hot-lb corner2"></div>
                <legend class="title"><div class="inner-title" style="cursor:pointer;" @click="activityPage=true;">返回</div></legend>
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
                            <video :src="details.vido" controls="controls" height="216" style="width:100%;"></video>
                        </div>
                    </div>
                    <div class="right-content" v-html="details.h5"></div>
                </div>
            </fieldset>
        </div>
    </div>
</template>
<script>
export default {
    props : ['message'],
    data() {
        return {
            videoData: [
                {
                    video: '1',
                    title: '活动标题',
                    time: '2018-11-29',
                    place: '活动地点'
                },
                {
                    video: '2',
                    title: '活动标题',
                    time: '2018-11-29',
                    place: '活动地点'
                },
                {
                    video: '3',
                    title: '活动标题',
                    time: '2018-11-29',
                    place: '活动地点'
                },
            ],
            listData: [
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                    type: 'video'
                },
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                    type: 'video'
                }
                ,{
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                }
                ,{
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                },
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                },
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                    type: 'video'
                },
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                },
                {
                    title: '活动标题',
                    time: '2018-11-20',
                    activity: '活动地点文本活动地点文本',
                    type: 'video'
                }
            ],
            index: 1,
            activeItem: -1,
            activityPage: true,
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
    created() {

    },
    methods: {
        previous: function() {
            this.index -= 1;
            if(this.index<1){
                this.index = 1;
            }
        },
        next: function() {
            this.index += 1;
            console.log(this.index);
        },
        closePage: function(){
            this.$emit("gotoParent","closePage");
        },
        gotoDetail: function(data){
            this.activeItem=data;
            this.activityPage = false;
        }
    },
    mounted() {
    }
}
</script>
<style>
    @import "../assets/page.css";
    .activity{
        width: 100vw;
        height: 100vh;
        padding-top: 28px;
        box-sizing: border-box;
    }
    .wrapper{
        width: 62.5%;
        height: 92%;
        margin: auto;
        padding: 0 40px;
        text-align: left;
        position: relative;
    }
    .wrap-video{
        display: flex;
        justify-content: space-between;
        margin-top: 39px;
    }
    .video{
        width: 32%;
        height: 21.7%;
        font-family: PingFangSC-Medium;
    }
    .video-title{
        height: 52px;
        line-height: 52px;
        font-size: 20px;
        color: #D6ECFF;
    }
    .video-time{
        float: right;
        font-size: 12px;
        color: #ADD9FF;
        font-family: HelveticaNeue;
    }
    .video-place{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ADD9FF;
    }
    .list-table{
        margin-top: 4%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .list-item{
        width: 49%;
    }
    .wrap-item{
        /* height: 88px; */
        /* box-sizing: border-box; */
        padding-top: 8px;
        padding-bottom: 20px;
    }
    .pagination{
        margin: auto;
        position: absolute;
        bottom: 4%;
        left: 50%;
        transform: translateX(-50%);
    }
    .page-button{
        display: inline-block;
        background: rgba(0,0,0,0.70);
        background-image: linear-gradient(-180deg, rgba(0,135,255,0.24) 0%, rgba(0,135,255,0.00) 100%);
        border: 1px solid #ADD9FF;
        box-shadow: 0 0 4px 0 rgba(0,135,255,0.50);
        border-radius: 2px;
        height: 36px;
        line-height: 36px;
        margin-right: 12px;
        padding: 0 14px;
        font-family: HelveticaNeue;
        font-size: 14px;
        color: #ADD9FF;
        cursor: pointer;
    }
    .active-button {
        border-color: #00ffff;
        color: #00ffff;
    }
    .clickedTitle{
        color: #00ffff;
    }
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
    @media screen and (max-height: 943px) {
        .wrap-item{
            padding-bottom: 10px;
        }
    }
    @media screen and (max-height: 880px) {
        .video-title{
            font-size: 16px;
        }
        .wrap-video{
            margin-top: 16px;
        }
        .details-content{
            margin-top: 16px;
        }
        .list-table{
            margin-top: 10px;
        }
    }
    @media screen and (max-height: 820px) {
        .pagination{
            bottom: 2%;
        }
        .wrap-item{
            padding-top: 0;
        }
    }
</style>


