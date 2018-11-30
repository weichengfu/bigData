<template>
    <div class="activity">
        <fieldset class="border wrapper">
          <!-- 右上角 -->
          <div class="hot-tr corner1"></div>
          <!-- 左下角 -->
          <div class="hot-lb corner2"></div>
             <legend class="title"><div class="inner-title" style="cursor:pointer;">返回</div></legend>
             <div class="wrap-video">
                 <div class="video" v-for="item in videoData" :key="item.video">
                     <video width="100%" height="216px" :src="item.video" controls="controls">您的浏览器不支持 video 标签。</video>
                     <div class="video-title">{{item.title}}<span class="video-time">{{item.time}}</span></div>
                     <div class="video-place">{{item.place}}</div>
                 </div>
             </div>
             <div class="list-table">
                 <div class="list-item" v-for="item in listData" :key="item.title">
                     <div class="wrap-item">
                        <div class="video-title"><img width="23px" style="margin-right:8px;vertical-align:middle;" height="20px" v-if="item.type=='video'" src="../assets/video.png">{{item.title}}<span class="video-time">{{item.time}}</span></div>
                        <div class="video-place">{{item.activity}}</div>
                     </div>
                     <div class="jianbian" style="width:100%;height:1px;"></div>
                 </div>
             </div>
             <div class="pagination">
                 <div class="page-button" @click="previous">&lt;上一页</div>
                 <div class="page-button" @click="index=item" v-for="item in 8" :key="item" :class="{'active-button': item==index}">{{item}}</div>
                 <div class="page-button" @click="next">下一页&gt;</div>
             </div>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'activity',
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
            index: 1
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
    }
    .wrapper{
        width: 62.5%;
        height: 92%;
        margin: auto;
        margin-top: 30px;
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
        height: 88px;
        /* box-sizing: border-box; */
        padding-top: 8px;
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
</style>


