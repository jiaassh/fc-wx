<template>
  <div>
    <group :title="address">

      <swipeout>
        <swipeout-item :disabled="item.disabled" style="border-bottom:1px solid #ececec;" v-for="(item,index) in user" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(item.userid,index,item.tname,item.atype_name)" type="warn">删除</swipeout-button>
          </div>

          <div slot="content" class="demo-content vux-1px-t">
            <cell :title="item.tname" :inline-desc='item.phone?item.atype_name+"("+item.phone+")":item.atype_name'>
              <div style="width:50px;height:50px;margin-right:10px;" slot="icon"><img style="display:block;border-radius:50%;width:100%;height:100%;object-fit: cover;" :src="item.photourl"></div>
            </cell>
          </div>
        </swipeout-item>
      </swipeout>
    </group>
    <div style="padding:5px 15px;font-size:14px;color:#999;">
      业主可以左滑移除此房屋下的其他人
    </div>
    <div style="padding:15px">
      <x-button v-if="change_show" type="primary" class="zj_button" @click.native="change_house">切换到当前房产</x-button>
      <x-button @click.native="go_invite">邀请更多</x-button>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="提示"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{confirm_text}}</p>
      </confirm>
    </div>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Alert,Checker,CheckerItem,SwipeoutItem,SwipeoutButton,Swipeout,Cell,Group,XButton,Confirm,Toast,Loading,TransferDomDirective as TransferDom} from 'vux';

  export default{
      data(){
        return{
          id:"",
          isLoading:false,
          alert_text:"",
          user:[],
          address:"",
          show:false,
          confirm_text:"",
          show_toast:false,
          toast_text:"",
          user_id:"",
          index:"",
          tname:"",
          atype_name:"",
          change_show:false,
          confirm_show:false,
          confirm_content:"",
          next_id:0,
          atype:userProfile.atype
        }
      },
      components:{
          Checker,CheckerItem,SwipeoutItem,SwipeoutButton,Swipeout,Cell,Group,XButton,Confirm,Toast,TransferDom,Alert,Loading
      },
    directives: {
      TransferDom
    },
      mounted(){
          setTitle("房屋人员");
          this.id=this.$route.query.id;
          this.next_id=this.$route.query.next_id?parseInt(this.$route.query.next_id):0;
          this.change_show=userProfile.houseid!==this.id;
          this.getList(this.id);
          document.getElementById("index_loading").style.display="none";
      },
    methods:{
      handleEvents(){

      },
      handleEvents(){

      },
      onButtonClick(userid,index,tname,atype_name){
          this.show=true;
          this.user_id=userid;
          this.index=index;
          this.confirm_text="确定要删除"+atype_name+tname+"吗？";
      },
      onConfirm(){
        if(service_url){
          const item = {
            houseid:this.id,
            userid:this.user_id,
            token:userProfile.token
          };
          this.isLoading=true;
          this.alert_text="删除中";
          this.$http.post(service_url+"/o2o/common/wx/deluser",item).then((data)=>{
            this.isLoading=false;
            if(data.body.status===0){
              this.user.splice(this.index,1);
              if(this.next_id){
                if(this.next_id===-1){
                  userProfile={};
                  this.$router.push({path:"visitor_login"})
                }else{
                  const item = {
                    houseid:this.next_id,
                    token:userProfile.token
                  };
                  this.$http.post(service_url+"/o2o/common/wx/reg/rephouse",item).then((data)=>{
                    this.isLoading=false;
                    if(data.body.status===0){
                      userProfile=data.body.data;
                      this.show_toast=true;
                      this.toast_text="删除成功";
                      this.$router.go(-1);
                    }else{
                      this.confirm_content=data.body.detail;
                      this.confirm_show = true;
                    }
                  })
                }
              }
            }else{
              this.confirm_content=data.body.detail;
              this.confirm_show = true;
            }
          })
        }else{
          this.user.splice(this.index,1);
        }
      },
      getList(){
        //新增的
        var that=this



        if(service_url){
            const item = {
              houseid:this.id,
              token:userProfile.token
            };
            //原来的
            // this.$http.post(service_url+"/o2o/common/wx/houseuser",item).then((data)=>{
            //   this.user=data.body.data.user;
            //   for(let i=0;i<this.user.length;i++){
            //     this.user[i].atype=parseInt(this.user[i].atype);
            //     this.user[i].atype_name=this.switch_atype(this.user[i].atype);
            //     if(this.user[i].userid===userProfile.userid){
            //       this.user[i].disabled = (this.user[i].atype !== 0)
            //     }else{
            //       this.user[i].disabled = true
            //     }
            //   }
            //   this.address=data.body.data.address;
            // })
            // 修改的
            that.$http.post(service_url+"/o2o/common/wx/houseuser",item).then((data)=>{
              that.user=data.body.data.user;
              for(let i=0;i<that.user.length;i++){
                that.user[i].atype=parseInt(that.user[i].atype);
                that.user[i].atype_name=that.switch_atype(that.user[i].atype);
                if(that.user[i].userid===userProfile.userid){
                  if(that.user[i].atype===0){
                    that.user.map(val=>{
                      val.disabled=false
                    })
                    that.user[i].disabled=true
                  }else{
                    that.user.map(val=>{
                      val.disabled=true
                    })
                  }
                }
              }
              that.address=data.body.data.address;
            })
        }else{
          // 原来的
//             this.$http.get("/api/house_people").then((data)=>{
//               this.user=data.body.data.user;
// //              for(let i in this.user){
//               for(let i=0;i<this.user.length;i++){
//                 this.user[i].atype=parseInt(this.user[i].atype);
//                 this.user[i].atype_name=this.switch_atype(this.user[i].atype);
//                 if(this.user[i].userid===userProfile.userid){
//                   this.user[i].disabled = (this.user[i].atype !== 0)
//                 }else{
//                   this.user[i].disabled = true
//                 }
//               }
//               console.log(this.user)
//               this.address=data.body.data.address;
//             })
            //修改的
            this.$http.get("/api/house_people").then((data)=>{
              this.user=data.body.data.user;
//              for(let i in this.user){
              for(let i=0;i<this.user.length;i++){
                this.user[i].atype=parseInt(this.user[i].atype);
                this.user[i].atype_name=this.switch_atype(this.user[i].atype);
                if(this.user[i].userid===userProfile.userid){
                  this.user[i].disabled = (this.user[i].atype !== 0)
                }else{
                  this.user[i].disabled = true
                }
              }
              console.log(this.user)
              this.address=data.body.data.address;
            })
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
      change_house(){
        this.isLoading=true;
        this.alert_text="切换中";
        if(service_url){
            const item = {
                houseid:this.id,
                token:userProfile.token
            };
            this.$http.post(service_url+"/o2o/common/wx/reg/rephouse",item).then((data)=>{
              this.isLoading=false;
              if(data.body.status===0){
                  userProfile=data.body.data;
                  this.show_toast=true;
                  this.toast_text=data.body.detail;
                  setTimeout(this.go_index,1000);
              }else{
                  this.confirm_content=data.body.detail;
                  this.confirm_show = true;
              }
            })
        }
      },
      go_invite(){
        this.$router.push({path:"share_others",query:{id:this.id}});
      },
      go_index () {
          this.$router.push({path: "fc_index"})
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    border: 1px solid #ad7de7;
    border-radius:5px;
    padding: 5px 15px;
    margin:5px;
  }
  .demo5-item-selected {
    /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
    color:white;
    background-color:#ad7de7;
  }
  .demo5-item-disabled{
    color: #888;
    background-color: #dfdfdf;
    border: 1px solid #bfbfbf;
  }
</style>
