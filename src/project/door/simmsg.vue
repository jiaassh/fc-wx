<template>
<div>
    <div style="position:absolute;width:100%;height:100%;background:#fff;z-index:-1"></div>
    <div style="line-height:1.493rem;text-indent:0.4rem;color:#915BAF">{{location}}</div>
    <group gutter="0">
        <x-input title="手机号" placeholder="请输入受邀人手机号" v-model="phone"></x-input>
    </group>
    <div style="margin-top:0.426rem;margin-left:0.426rem;color:#9D9DA3;font-size:0.37rem">
        <p>使用说明</p>
        <p>1.访客点击短信中的链接,进入访客来访临时卡页面</p>
        <p>2.访客到达门岗前,点击对应门禁的开门按钮，即可开门</p>
    </div>
    <div>
        <a href="javascript:;" @click="sendmsg(phone)" style="font-size:0.48rem;display:block;width:9.167rem;line-height:1.222rem;text-align:center;background:#915baf;color:#fff;margin:0 auto;margin-top:2rem;border-radius:8px">发送到对方手机</a>
    </div>
    <alert v-model="alert_show" :title="dialog_title" @on-show="onShow" @on-hide="onHide" :button-text="backindex"> {{content}}</alert>
</div>
</template>
<script>
import {XInput,Group,Alert} from 'vux';
    export default{
        data(){
            return{
                location:"",
                phone:'',
                alert_show:false,
                dialog_title:"提示",
                content:"",
                urllink:'',
                backindex:""
            }
        },
        mounted(){
            // this.location=userProfile.
            this.urllink=this.$route.query.urllink
           if(userProfile.unit==''){
                if(userProfile.area==''){
                    this.location=userProfile.vname+userProfile.building+'栋'+userProfile.houseName+'室'
                }else{
                    this.location=userProfile.vname+userProfile.area+userProfile.building+'栋'+userProfile.houseName+'室'
                }
            }else{
                if(userProfile.area==''){
                this.location=userProfile.vname+userProfile.building+'栋'+userProfile.unit+'单元'+userProfile.houseName+'室'
                }else{
                this.location=userProfile.vname+userProfile.area+userProfile.building+'栋'+userProfile.unit+'单元'+userProfile.houseName+'室'
                }
            }
            

            document.getElementById("index_loading").style.display="none";
        },
        components:{
            Group,XInput,Alert
        },
        methods:{
            sendmsg(value){
                var that=this
                var reg=/^1(3|4|5|7|8)\d{9}$/
            if(value==''||value==null ||value=="undefine"){
                this.dialog_title="提示"
                this.content="请输入手机号"
                this.alert_show=true
                return
            }else if(!reg.test(this.phone)){
                this.dialog_title="提示"
                this.content="请输入正确的手机号"
                this.alert_show=true
                return
            }
            this.$http.post(service_url+'/o2o/common/wx/sendInviteVistorSMS.do',{
                phone:that.phone,
                userName:userProfile.username,
                address:that.location,
                url:that.urllink               
            }).then((res)=>{
                if(res.body.state==0){
                    this.dialog_title="提示"
                    this.content="发送成功"
                    this.alert_show=true
                    this.backindex="返回首页"
                    
                    return
                }else{
                    this.dialog_title="提示"
                    this.content=res.body.msg
                    this.alert_show=true
                    return
                }
            })
        },
        onShow(){

        },
        onHide(){
            if(this.backindex=='返回首页'){
                this.$router.push("/fc_index")
            }
        }
        }
    }
</script>
<style lang="">
    
</style>