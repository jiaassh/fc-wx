<template>
  <div id="tj_key_manage" style="font-size:16px;">
    <div>
      <tab :line-width=2 active-color="#ad7de7" v-model="list_index">
        <tab-item class="vux-center" :selected="click_tab === item" v-for="(item, index) in tabList" @click="click_tab = item"
                  :key="index" @on-item-click="onItemClick">{{item}}
        </tab-item>
      </tab>
      <div style="background-color:white;" class="ori_font" v-if="list_index==0">
        <cell
          title="公共"
          is-link
          :border-intent="false"
          :arrow-direction="showContent ? 'up' : 'down'"
          @click.native="showContent = !showContent"></cell>
        <checklist class="slide" :class="showContent?'animate':''" :options="commonList" v-model="common_choose" @on-change="common_change"></checklist>
        <cell
          title="单元"
          is-link
          :border-intent="false"
          :arrow-direction="showContent2 ? 'up' : 'down'"
          @click.native="showContent2 = !showContent2"></cell>
        <checklist class="slide" :class="showContent2?'animate':''" :options="personList" v-model="person_choose" @on-change="person_change"></checklist>
        <cell v-if="common_choose.length||person_choose.length" :border-intent="false" title="已选门" style="border-bottom:1px solid #ececec"></cell>
        <checker v-if="common_choose.length||person_choose.length" style="padding:5px 10px;"
          default-item-class="demo5-item"
          >
          <checker-item  v-for="item in pubdesc" style="font-size:14px;" :key="item" :value="item">{{item}}</checker-item>
          <checker-item  v-for="item in perdesc" style="font-size:14px;" :key="item" :value="item">{{item}}</checker-item>
        </checker>
        <x-textarea v-model="remark" :max="20" placeholder="请填写申请说明"></x-textarea>
        <div style="padding:20px 10px">
          <x-button type="primary" class="zj_button" @click.native="qxsq_comfirm">确认</x-button>
        </div>
      </div>
      <div style="background-color:white;" v-if="list_index==1" class="ori_font">
        <cell
          title="选择租户"
          is-link
          :arrow-direction="showContent3 ? 'up' : 'down'"
          @click.native="showContent3 = !showContent3"></cell>
        <checklist class="slide" :class="showContent3?'animate':''" :options="tenantList" v-model="tenant_choose" @on-change="change3"></checklist>
        <cell
          title="开通门禁范围"
          is-link
          :arrow-direction="showContent4 ? 'up' : 'down'"
          @click.native="showContent4 = !showContent4"></cell>
        <checklist class="slide" :class="showContent4?'animate':''" :options="rangeList" v-model="range_choose" @on-change="change3"></checklist>
        <datetime v-model="startdate" placeholder="请选择权限开通时间" :min-year=2017 :max-year=2020 format="YYYY-MM-DD" @on-change="setStart" title="权限开通时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        <datetime v-model="enddate" placeholder="请选择权限失效时间" :min-year=2017 :max-year=2020 format="YYYY-MM-DD" @on-change="setEnd" title="权限失效时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        <div style="padding:20px 10px">
          <x-button type="primary" class="zj_button" @click.native="zhsq_comfirm">确认</x-button>
        </div>
      </div>
      <div v-if="list_index==2" class="ori_font">
        <div class="weui_panel weui_cells">
          <a class="weui_cell second_font" style="padding: 2px 15px;"  v-for="item in familyList">
            <div class="this_flex_2 this_paddng"><p>{{item.name.val}}</p>
              <p>电话：{{item.phone.val}}</p>
            </div>
            <div class="this_flex_1 text_right">
              <div><x-button mini type="primary" v-if="item.status.val==0" @click.native="agree(item.id.val)">同意</x-button><span class="common_color" v-if="item.status.val==1">已同意</span><span style="color:red;" v-if="item.status.val==2">已拒绝</span></div>
              <div><x-button mini type="warn" v-if="item.status.val==0" @click.native="delete_this(item.id.val)">拒绝</x-button></div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <alert v-model="confirm_show" title="提示" @on-show="onShow" @on-hide="onHide"> {{content}}</alert>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <loading v-model="isLoading" text="提交中"></loading>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Tab,TabItem,Checker,Cell,Checklist,CheckerItem,XTextarea,Datetime,XButton,Alert,Loading,Toast} from 'vux';
  import $ from 'jquery';

  const list = () => ['权限申请', '租户授权','家人授权'];
  export default{
    data(){
      return{
        confirm_show:false,
        content:'',
        click_tab:'权限申请',
        route_type:0,
        tabList:list(),
        list_index:0,
        showContent:false,
        showContent2:false,
        showContent3:false,
        showContent4:false,
        commonList: [],
        common_choose: [],
        personList:[],
        person_choose:[],
        pubdesc:[],
        tenantList:[],
        tenant_choose:[],
        rangeList:[],
        range_choose:[],
        wishdate:"",
        familyList:[],
        startdate:"",
        ostartdate:"",
        enddate:"",
        oenddate:"",
        perdesc:[],
        per_demo:[],
        val2:[],
        remark:"",
        show_toast:false,
        toast_text:"",
        isLoading:false,
        time_mark:0
      }
    },
    components:{
      Tab,TabItem,Checker,Cell,Checklist,CheckerItem,XTextarea,Datetime,XButton,Alert,Loading,Toast
    },
    mounted(){
      setTitle("钥匙管理");
      this.get_list();
    },
    methods:{
      show_tips(){
        this.button="确认";
        this.confirm_show=true;
        this.enddate="";
        this.time_mark=2;
        return;
      },
      setStart(value){
        var ostartdate = this.getownTime(value);
        var time = new Date(new Date().toLocaleDateString()).getTime();
        if(ostartdate < time){
          this.content="开通时间应该在当前时间之后";
          this.confirm_show=true;
          this.title="确认";
          this.time_mark=1;
          /*self.$set("oenddate",oenddate)*/
        }else{
          this.ostartdate=ostartdate
        }
      },
      setEnd(value){
        let oenddate = this.getownTime(value)+24*60*60*1000-1;
        let startdate = this.startdate;
        let arr = startdate.split(/[- :]/);
        let arr2 = value.split(/[- :]/);
        let this_arr2_0 = parseInt(arr2[0]);
        let this_arr2_1 = parseInt(arr2[1]);
        let this_arr2_2 = parseInt(arr2[2]);
        let this_arr_0 = parseInt(arr[0]);
        let this_arr_1 = parseInt(arr[1]);
        let this_arr_2 = parseInt(arr[2]);
        if(oenddate <= this.ostartdate){
          this.content="失效时间应该在开通时间之后";
          this.show_tips();
        }
        /*年份相减大于1*/
        if(this_arr2_0-this_arr_0>1){
          this.content="授权时间最多三个月";
          this.show_tips();
        }
        /*年份相减等于1*/
        if(this_arr2_0-this_arr_0===1){
          this_arr2_1= this_arr2_1+12;
          if(this_arr2_1-this_arr_1>3){
            this.content="授权时间最多三个月";
            this.show_tips();
          }else if(this_arr2_1-this_arr_1===3&&this_arr2_2-this_arr_2>0){
            this.content="授权时间最多三个月";
            this.show_tips();
          }
        }
        /*年份相减等于0*/
        if(this_arr2_0-this_arr_0===0){
          if(this_arr2_1-this_arr_1>3){
            this.content="授权时间最多三个月";
            this.show_tips();
          }else if(this_arr2_1-this_arr_1===3&&this_arr2_2-this_arr_2>0){
            this.content="授权时间最多三个月";
            this.show_tips();
          }
        }
        /*if((this_arr2_0>=this_arr_0&&this_arr2_1>this_arr_1)||(this_arr2_0==this_arr_0&&this_arr2_1==this_arr_1&&this_arr2_2>this_arr_2)){
          this.content="授权时间最多三个月";
          this.button="确认";
          this.confirm_show=true;
          this.enddate="";
          return;
        }*/
        this.oenddate=oenddate;
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
  getownTime(time){
        var arr = time.split(/[- :]/);
        return (new Date(arr[0], arr[1]-1, arr[2])).getTime();
      },
      onItemClick (index) {
        this.route_type=index;
        this.get_list();
      },
      common_change (val) {
        this.common_choose=val;
        let arr = this.common_choose;
        let list = this.commonList;
        let desc = [];
        for(let i in  arr){
          for(let j in  list){
            if(arr[i] ==list[j].id){
              desc.push(list[j].dname)
            }
          }
        }
        this.pubdesc=desc;
      },
      person_change(val){
        this.person_choose=val;
        let arr = this.person_choose;
        let list = this.personList;
        let desc = [];
        for(let i in  arr){
          for(let j in  list){
            if(arr[i] ==list[j].id){
              desc.push(list[j].dname)
            }
          }
        }
        this.perdesc=desc;
      },
      contains(arr, obj) {
        let i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return true;
          }
        }
        return false;
      },
      /* 处理后端数据来适应checklist组件*/
      handleData(data){
        data.forEach((v) => {
          v.key = v.id;
          v.value = v.dname || v.name;
        })
      },
      get_list(){
        let self = this;
        console.log(service_url);
        switch (this.route_type){
          case 0:
              if(service_url){
                const send_data={
                  "houseid": userProfile.houseid,
                  "userid": userProfile.userid,
                  "usertype": userProfile.atype,
                  "villageid": userProfile.vid
                };
                this.$http.post(service_url+"/o2o/door/web/getOtherDoorInfo",send_data).then((data)=>{
                    if(data.body.state===0){
                      self.commonList = data.body.data.public
                      self.personList = data.body.data.person
                      self.handleData(self.commonList);
                      self.handleData(self.personList);
                    }else{
                      this.content=data.body.msg;
                      this.confirm_show=true;
                    }
                });
              }else{
                this.$http.get('/api/door_list').then((data)=>{
                  self.commonList=data.body.data.data.public;
                  self.personList=data.body.data.data.person;
                });
              }
            document.getElementById("index_loading").style.display="none";
              break;
          case 1:
              if(service_url){
                  const send_data={
                    "houseid": userProfile.houseid,
                    "userid": userProfile.userid,
                    "usertype": userProfile.atype,
                    "villageid": userProfile.vid
                  };
                this.$http.post(service_url+"/o2o/door/wexin/getRentInfo",send_data).then((data)=>{
                  self.tenantList=data.body.data.tenant;
                  self.handleData(self.tenantList);
                  self.rangeList=data.body.data.range;
                  self.handleData(self.rangeList);
                  for(let i=0;i<self.tenantList.length;i++){
                    /*如果存在时间就不拼接，如果不存在就拼接*/
                    self.tenantList[i].dname = self.tenantList[i].starttime ? self.tenantList[i].name + "(" + self.tenantList[i].starttime + "~" + self.tenantList[i].endtime + ")" : self.tenantList[i].name;
                  }
                });
              }else{
                this.$http.get('/api/tenant_list').then((data)=>{
                  self.tenantList=data.body.data.data.tenant;
                  for(let i=0;i<self.tenantList.length;i++){
                    self.tenantList[i].dname=self.tenantList[i].name+"("+self.tenantList[i].starttime+"~"+self.tenantList[i].endtime+")";
                  }
                  self.rangeList=data.body.data.data.range;
                });
              }
            document.getElementById("index_loading").style.display="none";
            break;
          case 2:
            if(service_url){
              const send_data={
                "houseid": userProfile.houseid,
                "userid": userProfile.userid,
                "usertype": userProfile.atype,
                "villageid": userProfile.vid
              };
              this.$http.post(service_url+"/o2o/door/wexin/getFamilyInfo",send_data).then((data)=>{
                self.familyList=data.body.data;
              });
            }else{
              this.$http.get('/api/family_list').then((data)=>{
                self.familyList=data.body.data.data;
              });
            }
            document.getElementById("index_loading").style.display="none";
            break;
        }
      },
      agree(id){
        let self = this;
        self.isLoading=true;
        const send_data={
          "houseid": userProfile.houseid,
          "userid": id,
          "villageid": userProfile.vid
        };
        this.$http.post(service_url+"/o2o/door/wexin/fmailyAuthSetting/agree",send_data).then((data)=>{
            self.isLoading=false;
            if(data.body.state===0){
              this.show_toast=true;
              this.toast_text="操作成功";
              self.get_list();
            }else{
              self.confirm_show=true;
              self.content=data.body.msg;
            }
        })
      },
      delete_this(id){
        let self = this;
        self.isLoading=true;
        const send_data={
          "houseid": userProfile.houseid,
          "userid": id,
          "villageid": userProfile.vid
        };
        this.$http.post(service_url+"/o2o/door/wexin/fmailyAuthSetting/reject",send_data).then((data)=>{
          self.isLoading=false;
          if(data.body.state===0){
            this.show_toast=true;
            this.toast_text="操作成功";
            self.get_list();
          }else{
            self.confirm_show=true;
            self.content=data.body.msg;
          }
        })
      },
      zhsq_comfirm(){
        let self = this;
        if(self.ostartdate===""){
          self.content="权限开始时间不能为空";
          self.button="确认";
          this.confirm_show=true;
          return;
        }
        if(self.oenddate===""){
          self.content="权限结束时间不能为空";
          self.button="确认";
          this.confirm_show=true;
          return;
        }
        this.isLoading=true;
          let items = {
              "userids":self.tenant_choose,//
              "doorids":self.range_choose,//
              "starttime":self.ostartdate,//
              "endtime":self.oenddate,//
              "villageid":userProfile.vid,
              "houseid":userProfile.houseid
          };
            this.$http.post(service_url+"/o2o/door/wexin/rentAuthSetting",items).then((odata)=>{
              if(odata.body.state===0) {
                this.isLoading = false;
                this.show_toast = true;
                this.toast_text = "操作成功";
              }else{
                this.confirm_show=true;
                this.content=odata.body.msg;
              }
              self.range_choose=[];
              self.tenant_choose=[];
              self.startdate="";
              self.enddate="";
              self.get_list(1)
            })
      },
      qxsq_comfirm(){
        if(!this.common_choose.length&&!this.person_choose.length){
          this.content="请至少选择一个门";
          this.confirm_show=true;
          return;
        }
        this.isLoading=true;
        let self = this;
          let concat_arr = self.common_choose.concat(self.person_choose);
        let items = {
            "remark": self.remark,
            "houseid": userProfile.houseid,
            "userid": userProfile.userid,
            "villageid": userProfile.vid,
            "doorids":concat_arr//公区门id
        };
        this.$http.post(service_url+"/o2o/door/wexin/ownerAuthApply",items).then((odata)=>{
            this.isLoading=false;
            if(odata.body.state===0){
              this.show_toast=true;
              this.toast_text="操作成功";
//              self.content=odata.body.msg;
              self.common_choose=[];
              self.person_choose=[];
            }else{
              self.confirm_show=true;
              self.content=odata.body.msg;
            }
        })
      },
      change3(val){
      },

      onShow(){

      },
      onHide(){
//        this.$router.push({path:"index"});
        if(this.time_mark===1){
            this.startdate="";
            this.time_mark=0;
        }else if(this.time_mark===2){
          this.enddate="";
          this.time_mark=0;
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../common/css/menjin.css";
  .slide {
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .padding{
    padding:0 10px;
    /*border-top:1px solid #ececec;*/
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .demo5-item {
    border: 1px solid #ad7de7;
    border-radius:5px;
    padding: 2px 5px;
    margin:5px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color:white;
    background-color:#ad7de7;
  }
  .weui_panel {
    background-color: #fff;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
  }
  .weui_cells {
    background-color: #fff;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
    margin-top:0;
  }
  .weui_cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    color:black;
    border-top: 1px solid #e5e5e5;
  }
  .weui-check{
    position: absolute;
    left: -9999em;
  }
  [class^="weui-icon-"], [class*=" weui-icon-"] {
    display: inline-block;
    vertical-align: middle;
    font: normal normal normal 14px/1 "weui";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
  .weui-check:checked + .weui-icon-checked:before {
    content: '\EA06';
    color: #ad7de7 !important;
  }
  .ori_font{
    /*font-size:.5rem*/
  }
</style>
<style>
  #tj_key_manage .weui-check:checked + .weui-icon-checked:before{
    content: '\EA06';
    color:#ad7de7 !important;
  }
</style>
