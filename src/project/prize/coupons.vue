<template>
    <div style="position:absolute;height:100%;width:100%">
        <div :style="bg" style="z-index:-1"></div>
        <div v-show="noshow" style="text-align:center;position:absolute;top:2.907rem"><img src="./nocoupons.png" style="width:90%"><div style="font-size:0.373rem;color:#FFE4BA;line-height:0.533rem">暂时没有卡劵哦</div></div>
        
        
        <!-- <div v-show="noshow" style="text-align:center;margin-top:30px;color:#C2C2C2">当前没有卡券</div> -->
        <!-- <load-more v-if="couponslist.length===0" :show-loading="false" tip="暂无优惠券" background-color="#efeff4"></load-more> -->
        <!-- <div  class="zhezhao" v-show="show" style="position:absolute;width:100%;height:100%;background:#000;opacity:.6;z-index:3"></div> -->
         <!-- <div v-show="show"  style="width:80%;border-radius:10px;height:65%;background:#fff;position:absolute;top:50%;z-index:12;left:50%;transform:translateX(-50%) translateY(-50%)">
            <p style="text-align:center;font-size:0.427rem;color:#333333;line-height:1.2rem">{{Instruction}}</p>
            <div v-html="Inscontent" style="padding:0 0.5rem"></div>
            <div @click="confirm" style="position:absolute;width:100%;border-radius:0.6rem;margin:0 auto;text-align:center;line-height:1.2rem;font-size:0.48rem;bottom:0;left:0;color:#915BAF">我知道了</div>
        </div> -->
        <div v-show="!noshow" style="text-align:center;margin-top:1.08rem;position:relative;margin-bottom:0.2rem" v-for="(item,index) in couponslist">
             <img src="./coupons.png" style="width:9.2rem">
             <div style="position:absolute;top:0.933rem;font-weight:800;left:2rem;width:1.413rem;font-size:0.573rem;color:#CC241A;font-family:FZLTDHJW--GB1-0;">
                 现金红包
             </div>
             <div style="position:absolute;left:3.5rem;top:1.1rem"><img src="./juxing.png" style="height:1.507rem"></div>
            <!-- <div style="position:absolute;left:0.787rem;top:0.453rem">
                <div style="color:#fff"><span>￥</span><span style="font-size:0.533rem">{{item.money}}</span></div>
                <div style="font-size:0.32rem;color:#fff">物业费代金券</div>
            </div> -->
            <!-- <div style="position:absolute;top:0.547rem;left:3.493rem">
                <p style="font-size:0.48rem;text-align:left;color:#000000">物业缴费专享</p>
                <p style="width:3.733rem;letter-spacing:-0.8px;line-height:0;margin-top:0.133rem;height:0.373rem;font-size:0.267rem;color:#666666;white-space:nowrap"><span style="font-size:0.267rem">使用须知：</span><span style="font-size:0.267rem">只能用于缴纳物业费</span></p>
            </div> -->
            
                <p style="position:absolute;top:0.9rem;left:4.1rem;font-size:0.573rem;color:#CC241A;">￥{{item.money}}元</p>
                <p style="position:absolute;top:1.947rem;left:3.9rem;padding:0.013rem 0.12rem;background:#CC241A;color:#fff;font-size:0.373rem">用于抵扣物业费</p>
           
            <!-- <div v-show="1" style="position:absolute;z-index:1;top:1rem;right:1.6rem"><img src="../../common/img/used.png" style="width:1.8rem;height:auto"></div> -->
            
            <!-- <div v-show="2" style="position:absolute;z-index:1;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div> -->
            <div v-show="item.status==2" style="position:absolute;z-index:1;top:1rem;right:1.6rem"><img src="../../common/img/used.png" style="width:1.8rem;height:auto"></div>
            <!-- <div v-show="item.status==3" style="position:absolute;z-index:1;top:0.627rem;right:0.707rem"><img src="../../common/img/passdate.png" style="width:1.413rem;height:auto"></div> -->
            <div v-show="item.status==3" style="position:absolute;z-index:1;top:1rem;right:1.6rem"><img src="../../common/img/passdate.png" style="width:1.8rem;height:auto"></div>
            <!-- <div style="position:absolute;z-index:11;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div>
            <div style="position:absolute;z-index:11;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div> -->
            <!-- <div v-show="quanshow" @click="select(index)" style="position:absolute;z-index:11;right:0.707rem;top:50%;transform:translateY(-50%);" :class="{'iconfont':true,'icon-duigou':item.tuxian,'icon-quan':!item.tuxian}"></div> -->
        </div>
        <div v-show="!noshow" style="margin-top:1.547rem;text-align:center"><img src="./usedec.png" style="width:90%;"></div>
         <!-- <div style=" width:100%; text-align:center; margin-left:15px; margin-right:15px;">
            <hr class="hrLine" style="width:30%;"/> <span style="color:#FFE4BA"> 红包代金券使用说明</span>  <hr class="hrLine" style="width:20%;"/>
 </div> -->
        
       
        <!-- <div v-show="!noshow" @click="couponsdetail" style="margin-left:0.4rem;margin-top:0.307rem;width:2.5rem"><img style="width:0.387rem;vertical-align:middle;margin-right:0.12rem;" src="./tip2.png"><label style="color:#C2C2C2">使用说明</label></div> -->
        <!-- <button @click="queding" style="width:8.8rem;background:#915BAF;text-align:center;border:0;border-radius:5px;line-height:1.17rem;position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);color:#fff">确定</button> -->
        <alert v-model="confirm_show" :title="dialog_title" @on-hide="onHide"> {{content}}</alert>
    </div>
</template>
<script>
import {Alert,LoadMore} from 'vux'
import {setTitle} from '@/common/js/common';
export default{
    data(){
        return {
            confirm_show:false,
            dialog_title:'',
            content:'',
            //是否显示选择圈
            quanshow:'',
            price:888,
            //使用说明
            Instruction:'红包使用说明',
            //说明内容
            Inscontent:'1、红包代金券仅限于紫荆管家云平台线上物业费缴费抵用，不支持线下使用。</br>2、红包代金券需在2018年6月30日之前使用，逾期自动失效。</br>3、本次活动最终解释权归回上海丰诚物业管理有限公司所有',
            show:false,
            noshow:false,




            couponslist:[]
            //得到的数据格式
//             couponslist:[
//         {
//             "couponId":10,
//             "couponType":1,
//             "name":"物业缴费专享",
//             "brief ":"使用须知",
//             "money":50,
//             "status":1
//         }
//   ]
        }
    },
    components:{
        Alert,LoadMore
    },
    mounted(){
        setTitle('卡劵')
        var that=this
        //获取奖券列表
            if(service_url){
                this.$http.post(service_url+'/o2o-lottery-webAndroid/wx/getUserCoupon',{
                userId:userProfile.userid,
                hid:userProfile.houseid,
                status:0
            }).then((res)=>{
               if(res.body.state==0){
                                     var list=res.body.data
                                     if(list.length==0){
                                         this.noshow=true
                                     }
                                    list.map(function (value) {
                                        value.tuxian=false
                                    })
                                    that.couponslist=list 
                                    console.log(that.couponslist)

                                }else{
                                    that.confirm_show=true 
                                    that.content=res.body.msg
                                    that.dialog_title='提示'
                                }
            })
        }else{
                this.$http.post(service_url+'/o2o-lottery-webAndroid/wx/getUserCoupon',{
                                userId:userProfile.userid,
                                hid:userProfile.houseid,
                                status:0
                            }).then((res)=>{
                                if(res.body.state==0){
                                    var list=res.body.data
                                    list.map(function (value) {
                                        value.tuxian=false
                                    })
                                    that.couponslist=list 
                                    console.log(that.couponslist)

                                }else{
                                    that.confirm_show=true 
                                    that.content="网络出现错误,请稍后重试"
                                    that.dialog_title='提示'
                                }
                            })
        }
        
         document.getElementById("index_loading").style.display="none";
    },
    methods:{
        onHide(){
            return
        },
        //选择奖券
        select(index){
            console.log(1)
            console.log(this.couponslist[index])
            this.couponslist.forEach((value,index1) => {
                if(index==index1){
                  this.couponslist[index].tuxian=!this.couponslist[index].tuxian
                }else{
                    this.couponslist[index].tuxian=true
                }
            });
        },
        // queding(){
        //     this.$router.push('/fc_user_self')
        // }
        couponsdetail(){
            this.show=true
        },
        confirm(){
            this.show=false
        }
    },
    computed:{
        bg(){
            if(service_url){
                        // return {"background": "url(../static/imgs/bgbao.png) no-repeat 0 0","height":"100%","width":"100%","background-size":"cover","position":"absolute"}
                            return {'background':'transparent url(../static/imgs/lottery_2/quanbg.jpg) top left/100% no-repeat','position':'absolute','width':'100%','height':'100%'}
                        }else{
                            // return {"background": "url(/static/imgs/bgbao.png) no-repeat 0 0","height":"100%","width":"100%","background-size":"cover","position":"absolute"}
                            return {'background':'transparent url(/static/imgs/lottery_2/quanbg.jpg) top left/100%  no-repeat','position':'absolute','width':'100%','height':'100%'}
                        }
        }
    }
}
</script>
<style>
  .hrLine{
     vertical-align:middle; display:inline-block;
 }
</style>
<style scoped>
    .icon-duigou{
        color:#5293D5;
        font-size:1rem;
    }
 
    .icon-quan{color:#5293D5;
        font-size:1rem;}
</style>