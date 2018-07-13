<template>
  <div>
    <div style="position:absolute;width:100%;height:100%;background:#fff;z-index:-1"></div>
    <div>
      <tab :line-width=2 active-color="#ad7de7" v-model="list_index" style="font-size:0.37rem">
        <tab-item class="vux-center" :selected="click_tab === item" v-for="(item, index) in tabList" @click="click_tab = item"
                  :key="index" @on-item-click="onItemClick">{{item}}
        </tab-item>
      </tab>

      <!-- b5的门禁 -->
    
          <!-- <div style="background-color:white;" v-if="list_index==0&&opentype==0">
          <cell
            style="font-size:0.42rem"
            title="公共"
            is-link
            :border-intent="false"
            :arrow-direction="showContent ? 'up' : 'down'"
            @click.native="showContent = !showContent"></cell>
          <checklist id="b5check1" class="slide" :class="showContent?'animate':''" :options="commonList" v-model="common_choose" @on-change="common_change"></checklist>
          <cell
           style="font-size:0.42rem"
            title="单元"
            is-link
            :border-intent="false"
            :arrow-direction="showContent2 ? 'up' : 'down'"
            @click.native="showContent2 = !showContent2"></cell>
          <checklist class="slide" :class="showContent2?'animate':''" :options="personList" v-model="person_choose" @on-change="person_change"></checklist> -->




          <!-- <checklist class="slide padding" :class="showContent2?'animate':''" :key="item.name" v-for="item in personList" v-model="val2"  :title="item.name" :options="item.cell" @on-change="personal_change"></checklist> -->
          <!-- <div class="slide" :class="showContent2?'animate':''">
            <div style="padding:10px 15px;border-top:1px solid #ececec;" v-for = "(items,index1) in personList">
              <div style="color:#999;">{{items.name}}</div>
              <div @click="choose_checkbox(index1,index2)" class="weui_flex" style="border-top:1px solid #ececec;padding:10px 0;" v-for="(item,index2) in items.cell">
                <div class="weui-cell__hd">
                  <input :id="'house_'+index1+'_'+index2" type="checkbox" class="weui-check" name="checkbox">
                  <i class="weui-icon-checked"></i>
                  <div style="display:none;" :id="'desc_'+index1+'_'+index2">{{item.alldesc}}</div>
                  <div style="display:none;" :id="'id_'+index1+'_'+index2">{{item.val}}</div>
                </div>
                <div>{{item.desc}}</div>
              </div>
            </div>
          </div> -->



          <!-- <cell :border-intent="false" title="已选门" style="border-bottom:1px solid #ececec"></cell>
          <checker style="padding:5px 10px;"
            default-item-class="demo5-item"
            >
            <checker-item  v-for="item in pubdesc" style="font-size:14px;" :key="item" :value="item">{{item}}</checker-item>
            <checker-item  v-for="item in perdesc" style="font-size:14px;" :key="item" :value="item">{{item}}</checker-item>
          </checker>
          <x-textarea v-model="remark" :max="20" placeholder="请填写申请说明"></x-textarea>
          <div style="padding:30px 15px">
            <x-button type="primary" class="zj_button" @click.native="qxsq_comfirm">确认</x-button>
          </div>
        </div> -->


        <!-- 联掌的门禁 -->
        <div v-if="list_index==0">
          <cell
            title="申请门禁"
            style="font-size:0.42rem"
            :inline-desc="askdoor"
            is-link
            :value="tipval"
            :border-intent="false"
            :arrow-direction="showContent ? 'up' : 'down'"
            @click.native="showContent = !showContent"></cell>
            <checklist id="checkbox1" class="slide" :class="showContent?'animate':''" :options="requestdoor" v-model="common_choose1" @on-change="common_change1"></checklist>
            <x-textarea id="textareabot" v-model="remark" :max="20" placeholder="请填写申请说明" title="申请理由" style="font-size:0.42rem;padding-top:10px;"></x-textarea>
            <div style="padding:0.373rem;color:#9d9da3">
              使用说明：
              <ol style="padding-left:0.4rem">
                <li>您可以申请已有权限以外的智能门禁开门权限</li>
                <li>您成功提交申请后，我们会在3个工作日之内完成审批</li>
              </ol>
            </div>
            <div style="padding:30px 15px">
              <x-button type="primary" class="zj_button" @click.native="requestsub">提交</x-button>
            </div>
        </div>
      
      <!-- 租户授权 -->
      <!-- b5的门禁 -->
      <!-- <div style="background-color:white;" v-if="list_index==1&&opentype==0">
        <cell
          title="选择租户"
          
          is-link
          :arrow-direction="showContent3 ? 'up' : 'down'"
          @click.native="showContent3 = !showContent3"></cell>
        <checklist class="slide" :class="showContent3?'animate':''" :options="tenantList" v-model="tenant_choose" @on-change="change3"></checklist>
        <cell
          title="开通门禁范围"
          style="font-size:0.42rem"
          is-link
          :arrow-direction="showContent4 ? 'up' : 'down'"
          @click.native="showContent4 = !showContent4"></cell>
        <checklist class="slide" :class="showContent4?'animate':''" :options="rangeList" v-model="range_choose" @on-change="change4"></checklist>
        <datetime v-model="startdate" placeholder="请选择权限开通时间" :min-year=2017 :max-year=2019 format="YYYY-MM-DD" @on-change="setStart" title="权限开通时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        <datetime v-model="enddate" placeholder="请选择权限失效时间" :min-year=2017 :max-year=2019 format="YYYY-MM-DD" @on-change="setEnd" title="权限失效时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        <div style="padding:30px 15px">
          <x-button type="primary" class="zj_button" @click.native="zhsq_comfirm">确认</x-button>
        </div>
      </div> -->

      <!-- 联掌的门禁 -->
      <div style="background-color:white;" v-if="list_index==1">
        <cell
          style="font-size:0.42rem"
          title="选择租户"
          is-link
          :value="rentval"
          :arrow-direction="showContent3 ? 'up' : 'down'"
          @click.native="showContent3 = !showContent3"></cell>
        <checklist id="checkbox2" class="slide" :class="showContent3?'animate':''" :options="rentList" :max="fmnum" v-model="rent_choose" @on-change="rentchange"></checklist>
        <cell
          
          style="font-size:0.42rem"
          title="开通门禁范围"
          is-link
          :arrow-direction="showContent4 ? 'up' : 'down'"
          @click.native="showContent4 = !showContent4"></cell>
        <checklist id="checkbox3" class="slide" :class="showContent4?'animate':''" :options="rentsList" v-model="rents_choose" @on-change="changerent"></checklist>
        <group gutter="0">
          <datetime v-model="startdate" style="font-size:0.42rem" placeholder="请选择权限开通时间" :min-year=2017 :max-year=2019 format="YYYY-MM-DD" @on-change="setStart" title="权限开通时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
          <datetime v-model="enddate" style="font-size:0.42rem" placeholder="请选择权限失效时间" :min-year=2017 :max-year=2019 format="YYYY-MM-DD" @on-change="setEnd" title="权限失效时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        </group>
        <div style="padding:0.373rem;color:#9d9da3" >
          使用说明：
          <ol style="padding-left:0.4rem">
            <li>您可以授权给租户当前所拥有的门禁权限，有效期最多为3个月</li>
            <li>出于安全考虑，当租户搬离时请您及时解除租户的房产绑定和授予的门禁权限</li>
          </ol>
        </div>
        <div style="padding:30px 15px">
          <x-button type="primary" class="zj_button" @click.native="confirmfml(1)">授权</x-button>
        </div>
      </div>

      <!-- 家人授权 -->
      <!-- b5门禁 -->
      <!-- <div v-if="list_index==2&&opentype==0">
        <div class="weui_panel weui_cells">
          <a class="weui_cell second_font" style="padding: 2px 15px;"  v-for="item in familyList">
            <div class="this_flex_2 this_paddng"><p>{{item.name.val}}</p>
              <p>电话：{{item.phone.val}}</p>
            </div>
            <div class="this_flex_1 text_right">
              <div><x-button mini type="primary" v-if="item.status.val==0" @click.native="agree(item.id.val)">同意</x-button></div>
              <div><x-button mini type="warn" @click.native="delete_this(item.id.val)">删除</x-button></div>
            </div>
          </a>
        </div>
      </div> -->

      <!-- 联掌门禁 -->
      <div v-if="list_index==2">
        <group gutter="0">
        <cell
          style="font-size:0.42rem"
          title="选择家人"
          :value="family"
          is-link
          :arrow-direction="showContent3 ? 'up' : 'down'"
          @click.native="showContent3 = !showContent3"></cell>
        <checklist id="checkbox3" class="slide" :class="showContent3?'animate':''" :options="fmllist" :max="fmnum" v-model="fml_choose" @on-change="changefml"></checklist>
        <cell
          id="stopdoor"
          title="开通门禁范围"
          style="font-size:0.42rem"
          is-link
          :arrow-direction="showContent4 ? 'up' : 'down'"
          @click.native="showContent4 = !showContent4"></cell>
        <checklist id="checkbox4" class="slide" :class="showContent4?'animate':''" :options="rangefmlList" v-model="rangefml_choose" @on-change="changefml1"></checklist>
        </group>
        <div style="padding:30px 15px">
          <x-button type="primary" class="zj_button" @click.native="confirmfml(2)">授权</x-button>
        </div>
      </div>
      
    </div>
    <alert v-model="confirm_show" :title="title" @on-show="onShow" @on-hide="onHide"> {{content}}</alert>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <loading v-model="isLoading" text="提交中"></loading>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Tab,TabItem,Checker,Cell,Checklist,CheckerItem,XTextarea,Datetime,XButton,Alert,Loading,Toast,Group} from 'vux';
  import $ from 'jquery';

  const list = () => ['权限申请', '租户授权','家人授权'];
  export default{
    data(){
      return{
        tipval:'',
        // 租户
        rentval:'',
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
        //b5的公共门原始数据
        commonListb5:[],
        common_choose: [],
        common_choose1:[],
        //单元门的原始数据
        personListb5:[],
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
        title:"提示",
        //申请门禁
        askdoor:'',
        // 开门方式
        opentype:0,
        // 申请联掌门列表
        requestdoor:[],
        // 租户授权们列表
        rentList:[],
        // 家人授权门禁
        fmllist:[],
        // 家人门禁选择
        fml_choose:[],
        // 选择家人
        family:'',
        // 租户门禁选择列表
        rent_choose:[],
        // 租户授权门列表
        rents_choose:[],
        rent_list:[],
        rents_list:[],
        // 租户门禁列表
        rentsList:[],

        // 选择最多个数
        fmnum:1,


        requestdoor1:[],
        rangefmlList:[],
        rangefmlLists:[],

        //获取的家人原始数据
        fmllist2:[],
        // 家人已拥有的门列表
        doorlist2:[],
        // 解决连续点击问题
        doubleclick:true
      }
    },
    components:{
      Tab,TabItem,Checker,Cell,Checklist,CheckerItem,XTextarea,Datetime,XButton,Alert,Loading,Toast,Group
    },
    mounted(){
      setTitle("钥匙管理");
      var that=this
      this.opentype=this.$route.query.opentype
      // 要删除的
      //  var publicdoor=[{name:"南大门",id:1},{name:"dd大门",id:2}]
      //     var unitList=[{name:"c大门",id:3},{name:"y大门",id:4}]
      //     that.requestdoor1=publicdoor.concat(unitList)
      //     var resdoor=[]
      //     that.requestdoor1.map(function (value) {
      //       resdoor.push(value.name)
      //     })
      //     that.requestdoor=resdoor
      //     console.log(that.requestdoor,'doorlist')
      // that.requestdoor=["东大门","北大门","西大门","南大门"]
      // that.rentList=[{
      //           "id":1,
      //           "name":"南天门",
      //       },
      //       {
      //           "id":2,
      //           "name":"北天门",
      //       }
      //       ]
      //       var rentlist=[]
      //       that.rentList.map(function (value) {
      //         rentlist.push(value.name)
      //       })
      //       that.rentList=rentlist
      //       that.rentsList=rentlist
      // that.fmllist=[
      //   "南天门","北天门"
      // ]
      // this.fml_choose=["北天门"]
      // B5的门禁
      


      // if(this.opentype==1){
        this.$http.post(service_url+'/o2o/door/web/getOtherDoorInfo',{
        userid:userProfile.userid,
        usertype:'owner',
        villageid:userProfile.vid
      }).then((res)=>{
        var data=res.body
        if(data.state==0){
          var publicdoor=data.data.public
          var unitList=data.data.person
          that.requestdoor1=publicdoor.concat(unitList)
          if(that.requestdoor1.length>0){
            that.tipval="请选择"
          }else{
            that.tipval="当前没有可申请门禁"
          }
          var resdoor=[]
          that.requestdoor1.map(function (value) {
            resdoor.push(value.dname)
          })
          
          that.requestdoor=resdoor
        }else{
          that.confirm_show=true 
          that.title="提示"
          that.content=data.msg
        }
      })

//获取当前用户拥有的门权限列表
      this.$http.post(service_url+'/o2o/door/wexin/lookUpDoorAuth',{
        houseid:userProfile.houseid,
        userid:userProfile.userid,
        villageid:userProfile.vid,
        usertype:userProfile.atype
      }).then((res)=>{
        var data=res.body
        if(data.state==0){
          // that.rentList=data.data
          that.rangefmlLists=data.data
          var fmllists=[]
          that.rangefmlLists.map(function(value){
            fmllists.push(value.name)
          })
          that.rangefmlList=fmllists
        }else{
            that.confirm_show=true 
            that.title="提示"
            that.content=data.msg
        }
      })
      //获取租户列表
      this.$http.post(service_url+'/o2o/door/wexin/getRentInfo',{
        houseid:userProfile.houseid,
        userid:userProfile.userid,
        villageid:userProfile.vid
      }).then((res)=>{
        var data=res.body;
        if(data.state==0){
          that.rent_list=data.data.tenant
          if(that.rent_list.length>0){
            that.rentval="请选择"
          }else{
            that.rentval="当前房产未绑定租户"
          }
          that.rents_list=data.data.range
          var rentlist1=[]
          that.rent_list.map(function (value) {
              rentlist1.push(value.name)
            })
            that.rentList=rentlist1
            var rentslist=[]
            that.rents_list.map(function (value) {
            rentslist.push(value.name)
          })
          that.rentsList=rentslist
        }else{
           that.confirm_show=true 
            that.title="提示"
            that.content=data.msg
        }
      })
      //获取家人
      this.$http.post(service_url+'/o2o/door/wexin/getFamilyInfo',{
        houseid:userProfile.houseid,
        userid:userProfile.userid,
        villageid:userProfile.vid
      }).then((res)=>{
        var data=res.body;
        if(data.state==0){
          that.fmllist2=data.data
          //此人已拥有的门权限
          // that.doorlist2=that.fmllist2.doorList.doorIds
          if(that.fmllist2.length>0){
            that.family="请选择"
          }else{
            that.family="当前房产未绑定家人"
          }
          var fmllist1=[]
          that.fmllist2.map(function (value) {
              fmllist1.push(value.name.val)
            })
            that.fmllist=fmllist1
        }else{
           that.confirm_show=true 
            that.title="提示"
            that.content=data.msg
        }
      })



      // }else{
      //   this.get_list();
      // }
      document.getElementById("index_loading").style.display="none";



      // this.get_list();
    },
    methods:{
      //业主给租户或家人授权
      // type为1时为租户授权，需要传时间
      // type为2时为家人授权,无需穿时间
      confirmfml(type){
        var that=this
    
        
        // var rents=[]
        // this.rent_list.map(function(value){
        //   that.rent_choose.map(function(value1){
        //     if(value1==value.name){
        //       rents.push(value.id)
        //     }
        //   })
        // })
        // var doors=[]
        // that.rents_list.map(function(value2){
        //   that.rents_choose.map(function(value3){
        //     if(value3==value2.name){
        //       doors.push(value2.id)
        //     }
        //   })
        // })
        // console.log(that.enddate,'enddate')
        // var endtimes=this.getownTime(that.enddate)
        // console.log(endtimes)
        // var rentdata={
        //   houseid:userProfile.houseid,
        //   userid:userProfile.userid,
        //   villageid:userProfile.vid,
        //   starttime:this.ostartdate,
        //   endtime:endtimes,
        //   userType:'rent',
        //   doorids:doors,
        //   userids:rents

        // }
        // var fmls=[]
        // that.rangefmlLists.map(function(value4){
        //   that.rangefml_choose.map(function(value5){
        //     if(value5==value4.name){
        //       fmls.push(value4.id)
        //     }
        //   })
        // })
        // var fml=[]
        // that.fmllist2.map(function(value6){
        //   that.fml_choose.map(function(value7){
        //     if(value7==value6.name.val){
        //       fml.push(value6.id.val)
        //     }
        //   })
        // })



        // var fmldata={
        //   houseid:userProfile.houseid,
        //   userid:userProfile.userid,
        //   villageid:userProfile.vid,
        //   userType:'family',
        //   doorids:fmls,
        //   userids:fml
        // }
        if(type==1){
          var rents=[]
        
          that.rent_choose.map(function(value1){
            that.rent_list.map(function(value){
            if(value1==value.name){
              rents.push(value.id)
            }
          })
        })
        var doors=[]
        var nodoors=[]
        that.rents_choose.map(function(value2){
          that.rents_list.map(function(value3){
            if(value2==value3.name){
              doors.push(value3.id)
            }
          })
        })
        that.rents_list.map(function(value11){
          if(doors.indexOf(value11.id)==-1){
            nodoors.push(value11.id)
          }
        })
        console.log(that.enddate,'enddate')
        var endtimes=this.getownTime(that.enddate)
        console.log(endtimes)
        var rentdata={
          houseid:userProfile.houseid,
          userid:userProfile.userid,
          villageid:userProfile.vid,
          starttime:this.ostartdate,
          endtime:endtimes,
          userType:'rent',
          doorids:doors,
          nodoorids:nodoors,
          userids:rents

        }
          if(this.rent_choose == 'undefined' || this.rent_choose.length == 0){
            this.confirm_show=true 
            this.title="提示"
            this.content="请选择租户"
            return
        }else if(this.rents_choose == 'undefined' || this.rents_choose.length == 0){
          this.confirm_show=true 
            this.title="提示"
            this.content="请选择开通门禁范围"
            return
        }else if(this.startdate==''){
          this.confirm_show=true 
            this.title="提示"
            this.content="请选择权限开通时间"
            return
        }else if(this.enddate==''){
          this.confirm_show=true 
            this.title="提示"
            this.content="请选择权限失效时间"
            return
        }
            this.$http.post(service_url+'/o2o/door/wexin/authSetting',rentdata).then((res)=>{
              if(res.body.state==0){
                   this.confirm_show=true 
                  this.title="提示"
                  this.content="授权成功"
              }else{
                this.confirm_show=true 
                  this.title="提示"
                  this.content=res.body.msg
              }
            })
        }else{
          var fmls=[]
          var nofmls=[]
          console.log(that.rangefmlLists,'rangefmlLists')
          console.log(that.rangefml_choose,'rangefml_choose')
        that.rangefml_choose.map(function(value4){
          that.rangefmlLists.map(function(value5){
            if(value4==value5.name){
              fmls.push(value5.id)
            }
          })
        })
        that.rangefmlLists.map(function(value8){
          console.log(value8.name,'name')
          console.log(fmls.indexOf(value8.name),'indexof')
          if(fmls.indexOf(value8.id)==-1){
            nofmls.push(value8.id)
          }
        })
        var fml=[]
        
          that.fml_choose.map(function(value7){
            that.fmllist2.map(function(value6){
            if(value7==value6.name.val){
              fml.push(value6.id.val)
            }
          })
        })



        var fmldata={
          houseid:userProfile.houseid,
          userid:userProfile.userid,
          villageid:userProfile.vid,
          userType:'family',
          doorids:fmls,
          nodoorids:nofmls,
          userids:fml
        }
          if(this.fml_choose == 'undefined' || this.fml_choose.length == 0){
            this.confirm_show=true 
            this.title="提示"
            this.content="请选择家人"
            return
        }else if(this.rangefml_choose == 'undefined' || this.rangefml_choose.length == 0){
          this.confirm_show=true 
            this.title="提示"
            this.content="请选择开通门禁范围"
            return
        }
          this.$http.post(service_url+'/o2o/door/wexin/authSetting',fmldata).then((res)=>{
            if(res.body.state==0){
                   this.confirm_show=true 
                  this.title="提示"
                  this.content="授权成功"
              }else{
                this.confirm_show=true 
                  this.title="提示"
                  this.content=res.body.msg
              }
          })
        }
      

      },




      //业主申请门禁提交
      requestsub(){
        var that=this
        this.doubleclick=false
        if(this.common_choose1 == 'undefined' || this.common_choose1.length == 0){
          this.confirm_show=true 
          this.title="提示"
          this.content="请选择申请门禁的门"
          return
        }else if(this.remark==''){
          this.confirm_show=true 
          this.title="提示"
          this.content="请填写申请理由"
          return
        }
        var doorslist=that.requestdoor1
        console.log(doorslist,'doorslist')
        console.log(that.common_choose1,'coomon')
        var doorid=[]
        that.common_choose1.map(function (value) {
          doorslist.map(function (value1) {
            if(value==value1.dname){
              doorid.push(value1.id)
            }
          })
        }) 
        this.$http.post(service_url+'/o2o/door/wexin/ownerAuthApply',{
          doorids:doorid,
          houseid:userProfile.houseid,
          remark:that.remark,
          userid:userProfile.userid,
          villageid:userProfile.vid
        }).then((res)=>{
          if(res.body.state==0){
            that.doubleclick=true
             that.confirm_show=true 
             that.title="提示"
             that.content="提交成功"
          }else{
             this.confirm_show=true 
          this.title="提示"
          this.content=res.body.msg
          }
        })
      },


      setStart(value){
        console.log(value,'value')
        var ostartdate = this.getownTime(value);
        var time = new Date(new Date().toLocaleDateString()).getTime();
        if(ostartdate < time){
          this.content="开通时间应该在当前时间之后";
          this.confirm_show=true;
          this.title="确认";
          this.startdate="";
          /*self.$set("oenddate",oenddate)*/
        }else{
          this.ostartdate=ostartdate
          console.log(this.ostartdate,'ostartdate')
        }
      },
      setEnd(value){
        var self=this
        var oenddate = this.getownTime(value)+24*60*60*1000-1;
        console.log(oenddate,'oenddate')
        var startdate = this.startdate;
        var enddate = this.enddate;
        var arr = startdate.split(/[- :]/);
        var arr2 = enddate.split(/[- :]/);
        var this_arr2_0 = Number(arr2[0]);
        var this_arr2_1 = Number(arr2[1]);
        var this_arr2_2 = Number(arr2[2]);
        var this_arr_0 = Number(arr[0]);
        var this_arr_1 = Number(arr[1]);
        var this_arr_2 = Number(arr[2]);
        if(this_arr_1>9){
          this_arr_0=this_arr_0+1;
          this_arr_1=this_arr_1-9;
        }else{
          this_arr_1=this_arr_1+3;
        }
        console.log(self.ostartdate,'ostartdate')
        if(oenddate <= self.ostartdate){
          this.content="失效时间应该在开通时间之后";
          this.button="确认";
          this.confirm_show=true;
         
          self.enddate="";
          return;
          /*self.$set("oenddate",oenddate)*/
        }
        if(this_arr2_0>this_arr_0||(this_arr2_0==this_arr_0&&this_arr2_1>this_arr_1)||(this_arr2_0==this_arr_0&&this_arr2_1==this_arr_1&&this_arr2_2>this_arr_2)){
          
          this.content="授权时间最多三个月";
          this.button="确认";
          this.confirm_show=true;
          self.enddate='';
          console.log(this.enddate,'enddate')
          return;
        }
        this.oenddate=oenddate;
      },
      getownTime(time){
        var arr = time.split(/[- :]/);
        console.log(arr);
        console.log(arr[0]);
        return (new Date(arr[0], arr[1]-1, arr[2])).getTime();
      },
      onItemClick (index) {
        this.route_type=index;
        //加的
        // if(this.opentype==0){
        //   this.get_list();
        // }


        // this.get_list();
      },
      common_change (val) {
        var that=this
        console.log('change', val);
        this.common_choose=val;
        // let arr = this.common_choose;
        // let list = this.commonList;
        // let desc = [];
        // for(let i in  arr){
        //   for(let j in  list){
        //     if(arr[i] ==list[j].val){
        //       desc.push(list[j].desc)
        //     }
        //   }
        // }
        // this.pubdesc=desc;
        // 加的
        var desc=[]
        val.map(function(value){
          desc.push(value)
        })
        this.pubdesc=desc
        console.log(this.pubdesc,'pubdesc')
      },
      // 单元门禁加的
      person_change(val){
        console.log(val)
        this.person_choose=val
        var pers=[]
        val.map(function(value){
          pers.push(value)
        })
        this.perdesc=pers
      },

      // 联掌租户
      rentchange(val){
        var that=this
          // console.log(val,'rentchange')
          that.rent_choose=val
          //
          var rentids=[]
          console.log(that.rent_list,'rentlist')
          this.rent_list.map(function(value){
            that.rent_choose.map(function(value2){
              if(value2==value.name){
                // rentids=value.doorList.doorIds
                rentids=value.doorIds
              }
            })
          })
          var rentsrange=[]
          that.rents_list.map(function(value3){
            rentids.map(function(value4){
              if(value4==value3.id){
                rentsrange.push(value3.name)
              }
            })
          })
          that.rents_choose=rentsrange
      },
      //家人的选择
      changefml1(val){
        this.rangefml_choose=val
      },

      // 联掌的门禁权限申请选择
      common_change1 (val) {
        console.log('change', val);
        this.common_choose1=val
        this.askdoor=val.join(",")
      },
      //联掌门禁家人选择
      changefml(val){
        var that=this
        this.fml_choose=val
        var fmlids=[]
        this.fmllist2.map(function(value){
          that.fml_choose.map(function(value2){
            if(value2==value.name.val){
              fmlids=value.doorList.doorIds
            }
          })
        })
        var fmllst=[]
        that.rangefmlLists.map(function(value3){
          fmlids.map(function(value4){
            if(value4==value3.id){
              fmllst.push(value3.name)
            }
          })
        })
        that.rangefml_choose=fmllst

        // rangefml_choose
        // console.log(val)
        // // this.rangefml_choose=

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
      // 租户门禁范围权限选择
      changerent(val){
        console.log(val,'rentrange')
        this.rents_choose=val
      },
      get_list(){
        let self = this;
        switch (this.route_type){
          case 0:
              if(service_url){
                // this.$http.get(service_url+"/o2o/door/wx/door/doorlist").then((data)=>{
                  this.$http.get(service_url+"/o2o/door/wx/door/doorlist").then((data)=>{
                    if(data.body.statusCode==="ok"){
                      self.commonList=data.body.data.public;
                      //加的
                  var b5commonList=[]
                  self.commonListb5.map(function(value){
                    b5commonList.push(value.dname)
                  })
                  self.commonList=b5commonList


                      self.personList=data.body.data.person;

                       // 加的
                  var b5personList=[]
                  self.personListb5.map(function(value1){
                    b5personList.push(value1.dname)
                  })
                  self.personList=b5personList
                    }else{
                      this.content=data.body.message;
                      this.confirm_show=true;
                    }
                });
              }else{
                this.$http.get('/api/door_list').then((data)=>{
                  self.commonListb5=data.body.data.data.public;


                  //加的
                  var b5commonList=[]
                  self.commonListb5.map(function(value){
                    b5commonList.push(value.dname)
                  })
                  self.commonList=b5commonList


                    //单元门列表
                  self.personListb5=data.body.data.data.person;
                  // 加的
                  var b5personList=[]
                  self.personListb5.map(function(value1){
                    b5personList.push(value1.dname)
                  })
                  self.personList=b5personList
                });
              }
            document.getElementById("index_loading").style.display="none";
              break;
          case 1:
              if(service_url){
                this.$http.get(service_url+"/o2o/door/wx/door/tenant/getinfo").then((data)=>{
                  self.tenantList=data.body.data.tenant;
                  self.rangeList=data.body.data.range;
                });
              }else{
                this.$http.get('/api/tenant_list').then((data)=>{
                  self.tenantList=data.body.data.data.tenant;
                  //要删的
                  // self.tenantList=["张三",'李四']
                  // self.rangeList=["南大门",'北大门','西大门']



                  self.rangeList=data.body.data.data.range;
                });
              }
            document.getElementById("index_loading").style.display="none";
            break;
          case 2:
            if(service_url){
              this.$http.get(service_url+"/o2o/door/wx/door/family/getinfo").then((data)=>{
                self.familyList=data.body.data;
              });
            }else{
              this.$http.get('/api/family_list').then((data)=>{
                self.tenantList=data.body.data.data.tenant;
                self.rangeList=data.body.data.data.range;
              });
            }
            document.getElementById("index_loading").style.display="none";
            break;
        }
      },
      agree(id){
        let self = this;
        self.isLoading=true;
        this.$http.get(service_url+"/o2o/door/wx/door/family/agree?id="+id).then((data)=>{
            self.isLoading=false;
            if(data.body.statusCode==="ok"){
              this.show_toast=true;
              this.toast_text="操作成功";
              self.get_list();
            }else{
              self.confirm_show=true;
              self.content=data.body.message;
            }
        })
      },
      delete_this(id){
        let self = this;
        self.isLoading=true;
        this.$http.get(service_url+"/o2o/door/wx/door/family/reject?id="+id).then((data)=>{
          self.isLoading=false;
          if(data.body.statusCode==="ok"){
            this.show_toast=true;
            this.toast_text="操作成功";
            self.get_list();
          }else{
            self.confirm_show=true;
            self.content=data.body.message;
          }
        })
      },
      zhsq_comfirm(){
        var self = this;
        if(self.ostartdate==""){
          self.content="权限开始时间不能为空";
          self.button="确认";
          this.confirm_show=true;
          return;
        }
        if(self.oenddate==""){
          self.content="权限结束时间不能为空";
          self.button="确认";
          this.confirm_show=true;
          return;
        }
        this.isLoading=true;
        this.$http.get(service_url+"/o2o/door/wx/door/tentant/timecheck?starttime="+self.ostartdate+"&endtime="+self.oenddate).then((data)=>{
          this.isLoading=false;
          let items = {
            "data": {
              "tenant":self.tenant_choose,//
              "range":self.range_choose,//
              "starttime":self.ostartdate,//
              "endtime":self.oenddate,//
            }
          };
          if(data.body.statusCode==="ok"){
            this.$http.post(service_url+"/o2o/door/wx/door/tenant/submit",items).then((odata)=>{
              // self.show_toast=true;
              // self.toast_text="操作成功";
              // self.content=odata.body.message;

              self.title='提交成功'
              self.content="当租户搬离时请解除门禁权限"
              self.confirm_show=true
            })
          }else{
            self.confirm_show=true;
            self.content="请求失败";
          }
        })
      },
      qxsq_comfirm(){
        // if(!this.common_choose.length&&!this.val2.length){
          console.log(this.person_choose.length)
        if(!this.common_choose.length&&!this.person_choose.length){
          this.content="请至少选择一个门";

          //加的
          this.confirm_show=true;
          return;
        }else if(this.remark==''){
          this.content='请填写申请理由'
          this.confirm_show=true;
          return
        }
        this.isLoading=true;
        let self = this;
        let person = [];
        let publics=[]
        
          self.common_choose.map((value2)=>{
            self.commonListb5.map((value)=>{
            if(value2==value.dname){
              publics.push(value.id)
            }
          })
        })
        
          self.person_choose.map((value4)=>{
            self.personListb5.map((value3)=>{
            if(value4==value3.dname){
              person.push(value.id)
            }
          })
        })


        // for(let x in this.val2){
        //     person.push(this.val2[x].substring(1));
        // }
        let items = {
          "data": {
            "remark": self.remark,
            // "public":self.common_choose,//公区门id
            "public":publics,//公区门id
            "person":person,//单元门id
          }
        };
        this.$http.post(service_url+"/o2o/door/wx/apply",items).then((odata)=>{
            this.isLoading=false;
            if(odata.body.statusCode==="ok"){
              this.show_toast=true;
              this.toast_text="操作成功";
              self.content=odata.body.message;
              self.common_choose=[];
            }else{
              self.confirm_show=true;
              self.content=odata.body.message;
            }
        })
      },
      change3(val){
        this.tenant_choose=val
      },
      change4(val){
        this.range_choose=val
      },
      choose_checkbox(index1,index2){
        let obj = $("#house_"+index1+"_"+index2);
        let per_desc = $("#desc_"+index1+"_"+index2).html();
        let per_id = $("#id_"+index1+"_"+index2).html();
        if(obj.prop("checked")){
          obj.removeAttr("checked");
          this.perdesc.splice(per_desc,1);
          this.val2.splice("a"+per_id,1);
        }else{
          obj.prop("checked","true");
          this.perdesc.push(per_desc);
          this.val2.push("a"+per_id);
        }
      },
      onShow(){

      },
      onHide(){
        if(this.content=="请填写申请理由"){
          return
        }else if(this.content=="请选择申请门禁的门"){
          return
        }else if(this.content=="操作成功"){
          // this.$router.push({path:"fc_index"});
          this.$router.go(0)
        }else if(this.content=="提交成功"||this.content=="授权成功"){
          // this.$router.push({path:"fc_index"});
          this.$router.go(-1)
        }
      }
    }
  }
</script>
<style>
#checkbox1 .weui-cells_checkbox{
  font-size:0.42rem
}
#checkbox2 .weui-cells_checkbox{
  font-size:0.42rem
}
#checkbox3 .weui-cells_checkbox{
  font-size:0.42rem
}
#checkbox4 .weui-cells_checkbox{
  font-size:0.42rem
}
#b5check1 .weui-cells_checkbox{
  font-size:0.42rem
}
  /* #rentid .weui-cell:nth-of-type(2):after{
  content:"";
  position: absolute;
  bottom:0;
  right: 0;
  height:1px;
  border-bottom:1px solid #D9D9D9;
  color:#D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left:15px
}
#rangeid .weui-cell:before{
  content:"";
  position: absolute;
  top:0;
  right: 0;
  height:1px;
  border-top:1px solid #D9D9D9;
  color:#D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left:15px
}*/

#textareabot:after{
  content:"";
  position:absolute;
  right: 0;
  bottom:0;
  height:1px;
  border-bottom:1px solid #D9D9D9;
  color:#D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left:15px
}
/* #stopdoor:after{
  content:"";
  position:absolute;
  right: 0;
  bottom:0;
  height:1px;
  border-bottom:1px solid #D9D9D9;
  color:#D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left:15px
}   */
</style>
<style>
ol li{
  list-style-position:outside;
  list-style-type: decimal
}

</style>
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
    /*content: '\EA06';
    color: #ad7de7 !important;*/
  }
  .weui-icon-checked:before {
    content: '\EA01';
    color: #C9C9C9;
    font-size: 23px;
    display: block;
  }
</style>
