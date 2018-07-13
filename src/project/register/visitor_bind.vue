<template>
  <div id="visitor_bind" class="visitor_background">
    <div class="split_image"><img :src = "header_Image" style="width:100%;height:100%;"/></div>
    <div class="visitor_login_content">
      <div class="visitor_content">
        <div class="visitor_title visitor_color">
          <div class="title_margin">【请阁下输入邀请码】</div>
          <div>
            <div class="bind_div">
              <input type="tel" class="bing_num bing_num_background" v-for="(item,index) in 4" :key="index"  :data-current="index" v-focus-next="1" />
            </div>
            <div style="clear:both"></div>
            <div class="bind_msg">注：邀请码可由该房“业主”在“家庭成员”功能中发给您！有效期为1小时。</div>
          </div>
        </div>
        <div class="visitor_title visitor_color">
          <button class="visitor_button_submit" @click = "submit">提交</button>
        </div>
      </div>
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
            confirm_show:false,
            show_toast:false,
            isLoading:false,
            confirm_content:"",
            toast_text:"",
            alert_text:"提交中",
            number:"",
            username:"",
            userphone:"",
            header_Image:""
          }
      },
    components:{
      Alert,Toast,Loading
    },
    mounted(){
      if(enter_mark===1){
        this.header_Image="../static/img/BG.jpg";
      }else if(enter_mark===2){
        this.header_Image="../static/img/tj_name.png";
        $(".bing_num").focus(function(){
          console.log($("#visitor_background").removeClass("visitor_background").addClass("visitor_background_static"));
        });
        $(".bing_num").blur(function(){
          console.log($("#visitor_background").removeClass("visitor_background_static").addClass("visitor_background"));
        });
      }
//      document.body.style.background="black";
      this.userphone=this.$route.query.userphone;
      this.username=this.$route.query.username;
      setTitle("邀请码绑定");
      document.getElementById("index_loading").style.display="none";
    },
    computed:{
      /*input_style(){
        return{
          "margin-right":(document.body.clientWidth-272)/3+"px"
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
          this.isLoading=true;
          const item = {
            content:this.number,
            token:userProfile.token,
            username:this.username,
            userphone:this.userphone
          };
          if(service_url){
            this.$http.post(service_url+"/o2o/common/wx/invitareg",item).then((data)=>{
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
          this.$router.push({path:'index'});
      }
    }
  }
</script>
<style scoped>
  #visitor_bind .top{font-size: 22px;}
  #visitor_bind .bing_num{color:#fff;width:1.5rem;height:1.5rem;border-radius: 6px; padding: .2rem;text-align: center;font-size:1.3rem;margin-right:.37rem;}
  #visitor_bind .bind_div .bing_num:last-child{
    margin-right:0;
  }
  /*#visitor_bind .visitor_content{position:fixed; bottom:0;width: 100%;}*/
  #visitor_bind .bind_msg{font-size: .4rem;margin-top:.2rem;}
</style>
