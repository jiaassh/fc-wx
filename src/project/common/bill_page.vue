<!--开票信息页面 与支付页中的开票信息保持同步-->
<template>
  <div>
    <group title="开票信息">
      <x-textarea rows="2" title="票务信息" placeholder="请输入票务信息" v-model="bill_msg"></x-textarea>
      <x-textarea rows="2" title="我的地址" placeholder="请输入地址" v-model="address"></x-textarea>
    </group>
    <div style="padding:20px 10px;">
      <x-button type="primary" class="zj_button" @click.native="_submit">保存</x-button>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
    <loading v-model="isLoading" text="保存中"></loading>
    <toast v-model="show_toast">{{toast_text}}</toast>
    <confirm v-model="show"
             title="提示"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             >
      <p style="text-align:center;">{{confirm_text}}</p>
    </confirm>
  </div>
</template>

<script>
  import {XTextarea,XButton,Group,Alert,Loading,Toast,Confirm} from 'vux'
  import {setTitle} from '@/common/js/common';

  export default{
      components:{
        XTextarea,XButton,Group,Alert,Loading,Toast,Confirm
      },
      mounted(){
        setTitle("开票信息");
        document.getElementById("index_loading").style.display="none";
        /*进入先获取一次开票信息，如果有则展示*/
        if(service_url){
            this.$http.get(service_url+"/o2o/assetsv2/wx/ticket/get_bill").then((data)=>{
              if(data.body.status===0){
                  this.bill_msg=data.body.data.bill_msg;
                  this.old_bill_msg=data.body.data.bill_msg;
                  this.address=data.body.data.address;
                  this.old_address=data.body.data.address;
                  this.type=1;
              }
            })
        }else{

        }
      },
    data(){
      return{
          address:"",
          bill_msg:"",
          type:0,
          confirm_show:false,
          dialog_title:"提示",
          confirm_content:0,
          isLoading:false,
          show_toast:false,
          toast_text:"",
          old_bill_msg:"",
          old_address:"",
          confirm_text:"是否更新票务信息",
          show:false,
      }
    },
    methods:{
      /*保存前的确认框*/
      save_bill(){
        if(this.type){
          this.show=true;
        }else{
          this._submit();
        }
      },
      /*验证内容*/
      _validate(){
        if(!this.bill_msg){
          this.confirm_show=true;
          this.confirm_content="请输入票务信息";
          return false;
        }
        if(!this.address){
          this.confirm_show=true;
          this.confirm_content="请输入地址信息";
          return false;
        }
        return true;
      },
      /*提交*/
      _submit(){
          if(!this._validate()){
              return;
          }
          this.isLoading=true;
        if(service_url){
            const items = {
              address:this.address,
              bill_msg:this.bill_msg
            };
          this.$http.post(service_url+"/o2o/assetsv2/wx/ticket/save_bill",items).then((data)=>{
            this.isLoading=false;
            if(data.body.status===0){
              this.show_toast=true;
              this.toast_text="保存成功";
              setTimeout(this.go_back,1000);
            }else{
              this.confirm_show=true;
              this.confirm_content=data.body.error_reason;
            }
          })
        }else{
          this.isLoading=false;
          this.show_toast=true;
          this.toast_text="保存成功";
          setTimeout(this.go_back,1000);
        }
      },
      /*确认dialog中的取消按钮*/
      onCancel(){
        this.address=old_address;
        this.old_bill_msg=bill_msg;
      },
      /*确认dialog中的确认*/
      onConfirm(){
        this._submit();
      },
      /*返回上一级*/
      go_back(){
          this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
