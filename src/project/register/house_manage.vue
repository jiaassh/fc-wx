<template>
  <div>
    <group title="当前房屋">
      <div class="flex margin_bottom" @click="go_peopleList(current_house.houseid,1)">
        <div class="type">{{current_house.atype_name}}</div>
        <div id="qrcode_0" class="qrcode"><img :src = "current_house.hcode" class="img" @click.stop="show_img(current_house.hcode,current_house.villagedesc,current_house.address)"/></div>
        <div class="address">
          <p class="p_margin">{{current_house.villagedesc}}</p>
          <p>{{current_house.address}}</p>
        </div>
        <div v-if="!edit" class="cell_ft">{{current_house.usernumber}}人</div>
        <!-- <div v-if="edit" class="weui-cell__hd weui_check_single">
          <input :id="'houseid'+current_house.houseid" type="checkbox" class="weui-check" name="checkbox">
          <i class="weui-icon-checked"></i>
        </div> -->
      </div>
    </group>
    <group title="其他房屋" v-if="other_house.length!==0">
      <div v-if="!!item.houseid" v-for="(item,index) in other_house" class="flex margin_bottom" @click="go_peopleList(item.houseid,2)">
        <div class="type">{{item.atype_name}}</div>
        <div :id="'qrcode_'+(index+1)" class="qrcode"><img class="img" :src = "item.hcode" @click.stop="show_img(item.hcode,item.villagedesc,item.address)"/></div>
        <div class="address">
          <p class="p_margin">{{item.villagedesc}}</p>
          <p>{{item.address}}</p>
        </div>
        <div v-if="!edit" class="cell_ft">{{item.usernumber}}人</div>
        <div v-if="edit" class="weui-cell__hd weui_check_single">
          <input :id="'houseid'+item.houseid" type="checkbox" class="weui-check" name="checkbox">
          <i class="weui-icon-checked"></i>
        </div>
      </div>
    </group>
    <div style="padding:20px 15px;">
      <x-button v-if="!edit" class="zj_button" type="primary" @click.native="add_house">添加房产</x-button>
      <x-button v-if="!edit" @click.native="del_house">删除房产</x-button>
      <x-button v-if="edit" class="zj_button" type="primary" @click.native="confirm">确定</x-button>
      <x-button v-if="edit" @click.native="cancel">取消</x-button>
    </div>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" :hideOnBlur="true">
        <div class="img-box qrcode_background">
          <div style="padding:10px 10px 0;font-size:14px;">{{show_housedesc+show_address}}</div>
          <div style="padding:10px 20px 15px;">
            <img :src="show_vcode" style="width:100%;height:100%;"/>
          </div>
        </div>
        <!--<div @click="showHideOnBlur=false" style="background-color:#e0c8f7">
          <span class="vux-close"></span>
        </div>-->
      </x-dialog>
    </div>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <confirm v-model="show"
             title="提示"
             @on-confirm="onConfirm">
      <p style="text-align:center;">{{confirm_text}}</p>
    </confirm>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>
<script>
  import {setTitle} from '@/common/js/common';
  import {Group,XButton,Alert,XDialog,Loading,Confirm,Toast,TransferDomDirective as TransferDom} from 'vux';
  import $ from 'jquery'

  export default{
    directives: {
      TransferDom
    },
    data(){
        return{
          isLoading:false,
          show_toast:false,
          alert_text:"",
          toast_text:"",
          current_house:{},
          other_house:[],
          edit:false,
          id_list:[],
          confirm_show:false,
          confirm_content:[],
          showHideOnBlur:false,
          show_vcode:"",
          show_housedesc:"",
          show_address:"",
          show:false,
          confirm_text:"",
          next_id:""
        }
    },
    components:{
        Group,XButton,Alert,XDialog,Loading,Toast,Confirm
    },
    mounted(){
        document.body.style.background="#efeff4";
        setTitle("房产管理");
        this.getList();
        document.getElementById("index_loading").style.display="none";
    },
    methods:{
      getList(){
            if(service_url){
                this.$http.get(service_url+"/o2o/common/wx/myhouse?token="+userProfile.token).then((data)=>{
                  this.current_house=data.body.data.default;
                  this.current_house.atype_name=this.switch_atype(this.current_house.atype);
                  this.other_house=data.body.data.houselist;
                  for(let i in this.other_house){
                    this.other_house[i].atype=parseInt(this.other_house[i].atype);
                    this.other_house[i].atype_name=this.switch_atype(this.other_house[i].atype);
                  }
                  this.next_id=this.other_house.length?this.other_house[0].houseid:-1;
                  /*let all_arr=[];
                  if(this.other_house.length===0){
                    all_arr.push(this.current_house);
                  }else{

                  }*/
                })
            }else{
                this.$http.get("/api/house_manage").then((data)=>{
                    this.current_house=data.body.data.default;
                    this.current_house.atype_name=this.switch_atype(this.current_house.atype);
                    this.other_house=data.body.data.houselist;
                    for(let i in this.other_house){
                      this.other_house[i].atype=parseInt(this.other_house[i].atype);
                      this.other_house[i].atype_name=this.switch_atype(this.other_house[i].atype);
                    }
                    this.next_id=this.other_house.length?this.other_house[0].houseid:-1;
                  /*let all_arr=[];
                  if(this.other_house.length===0){
                    all_arr.push(this.current_house);
                  }else{
                    other_house.unshift(this.current_house);
                    all_arr = other_house;
                  }
                  this.all_arr=all_arr;*/
                })
            }
        },
      go_peopleList(houseid,type){
        if(!this.edit){
          if(type===1){
            this.$router.push({path:"house_people",query:{id:houseid,next_id:this.next_id}});
          }else{
            this.$router.push({path:"house_people",query:{id:houseid}})
          }
        }else{
          let this_obj=$("#houseid"+houseid);
          if(this_obj.prop("checked")) {
            this_obj.removeAttr("checked");
          }else{
            this_obj.prop("checked","true");
          }
        }
      },
      switch_atype(atype){
        switch(atype+1){
          case 1:
            return "业主";
            break;
          case 2:
            return "家人";
            break;
          case 3:
            return "租户";
            break;
          case 4:
            return "访客";
            break;
          case 5:
            return "工作人员";
            break;
        }
      },
      add_house(){
        this.$router.push({path:"visitor_login"});
      },
      del_house(){
        this.edit=true;
      },
      onConfirm(){
        let checked_obj = $("input:checked");
        if(!checked_obj.length){
          this.confirm_show=true;
          this.confirm_content="请选择要删除的房屋";
        }
        this.isLoading=true;
        this.alert_text="删除中";
        for(let i=0;i<checked_obj.length;i++){
          this.id_list.push($(checked_obj[i]).attr("id").substring(7));
        }
        const item = {
          houselist:this.id_list,
          token:userProfile.token
        };
        if(service_url){
          this.$http.post(service_url+"/o2o/common/wx/reg/reject",item).then((data)=>{
            this.isLoading=false;
            if(data.body.status===0){
              if(this.id_list.length===this.other_house.length+1){
                this.$router.push({path:"visitor_login"});
              }else {
                this.show_toast=true;
                this.toast_text="删除成功";
                for (let i in this.id_list) {
                    /* 判断删除的房产是不是当前的房产 */
                  for(let j in this.other_house){
                    if(this.id_list[i]==this.other_house[j].houseid){
                      this.other_house.splice(j,1);
                    }
                    if(this.id_list[i]==this.current_house.houseid){
                      this.current_house=this.other_house[0];
                      userProfile.vid = this.current_house.vid;
                      userProfile.houseid = this.current_house.houseid;
                      userProfile.atype = this.current_house.atype;
                      this.other_house.splice(0,1);
                    }
                  }
                }
              }
            }else{
              this.confirm_show=true;
              this.confirm_content=data.body.detail;
            }
          })
        }else{
          this.isLoading=false;
          this.show_toast=true;
          this.toast_text="删除成功";
          this.edit = false;
          if(this.id_list.length===this.other_house.length+1){
            this.$router.push({path:"visitor_login"});
          }else {
            for (let i in this.id_list) {
              for(let j in this.other_house){
                if(this.id_list[i]==this.other_house[j].houseid){
                  this.other_house.splice(j,1);
                }
                if(this.id_list[i]==this.current_house.houseid){
                  this.current_house=this.other_house[0];
                  this.other_house.splice(0,1);
                }
              }
            }
            console.log(this.current_house);
            const item = {
              houseid:this.current_house.houseid,
              token:userProfile.token
            };
            this.$http.post(service_url+"/o2o/common/wx/reg/rephouse",item).then((data)=>{
              this.isLoading=false;
              if(data.body.status===0){
                userProfile=data.body.data;
                this.show_toast=true;
                this.toast_text=data.body.detail;
              }else{
                this.confirm_content=data.body.detail;
                this.confirm_show = true;
              }
            })
          }
        }
      },
      confirm(){
        this.show=true;
        this.confirm_text="确认删除吗？";
      },
      cancel(){
        this.id_list.splice(0,this.id_list.length);
        this.edit = false;
      },
      show_img(vcode,housedesc,address){
          this.show_vcode=vcode;
          this.show_housedesc=housedesc;
          this.show_address=address;
          this.showHideOnBlur=true;
      }
    }
  }
</script>

<style scoped>
  .flex{
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .margin_bottom{
    border-bottom:1px solid #ececec;
  }
  .type{
    margin-right:10px;
    width:2rem;
    /* width解决字数多少不一致没有对齐的bug */
  }
  .qrcode{
    width:50px;
    height:50px;
    margin-right:10px;
  }
  .img{
    width:100%;
    height:100%;
  }
  .address{
    color:#999;
    font-size:15px;
  }
  .p_margin{
    margin-bottom:10px;
  }
  .cell_ft:after{
    content: " ";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 12px;
  }
  .cell_ft{
    flex:1;
    text-align:right;
    margin-right:20px;
    color:#999;
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
    color: #ad7de7;
  }
  .weui-icon-checked:before {
    content: '\EA01';
    color: #C9C9C9;
    font-size: 23px;
    display: block;
  }
  .weui-cell__hd{
    margin-right:10px;
    flex:1;
    text-align:right;
  }
  .img-box {
    border-bottom:1px solid #ececec;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: #999;
    width: 24px;
    height: 24px;
  }
  .vux-close:before{
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 24px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .vux-close:after{
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 24px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(45deg);
  }
</style>
