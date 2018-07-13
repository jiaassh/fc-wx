<template>
  <div class="visitor_background">
      <!--<div style="background"><img src = "../../../static/img/BG.png" style="width:100%;height:100%;"/></div>-->
      <div class="split_image"><img :src = "header_Image" style="width:100%;height:100%;"/></div>
      <div class="visitor_login_content">
        <div class="visitor_content">
          <div style="">
            <div class="visitor_title visitor_color">
              <div class="title_margin">【请选择阁下所在的城市】</div>
              <div>
                <button @click="choose_city" class="visitor_input visitor_width_all bing_num_background visitor_shadow">{{city}}</button>
              </div>
            </div>
            <div class="visitor_title visitor_color">
              <div class="title_margin">【请选择阁下所在的小区】</div>
              <div>
                <button @click="choose_address" class="visitor_input visitor_width_all bing_num_background visitor_shadow">{{address}}</button>
              </div>
            </div>
            <div class="visitor_title visitor_color">
              <div class="title_margin">【请选择阁下的身份】</div>
              <!--<div>
                <div class="visitor_four"><button class="visitor_button_small">业主</button></div>
                <div class="visitor_four"><button class="visitor_button_small">家人</button></div>
                <div class="visitor_four"><button class="visitor_button_small">租户</button></div>
                <div class="visitor_four"><button class="visitor_button_small">访客</button></div>
                <div style="clear:both"></div>
              </div>-->
              <checker
                v-model="choose"
                type="radio"
                default-item-class="visitor_demo5-item"
                selected-item-class="visitor_demo5-item-selected"
                disabled-item-class="visitor_demo5-item-disabled">
                <checker-item class="checker_margin" v-for="(item,index) in type" :key="item" :value="item.value" @on-item-click="itemclick">{{item.value}}</checker-item>
              </checker>
            </div>
          </div>

        </div>
      </div>
    <div class="visitor_title visitor_color">
      <button class="visitor_button_submit" @click="go_next">提交</button>
    </div>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <!--<actionsheet v-model="show_city" @on-click-menu="select_city" :menus="city_list" :close-on-clicking-mask="false" show-cancel></actionsheet>-->
    <group>
      <popup-picker :show-cell="false" :show="show_city" title="城市" :data="city_list" @on-change="select_city" @on-hide="show_city=false"></popup-picker>
      <popup-picker :show-cell="false" :show="show_address" title="小区" :data="address_list" @on-change="select_address" @on-hide="show_address=false"></popup-picker>
    </group>

    <!--<actionsheet v-model="show_address" @on-click-menu="select_address" :menus="address_list" :close-on-clicking-mask="false" show-cancel></actionsheet>-->
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Alert,Actionsheet,Checker,CheckerItem,PopupPicker,Group} from 'vux';

  export default{
    data(){
          return{
            header_Image:"",
            city_list:[],
            show_city:false,
            address_list:[],
            address_arr:[],
            show_address:false,
            city:"点击选择",
            address:"点击选择",
            address_key:0,
            confirm_show:false,
            confirm_content:"",
            choose:"业主",
            choose_key:0,
            type:[{
              key:0,
              value:'业主'
            },{
              key:1,
              value:'家人'
            },{
              key:2,
              value:'租户'
            },{
              key:3,
              value:'访客'
            }],
          }
      },
    components:{
      Alert,Actionsheet,Checker,CheckerItem,PopupPicker,Group
    },
    mounted(){
      if(enter_mark===1){
        this.header_Image="../static/img/BG.jpg";
      }else if(enter_mark===2){
        this.header_Image="../static/img/tj_name.png";
      }
      setTitle("选择身份");
      document.getElementById("index_loading").style.display="none";
      this.get_City();
    },
    methods:{
      _validate(){
          if(this.city==="点击选择"){
              this.confirm_show=true;
              this.confirm_content="请选择城市";
              return false;
          }
          if(this.address==="点击选择"){
            this.confirm_show=true;
            this.confirm_content="请选择小区";
            return false;
          }
        return true;
      },
      go_next(){
        if(!this._validate()){
            return;
        }
        switch(this.choose_key+1){
          case 1:
          case 2:
          case 3:
              this.$router.push({path:"visitor_owner/1",query:{city:this.city,address:this.address_key,atype:this.choose_key}});
              break;
          case 4:
              sessionStorage.setItem("city", this.city);
              sessionStorage.setItem("address", this.address);
              sessionStorage.setItem("vid", this.address_key);
              this.$router.push({path:"index"});
              break;
        }
      },
      get_City(){
        if(service_url){
          this.$http.get(service_url+"/o2o/common/wx/getcity?token="+userProfile.token).then((data)=>{
            if(data.body.status===0){
              this.city_list.push(data.body.data.citys);
            }else{
              this.confirm_show=true;
              this.confirm_content=data.body.detail;
            }
          })
        }else{
          this.$http.get("/api/getcity").then((data)=>{
            this.city_list.push(data.body.data.citys);
          })
        }
      },
      getallvillage(){
        if(service_url){
          const sendata = {
            token: userProfile.token,
            citys: this.city
          }
          this.$http.post(encodeURI(service_url+"/o2o/common/wx/getallvillage"), sendata).then((data)=>{
            if(data.body.status===0){
              let address_list=data.body.data.villages;
              let _arr=[];
              for(let i in address_list){
                _arr.push(address_list[i].vname);
              }
              this.address_list.push(_arr);
              this.address_arr=data.body.data.villages;
            }else{
              this.confirm_show=true;
              this.confirm_content=data.body.detail;
            }
          })
        }else{
          this.$http.get("/api/getallvillage").then((data)=>{
            let address_list=data.body.data.villages;
            let _arr=[];
            for(let i in address_list){
              _arr.push(address_list[i].vname);
            }
            this.address_list.push(_arr);
            this.address_arr=data.body.data.villages;
//            let address_sort={};
//            for(var i=0;i<address_list.length;i++)
//            {
//              address_sort[address_list[i].vid]=address_list[i].vname;
//            }
//            this.address_list=address_sort;
//            this.address_arr=data.body.data.villages;
          })
        }
      },
      choose_city(){
        this.show_city=true;
      },
      choose_address(){
          if(this.address_list.length===0){
            this.confirm_show=true;
            this.confirm_content="请先选择城市";
          }else{
            this.show_address=true;
          }
      },
      select_city(key){
          this.city=key[0];
          console.log("this.city"+this.city);
          this.address_list=[];
          this.address="点击选择";
          this.getallvillage();
        /*for(let i in this.city_list){
            if(i==key){
              this.city=this.city_list[i];
              this.getallvillage();
            }
        }*/
      },
      select_address(key){
        this.address=key[0];
        for(let i in this.address_arr){
            if(this.address_arr[i].vname==this.address){
                this.address_key=this.address_arr[i].vid;
            }
        }
      },
      itemclick(val){
          for(let i in this.type){
              if(val===this.type[i].value){
                  this.choose_key=this.type[i].key;
              }
          }
      }
    },
    computed:{
      button_width(){
          return{
            "width":(document.body.clientWidth-30)+"px"
          }
      },
      checker_width(){
          /*if(index!==3){
              return{
                "margin-right":0
              }
          }else{

          }*/
//        return{
//          "margin-left":(document.body.clientWidth-290)/3+"px"
//        }
      },
//      check_left(){
//          return{
//              "margin-left":"-"+(document.body.clientWidth-290)/3+"px"
//          }
//      }
    }
  }
</script>

<style scoped>


  .visitor_button_big{background: url("../../../static/img/visitor_big_button.png") center center no-repeat;background-size:contain;width: 100%;height: 80px;border: none;}
</style>
