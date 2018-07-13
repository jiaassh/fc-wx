<!--缴费列表页，根据type拆分成-->
<template>
  <div>
    <div>
      <!--头部区域-->
      <div style="background-color:#ad7de7;padding:30px 15px 30px 15px">
        <div class="mp_color" style="margin-left: 3.1rem;width:3rem;float:left;text-align: center">{{this_text}}</div><div v-if="type===2" style="float:right;color:white"><div style="text-align: center;" @click="pay_all_over" class="mp_button">缴清欠费</div></div>
        <div class="mp_color" style="clear:both;text-align: center"><span style="font-size:30px;">￥{{total_price}}</span>元</div>
        <div class="mp_color" style="clear:both;text-align: center">{{'房屋：' + current_address}}</div>
        <div class = "mp_flex" v-if="type===1">
          <div class = "mp_flex_1" @click="pay_all"><div class="mp_button">缴清欠费</div></div>
          <div class = "mp_flex_1" @click="payWithMonth(6)"><div class="mp_button">预缴半年</div></div>
          <div class = "mp_flex_1" @click="payWithMonth(12)"><div class="mp_button">预缴一年</div></div>
        </div>
      </div>
      <!--列表区域-->
      <div style="margin:10px;" v-for="(item,index) in items" :key = "item">
        <x-table :cell-bordered="false" style="background-color:#fff;border-radius: 10px;box-shadow: 0 0 10px #ececec;">
          <thead>
          <tr>
            <th colspan="4" style="text-align: left;padding-left:10px;font-size:18px;color:#ad7de7;">{{item.title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>项目</td>
            <td>应缴日期</td>
            <td>应缴费用</td>
            <td>未缴费用</td>
          </tr>
          <tr v-for="list in item.price_list">
            <td>{{list.name}}</td>
            <td>{{list.date}}</td>
            <td>￥{{parseFloat(list.price).toFixed(2)}}</td>
            <td>￥{{parseFloat(list.unpaid).toFixed(2)}}</td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: right;padding-right:10px;color:red;">合计：￥{{parseFloat(item.total).toFixed(2)}}</td>
          </tr>
          </tbody>
        </x-table>

        <div v-if="index===0" style="text-align: center;padding:15px 80px 20px 80px;"><x-button  @click.native="go_pay(item.price_list,item.title,parseFloat(item.total).toFixed(2))" style="background-color:#ad7de7" type="primary">缴纳费用</x-button></div>
        <div v-if="index!==0" style="text-align: center;padding:15px 80px 20px 80px;"><x-button @click.native="cannot_in" style="background-color:#ad7de7" type="primary">缴纳费用</x-button></div>
      </div>
      <alert v-model="confirm_show" :title="dialog_title"> {{confirm_content}}</alert>
    </div>
    <loading v-model="isLoading" text="加载中"></loading>
  </div>
</template>

<script>
  import {setTitle} from '@/common/js/common';
  import {XTable,XButton,Alert,Loading} from 'vux';

  export default{
    data(){
      return{
        isLoading:true,
        total_price:"",
        items:[],
        overPay:[],
        overNums:0,
        confirm_show:false,
        confirm_content:"",
        dialog_title:"提示",
        this_text:"",
        current_address:"", //房屋地址
        type:0  //type:1 差所有物业缴费数据   type:2 只差欠费的记录
      }
    },
    components:{
      XTable,XButton,Alert,Loading
    },
    mounted(){
      setTitle("物业缴费");
      this.type = parseInt(this.$route.params.type);
      this.pay = parseFloat(this.$route.query.pay);
      this.type===1?setTitle("物业缴费"):setTitle("欠费");
      /*如果是物业缴费就再请求一次，去获取欠费的内容*/
      this.type===1&&this.get_over_pay();
      this.type===1?this.this_text="应缴费用合计":this.this_text="未缴费用合计";
      let self = this;
      if(service_url){
          this.$http.get(service_url+"/o2o/assetsv2/wx/my_paylist.do?type="+this.type).then((data)=>{
              this.isLoading = false
              if(data.body.status===0){
                /*获取列表和总价格*/
                self.total_price = data.body.data.total_price.toFixed(2);
                self.items = data.body.data.items;
              }else{
                this.confirm_show=true;
                this.confirm_content=data.body.msg;
              }
          });
        this.$http.get(service_url+"/o2o/common/wx/user_info").then((data)=>{
          if(data.body.status===0){
            self.current_address=data.body.current_address;
          }else{
            this.dialog_title="提示";
            this.content=data.body.error_reason;
            this.confirm_show=true;
          }
        });
      }else{
          this.$http.get("/api/my_paylist").then((data)=>{
            self.total_price = parseFloat(data.body.data.data.total_price).toFixed(2);
            self.items = data.body.data.data.items;
          })
      }
      document.getElementById("index_loading").style.display="none";
    },
    methods:{
      /*去支付 price_list为支付的列表  title是支付的名称   price是需要支付的总金额*/
      go_pay(price_list,title,price){
        let order_arr=[];
        // 将数组内的所有ordernum放入一个新数组作为参数穿给后台接口，用来生成支付的order_id
        for(let i in price_list){
          order_arr.push(price_list[i].ordernum);
        }
        const item ={
            ordernums:order_arr
        };
        this.$http.post(service_url+"/o2o-assetsv2-webAndroid/wx/detail/orderCreate",item).then((data)=>{
          if(data.body.status===0){
            /*order_id传入支付的order_id pay_type传入支付页的名称，pay_num传入支付的价格*/
            this.$router.push({path:"/wallet_pay",query:{order_id:data.body.data,type:2,pay_type:title,pay_num:price}});
          }else{
            this.confirm_show=true;
            this.confirm_content=data.body.msg;
          }
        });
      },
      /*限制函数，如果上个月没有支付就不能支付下个季度*/
      cannot_in(){
        this.confirm_show=true;
        this.confirm_content="您需要先缴纳上季度费用";
      },
      /*跳转到充值页面*/
      go_add(){
        this.$router.push({path:"/wallet_pay",query:{type:1,pay:this.pay}})
      },
      /*先缴清欠费才能进行半年支付和一年支付*/
      payWithMonth(month){
        if(this.overPay.length>0){
          this.confirm_show=true;
          this.confirm_content="请先缴清欠费";
          return;
        }
        /*获取未缴费的数据并判断*/
        this.$http.get(service_url+'/o2o-assetsv2-webAndroid/wx/detail/getAssetsCost?type='+month).then((data)=>{
          if(data.body.status===0){
            if(data.body.data.length===0||data.body.data[0].ordernum.length===0){
              this.confirm_show=true;
              this.confirm_content="暂无可预缴费用";
              return;
            }
            this.pay_price({ordernums: data.body.data[0].ordernum}, data.body.data[0].firstdate + '至' + data.body.data[0].lastdate, data.body.data[0].cost)
          }else{
            this.confirm_show=true;
            this.confirm_content="访问失败";
          }
        })
      },
      /*缴清欠费*/
      pay_all(){
        if(this.overPay.length>0){
          let order_arr=[];
          /*获取所有欠费数据的ordernum*/
          for(let i = 0; i < this.overPay.length; i++) {
            for(let j = 0; j < this.overPay[i].price_list.length; j++){
              order_arr.push(this.overPay[i].price_list[j].ordernum);
            }
          }
          const item ={
            ordernums:order_arr
          };
          this.$http.post(service_url+"/o2o-assetsv2-webAndroid/wx/detail/orderCreate",item).then((data)=>{
            if(data.body.status===0){
              this.$router.push({path:"/wallet_pay",query:{order_id:data.body.data,type:2,pay_type:'缴清欠费',pay_num:this.overNums}});
            }else{
              this.confirm_show=true;
              this.confirm_content="访问失败";
            }
          });
        }else {
          this.confirm_show=true;
          this.confirm_content="您暂无欠费";
        }
      },
      /*获取欠费数据*/
      get_over_pay(){
        this.$http.get(service_url+"/o2o/assetsv2/wx/my_paylist.do?type="+2).then((data)=>{
          if(data.body.status===0){
            this.overPay = data.body.data.items;
            this.overNums = data.body.data.total_price.toFixed(2);
          }else{
            this.confirm_show=true;
            this.confirm_content=data.body.msg;
          }
        });
      },
      /*缴清欠费*/
      pay_all_over(){
        if(this.items.length===0) {
          this.confirm_show = true;
          this.confirm_content = "您暂无欠费";
          return;
        }
        let order_arr=[];
        for(let i = 0; i < this.items.length; i++) {
          for(let j = 0; j < this.items[i].price_list.length; j++){
            order_arr.push(this.items[i].price_list[j].ordernum);
          }
        }
        this.pay_price({ordernums: order_arr}, '缴清欠费',this.total_price)
      },
      pay_price(item,title,price){
        this.$http.post(service_url+"/o2o-assetsv2-webAndroid/wx/detail/orderCreate",item).then((data)=>{
          if(data.body.status===0){
            this.$router.push({path:"/wallet_pay",query:{order_id:data.body.data,type:2,pay_type:title,pay_num:price}});
          }else{
            this.confirm_show=true;
            this.confirm_content="访问失败";
          }
        });
      }
    }
  }
</script>

<style scoped>
  .vux-table:after{
    border:0;
  }
  .mp_flex{
    display:flex;
    align-items:center;
    padding:10px 0;
    margin-top:10px;
    margin-bottom:-30px;
  }
  .mp_flex_1{
    flex:1;
    text-align:center;
  }
  .mp_flex_1:last-child{
    border:none;
  }
  .mp_button{
    display:inline-block;
    width:2rem;
    font-size:.4rem;
    background-color:white;
    padding:5px;
    color:#ad7de7;
    border-radius:5px;
  }
  .mp_button:active{
    color:#d9d9d9;
    background-color:rgba(94, 73, 120, 1);
  }
  .mp_color{
    color: white;
  }
</style>
