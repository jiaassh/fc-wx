<template>
  <div class="visitor_background" id="visitor_background">
    <div class="split_image"><img :src = "header_Image" style="width:100%;height:100%;"/></div>
    <div class="visitor_title title_margin visitor_color">【请补全房屋业主预留的手机号】</div>
    <div style="padding:0 .5rem;">
      <span class="front_number margin_circle" v-if="index<7" v-for="(item,index) in front">{{item}}</span><input type="tel" class="bing_num bing_num_background margin_circle" v-for="(item,index) in 4" :key="index"  :data-current="index" v-focus-next="1" />
    </div>
    <div style="color:white;">
      <button @click="change_one" class="visitor_button_get bing_num_color bing_num_background"><span style="width:.34rem;height:.34rem;margin-right:3px;display:inline-block;"><img src="../../../static/img/change_one.png" style="width: 100%;height:100%;vertical-align: text-top;"/></span>换一个</button>
    </div>
    <div style="clear:both;"></div>
    <div class="visitor_title visitor_color">
      <button class="visitor_button_submit" @click="submit">提交</button>
    </div>
    <alert v-model="confirm_show" title="提示"> {{confirm_content}}</alert>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <loading v-model="isLoading" :text="alert_text"></loading>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {Alert,Toast,Loading} from 'vux';
  import $ from 'jquery';
  export default{
    data(){
      return{
          header_Image:'',
        confirm_show:false,
        show_toast:false,
        isLoading:false,
        confirm_content:"",
        toast_text:"",
        alert_text:"提交中",
        number:"",
        current_tel:"",
        front:[],
        tel_arr:[],
        now_index:0,
        choose_tel:"",
        username:"",
        userphone:"",
        address:"",
        atype:"",
      }
    },
    components:{
      Alert,Toast,Loading
    },
    mounted(){
        if(enter_mark===1){
            this.header_Image="../static/img/BG.jpg";
        }else if(enter_mark===2){
          $(".bing_num").focus(function(){
            console.log($("#visitor_background").removeClass("visitor_background").addClass("visitor_background_static"));
          });
          $(".bing_num").blur(function(){
            console.log($("#visitor_background").removeClass("visitor_background_static").addClass("visitor_background"));
          });
          this.header_Image="../static/img/tj_name.png";
        }
        setTitle("绑定房产");
      document.body.style.background="black";
      this.tel_arr=JSON.parse(this.$route.query.str);
      this.username=this.$route.query.username;
      this.hid=this.$route.query.hid;
      this.userphone=this.$route.query.userphone;
      this.atype=this.$route.query.atype;
      this.address=this.$route.query.address;
      this.housedesc=JSON.parse(this.$route.query.housedesc);
      this.choose_tel=this.tel_arr[this.now_index];
      this.split_seven(this.choose_tel);
      document.getElementById("index_loading").style.display="none";
    },
    computed:{
      /*input_style(){
        return{
          "margin-right":(document.body.clientWidth-282)/11+"px"
        }
      },
      button_width(){
        return{
          "width":(document.body.clientWidth-30)+"px"
        }
      }*/
    },
    methods:{
      submit(){
        let nums = $(".bing_num");

        for(let i=0;i<nums.length;i++){
          if($(nums[i]).val()===""){
            this.confirm_show=true;
            this.confirm_content="请完整输入邀请码";
            this.number="";
            return;
          }
          this.number+=$(nums[i]).val();
        }
        console.log(this.number);
        console.log(this.choose_tel.substring(7,11));
        if(this.number!==this.choose_tel.substring(7,11)){
          this.confirm_show=true;
          this.confirm_content="电话补全不正确，请重新输入或换一个";
          this.number="";
          $(".bing_num").val("");
          return;
        }
        this.isLoading=true;
        if(service_url){
          const item = {
            atype:this.atype,
            village:this.address,
            username:this.username,
            userphone:this.userphone,
            phone:this.choose_tel,
            token:userProfile.token,
            hid:this.hid,
            house:this.housedesc
          };
          this.$http.post(service_url+"/o2o/common/wx/reg/request",item).then((data)=>{
            this.isLoading=false;
            if(data.body.status===0){
              this.show_toast=true;
              this.toast_text="绑定成功";
              userProfile=data.body.data;
              setTimeout(this.go_back,1000);
            }else{
              this.number="";
              this.confirm_show=true;
              this.confirm_content=data.body.detail;
            }
          })
        }else{
          this.isLoading=false;
          this.show_toast=true;
          this.toast_text="绑定成功";
          setTimeout(this.go_back,1000);
        }
      },
      go_back(){
        this.$router.push({path:"/index"})
      },
      change_one(){
          if(this.now_index<this.tel_arr.length-1){
              this.now_index+=1;
          }else{
              this.now_index=0;
          }
        this.choose_tel=this.tel_arr[this.now_index];
        this.split_seven(this.choose_tel);
      },
      split_seven(tel){
          this.front = tel.split("");
      }
    }
  }
</script>


<style scoped>
  .front_number{
    color:white;
    font-size:.8rem;
  }
  .visitor_button_get{
    margin-right:.71rem;
    float:right;
    width:2rem;
    text-align: center;
    /*border: 1px solid #fbcf72;
    background-color: #000;*/
    border-radius: 5px;
    padding:.2rem;
    /*color:#fbcf72;*/
    margin-top:.4rem;
    box-shadow: 0 0 10px rgba(186,147,41,.5) inset,0 0 10px rgba(255,255,255,.3);
  }
  .margin_circle{
    margin-right:.21rem;
  }
  .bing_num{box-shadow: 0 0 10px rgba(186,147,41,.5) inset,0 0 10px rgba(255,255,255,.3);color:#fff;width:.8rem;height:.8rem;border-radius: 6px;text-align: center;font-size:.8rem;vertical-align: text-bottom;}
</style>
