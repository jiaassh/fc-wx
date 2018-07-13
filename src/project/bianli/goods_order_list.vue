<template>
  <div>
    <div v-if="!isLoading">
      <load-more v-if="goodslist.length===0" :show-loading="false" tip="暂无订单数据" background-color="#efeff4"></load-more>
      <group v-for="item in goodslist" :key="item.ordernum" >
        <div style="padding:10px 10px 5px;border-bottom:1px solid #ececec;">
          <div style="width:220px;" class="text_ellipsis">{{item.store_name}}</div><span style="float:right;color:deepskyblue">{{item.this_state}}</span>
        </div>
        <div @click="showDetail(item.ordernum)">
          <goods-show :goods="item.goods" :type="this_type" @on-click-menu="delCollect" :path="shop_path"></goods-show>
        </div>
        <div>
          <div class="border_bottom_2">
            <div style="float:left;font-size:14px;">{{item.this_date}}</div>
            <div class="float-right">共{{item.totalnum}}件商品 合计：<span style="color:red">￥{{item.totalprices.toFixed(2)}}</span></div>
          </div>
          <div class="border_bottom_1" v-if="item.this_state==='已下单'||item.this_state==='已发货'||item.this_state==='已收货'||item.this_state==='已评价'">
            <div v-if="item.this_state==='已下单'" class="text-right"><x-button mini plain @click.native="goToPay(item.ordernum)">去支付</x-button></div>
            <div v-if="item.this_state==='已发货'" class="text-right"><x-button mini plain @click.native="checkGoodsIn(item.ordernum)">确认收货</x-button></div>
            <div v-if="item.this_state==='已收货'" class="text-right"><x-button mini plain @click.native="goToEva(item.ordernum)">去评价</x-button></div>
            <div v-if="item.this_state==='已评价'" class="text-right"><x-button mini plain @click.native="seeEva(item.ordernum)">查看评价</x-button></div>
          </div>
        </div>
      </group>
    </div>
    <loading v-model="isLoading"></loading>
    <alert v-model="confirm_show" :title="dialog_title"> {{content}}</alert>
  </div>
</template>
<script>
  import {setTitle} from '@/common/js/common';
  import goodsShow from '@/project/pzsh/goods_show';
  import loading from '@/components/loading/dataLoading';
  import {Group,XButton,LoadMore,Alert,Loading} from 'vux';

  export default{
      data(){
        return{
          goodslist:[],
          this_type:'1',
          shop_path:'/goods_order',
          isLoading:true,
          content:"",
          confirm_show:false,
          dialog_title:"提示"
        }
      },
    components:{
      Group,XButton,LoadMore,Alert,goodsShow,Loading
    },
    mounted(){
      setTitle("我的订单");
      document.getElementById("index_loading").style.display="none";
      this.get_list();
    },
    methods:{
      goToPay(ordernum){
        let ordernum_arr=[];
        ordernum_arr.push(ordernum);
        let ordernums=JSON.stringify(ordernum_arr);
        this.$router.push({ path: '/goods_order',query:{"type":1,"ordernum":ordernums} });
      },
      checkGoodsIn(ordernum){
        const senddata={
          "data":{
            "ordernum":ordernum,
//            "pay_price":50
          }
        };
        this.$http.post(service_url+'/o2o/shop/wx/toconfirmorder.do',senddata).then( (data)=> {
          if(data.body.status===0){
            this.dialog_title="恭喜";
            this.content="收货成功";
            this.confirm_show=true;
            for(let i=0;i<this.goodslist.length;i++){
              if(ordernum===this.goodslist[i].ordernum){
                this.goodslist[i].this_state="已收货";
              }
            }
          }else{
            this.dialog_title="提示";
            this.content=data.body.fields.error_reason;
            this.confirm_show=true;
          }
        })
      },
      goToEva(ordernum){
        this.$router.push({ path: '/goods_evaluate',query:{"type":1,"ordernum":ordernum} });
      },
      seeEva(ordernum){
        this.$router.push({ path: '/goods_evaluate',query:{"type":2,"ordernum":ordernum} });
      },
      get_list(){
        if(service_url){
          this.$http.get(service_url+'/o2o/shop/wx/orderlist.do').then( (data)=> {
            console.log(data);
            this.isLoading=false;
            if(data.body.status===0){
              this.goodslist=data.body.fields.orders;
              for(let i=0;i<this.goodslist.length;i++){
                this.goodslist[i].this_state=this.switchState(this.goodslist[i].state);
                this.goodslist[i].this_date=this.getLocalTime(this.goodslist[i].finallytime);
                this.goodslist[i].totalprices=0;
                this.goodslist[i].totalnum=0;
                for(let j=0;j<this.goodslist[i].goods.length;j++){
                  this.goodslist[i].totalprices+=this.goodslist[i].goods[j].price*this.goodslist[i].goods[j].num;
                  this.goodslist[i].totalnum+=this.goodslist[i].goods[j].num;
                }
              }
            }else{
              this.dialog_title="提示";
              this.content=data.body.fields.error_reason;
              this.confirm_show=true;
            }
          });
        }else{
          this.$http.get('/api/goodsOrderList').then((data) => {
              this.isLoading=false;
            this.goodslist=data.body.data;
            for(let i=0;i<this.goodslist.length;i++){
              this.goodslist[i].this_state=this.switchState(this.goodslist[i].state);
              this.goodslist[i].this_date=this.getLocalTime(this.goodslist[i].finallytime);
              this.goodslist[i].totalprices=0;
              this.goodslist[i].totalnum=0;
              for(let j=0;j<this.goodslist[i].goods.length;j++){
                this.goodslist[i].totalprices+=this.goodslist[i].goods[j].price*this.goodslist[i].goods[j].num;
                this.goodslist[i].totalnum+=this.goodslist[i].goods[j].num;
              }
            }
            console.log(this.goodslist);
          })
        }
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
        }
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      },
      delCollect(key){
        let self=this;
        const collectdata={
          "data":{
            goodsid:key
          }
        };
        this.$http.post(service_url+'/o2o/shop/wx/deletecollect.do',collectdata).then( (data)=> {
          if(data.body.status===0){
            this.dialog_title="恭喜";
            this.content="取消成功";
            this.confirm_show=true;
            for(let i=0;i<self.goodslist.length;i++){
              for(let j=0;j<self.goodslist[i].goods.length;j++){
                if(key===self.goodslist[i].goods[j].goods_id){
                  self.goodslist[i].goods.splice(j,1);
                  if(self.goodslist[i].goods.length===0){
                    self.goodslist.splice(i,1);
                  }
                }
              }
            }
          }else{
            this.dialog_title="提示";
            this.content=data.body.fields.error_reason;
            this.confirm_show=true;
          }
        });
      },
    }
  }
</script>
<style scoped>
  .text-right{
    text-align: right;
  }
  .float-right{
    float:right;
    font-size:14px;
  }
  .border_bottom_2{
    overflow: hidden;
    border-bottom: 1px solid #ececec;
    padding: 10px;
  }
  .border_bottom_1{
    border-bottom: 1px solid #ececec;
    padding: 5px 10px;
  }
</style>
