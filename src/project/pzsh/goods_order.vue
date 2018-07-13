<template>
  <div>
    <!--<loading style="text-align: center;" v-if="loading"></loading>-->
    <div>
      <group title="收货人信息">
        <x-input labelWidth="5em" title="姓名" name="username" placeholder="请输入姓名" v-model="buyer_name"></x-input>
        <x-input title="手机号码" type="tel" name="mobile" placeholder="请输入手机号码" is-type="china-mobile" v-model="buyer_tel"></x-input>
        <x-input title="收货地址" name="address" placeholder="请输入收货地址" v-model="buyer_address"></x-input>
        <!-- <x-input v-if="state===3||state===4||state===5||state===6" name="express_company" :value="express_company" disabled></x-input>
        <x-input v-if="state===3||state===4||state===5||state===6" title="快递单号" name="express_no" :value="express_no" disabled></x-input> -->
      </group>
      <group v-if="order_type===1" v-for="items in orders" :key="items" :title="items.show_title">
        <div>
          <goods-show :goods="items.goods" :type="goods_type" :path="path"></goods-show>
          <p style="padding:.4rem 15px;text-align:right;" >共{{items.counts}}件商品 合计:<span style="color:red;">￥{{items.totalprice}}</span></p>
        </div>
      </group>
      <group v-if="order_type===2" :title="show_title">
        <div>
          <goods-show :goods="goods" :type="goods_type" :path="path"></goods-show>
          <!--<p style="padding:.4rem 15px;text-align:right;" >共件商品{{items.counts}}件 合计:<span style="color:red;">￥{{items.totalprice}}</span></p>-->
        </div>
      </group>
      <div style="text-align: right;padding-right:.8rem;padding-bottom:.4rem">
        <!--<p v-if="order_type===1" style="padding:.4rem 0" >总计:<span style="color:red;">￥{{allprice}}</span></p>-->
        <p v-if="order_type===2" style="padding:.4rem 0" >总计:<span style="color:red;">￥{{totalprice.toFixed(2)}}</span></p>
        <!--<p style="padding:.4rem 0">共{{total_num}}件商品 合计:<strike>￥{{total_price}}</strike><span style="margin-left:5px;color:red">￥{{totalprice}}</span></p>-->
      </div>
      <!-- <div style="margin:20px 10px 10px"><x-button class="zj_button" v-if="order_type===1&&has_pay==0" type="primary" @click.native="payList">支付</x-button></div> -->
      <div style="margin:20px 10px 10px"><x-button class="zj_button" v-if="order_type===1&&has_pay==0" type="primary" @click.native="conorder">确认下单</x-button></div>
    </div>
    <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
    <confirm v-model="show" title="提示" @on-confirm='gosuc'>
        <div slot="default">
            <p>你好，订单提交后，无需在线支付，我们将以货到付款方式，送货上门时收取费用</p>
            <p>如有任何疑问可咨询项目物业前台。</p>
            <p>咨询电话：{{telphone}}</p>
        </div>
    </confirm>
  </div>

</template>

<script>
  import goodsShow from '@/project/pzsh/goods_show'
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
            total_num:'',
            total_price:'',
            totalprice:'',
            confirm_show:false,
            dialog_title:"",
            confirm_content:"",
            has_pay:0,
            orders:[],
          allprice:0,
          telphone:''
        }
    },
    mounted(){
      this.order_type = parseInt(this.$route.query.type);
      this.order_type===1?setTitle("确认下单"):setTitle("订单详情");
      if(this.order_type===2){
        this.ordernum=this.$route.query.ordernum;
      }else{
        this.ordernum=JSON.parse(this.$route.query.ordernum);
      }
      console.log(this.ordernum);
      let self = this;
      if(service_url){
        const senddata={
            "ordernums":this.ordernum
        };

        if(this.order_type===1){
          this.$http.post(service_url+'/o2o/shop/wx/topayorder.do',senddata).then( (data)=> {
            if(data.body.status===0){
//            self.goods = data.body.fields.orders.goods;
              self.orders = data.body.fields.orders;
              self.has_pay = data.body.fields.has_pay;
              self.has_pay?setTitle("订单详情"):setTitle("确认下单");
              self.allprice = data.body.allprice;
              self.buyer_name = data.body.fields.orders[0].buyer_name;
              self.buyer_tel = data.body.fields.orders[0].buyer_tel;

              //加的
              self.telphone=data.body.fields.orders[0].tel


              self.buyer_address = data.body.fields.orders[0].buyer_address;
//            self.express_company = data.body.fields.orders[0].orders.express_company;
//            self.express_no = data.body.fields.orders[0].orders.express_no;
              for(let i in self.orders){
                  if(self.has_pay){
                    self.orders[i].show_title='<div class="text_ellipsis" style="width:180px">'+self.orders[i].store_name+'</div><div style="float:right;color:deepskyblue">已支付</div>';
                  }else{
                    self.orders[i].show_title='<div class="text_ellipsis" style="width:180px;">'+self.orders[i].store_name+'</div>';
                  }
              }
              self.store_name = data.body.fields.orders.store_name;
              self.state = data.body.fields.orders.state;
              self.state_name=self.switchState(parseInt(self.state));
              self.totalprice = parseFloat(data.body.allprice);
              self.show_title='<div style="display:inline-block;width:80%;">'+self.store_name+'</div><div style="float:right;color:deepskyblue">'+self.state_name+'</div>';
//            let totalNum=0;
//            let total_price=0;
              /*for(let i=0;i<self.orders.length;i++){
               for(let j =0;j<self.orders[i].goods.length;j++){
               self.orders[i].totalNum+=parseFloat(self.orders[i].goods[j].num);
               self.orders[i].total_price+=parseFloat(self.orders[i].goods[j].totalNum*self.orders[i].goods[j].price);
               }
               }*/
//            self.total_num=totalNum;
//            self.total_price=total_price;
              document.getElementById("index_loading").style.display="none";
            }else{
              this.dialog_title="提示";
              this.confirm_content=data.body.error_reason;
              this.confirm_show=true;
            }

          });
        }else{
          this.$http.post(service_url+'/o2o/shop/wx/orderdetail.do',senddata).then( (data)=> {
              setTitle("订单详情");
            if(data.body.status===0){
            self.goods = data.body.fields.orders.goods;
//              self.orders = data.body.fields.orders;
//              self.allprice = data.body.allprice;
              self.store_name = data.body.fields.orders.store_name;
              self.store_id = data.body.fields.orders.store_id;
              self.buyer_name = data.body.fields.orders.buyer_name;
              self.buyer_tel = data.body.fields.orders.buyer_tel;
              self.buyer_address = data.body.fields.orders.buyer_address;
              self.express_company = data.body.fields.orders.express_company;
              self.express_no = data.body.fields.orders.express_no;
              self.state = data.body.fields.orders.state;
              self.state_name=self.switchState(parseInt(self.state));
              self.totalprice = parseFloat(data.body.fields.orders.totalprice);
              self.show_title='<div style="display:inline-block;width:80%;">'+self.store_name+'</div><div style="float:right;color:deepskyblue">'+self.state_name+'</div><div style="clear:both"></div>';
//            let totalNum=0;
//            let total_price=0;
              /*for(let i=0;i<self.orders.length;i++){
               for(let j =0;j<self.orders[i].goods.length;j++){
               self.orders[i].totalNum+=parseFloat(self.orders[i].goods[j].num);
               self.orders[i].total_price+=parseFloat(self.orders[i].goods[j].totalNum*self.orders[i].goods[j].price);
               }
               }*/
//            self.total_num=totalNum;
//            self.total_price=total_price;
            document.getElementById("index_loading").style.display="none";
            }else{
              this.dialog_title="提示";
              this.confirm_content=data.body.error_reason;
              this.confirm_show=true;
            }

          });
        }

      }else{
        this.$http.get('/api/goodsOrder').then((data) => {
//         self.goods = data.body.data.goods;
         self.orders = data.body.data.orders;
         self.store_name = data.body.data.store_name;
         self.store_id = data.body.data.store_id;
         self.buyer_name = data.body.data.buyer_name;
         self.buyer_tel = data.body.data.buyer_tel;
         self.buyer_address = data.body.data.buyer_address;
         self.express_company = data.body.data.express_company;
         self.totalprice = data.body.data.totalprice;
         self.express_no = data.body.data.express_no;
         self.state = data.body.data.state;
         self.show_title='<div style="display:inline-block;width:80%;">'+self.store_name+'</div><div style="float:right;color:deepskyblue">'+self.state+'</div>';
          let totalNum=0;
          let total_price=0;
          for(let i=0;i<self.goods.length;i++){
            totalNum+=parseInt(self.goods[i].num);
            total_price+=parseInt(self.goods[i].num*self.goods[i].price);
          }
          self.total_num=totalNum;
          self.total_price=total_price;
         }, () => {
         console.log(2);
         });
      }
      // document.getElementById("index_loading").style.display="none";
    },
    methods:{
      //加的
      conorder(){
            this.show=true
        },
        gosuc(){
          var that=this
            this.$http.post(service_url+'/o2o-shop-webAndroid/wx/affirmShopOrderReserve.do',{
              "sn":that.ordernum[0]
            }).then(res=>{
              if(res.body.state==0){
                that.$router.push("/ordersuc")
              }else{
                that.confirm_show=true;
                that.confirm_content=data.body.msg;
                that.dialog_title="提示";
              }
            })
        },



      _validate(){
          console.log(this.buyer_name);
        if(!this.buyer_name){
          this.confirm_show=true;
          this.confirm_content="请输入姓名";
          this.dialog_title="提示";
          return false;
        }
        if(!this.buyer_tel){
          this.confirm_show=true;
          this.confirm_content="请输入电话";
          this.dialog_title="提示";
          return false;
        }
        if(!this.buyer_address){
          this.confirm_show=true;
          this.confirm_content="请输入地址";
          this.dialog_title="提示";
          return false;
        }
        return true;
      },
      payList(){

        /*const senddata={
          "data":{
            "ordernum":this.ordernum,
//            "pay_price":50
          }
        };
          this.$http.post(service_url+'/o2o/shop/wx/payorder.do',senddata).then( (data)=> {
            if(data.body.status===0){
              alert("支付成功");
              this.$router.push({ path: '/goods_order_list.vue',query:{"type":1} });
            }else{
              alert(data.body.fields.error_reason);
            }
          })*/
        if(!this._validate()){
            return;
        }

        const item = {
          ordernums:this.ordernum,
          receiver:this.buyer_name,
          receiveraddress:this.buyer_address,
          receiverphone:this.buyer_tel,
        };
        this.$http.post(service_url+"/o2o/shop/wx/updateorder.do",item).then((data)=>{
          if(data.body.status===0){
            const senddata={
              "ordernums":this.ordernum,
            };
            this.$http.post(service_url+"/o2o/assetsv2/wx/detail/shopCreate",senddata).then((data)=>{
              if(data.body.status===0){
                this.$router.push({path:"wallet_pay",query:{order_id:data.body.data,type:3,pay_num:this.allprice}});
              }else{
                this.confirm_show=true;
                this.confirm_content=data.body.msg;
                this.dialog_title="提示";
              }
            });
          }else{
            this.confirm_show=true;
            this.confirm_content=data.body.error_message;
            this.dialog_title="提示";
          }
        });
      },
      switchState(num){
        switch(num){
          case 0:
            return '已下单';
            break;
          case 1:
            return '已确认';
            break;
          case 2:
            return '已支付';
            break;
          case 3:
            return '已发货';
            break;
          case 4:
            return '已收货';
            break;
          case 5:
            return '已评价';
            break;
          case 6:
            return '已取消';
            break;
          case 7:
            return '已预定';
            break;  
        }
      },
    }
  }
</script>

<style scoped>
  .abs_button{
    position:fixed;
    bottom:0;
  }
  .text_right{
    text-align: right;
  }
</style>
