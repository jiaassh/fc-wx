<template>
  <div>
    <!--<loading v-show="loading" style="text-align: center"></loading>-->
    <div style="padding-bottom:48px;">
      <!--广告区-->
      <!--<swiper loop auto :list="demo06_list" :index="demo06_index" :height="swiper_height" @on-index-change="demo06_onIndexChange"></swiper>-->
      <Scroller :on-refresh="onRefresh" :on-infinite="onInfinite">
          <div style="position:fixed;top:0;z-index:1;left:0;right:0" v-show="onlinehide" class="header">
            <!--<select v-model="fruit">
              <option v-for="option in options" v-bind:value="option.value">
                {{option.text}}
              </option>
            </select>-->
            <div style="text-align: center;position:relative">
              <div style="position:absolute;top:2px;">
                <img width="40" style="margin-right:5px;" src="../common/img/logo.png"/>
              </div>
              <div v-if="!!user_in">
                <div style="color:white;">{{city+address}}</div>
              </div>
              <div>
                <div v-if="this_options.length>1" class="f_flex" @click ="showActionsheet"><span style="color:#ffffff">{{currentEstate}}</span><span style="color:#fdd24d">-{{currentHouse}}</span><i class="arrow"></i></div>
                <div v-if="this_options.length===1" class="f_flex" @click ="go_house"><span style="color:#ffffff">{{currentEstate}}</span><span style="color:#fdd24d">-{{currentHouse}}</span></div>
              </div>
            </div>
          </div>
          <swiper auto :aspect-ratio="400/750" style="margin-top:-39px;">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in demo06_list" :key="index" @click.native="go_link(item.url,item.id)"><img style="height:100%;width:100%;object-fit: cover;" :src="item.picture"></swiper-item>
          </swiper>
          <!--<actionsheet v-model="ac_show" :menus="options" @on-click-menu="click_option"></actionsheet>-->
          <group gutter="0">
            <popup-picker :show-cell="false" :show="ac_show" title="切换房产" v-model="current_content" :data="options" @on-change="click_option" @on-hide="ac_show=false"></popup-picker>
          </group>
          <!--按钮区域-->
          <div style="position:relative">
            <div style="margin-top:4px;margin-bottom:6px;" class="f_flex">
              <!--<router-link :to="{path:'market_index'}">-->
              <div :style="imageurl" class="fkyq common margin_right" @click="go_bsbx">
                <div class="posa" :style="fkyqStyle">
                  <img src = "../common/img/repair.png" style="height:100%;width:100%;"/>
                </div>
                <div class="posa color_white" :style="fkyqDiv">
                  报事报修
                </div>
              </div>
              <!--</router-link>-->
              <!--<router-link :to="{path:'ts_bs',query:{type:1}}">-->
              <div :style="imageurl" class="bsbx common" @click="go_jf">
                <div class="posa" :style="bsbxStyle">
                  <img src = "../common/img/payment.png" style="height:100%;width:100%;"/>
                </div>
                <div class="posa color_white" :style="bsbxDiv">
                  物业缴费
                </div>
                <!--<img src = "../common/img/repair.png"/>-->
              </div>
            </div>
            <div class="f_flex">
              <!--</router-link>-->
              <!--<router-link :to="{path:'notice_list'}">-->
              <div :style="imageurl" class="jf common margin_right" @click ="go_pzsh">
                <div class="posa" :style="jfStyle">
                  <img src = "../common/img/store.png" style="height:100%;width:100%;"/>
                </div>
                <div class="posa color_white" :style="jfDiv">
                  品质生活
                </div>
                <!--<img src = "../common/img/payment.png"/>-->
              </div>
              <!--</router-link>-->
              <!--<router-link :to="{path:'goods_index'}">-->
              <div :style="imageurl" class="common pzsh" @click="showMore">
                <div class="posa" :style="pzshStyle">
                  <img src = "../common/img/more.png" style="height:100%;width:100%;"/>
                </div>
                <div class="posa color_white" :style="bsbxDiv">
                  更多服务
                </div>
                <!--<img src = "../common/img/store.png"/>-->
              </div>
            </div>
            <!--</router-link>-->
            <!--<router-link :to="{path:'market_index'}">-->
            <div :style="imageradius" class="znkm" @click="go_door(1)">
              <div v-if="hasDoor !== 3" class="posa" :style="iconStyle">
                <img src = "../common/img/zj_icon.png" style="height:100%;width:100%;"/>
              </div>
              <div v-else class="posa" :style="smkmStyle">
                <img src = "../common/img/open_qrcode.png" style="height:100%;width:100%;"/>
              </div>
              <div v-if="hasDoor === 3" class="posa color_white" :style="smkmDiv">
                智能开门
              </div>
            </div>
          </div>
          <div class="fresh_news">
            <div class="line_show"></div>
            <div>
              <p style="font-size:20px;">社区新鲜事</p>
              <p style="font-size:12px;margin-top:-5px;">community news</p>
            </div>
            <div class="line_show_n"></div>
          </div>
          <group gutter="5px">
            <!--<cell title="社区新鲜事"></cell>-->
            <div style="padding-bottom:55px;">
              <div v-for="item in fresh_news" @click="go_detail(item.type_num,item.id,item.url,item.xstate)">
                <div style="display:flex;border-top:1px solid #ececec">
                  <div style="width: 45px;height:45px;margin-left:20px;margin-top:10px;"><img style="border-radius:50%;width: 100%;height:100%;" :src="item.published_img"/></div>
                  <div style="margin-left:7px;;margin-top:10px;">
                    <div style="font-size:14px;">{{item.published_man}}</div>
                    <div><span style="font-size:14px;color:#999;">{{item.fresh_time}}</span><span style="margin-left:10px;font-size:14px;color:#999;">来自</span><span style="font-size:14px;color:#ad7de7">{{item.published_from}}</span></div>
                  </div>
                </div>
                <div style="margin:8px 15px;">
                  <div style="margin:10px 0;max-height:46px;overflow:hidden;">
                    {{item.published_content}}
                  </div>
                  <!--<div v-if="item.type===2||item.type===3||item.type===4">
                    <img :style="sqhd_rate" v-for="imgs in item.detail_img" :src="imgs"/>
                  </div>-->
                  <div>
                    <div v-if="item.detail_img.length===1" class="type_1">
                      <img class="object_fit" :style="sqhd_rate" v-for="imgs in item.detail_img" :src="imgs"/>
                    </div>
                    <div v-if = "item.detail_img.length===2" class="type_2">
                      <img class="object_fit two_margin" :style="sqhd_2_rate" v-for="imgs in item.detail_img" :src="imgs"/>
                    </div>
                    <div v-if = "item.detail_img.length===3" class="type_3">
                      <img class="object_fit" v-if="index===0" :style="sqhd_rate" v-for="(imgs,index) in item.detail_img" :src="imgs"/>
                      <img class="object_fit two_margin" v-if="index!==0" :style="sqhd_2_rate" v-for="(imgs,index) in item.detail_img" :src="imgs"/>
                    </div>
                    <div v-if="item.detail_img.length===4" class="type_4">
                      <img class="object_fit" v-if="index===0" v-for="(imgs,index) in item.detail_img" :style="sqhd_rate" :src="imgs"/>
                      <img class="object_fit two_margin" v-if="index!==0" v-for="(imgs,index) in item.detail_img" :style="xxs_rate" :src="imgs"/>
                    </div>
                    <!--<div v-else>
                      <img v-for="imgs in item.detail_img" :style="xxs_rate" :src="imgs"/>
                    </div>-->
                  </div>
                  <div style="margin:5px 0 10px;font-size:14px;">
                    <span v-if="item.is_stick===1" style="padding:2px 5px;border-radius:5px;border:1px solid #fbcc5c;color:#fbcc5c;margin-right:5px;">置顶</span>
                    <span v-if="item.type_num==='跳蚤市场'" style="padding:2px 5px;border-radius:5px;border:1px solid #2196f3;color:#2196f3;margin-right:5px;">{{item.type_num}}</span>
                    <span v-if="item.type_num==='广告'" style="padding:2px 5px;border-radius:5px;border:1px solid #ffeb3b;color:#ffeb3b;margin-right:5px;">{{item.type_num}}</span>
                    <span v-if="item.type_num==='报事报修'" style="padding:2px 5px;border-radius:5px;border:1px solid #65e2e7;color:#65e2e7;margin-right:5px;">{{item.type_num}}</span>
                    <span v-if="item.type_num==='投诉建议'" style="padding:2px 5px;border-radius:5px;border:1px solid #4caf50;color:#4caf50;margin-right:5px;">{{item.type_num}}</span>
                    <span v-if="item.type_num==='活动'||item.type_num==='公告'" style="padding:2px 5px;border-radius:5px;border:1px solid #f44335;color:#f44335;margin-right:5px;">{{item.type_num}}</span>
                    <div @click.stop="thumbs_toggle(item.id,item.type)" v-if="!item.islike" style="float:right;"><img src = "../../static/img/index_star.png" class="icon_width"/><span class="thumbs_up">{{item.likenumber}}</span></div>
                    <div @click.stop="thumbs_toggle(item.id,item.type)" v-else style="float:right;"><img src = "../../static/img/index_has_star.png" class="icon_width"/><span class="thumbs_up">{{item.likenumber}}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </group>
        <!--房产切换栏-->
      </Scroller>

      <!--</router-link>-->
    </div>
    <popup style="background:#ececec;opacity: 0.9;height:100%;" v-model="popup_model">
      <div @click="popup_model=false">
        <div style="position:absolute;padding:50px 30px;color:#615d5d;">
          <div style="font-size:48px;float:left">{{this_day}}</div>
          <div style="float:left;padding:12px;"><div>星期{{this_week}}</div><div>{{this_month+'/'+this_year}}</div></div>
        </div>
        <flexbox style="position:absolute;bottom:61px;" :gutter="0" wrap="wrap" v-if="!!user_in">
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/会所.png"/><p style="font-size:14px">会所</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/保洁.png"/><p style="font-size:14px">专业保洁</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="go_notice" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/公告.png"/><p style="font-size:14px">公告</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/公告.png"/><p style="font-size:14px">访客邀请</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/公告.png"/><p style="font-size:14px">访客邀请</p></div></flexbox-item>
          <flexbox-item :span="1/4"></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/微装.png"/><p style="font-size:14px">微装</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/资产.png"/><p style="font-size:14px">资产管理</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/跳蚤市场.png"/><p style="font-size:14px">跳蚤市场</p></div></flexbox-item>
          <flexbox-item :span="1/4"><div @click="cannot_in" style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/投诉.png"/><p style="font-size:14px">投诉建议</p></div></flexbox-item>
        </flexbox>
        <flexbox style="position:absolute;bottom:61px;" :gutter="0" wrap="wrap" v-else>
          <flexbox-item v-if="hasDoor === 3" :span="1/4"><router-link :to="{path:'invite_guest'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/会所.png"/><p style="font-size:14px">访客邀请</p></div></router-link></flexbox-item>
          <flexbox-item v-if="hasDoor === 3" :span="1/4"></flexbox-item>
          <flexbox-item v-if="hasDoor === 3" :span="1/4"></flexbox-item>
          <flexbox-item v-if="hasDoor === 3" :span="1/4"></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'area_index'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/会所.png"/><p style="font-size:14px">会所</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'wz_bj',query:{route_type:1}}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/保洁.png"/><p style="font-size:14px">专业保洁</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'notice_list'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/公告.png"/><p style="font-size:14px">公告</p></div></router-link></flexbox-item>
          <flexbox-item v-if="hasDoor !== 3" :span="1/4"></flexbox-item>

          <flexbox-item v-if="hasDoor === 3" :span="1/4"><router-link :to="{path:'tj_key_manage'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/会所.png"/><p style="font-size:14px">钥匙管理</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'wz_bj',query:{route_type:2}}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/微装.png"/><p style="font-size:14px">微装</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'house_info'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/资产.png"/><p style="font-size:14px">资产管理</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'market_index'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/跳蚤市场.png"/><p style="font-size:14px">跳蚤市场</p></div></router-link></flexbox-item>
          <flexbox-item :span="1/4"><router-link :to="{path:'ts_bs/2'}"><div style="text-align: center;padding:10px;"><img :style="icon_style" src = "../common/img/投诉.png"/><p style="font-size:14px">投诉建议</p></div></router-link></flexbox-item>

        </flexbox>
        <div style="text-align: center;border-top: 1px solid rgba(197, 193, 193, 1);position:absolute;left:0;bottom:0;right:0;">
          <span class="vux-close"></span>
        </div>
      </div>
    </popup>
    <tabbar>
      <tabbar-item selected >
        <img slot="icon" src="../common/img/home_choose.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-if="!user_in" link="user_self">
        <img slot="icon" src="../common/img/my.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
      <tabbar-item v-else link="caller_in">
        <img slot="icon" src="../common/img/my.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
    <alert v-model="confirm_show" :title="dialog_title">{{content}}</alert>
    <loading v-model="isLoading" :text="alert_text"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
  </div>
</template>

<script>
  import Scroller from '@/components/scroller_me/scroller';
  import {setTitle} from '@/common/js/common';
  import {Loading,Swiper,SwiperItem,Cell,Actionsheet,Tabbar, TabbarItem,Group,Popup,Flexbox,FlexboxItem,Alert,PopupPicker,Toast} from 'vux'

  export default{
    data(){
      return{
        onlinehide:false,
        isLoading:false,
        alert_text:"",
        show_toast:false,
        toast_text:"",
        demo06_list:[],
        demo06_index:0,
        ac_show:false,
        fruit:'banana',
        currentEstate:'',
        currentHouse:'',
        current_content:[],
        options:[],
        this_options:[],
        popup_model:false,
        identity:0,
        fresh_news:[],
        fresh_len:0,
        this_year:"",
        this_month:"",
        this_day:"",
        this_week:"",
        confirm_show:false,
        dialog_title:"提示",
        content:"",
        user_in:true,
        pageno:1,
        city:"",
        address:"",
        hasDoor:3 //是否有门禁权限，默认为1---小区没有权限  2---用户没有权限  3---有权限
      }
    },
    components:{
      Scroller,Loading,Swiper,SwiperItem,Cell,Actionsheet,Tabbar, TabbarItem,Group,Popup,Flexbox,FlexboxItem,Alert,PopupPicker,Toast
    },
    methods:{
      go_detail(name,id,url,xstate){
        if(name==='跳蚤市场'){
          this.$router.push({ path: 'market_detail',query:{id:id} });
        }else if(name==='报事报修'){
          this.$router.push({path:"service_detail",query:{"tab":"dt","srid":id,"xstate":xstate,"type":'0'}});
        }else if(name==='投诉建议'){
          this.$router.push({path:"service_detail",query:{"tab":"dt","srid":id,"xstate":xstate,"type":'1'}});
        }else if(name==='广告'){
          window.location.href=url;
        }else if(name==='活动'||name==='公告'){
          this.$router.push({ path: 'notice_detail',query:{notice_id:id} });
        }
      },
      showMore(){
        this.popup_model=true;
      },
      go_house(){
        if(userProfile.atype===0||userProfile.atype===1){
          this.$router.push({path:"/house_manage"})
        }
      },
      demo06_onIndexChange (index) {
        this.demo06_index = fc_index
      },
      showActionsheet(){
        this.ac_show=true;
      },
      //切换当前所在房产
      click_option(key){
        for(let i in this.this_options){
          if(this.this_options[i].estate+"-"+this.this_options[i].house==key[0]){        //item 表示Json串中的属性，如'name'
            const item = {
              houseid:this.this_options[i].key,
              token:userProfile.token
            };
            this.isLoading=true;
            this.alert_text="切换中";
            this.$http.post(service_url+"/o2o/common/wx/reg/rephouse",item).then((data)=>{
              this.isLoading=false;
              if(data.body.status===0){
                userProfile  = data.body.data;
                this.show_toast=true;
                this.toast_text="切换成功";
                this.$http.get(service_url+"/o2o/common/wx/getIndex?pageno="+this.pageno+"&pagesize=10&token="+userProfile.token+"&vid="+this.this_options[i].key).then((data)=>{
                  if(data.body.status===0){
                    this.totalpage=data.body.totalpage;
                    this.options=[];
                    this.currentEstate=data.body.current_option.estate;
                    this.currentHouse=data.body.current_option.house;
                    let this_options = data.body.options;
                    let json_options=[];
                    for(let i =0;i<this_options.length;i++){
                      json_options.push(this_options[i].estate+"-"+this_options[i].house);
                    }
                    this.options.push(json_options);
                    this.this_options=this_options;

                    this.fresh_news = data.body.fresh_news;
                    this.fresh_len = data.body.fresh_news.length;
                    for(let i=0;i<this.fresh_news.length;i++){

                      this.fresh_news[i].fresh_time=this.getFresh(this.fresh_news[i].published_time);
                    }
                  }else{
                    this.content=data.body.error_reason;
                    this.confirm_show=true;
                  }
                });
                /*切换房产之后切换广告*/
                this.get_ad();
              }else{
                this.confirm_show=true;
                this.content=data.body.detail;
              }
            });
          }
        }
      },
      go_bsbx(){
        if(userProfile.isreg){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'ts_bs/1'
          })
        }
      },
      go_jf(){
        if(userProfile.isreg){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'my_paylist/1'
          })
        }
      },
      go_pzsh(){
        if(userProfile.isreg){
          this.cannot_in();
        }else{
          this.$router.push({
            path:'goods_index'
          })
        }
      },
      /*go_smkm(key){
        if(userProfile.isreg){
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
      },*/
      go_notice(){
        this.$router.push({path:"notice_list"})
      },
      cannot_in(){
        this.$router.push({path:"caller_in"});
      },
      /*当前时间的规则，小于1小时都算分钟，小于24小时大于一小时都算小时，大于24小时算天*/
      getFresh(time){
        let s1= parseInt(time+"000"),
          s2 = new Date(),
          runTime = parseInt((s2.getTime() - s1) / 1000);
        let year = Math.floor(runTime / 86400 / 365);
        runTime = runTime % (86400 * 365);
        let month = Math.floor(runTime / 86400 / 30);
        runTime = runTime % (86400 * 30);
        let day = Math.floor(runTime / 86400);
        runTime = runTime % 86400;
        let hour = Math.floor(runTime / 3600);
        runTime = runTime % 3600;
        let minute = Math.floor(runTime / 60);
        runTime = runTime % 60;
        if(year>0){
          return year+"年前";
        }else{
          if(month>0){
            return month+"月前";
          }else{
            if(day>0){
              return day+"天前";
            }else{
              if(hour>0){
                return hour+"小时前";
              }else{
                if(minute>0){
                  return minute+"分钟前";
                }else{
                  return "刚刚";
                }
              }
            }
          }
        }
      },
      getLocalTime1(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)},
      go_link(url,id){
        if(service_url){
          if(url){
            this.$http.get(service_url+"/o2o/notice/wx/gclick?nid="+id).then(data=>{
              if(data.body.statusCode==="ok"){
                window.location.href=url;
              }
            })
          }

        }else{
          window.location.href=url;
        }
      },
      thumbs_toggle(id,type){
        if(!!this.user_in){
          this.cannot_in();
        }else{
          if(service_url){
            const item = {
              token:userProfile.token,
              liketype:type,
              likeid:id
            };
            this.$http.post(service_url+"/o2o/common/wx/comlike",item).then((data)=>{
              if(data.body.status===0){
                this.show_toast=true;
                this.toast_text=data.body.detail;
                for(let i in this.fresh_news){
                  if(id===this.fresh_news[i].id&&type===this.fresh_news[i].type){
                    if(!this.fresh_news[i].islike){
                      this.fresh_news[i].islike=1;
                      this.fresh_news[i].likenumber++;
                    }else{
                      this.fresh_news[i].islike=0;
                      this.fresh_news[i].likenumber--;
                    }
                  }
                }
              }else{
                this.content=data.body.detail;
                this.confirm_show=true;
              }
            })
          }else{
            for(let i in this.fresh_news){
              if(id===this.fresh_news[i].id){
                if(!this.fresh_news[i].islike){
                  this.fresh_news[i].islike=1;
                  this.fresh_news[i].likenumber++;
                }else{
                  this.fresh_news[i].islike=0;
                  this.fresh_news[i].likenumber--;
                }
              }
            }
          }
        }
      },
      onRefresh(done){
        this.pageno=1;
        console.log("onRefresh")
        done() // call done
      },
      onInfinite(done){
        console.log("onInfinite");
        this.pageno++;
        let self =this;
        if(this.pageno>this.totalpage-1){
          this.$el.querySelector('.load-more').style.display = 'none';
          done();
          return;
        }else{
          this.$http.get(service_url+"/o2o/common/wx/getIndex?pageno="+this.pageno+"&pagesize=10&token="+userProfile.token+"&vid="+this.vid).then((data)=>{
            if(data.body.status===0){
              let fresh_news = data.body.fresh_news;
              self.fresh_news=self.fresh_news.concat(fresh_news);
              self.totalpage=data.body.totalpage;
            }else{
              this.content=data.body.error_reason;
              this.confirm_show=true;
            }
          });
          done();
        }

      },
      get_ad(){
        if(service_url){
          this.$http.get(service_url+"/o2o/notice/wx/newsIndex?ntype=2&sum=5&itemid=6").then((data)=>{
            this.demo06_list = data.body.data;
          })
        }else{
          this.$http.get("/api/newsIndex").then((data)=>{
            this.demo06_list=data.body.data.data;
          })
        }
      },
      get_door_check () {
        this.$http.get(service_url+"/o2o/door/wexin/hasDoorAuthOrNot/"+userProfile.vid+"/"+userProfile.userid).then((data)=>{
          if (data.body.state===0) {
            this.hasDoor = data.body.data;
          }
        })
      },
      go_door(key){
        if(this.hasDoor===1){
          return;
        }else if(this.hasDoor===2){
          return;
        }else{
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
    computed:{
      imageurl(){
        return {"height":(document.body.clientWidth-6)/4+"px"}
      },
      imageradius(){
        return {
          "width":(document.body.clientWidth)*0.256+"px",
          "height":(document.body.clientWidth)*0.256+"px",
          "margin-top":-((document.body.clientWidth)*0.256+6)/2+"px",
          "margin-left":-((document.body.clientWidth)*0.256+8)/2+"px"
        }
      },
      fkyqStyle(){
        return{
          "width":35*(document.body.clientWidth)/414+"px",
          "height":35*(document.body.clientWidth)/414+"px",
          "left":51.5*(document.body.clientWidth)/414+"px",
          "top":17*(document.body.clientWidth)/414+"px",
        }
      },
      fkyqDiv(){
        return{
          "left":40*(document.body.clientWidth)/414+"px",
          "top":60*(document.body.clientWidth)/414+"px",
        }
      },
      bsbxStyle(){
        return{
          "width":47*(document.body.clientWidth)/414+"px",
          "height":35*(document.body.clientWidth)/414+"px",
          "right":45.5*(document.body.clientWidth)/414+"px",
          "top":17*(document.body.clientWidth)/414+"px",
        }
      },
      bsbxDiv(){
        return{
          "right":40*(document.body.clientWidth)/414+"px",
          "top":60*(document.body.clientWidth)/414+"px",
        }
      },
      pzshStyle(){
        return{
          "width":40*(document.body.clientWidth)/414+"px",
          "height":40*(document.body.clientWidth)/414+"px",
          "right":49.5*(document.body.clientWidth)/414+"px",
          "top":17*(document.body.clientWidth)/414+"px",
        }
      },
      jfStyle(){
        return{
          "width":47*(document.body.clientWidth)/414+"px",
          "height":35*(document.body.clientWidth)/414+"px",
          "left":45.5*(document.body.clientWidth)/414+"px",
          "top":17*(document.body.clientWidth)/414+"px",
        }
      },
      jfDiv(){
        return{
          "left":40*(document.body.clientWidth)/414+"px",
          "top":60*(document.body.clientWidth)/414+"px",
        }
      },
      smkmStyle(){
        return{
          "width":28*(document.body.clientWidth)/414+"px",
          "height":40*(document.body.clientWidth)/414+"px",
          "left":40*(document.body.clientWidth)/414+"px",
          "top":20*(document.body.clientWidth)/414+"px",
        }
      },
      iconStyle(){
        return{
          "width":100*(document.body.clientWidth)/414+"px",
          "height":44*(document.body.clientWidth)/414+"px",
          "left":4*(document.body.clientWidth)/414+"px",
          "top":30*(document.body.clientWidth)/414+"px",
        }
      },
      smkmDiv(){
        return{
          "left":23*(document.body.clientWidth)/414+"px",
          "top":66*(document.body.clientWidth)/414+"px",
        }
      },
      swiper_height(){
        return (document.body.clientWidth)/75*31+"px"
      },
      sqhd_rate(){
        return{
          "height":(document.body.clientWidth)/69*34+"px",
          "width":"100%",
          "object-fit":"cover"
        }
      },
      sqhd_2_rate(){
        return{
          "width":(document.body.clientWidth-40)/2+"px",
          "height":(document.body.clientWidth-40)/2+"px"
        }
      },
      xxs_rate(){
        return{
          "width":(document.body.clientWidth-45)/3+"px",
          "height":(document.body.clientWidth-45)/3+"px"
        }
      },
      xxsa_rate(){
        return{
          "width":document.body.clientWidth-35+"px",
          "height":(document.body.clientWidth-30)/1.916+"px",
        }
      },
      icon_style(){
        return{
          "width":document.body.clientWidth*0.15+"px",
          "height":document.body.clientWidth*0.15+"px",
        }
      }
    },
    mounted(){
      this.user_in=userProfile.isreg;
      if(this.user_in){
        this.city=sessionStorage.getItem("city");
        this.address=sessionStorage.getItem("address");
        this.vid=sessionStorage.getItem("vid");
      }else{
        this.vid =userProfile.vid;
      }
      document.body.style.background="#efeff4";
      /*let city = remote_ip_info['city'];
       if(city){
       //          $.getJSON("http://www.baidu.com",function(json){
       //              alert(1);
       //          })
       }*/
      /*会导致其他页面也刷新所以不能用*/
//        window.onresize=function(){
//          location.reload()
//        };
//        document.getElementById("index_loading").style.display="none";
      let oDate = new Date();
      this.this_year=oDate.getFullYear();
      this.this_month=oDate.getMonth()+1;
      this.this_day=oDate.getDate();
      let this_a = new Array("日", "一", "二", "三", "四", "五", "六");
      let week = oDate.getDay();
      this.this_week=this_a[week];
      setTitle("首页");
      let self = this;
      if(service_url){
        this.$http.get(service_url+"/o2o/common/wx/getIndex?pageno=1&pagesize=10&token="+userProfile.token+"&vid="+this.vid).then((data)=>{
          if(data.body.status===0){
            this.totalpage=data.body.totalpage;
            let this_options = data.body.options;
            let json_options=[];
            for(let i =0;i<this_options.length;i++){
              json_options.push(this_options[i].estate+"-"+this_options[i].house);
            }
            self.options.push(json_options);
            self.this_options=this_options;

            self.currentEstate=data.body.current_option?data.body.current_option.estate:"暂无房产";
            self.currentHouse=data.body.current_option?data.body.current_option.house:"";
            self.fresh_news = data.body.fresh_news;
            self.fresh_len = data.body.fresh_news.length;
            if(!self.fresh_len){
              this.$el.querySelector('.load-more').style.display = 'none';
            }
            for(let i=0;i<self.fresh_news.length;i++){
              self.fresh_news[i].fresh_time=this.getFresh(self.fresh_news[i].published_time);
            }
          }else{
            this.content=data.body.error_reason;
            this.confirm_show=true;
          }
        })
      }else{
        this.$http.get('/api/qj_index').then((data) => {
          let this_options = data.body.data.options;
          let json_options=[];
          for(let i =0;i<this_options.length;i++){
            json_options.push(this_options[i].estate+this_options[i].house);
          }
          self.options.push(json_options);
          self.this_options=this_options;
          self.currentEstate=data.body.data.current_option.estate;
          self.currentHouse=data.body.data.current_option.house;
          self.fresh_news = data.body.data.fresh_news;
          self.fresh_len = data.body.data.fresh_news.length;
          for(let i=0;i<self.fresh_news.length;i++){
            self.fresh_news[i].fresh_time=this.getFresh(self.fresh_news[i].published_time);
          }
        });
      }
      this.get_ad();
      this.get_door_check()
      document.getElementById("index_loading").style.display="none";
    }

  }
</script>

<style scoped>
  @import '../../static/css/fc_common.css';
  .header{
    background-color:#4e4f4f;
    padding:10px 15px;
  }
  select{
    border: 0px;
    border: none;
    outline:none;
  }
  .arrow {
    display: block;
    border-width: 5px 5px 0;
    border-style: solid;
    border-right-color: transparent;
    border-left-color: transparent;
    width: 0;
    height: 0;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
    color:#fdd24d;
  }
  .f_flex{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .common{
    flex:1;
    position:relative;
    display:inline-block;
    margin-bottom:-2px;
  }
  .fkyq{
    background-color:#fbcc5c;
  }
  .fkyq:active{
    background-color:#b99849;
  }
  .jf{
    background-color:#65e2e7;
  }
  .jf:active{
    background-color:#479da0;
  }
  .bsbx{
    background-color:#fe8e8e;
  }
  .bsbx:active{
    background-color:#b56262;
  }
  .pzsh{
    background-color:#6ccafd;
  }
  .pzsh:active{
    background-color: #0f96c3;
  }
  .znkm{
    position:absolute;
    left:50%;
    top:50%;
    border:4px solid white;
    background-color:#ad7de7;
    border-radius:50%;
  }
  .posa{
    position:absolute;
  }
  .color_white{
    color:white;
  }
  .margin_right{
    margin-right:4px;
  }
  .sm{
    left:50%;
    top:58%;
    text-align:center;
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
  .fresh_news{
    text-align: center;
    color:#999;
    margin-top:10px;
    position:relative;
  }
  .fresh_news:before{
    content: '';
    position: absolute;
    width: 30px;
    height: 1px;
    background-color: #979797;
    top: 12px;
    left: -38px;
  }
  .line_show{
    content: '';
    position: absolute;
    width: 30%;
    height: 1px;
    top: 20px;
    left: 16px;
    background: #999;
  }
  .line_show_n{
    content: '';
    position: absolute;
    width: 30%;
    height: 1px;
    top: 20px;
    right: 16px;
    background: #999;
  }
  .object_fit{
    width:100%;
    height:100%;
    object-fit:cover;
  }
  .type_2 .two_margin{
    margin-right:5px;
  }
  .type_2 .two_margin:last-child{
    margin-right:0;
  }
  .type_3 .two_margin{
    margin-right:5px;
  }
  .type_3 .two_margin:last-child{
    margin-right:0;
  }
  .type_4 .two_margin{
    margin-right:5px;
  }
  .type_4 .two_margin:last-child{
    margin-right:0;
  }
  .thumbs_up{
    font-size:16px;
    color:#999;
    margin-left:3px;
  }
  .icon_width{
    height:18px;
    width:20px;
  }
  /* 隐藏下拉条 */
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>

