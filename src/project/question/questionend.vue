<template>
  <div>
    <!--<loading v-if="loading" style="text-align: center"></loading>-->
    <div>
       <div class="myquestionend">
         <img src="./question_end.png" style="vertical-align:middle;">
         <div style="padding: 10%;">问卷到此结束，感谢您的参与！</div>
         <x-button mini plain type="primary" class="custom-primary-blue" @click.native="goBack">返回首页</x-button>
       </div>

    </div>
  </div>
</template>

<script>
  import Loading from '@/components/loading/dataLoading';
  import {Cell,CellBox,Group,XButton,LoadMore} from 'vux';
  import {setTitle} from '@/common/js/common';

  export default{
      components:{
          Cell,CellBox,Group,Loading,XButton,LoadMore
      },
      mounted(){
        setTitle("问卷调查");
         document.getElementById("index_loading").style.display="none";
      },
      methods:{
        goBack(questionId){
          this.$router.go(-1);
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
  .myquestionend{
    text-align:center;
    padding: 20% 0;
  }
</style>
