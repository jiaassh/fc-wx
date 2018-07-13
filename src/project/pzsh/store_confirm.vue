<template>
  <div>
    <!--<loading style="text-align: center;" v-if="loading"></loading>-->
    <div>
      <group title="收货人信息">
        <x-input labelWidth="5em" title="姓名" name="username" placeholder="请输入姓名" v-model="buyer_name"></x-input>
        <x-input title="手机号码" type="tel" name="mobile" placeholder="请输入手机号码" is-type="china-mobile" v-model="buyer_tel"></x-input>
        <x-input title="收货地址" name="address" placeholder="请输入收货地址" v-model="buyer_address"></x-input>
        <x-input v-if="state===3||state===4||state===5||state===6" name="express_company" :value="express_company" disabled></x-input>
        <x-input v-if="state===3||state===4||state===5||state===6" title="快递单号" name="express_no" :value="express_no" disabled></x-input>
      </group>
      <group :title="show_title">
        <div>
          <goods-show :goods="orders" :type="goods_type" :path="path"></goods-show>
        </div>
      </group>
      <div>
          <div style="line-height:1.2rem;background:#fff;padding-left:5rem;font-size:0.453rem"><span>共<span style="color:#f00">{{total_num}}</span>件商品</span><span style="margin-left:8px">合计<span style="color:#f00">￥{{total_price}}</span></span></div>
      </div>
      <div style="margin:20px 10px 10px"><x-button class="zj_button" @click.native="conorder">确认下单</x-button></div>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"></alert>
    <confirm v-model="show" title="提示" @on-confirm='gosuc'>
        <div slot="default">
            <p>你好，订单提交后，无需在线支付，我们将以货到付款方式，送货上门时收取费用</p>
            <p>如有任何疑问可咨询项目物业前台。</p>
            <p>咨询电话：021-53830088</p>
        </div>
    </confirm>
  </div>

</template>

<script>
  import goodsShow from '@/project/pzsh/goods_show1'
  import loading from '@/components/loading/dataLoading'
  import { Cell, Group, XInput, XButton, Alert,Confirm} from 'vux'
  import {setTitle} from '@/common/js/common';
  export default{
    name: 'goods_detail',
    components:{
      goodsShow,loading,Cell, Group, XInput,XButton,Alert,Confirm
    },
    data(){
        return{
            show:false,
            content:"",
            loading:true,
            goods:[],
            store_name:"",
            store_id:"",
            buyer_name:"",
            buyer_tel:"",
            buyer_address:"",
            goods_type:'2',
            order_type:1,
            express_company:'',
            state:'',
            state_name:'',
            show_title:'',
            express_no:'',
            ordernum:[],
            path:'/goods_detail',
            total_num:'2',
            total_price:35,
            totalprice:'',
            confirm_show:false,
            dialog_title:"",
            confirm_content:"",
            has_pay:0,
            show_title:'华府商铺',
            orders:[
                {
                goods_id:30,
                      id:30,
                      img:"http://115.29.175.133:8899/fileserver/18/02/11/1518315603803.jpg",
                  modelid:60,
                modelname:"300ml",
                     name:"兰维乐天然矿泉水（bingzh）",
                      num:2,
                    price:"16.80"
              }
            ],
          allprice:0
        }
    },
    mounted(){
     
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
        conorder(){
            this.show=true
        },
        gosuc(){
            this.$router.push('/ordersuc')
        }
    }
  }
</script>

<style scoped>
.zj_button{
    color:#fff
}
  .abs_button{
    position:fixed;
    bottom:0;
  }
  .text_right{
    text-align: right;
  }
  .img_div {
    height: 100px;
    width: 100px;
  }
  .object_fit {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .border_bottom_2 {
    border-bottom: 1px solid #ececec;
    padding: 10px;
  }
  .weui_flex .ui_describe {
    margin-left: 10px;
    height: 100px;
  }

  .flex_1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .posr {
    position: relative;
  }
  .shopwrap{
      display: -webkit-box;
  }
  .width_13 {
    width: 140px;
    font-size: 13px;
  }

  .text_ellipsis {
    text-overflow: ellipsis; /*文字隐藏后添加省略号*/
    white-space: nowrap; /*强制不换行*/
    overflow: hidden; /*自动隐藏文字*/
  }
</style>
