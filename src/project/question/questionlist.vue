<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <load-more v-if="questdata.length===0" :show-loading="false" tip="还有没有调查数据呢" background-color="#efeff4"></load-more>
    <div>
      <group gutter="10px" v-for="item in questdata" key="item">
        <cell>
          <div slot="icon">{{"【"+item.title+"】"}}</div>
          <div slot="value">
            <span style="color: #ad7de7">{{item.btime}}</span>
          </div>
        </cell>
        <cell-box>
          <div style="color:#484848">
            {{item.detaildesc.desc}}
          </div>
        </cell-box>
        <cell>
          <x-button mini plain type="primary" class="custom-primary-blue" @click.native="goDetail(item.questionId)">填写问卷</x-button>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/loading/dataLoading'
  import {Cell,CellBox,Group,XButton,LoadMore} from 'vux';
  import {setTitle} from '@/common/js/common';

  export default{
      data(){
          return {
            loading: true,
            questdata: []
          }
      },
      components:{
          Cell,CellBox,Group,Loading,XButton,LoadMore
      },
      mounted(){
        setTitle("我的服务");
        let self = this;
            let items={
                "data": {
                    "vid":userProfile.vid,
                    "userid":userProfile.userid ,
                    "usertype":"",
                    "location":userProfile.houseid
                }
            };
             if(service_url){
                this.$http.post(service_url+"/o2o/question/wx/selectQuestion",items).then((data)=>{
                if(data.code=="0"){
                    self.questdata = data.data
                }else{
                    // self.alert_show=true;
                    // self.content="访问失败";
                    // self.dialog_title="注意";
                }
            })
          }
       
        if(service_url){
          this.$http.get(service_url+"/o2o/common/service/mylist?nextdata=&vid="+userProfile.vid+"&openid="+userProfile.openid).then((data)=>{
            self.mysrlists=data.body.data;
          },()=>{
            console.log("请求失败");
          });
        }else{
          this.$http.get("/api/my_service").then((data)=>{
            self.mysrlists=data.body.data.data;
          })
        }
        document.getElementById("index_loading").style.display="none";
      },
      methods:{
        goDetail(questionId){
          this.$router.push({path:"questionsurvey",query:{"questionId":questionId}});
        }
      }
  }
</script>

<style scoped>
  .custom-primary-blue {
    border-color: #ad7de7 !important;
    color: #ad7de7 !important;
  }
  .custom-primary-blue:active {
    border-color: #bdaecf !important;
    color: #bdaecf !important;
    background-color: transparent;
  }
</style>
