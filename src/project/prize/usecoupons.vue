<template>
    <div>
        <div :style="bg" style="z-index:-1"></div>
        <!-- <div v-show="noshow" style="text-align:center;position:absolute;top:2.907rem"><img src="./nocoupons.png" style="width:90%"><div style="font-size:0.373rem;color:#FFE4BA;line-height:0.533rem">暂时没有卡劵哦</div></div> -->
        <div v-show="noshow" style="text-align:center;margin-top:2.907rem;margin-bottom:6.8rem"><img src="./nocoupons.png" style="width:90%"><div style="font-size:0.373rem;color:#FFE4BA;line-height:0.533rem">暂时没有卡劵哦</div></div>
        <!-- <div v-show="noshow" style="text-align:center;margin-top:30px;color:#C2C2C2">当前没有卡券</div> -->
        <!-- <load-more v-if="couponslist.length===0" :show-loading="false" tip="暂无优惠券" background-color="#efeff4"></load-more> -->
        <div v-show="!noshow" style="text-align:center;top:1.08rem;position:relative;margin-bottom:0.2rem" v-for="(item,index) in couponslist">
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
             <!-- <img src="./coupons.png" style="box-shadow:1px 0 1px #ccc;width:9.2rem">
            <div style="position:absolute;left:0.787rem;top:0.453rem">
                <div style="color:#fff"><span>￥</span><span style="font-size:0.533rem">{{item.money}}</span></div>
                <div style="font-size:0.32rem;color:#fff">物业费代金券</div>
            </div>
            <div style="position:absolute;top:0.547rem;left:3.493rem">
                <p style="font-size:0.48rem;text-align:left;color:#000000">{{item.name}}</p>
                <p style="width:3.733rem;letter-spacing:-0.8px;line-height:0;margin-top:0.133rem;height:0.373rem;font-size:0.267rem;color:#666666;white-space:nowrap"><span style="font-size:0.267rem">{{item.brief}}：</span><span style="font-size:0.267rem">只能用于缴纳物业费</span></p>
            </div> -->
            <!-- <div v-show="item.status==2" style="position:absolute;z-index:1;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div> -->
            <!-- <div v-show="item.status==3" style="position:absolute;z-index:1;top:0.627rem;right:0.707rem"><img src="../../common/img/passdate.png" style="width:1.413rem;height:auto"></div> -->
            <!-- <div style="position:absolute;z-index:11;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div>
            <div style="position:absolute;z-index:11;top:0.627rem;right:0.707rem"><img src="../../common/img/used.png" style="width:1.413rem;height:auto"></div> -->
            <!-- <div id="1" v-show="quanshow" @click="select(index)" style="position:absolute;z-index:11;right:1.4rem;top:46%;transform:translateY(-50%);" :class="{'iconfont':true,'icon-duigou':item.tuxian,'icon-quan':!item.tuxian}"></div> -->
            <div v-show="!item.tuxian" @click="select(index)" :style="waitselect"></div>
            <div v-show="item.tuxian" @click="select(index)" :style="selected"></div>
        </div>
        <div v-show="!noshow" style="margin-top:1.547rem;text-align:center"><img src="./usedec.png" style="width:80%;"></div>
         <button  @click="queding" style="width:8.8rem;background:#FFBD54;text-align:center;border:0;border-radius:5px;line-height:1.17rem;color:#fff;font-size:0.48rem;margin-left:50%;transform:translateX(-50%);margin-top:0.5rem">确定</button>
    
        <alert v-model="confirm_show" :title="dialog_title" @on-hide="onHide"> {{content}}</alert>
    </div>
</template>
<script>
import {Alert,LoadMore} from 'vux'
import {setTitle} from '@/common/js/common';
export default{
    data(){
        return {
            order_id:'',
            sn:'',
            confirm_show:false,
            dialog_title:'',
            content:'',
            //是否显示选择圈
            quanshow:true,
            noshow:false,
            // type:0,
            // pay_type:0,
            // pay_num:0,
            // 奖券id
            couponId:0,
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
        Alert,
        LoadMore
    },
    mounted(){
        setTitle('卡券')
        
        //获取订单号
        this.sn=this.$route.query.order_id
        this.couponId=this.$route.query.couponId
      
        


        var that=this
        //获取奖券列表
            if(service_url){
                this.$http.post(service_url+'/o2o-lottery-webAndroid/wx/getUserCoupon',{
                userId:userProfile.userid,
                hid:userProfile.houseid,
                status:1
            }).then((res)=>{
               if(res.body.state==0){
                                     var list=res.body.data
                                     if(list.length==0){
                                         that.noshow=true
                                     }
                                    list.map(function (value) {
                                        if(value.couponId==that.couponId){
                                            value.tuxian=true
                                        }else{
                                             value.tuxian=false
                                        }
                                    })
                                    that.couponslist=list 

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
                                status:1
                            }).then((res)=>{
                                if(res.body.state==0){
                                    var list=res.body.data
                                    if(value.couponId==that.couponId){
                                            value.tuxian=true
                                        }else{
                                             value.tuxian=false
                                        }
                                    that.couponslist=list 
                                    console.log(that.couponslist)

                                }else{
                                    that.confirm_show=true 
                                    that.content=res.body.msg
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
            console.log(this.couponslist[index])
            this.couponslist.forEach((value,index1) => {
                if(index==index1){
                    console.log(this.couponslist)
                  this.couponslist[index].tuxian=!this.couponslist[index].tuxian
                }else{
                    // console.log(123)
                    this.couponslist[index].tuxian=true
                }
            });
        },
        queding(){
            var that=this
            var list=that.couponslist
            var coupons=''
            var coupleid=0
            console.log(list,'list')
            list.map(function (val) {
                if(val.tuxian==true){
                    coupleid=val.couponId
                    coupons=val.money
                }
            })
            console.log(coupons,'coupons')
            console.log(that.sn,'sn')
            this.$http.post(service_url+'/o2o-assetsv2-webAndroid/wx/getPaymentAmount',
            {
                sn:that.sn,
                couponId:coupleid
            }).then((res)=> {
                if(res.body.status==0){
                    var sj=res.body.data
                    // var money=coupons
                    var shifu=sj.payAmount
                //  this.$router.push({path:'usecoupons',query:{'order_id':this.order_id,'type':this.type,'pay_type':title,pay_num:price}})
                    that.$router.go(-1)
                    
                }else{
                    that.$router.go(-1)
                }
            })
            // that.$router.go(-1)
            
        }
    },
    computed:{
        bg(){
            if(service_url){
                        // return {"background": "url(../static/imgs/bgbao.png) no-repeat 0 0","height":"100%","width":"100%","background-size":"cover","position":"absolute"}
                            return {'background':'transparent url(../static/imgs/lottery_2/quanbg.jpg) top left/100% no-repeat','position':'absolute','width':'100%','height':'100%','top':0}
                        }else{
                            // return {"background": "url(/static/imgs/bgbao.png) no-repeat 0 0","height":"100%","width":"100%","background-size":"cover","position":"absolute"}
                            return {'background':'transparent url(/static/imgs/lottery_2/quanbg.jpg) top left/100%  no-repeat','position':'absolute','width':'100%','height':'100%','top':0}
                        }
        },
        waitselect(){
            if(service_url){
                return {
                    'background':'url(../static/imgs/lottery_2/weigou.png) top left/100% no-repeat','position':'absolute','top':'50%','right':'1.813rem','transform':'translateY(-50%)','z-index':10,'width':'0.693rem','height':'0.693rem'
                }
            }else{
                 return {
                    'background':'url(../static/imgs/lottery_2/weigou.png) top left/100% no-repeat','position':'absolute','top':'50%','right':'1.813rem','transform':'translateY(-50%)','z-index':10,'width':'0.693rem','height':'0.693rem'
                }
            }
        },
        selected(){
               if(service_url){
                return {
                    'background':'url(../static/imgs/lottery_2/selected.png) top left/100% no-repeat','position':'absolute','top':'50%','right':'1.813rem','transform':'translateY(-50%)','z-index':10,'width':'0.693rem','height':'0.693rem'
                }
            }else{
                 return {
                    'background':'url(../static/imgs/lottery_2/selected.png) top left/100% no-repeat','position':'absolute','top':'50%','right':'1.813rem','transform':'translateY(-50%)','z-index':10,'width':'0.693rem','height':'0.693rem'
                }
            }
        }
    }
}
</script>
<style>
    .icon-duigou{
        color:#5293D5;
        font-size:1rem;
    }
    .icon-quan{color:#CC241A;
        font-size:1.5rem;}
</style>