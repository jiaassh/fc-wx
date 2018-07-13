<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div style="padding-bottom:48px;">
      <!--<header class="text-center this_header">
        <div>
          <div class="img_circle img_circle_border avatar"><img :src="pic" @click="go_personal" class="img_circle"/></div>
          <div class="ellipsis"><h4>{{user_name}}</h4></div>
          <div class="ellipsis"><p>{{current_address}}</p></div>
        </div>
      </header>-->
      <header class="this_header">
        <div class="fus_msg">
          <div class="fus_h">{{user_name}}</div>
          <div class="fus_p">{{current_address}}</div>
        </div>
        <div class="fus_img">
          <img :src = "pic" @click="go_personal" />
        </div>
      </header>
      <div style="background-color:white;">
        <flexbox :gutter="0" style="border-bottom:1px solid #ececec;">
          <flexbox-item @click.native="go_paylist" :span="1/2"><div class="flex_1_2" style="border-right:1px solid #ececec;"><p style="font-size:20px;color:red;margin-bottom:-5px;">{{arrearage?arrearage:0}}</p><p>欠费</p></div></flexbox-item>
          <flexbox-item @click.native="go_wallet" :span="1/2"><div class="flex_1_2"><p style="font-size:20px;margin-bottom:-5px;">{{extra_money?extra_money:0}}</p><p>余额</p></div></flexbox-item>
        </flexbox>
        <flexbox :gutter="0">
          <flexbox-item :span="1/4"><div style="border-right:1px solid #ececec;" @click="go_service" class="flex_1_2"><div style="position:relative;display: inline-block"><img style="height:28px" src="../common/img/my_service1.png"/><sup class="this_sup" v-if="new_service!==0"><span class="vux-badge vux-badge-single">{{new_service}}</span></sup></div><p style="font-size:14px;">我的服务</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div style="border-right:1px solid #ececec;" @click="go_orderlist" class="flex_1_2"><div style="position:relative;display: inline-block"><img style="height:28px" src="../common/img/my_orderlist1.png"/><sup class="this_sup" v-if="new_order!==0"><span class="vux-badge vux-badge-single">{{new_order}}</span></sup></div><p style="font-size:14px;">我的订单</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div style="border-right:1px solid #ececec;" @click="go_published" class="flex_1_2"><div style="position:relative;display: inline-block"><img style="height:28px" src="../common/img/my_published1.png"/><sup class="this_sup" v-if="new_publish!==0"><span class="vux-badge vux-badge-single">{{new_publish}}</span></sup></div><p style="font-size:14px;">我的发布</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div style="border-right:1px solid #ececec;" @click="go_store" class="flex_1_2"><div style="position:relative;display: inline-block"><img style="height:28px" src="../common/img/my_store1.png"/><sup class="this_sup" v-if="new_storeup!==0"><span class="vux-badge vux-badge-single">{{new_storeup}}</span></sup></div><p style="font-size:14px;">购物车</p></div></flexbox-item>
        </flexbox>
      </div>
      <group gutter="10px" v-if="!!visitor_in">
        <cell title="我的收藏" @click.native="cannot_in" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/star1.png"></cell>
        <cell title="房产管理" @click.native="cannot_in" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/house1.png"></cell>
        <cell title="我的钱包" @click.native="cannot_in" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/my_wallet.png"></cell>
        <cell title="个人资料" @click.native="cannot_in" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/personal1.png"></cell>
      </group>
      <group gutter="10px" v-else>
        <cell title="我的收藏" :link="{path:'goods_collect'}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/star1.png"></cell>
        <cell title="房产管理" :link="{path:'house_manage'}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/house1.png"></cell>
        <cell title="我的钱包" :link="{path:'my_wallet'}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/my_wallet1.png"></cell>
        <cell title="个人资料" :link="{path:'personal_profile'}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/personal1.png"></cell>
        <cell v-if="hasDoor===3||hasDoor===2" title="门禁" :link="{path:'doormanage',query:{openType:openType}}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/personal1.png"></cell>
        <!-- 加的 -->
        <cell title="卡劵" :link="{path:'coupons'}" is-link><img slot="icon" width="20" style="display:block;margin-right:15px;" src="../common/img/juan.png"></cell>
      </group>
      <tabbar>
        <tabbar-item link="index">
          <img slot="icon" src="../common/img/home_page1.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item selected>
          <img slot="icon" src="../common/img/choose_user1.png">
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{content}}</alert>
  </div>
</template>

<script>
  import loading from '@/components/loading/dataLoading';
  import {setTitle} from '@/common/js/common';
  import {Group,Cell,Tabbar, TabbarItem,Flexbox, FlexboxItem,Popup,Alert} from 'vux'

  export default{
    data(){
      return{
        loading:true,
        identity:0,
        data:[],
        user_name:"",
        pic:"",
        current_address:"",
        extra_money:"",
        arrearage:"",
        new_service:"",
        new_order:"",
        new_publish:"",
        new_storeup:"",
        this_year:"",
        this_month:"",
        this_day:"",
        this_week:"",
        confirm_show:false,
        dialog_title:"",
        content:"",
        visitor_in:true,
        is_renter:false,

        hasDoor:0, //是否有门禁权限，默认为1---小区没有权限  2---用户没有权限  3---有权限
        openType:0
      }
    },
    components:{
      loading,Cell,Tabbar, TabbarItem,Group,Flexbox, FlexboxItem,Popup,Alert
    },
    computed:{
      icon_style(){
        return{
          "width":document.body.clientWidth*0.15+"px",
          "height":document.body.clientWidth*0.15+"px",
        }
      }
    },
    mounted(){
      setTitle("个人中心");
      this.visitor_in=userProfile.isreg;
      this.is_renter=userProfile.atype===2;
      let oDate = new Date();
      this.this_year=oDate.getFullYear();
      this.this_month=oDate.getMonth()+1;
      this.this_day=oDate.getDate();
      let this_a = new Array("日", "一", "二", "三", "四", "五", "六");
      let week = oDate.getDay();
      this.this_week=this_a[week];
      if((userProfile.atype===2)&&(userProfile.isreg===0)){
        this.identity = 1;//游客
      }
      this.get_door_check()
      this.getdata();
    },
    methods:{
      //加的
      /*获取当前门禁，两个字段，一个代表属于哪个门禁，一个代表当前用户的门禁权限*/
      // category为开门方式 0为扫码开门  1是远程开门 2蓝牙开门
      get_door_check () {
        this.$http.get(service_url+"/o2o/door/wexin/hasDoorAuthOrNot/"+userProfile.vid+"/"+userProfile.userid).then((data)=>{
          if (data.body.state===0) {
            this.hasDoor = data.body.data.auth;
            this.openType = data.body.data.category;
          }
        })
      },



      go_notice(){
        this.$router.push({path:"notice_list"})
      },
      go_paylist(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'my_paylist/2'
          })
        }
      },
      go_service(){
          if(!!this.visitor_in){
            this.cannot_in();
          }else{
            this.$router.push({
              path:'my_service'
            })
          }
      },
      go_orderlist(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'common_order/0'
          })
        }
      },
      go_published(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'my_published'
          })
        }
      },
      go_store(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'store_up',query:{type:2}
          })
        }
      },
      cannot_in(){
        this.$router.push({path:"caller_in"});
      },
      getdata(){
          let self = this;
          console.log(service_url)
          if(service_url){
            this.$http.get(service_url+"/o2o/common/wx/myinfo").then((data)=>{
              self.user_name=data.body.data.name.val;
              self.pic=data.body.data.pic;
              self.current_address=data.body.data.position.val;
            });
            this.$http.get(service_url+"/o2o/assetsv2/wx/my_paylist.do?type=2").then((data)=>{
                if(data.body.status===0){
                 this.arrearage=data.body.data.total_price.toFixed(2)
                }else{
                  this.arrearage = '-'
                }
            });
            this.$http.get(service_url+"/o2o/common/wx/user_info").then((data)=>{
                if(data.body.status===0){
                  // self.arrearage=data.body.arrearage;
                  self.new_service=data.body.new_service;
                  self.new_order=data.body.new_order;
                  self.new_publish=data.body.new_publish;
                  self.new_storeup=data.body.new_storeup;
                }else{
                  this.dialog_title="提示";
                  this.content=data.body.error_reason;
                  this.confirm_show=true;
                }
            });
            this.$http.get(service_url+"/o2o/assetsv2/wx/my_wallet.do").then((data)=>{
              self.extra_money=data.body.data?parseFloat(data.body.data.total_price).toFixed(2):"0.00";
            })
          }else{
            this.$http.get("/api/myinfo").then((data)=>{
              self.user_name=data.body.data.data.name.val;
              self.pic=data.body.data.data.pic;
            });
            this.$http.get("/api/user_info").then((data)=>{
              self.current_address=data.body.data.data.current_address;
              self.extra_money=data.body.data.data.extra_money;
              self.arrearage=data.body.data.data.arrearage;
              self.new_service=data.body.data.data.new_service;
              self.new_order=data.body.data.data.new_order;
              self.new_publish=data.body.data.data.new_publish;
              self.new_storeup=data.body.data.data.new_storeup;
            })
          }
        document.getElementById("index_loading").style.display="none";
      },
      go_wallet(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else {
          this.$router.push({path: "my_wallet"})
        }
      },
      go_smkm(key){
        if(!userProfile){
          this.cannot_in();
        }else{
          if(userProfile.hasDoorAuthOrNot===1){
            this.content="当前小区暂无门禁";
            this.confirm_show=true;
          }else if(userProfile.hasDoorAuthOrNot===2){
            this.content="您暂时没有门禁权限";
            this.confirm_show=true;
          }else if(userProfile.hasDoorAuthOrNot===3){
            if(key===1){
              this.$router.push({path:"my_code"});
            }else if(key===2){
              this.$router.push({path:"invite_guest"});
            }else{
              this.$router.push({path:"key_manage"});
            }
          }
        }
      },
      go_personal(){
        if(!!this.visitor_in){
          this.cannot_in();
        }else {
          this.$router.push({path:"personal_profile"})
        }
      }
    }
  }
</script>

<style scoped>
  .text-center{
    text-align: center;
  }
  .this_header{
    color:white;
    position:relative;
    padding: .5rem .4rem;
    border-bottom:1px solid #ececec;
    background: url(../../static/img/userself_top.png) center center / cover no-repeat rgb(106, 73, 109);
  }
  .avatar{
    margin:0 auto;
  }
  .avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .img_circle{
    border-radius: 50%;
  }
  .img_circle_border{
    margin-top: 10px;
    width: 80px;
    height: 80px;
    border: 4px solid rgba(255, 255, 255, 0.498039);
  }
  .ellipsis{
    text-overflow: ellipsis;
  }
  .ellipsis p{
    font-size:.8em;
  }
  .flex_1_2{
    margin:10px 0 ;
    text-align: center;
  }
  .this_sup{
    position: absolute;
    top: -15px;
    left: 100%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 101;
  }
  .vux-close{
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
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .fus_msg{
    display: inline-block;
    width:7rem;
    line-height: 1;
  }
  .fus_h{
    font-size:.7rem;
    margin-bottom:.35rem;
  }
  .fus_p{
    font-size:.4rem;
  }
  .fus_img{
    display:inline-block;
    height:1.55rem;
    width:1.55rem;
  }
  .fus_img img{
    width:100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
</style>
