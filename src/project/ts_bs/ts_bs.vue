<template>
  <div id="tsbsy">
    <div style="position:fixed;width:100%;height:3.6rem;background:#fff;z-index:-1;bottom:0"></div>
    <div v-show="typetwo" style="position:fixed;width:100%;height:8rem;background:#fff;z-index:-1;bottom:0"></div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <loading v-model="isLoading" text="保存中"></loading>
    <div>
      <!-- <group title="选择事务类型"> -->
      <group style="background:#fff;margin-top:0;padding-bottom:0.413rem" gutter="0" id="checkered">
        <div style="padding:0.4rem 0 0.267rem 0.45rem;font-size:0.373rem;color:#915BAF">选择事务类型</div>
        <checker style="margin:0 0.1rem;color:#888888"
                 v-model="is_checked"
                 default-item-class="demo5-item common_border_color"
                 selected-item-class="demo5-item-selected common_background">
          <checker-item  v-for="item in worktypes" :key="item.val" :value="item.desc" @on-item-click="itemclick">{{item.desc}}</checker-item>
        </checker>
      </group>

      <!--<div class="weui-cells">-->
      <!--<div class="weui-cell">-->
      <!--&lt;!&ndash;<div class="weui_cell_hd"><label class="weui_label" style="line-height: 16px;">拍照<br><span style="font-size:12px; color:#a5a5a5;">( 最多五张<br>可删除 )</span></label></div>&ndash;&gt;-->
      <!--<div class="weui_cell_bd weui_cell_primary">-->
      <uploadfield
        fieldname="picurls"
        :fieldobj="picurls"
        :items="picurls"
        typefieldid="j_images"
        queryby="val"
        :clickzoominaction="clickzoominaction"
        :max="4">
      </uploadfield>
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<group title="上传照片（最多可上传4张）">-->
      <!--<x-upload-->
      <!--fieldname="png"-->
      <!--:items="picurls"-->
      <!--typefieldid="j_images"-->
      <!--:max="4">-->
      <!--</x-upload>-->
      <!--</group>-->
      <group  gutter="0" style="margin-top:0.133rem;">
        <div style="color:#915BAF;font-size:0.373rem;padding:0.387rem 0 0 0.427rem">问题描述</div>
        <x-textarea :max="50" placeholder="请填写详细信息" v-model="affairdesc" id="textarea" style="font-size:0.373rem;text-indent:0.373rem;"></x-textarea>
      </group>
      <group v-if="page_type===1" style="margin-bottom:0.267rem" id="baosi">
        <div style="background:#fff;">
          <div style="padding:0.387rem 0.413rem;font-size:0.373rem;color:#915BAF">期望服务时间</div>
          <div style="display:flex;justify-content:space-around;" id="selectbsbx">
            <datetime :class="{color:colortoday}" style="width:2.778rem;box-sizing:border-box;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0.1rem 0.387rem" :start-date="startDate" format="HH:mm" @on-change="setBegin1" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消">{{jinshi}}<span style="display:block;font-size:0.32rem">{{jintian}}</span> </datetime>
            <datetime :class="{color:tomorrow}" style="width:2.778rem;box-sizing:border-box;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0.1rem 0.387rem" :start-date="startDate" format="HH:mm" @on-change="setBegin2" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消">{{mingshi}}<span style="display:block;font-size:0.32rem">{{mintian}}</span></datetime>
            <datetime :class="{color:selectday}" style="width:2.778rem;box-sizing:border-box;;height:1.22rem;background:#F2F2F2;border-radius:0.133rem;padding:0 0.387rem" :start-date="startDate" format="YYYY-MM-DD HH:mm" @on-change="setBegin" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"><span v-show="selectday">{{selecttime}}</span><span v-show="selectday" style="display:block;font-size:0.32rem">{{shijianselect}}</span><img v-show="!selectday" src="./riqi.png" style="width:0.533rem;margin-top:0.3rem"></datetime>
          </div>
          <!-- <div v-show="!timeshows" style="margin-left:0.385rem;height:1.055rem;background:#fff"><span v-text="timeshow"></span></div> -->
          <div style="margin-left:0.385rem;font-size:0.373rem;line-height:1.055rem;color:#888888">期望时间为：<span style="font-size:0.373rem" v-text="timeshow"></span></div>
        </div>


      </group>
      <div style="padding:0.533rem 0.267rem 0.267rem"><x-button class="zj_button" type="primary" @click.native="submit_affair">提交</x-button></div>
    </div>
    <alert v-model="confirm_show" :title="dialog_title">{{content}}</alert>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <tishi :imgshow="imgshow" :tishiyu="tishihua"></tishi>
  </div>

</template>

<script>
  //  import Loading from '@/components/loading/dataLoading';
  //  import XUpload from '../../components/upload/upload.vue';
  import uploadfield from '../../components/uploadfield/uploadfield.vue';
  import {setTitle} from '@/common/js/common';
  import {XTextarea,XButton,Checker, CheckerItem,Group,Datetime,Loading,Alert,Toast} from 'vux';
  import {mapState } from 'vuex'
  import tishi from '../../components/tishi/tishi.vue'

  export default{
    data(){
      return{
        isLoading:false,
        wishdate:"",
        owishdate:"",
        date_mark:1,
        worktypes:"",
        affairdesc:"",
        select_work:"",
        is_checked:"室内",
        page_type:0,
        startDate:"",
        confirm_show:false,
        dialog_title:"",
        content:"",
        show_toast:false,
        toast_text:"保存成功",
        timeshows:false,



        typetwo:false,
        jinshi:'今天',
        jintian:'',
        mingshi:'明天',
        mintian:'',
        timeshow:'',
        colortoday:false,
        tomorrow:false,
        selectday:false,
        selecttime:'',
        shijianselect:'',




        imgshow:false,
        tishihua:"提交成功!"

      }
    },
    computed: {
      ...mapState({
        picurls: state => state.picurls,

      })
    },
    components:{
      Loading,XTextarea,XButton,Checker, CheckerItem,Group,Datetime,uploadfield,Alert,Toast,tishi
    },
    mounted(){
      var sj=new Date();
      console.log(sj)
      var timemi=sj.getTime()
      var monthtoday=sj.getMonth()+1
      var datetoday=sj.getDate()
      this.jintian=monthtoday+'-'+datetoday
      var newtimemi=timemi+24*3600*1000
      var newsj=new Date(newtimemi)
      console.log(newsj)
      var monthtorrow=newsj.getMonth()+1
      var datetomorrow=newsj.getDate()
      this.mintian=monthtorrow+'-'+datetomorrow

      // 给date原型对象上加上format获取时间戳的方法
      Date.prototype.format = function(fmt) {
        var o = {
          "M+" : this.getMonth()+1,                 //月份
          "d+" : this.getDate(),                    //日
          "h+" : this.getHours(),                   //小时
          "m+" : this.getMinutes(),                 //分
          "s+" : this.getSeconds(),                 //秒
          "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
        }
        return fmt;
      }
      let self = this;
      let oDate = new Date();
      /* 时间戳的延后15分钟如何处理 */
      this.startDate = oDate.format("yyyy-MM-dd hh:mm");
      this.page_type=parseInt(this.$route.params.type);
      if(this.page_type==2){
        this.typetwo=true
      }
      // 如果传递过来的参数是1，则页面设置title为报事报修，即页面是报事报修页面，反之亦然
      this.page_type===1?setTitle("报事报修"):setTitle("投诉建议");
      let get_url=this.page_type===1?"/o2o/affair/wx/getlist":"/o2o/suggest/wx/getlist";
      // 如果是线上环境
      if(service_url){
        this.$http.get(service_url+get_url).then((data)=>{
          self.worktypes=data.body.items;
          for(let i=0;i<self.worktypes.length;i++){
            // 根据数据中的isselect展示数据
            if(self.worktypes[i].isselect){
              self.is_checked=self.worktypes[i].desc;
              self.select_work=self.worktypes[i].val;
            }
          }
        },() => {
//          alert("访问失败");
        });
      }else{
        self.worktypes=[{"val":"in","desc":"室内","isselect":true},{"val":"cs","desc":"公区","isselect":false},{"val":"orth","desc":"其它","isselect":false}];
        for(let i=0;i<self.worktypes.length;i++){
          if(self.worktypes[i].isselect){
            self.is_checked=self.worktypes[i].desc;
            self.select_work=self.worktypes[0].val;
          }
        }
      }
      document.getElementById("index_loading").style.display="none";
    },
    methods:{



      // 重置vuex store内的图片对象
      resetPic(){
        this.$store.dispatch("resetContext");
      },
      change (value) {
        console.log('change', value)
      },
      // 改变时间时执行
      setBegin (value) {
        
        let owishdate = this.getownTime(value);
        let date=new Date(owishdate)
        var year=date.getFullYear()
        var month=date.getMonth()+1
        var day=date.getDate()
        this.selecttime=year+'年'
        



        console.log(owishdate,'owishdate')
        if(owishdate < Date.parse(new Date())-60*1000){
          this.dialog_title="提示";
          this.content="开始时间应该大于当前时间";
          this.confirm_show=true;
          this.date_mark=0;
        }else{
          this.shijianselect=month+'-'+day
          // console.log(value)
        this.timeshow=value
        // console.log(this.timeshow)
        this.selectday=true
        this.tomorrow=false
        this.colortoday=false
          let timestamp2 = Date.parse(new Date(value));
          timestamp2=timestamp2/1000;
          this.date_mark=1;
          this.owishdate=owishdate;
        }
      },
      setBegin1 (value) {
        console.log(value)
        var sj=new Date();
        var timemi=sj.getTime()
        var year=sj.getFullYear()
        var monthtoday=sj.getMonth()+1
        var datetoday=sj.getDate()
        value=year+'-'+monthtoday+'-'+datetoday+' '+value
        


        let owishdate = this.getownTime(value);


        // 到分

        console.log(owishdate,'owishdate1')
        console.log(Date.parse(new Date())-60*1000)
        if(owishdate < Date.parse(new Date())-60*1000){
          this.dialog_title="提示";
          this.content="开始时间应该大于当前时间";
          this.confirm_show=true;
          this.date_mark=0;
          return
        }else{
          this.timeshow=value
          this.selectday=false
          this.tomorrow=false
          this.colortoday=true
          let timestamp2 = Date.parse(new Date(value));
          timestamp2=timestamp2/1000;
          this.date_mark=1;
          this.owishdate=owishdate;
        }
      },
      setBegin2 (value) {
        this.colortoday=false
        this.selectday=false
        this.tomorrow=true
        console.log(value)
        var sj=new Date();
        console.log(sj)
        var timemi=sj.getTime()
        var newtimemi=timemi+24*3600*1000
        var newsj=new Date(newtimemi)
        var year=sj.getFullYear()
        console.log(newsj)
        var monthtorrow=newsj.getMonth()+1
        var datetomorrow=newsj.getDate()
        value=year+'-'+monthtorrow+'-'+datetomorrow+' '+value
        this.timeshow=value
        let owishdate = this.getownTime(value);
        console.log(owishdate,'owishdate')
        if(owishdate < Date.parse(new Date())-60*1000){
          this.dialog_title="提示";
          this.content="开始时间应该大于当前时间";
          this.confirm_show=true;
          this.date_mark=0;
        }else{
          let timestamp2 = Date.parse(new Date(value));
          timestamp2=timestamp2/1000;
          this.date_mark=1;
          this.owishdate=owishdate;
        }
      },
      clickzoominaction(){
      },
      // 选择事物类型时执行
      itemclick(val){
        for(let i = 0;i<this.worktypes.length;i++){
          if(val===this.worktypes[i].desc){
            this.select_work=this.worktypes[i].val;
          }
        }
      },
      // 提交数据
      submit_affair(){
        
        console.log(this.owishdate,'13')
        console.log(this.date_mark,'2')
        // this.owishdate=this.timeshow
        if(this.page_type===1&&!this.owishdate&&this.date_mark){
          this.dialog_title="提示";
          this.content="请选择期望时间";
          this.confirm_show=true;
          return;
        }
        if(this.page_type===1&&!this.owishdate&&!this.date_mark){
          this.dialog_title="提示";
          this.content="请重新选择期望时间";
          this.confirm_show=true;
          return;
        }else{
          if(!this.select_work){
            this.dialog_title="提示";
            this.content="请选择事物类型";
            this.confirm_show=true;
            return;
          }
          if((this.page_type===1&&this.picurls.length===0)||(this.page_type===2&&this.picurls.length===0)){
            this.dialog_title="提示";
            this.content="请选择图片上传";
            this.confirm_show=true;
            return;
          }
          if(!this.affairdesc){
            this.dialog_title="提示";
            this.content="请输入详细描述";
            this.confirm_show=true;
            return;
          }
          this.isLoading=true;
          let self = this;
          let suggest_data={
            "data":{
              "worktype":this.select_work,
              "picurls":this.picurls,
              "suggestdesc":this.affairdesc
            }
          };
          let affair_data = {
            "data":{
              "wishdata":this.owishdate,
              "worktype":this.select_work,
              "picurls":this.picurls,
              "affairdesc":this.affairdesc
            }
          };
          // 根据page_type来选择不同的对象上传
          let send_data=this.page_type===1?affair_data:suggest_data;
          let post_url=this.page_type===1?"/o2o/affair/wx/insert?vid=":"/o2o/suggest/wx/insert?vid=";
          if(service_url){
            this.$http.post(service_url+post_url+userProfile.vid+"&openid="+userProfile.openid+"&houseid="+userProfile.houseid,send_data).then( (data)=> {
              self.isLoading=false;
              // 执行成功之后重置store中的图片对象
              setTimeout(self.resetPic("picurls"),100);
              if(data.body.statusCode==="ok"){
//                self.$router.push({path:'/my_service'})
                // self.show_toast=true;
                self.imgshow=true
                setTimeout(self.go_back,1000);
                setTimeout(self.resetPic,1000);
//                self.$router.go(-1);
              }else{
                this.dialog_title="提示";
                this.content="提交失败";
                this.confirm_show=true;
              }
//            self.loading=false;
            })
          }else{
            self.isLoading=false;
//            self.$router.push({path:'/my_service'})
//            self.$router.go(-1);
            // self.show_toast=true;
            self.imgshow=true
            return;
            setTimeout(self.go_back,1000);
            setTimeout(self.resetPic,1000);
          }
        }
      },
      // 获取时间戳的方法
      getownTime(time){
        var arr = time.split(/[- :]/);

        return (new Date(arr[0], arr[1]-1, arr[2],arr[3],arr[4])).getTime();
      },
      go_back(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
  #selectbsbx .weui-cell_access .weui-cell__ft:after{
    content:none!important;
    display: none;
    border-style: none!important
  }
  #selectbsbx a:before{
    border-top:none
  }
  #selectbsbx a{text-align: center;display: inline-block;color:#C2C2C2;font-size: 0.36rem}
  #selectbsbx .color{text-align: center;display: inline-block;background:#ad7de7!important;font-size: 0.36rem;color:#fff}
  #checkered .weui-cells:after{
    border-bottom:0!important
  }
  #tsbsy .weui-cells__title{
    margin-top:0.4rem
  }

</style>
<style>
  #textarea:before{
    border-top:0!important
  }
  #baosi .weui-cells{
    margin-top:0.133rem
  }
  #baosi .weui-cells:after{
    border-bottom:none
  }
</style>

<style scoped>
  #index_loading{
    background:#fff
  }
  .demo5-item {
    /*border: 1px solid #ad7de7;*/
    border-radius: 0.133rem;
    padding: 0.267rem 0.95rem;
    margin:0 0.3rem;
    font-size: 0.347rem;
    border:none;
    background:rgb(242,242,242);

    /* display: flex;
    justify-content: space-around; */
    line-height: 0.427rem;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color:white;

    border:none;
    background-color:#ad7de7;
  }
</style>
