<template>
    <div>
        <loading v-model="iisLoading" text="加载中"></loading>
        <div id="questionsurvey">
            <div class="myquestion_title" >{{questdata.title}}</div>
            <div class="myquestion_remark">{{questdata.remark}}</div>
            <group :title="item.title" v-for="(item,index) in questarr" :key="index">
                <!--<div v-html="item.title"></div>-->
                <!--<div style="padding: 3px 22px;color: #bbb;" v-if="item.remark">{{item.remark}}</div>-->
                <checklist class="slide"  :options="item.items" :max=1 v-model="item.select_or_answer" @on-change="change(index)" v-if="item.subject_type=='single'"></checklist>
                <div v-if="(item.subject_type=='single')&& (item.isdisplay=='0') && (item.allcount>0) && (ischoose===index)">
                    <cell :title="'选择题号为'+(oindex+1)+'的有: '+oitem"  primary="content" v-for="(oitem,oindex) in item.scount" :key="oindex" >
                        <range v-bind:value="oitem" :range-bar-height="8" :max="item.allcount" disabled></range>
                    </cell>
                </div>
                <checklist class="slide"  :options="item.items"  v-model="item.select_or_answer" @on-change="change(index)" v-if="item.subject_type=='multi'"></checklist>
                <!--<div v-if="(item.subject_type=='multi')&& (item.isdisplay=='0') && (item.allcount>0) && (ischoose===index)">
                    <cell :title="'选择题号为'+(oindex+1)+'的有: '+oitem"  primary="content" v-for="(oitem,oindex) in item.scount" key="oindex" >
                        <range v-bind:value="oitem" :range-bar-height="8" :max="item.allcount" disabled></range>
                    </cell>
                </div>-->
                <x-textarea :max="50" placeholder="请填写答案" v-model="item.select_or_answer" v-if="item.subject_type=='answer'"></x-textarea>
            </group>
            <group >

            </group>
            <!--<group title="填写申请描述">-->
                <!--<x-textarea :max="50" placeholder="请填写详细信息" v-model="affairdesc"></x-textarea>-->
            <!--</group>-->
            <div style="margin:20px 10px 10px" v-if="submitquestion"><x-button class="zj_button" type="primary" @click.native="submit">提交</x-button></div>
        </div>
        <alert v-model="confirm_show" :title="dialog_title"> {{content}}</alert>
    </div>
</template>
<style>
    #questionsurvey .weui-cells__title{font-size: 17px !important;}
    #questionsurvey .range-quantity { background-color: #ad7de7;}
</style>
<script>
    import Checklist from '../../components/checklist/index.vue';
    import {setTitle} from '@/common/js/common';
    import {XTextarea,Group,Cell,Loading,XButton,Range,Alert} from 'vux';
    import {mapState } from 'vuex'

    export default{
        data(){
        return{
            iisLoading:false,
            content:"",
            ischoose:-3,
            show_toast:false,
            toast_text:"保存成功",
            sel_choose_0:[],
            questdata:[],  //问卷基本内容
            questids:[],  //问卷所有题号id
            currentIndex:0,
            usertype:"",
            confirm_show:false,
            submitquestion:false,
            dialog_title:"",
            oquestionId:"",
            questarr:[], //问卷所有题目
        }
    },
    components:{
        Loading,Cell,Checklist,XTextarea,Group,XButton,Range,Alert
    },
    mounted(){
        this.iisLoading=true;
        setTitle("问卷调查");
        this.getquestionid();
        document.getElementById("index_loading").style.display="none";
    },
    methods:{
        change(index){
            this.ischoose=index
        },
        getquestionid(){
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
                if(data.body.code=="0"){
                    if(data.body.data.length>0){
                        this.oquestionId = data.body.data[0].questionId
                        self.get_all_question(data.body.data[0].questionId)
                    }else{
                        this.iisLoading=false;
                        self.content="当前无可填问卷";
                        self.dialog_title="注意";
                        self.confirm_show=true;
                    }
                }else{
                    self.content="访问失败";
                    self.dialog_title="注意";
                    self.confirm_show=true;

                }
            })
          }
        },
        get_all_question(oquestionId){
            this.iisLoading=true;
            let self = this;
            let items={
                "data": {
                    "vid":userProfile.vid,
                    "userid":userProfile.userid ,
                    "quest_id":oquestionId
                }
            };
            if(service_url){
                this.$http.post(service_url+"/o2o/question/wx/selectQuestionById",items).then((data)=>{
                    self.iisLoading=false;
                if(data.body.code=="0"){
                    self.questdata = data.body.data;
                    self.questids = data.body.data.items;
                    self.usertype = data.body.data.target;
                    self.get_single_question(data.body.data.quest_id,data.body.data.items)
//                    self.$router.replace({path:"code_share",query:{"id":data.body.id}});
                }else{
                    self.confirm_show=true;
                    self.content="访问失败";
                    self.dialog_title="注意";
                }
            })
            }else{
                self.iisLoading=false;
            }

        },
        get_single_question(quest_id,ids){

            if(this.currentIndex>=ids.length){
                return;
            }
            let items={
                "data": {
                    "vid":userProfile.vid, //姓名
                    "userid":userProfile.userid , //0男 1女
                    "quest_id":quest_id, //新手机
                    "subject_id":ids[this.currentIndex]
                }
            };
            if(service_url){
                this.$http.post(service_url+'/o2o/question/wx/selectSubjectById',items).then((data)=>{
                    this.iisLoading=false;
                    this.submitquestion=true;
                    this.currentIndex = this.currentIndex +1;
                    this.get_single_question(quest_id,ids);
                    if(data.body.code=="0"){
                        this.questarr.push(data.body.data)
                        console.log(this.questarr)
                        }else{
                            this.dialog_title="提示";
                            this.content=data.body.msg;
                            this.confirm_show=true;
                        }
                    })
            }
            document.getElementById("index_loading").style.display="none";
        },
        submit(){
            console.log(this.questarr)
            this.iisLoading=true;
            let items={
                "data": {
                    "vid":userProfile.vid, //姓名
                    "userid":userProfile.userid , //0男 1女
                    "quest_id":this.oquestionId, //新手机
                    "usertype":userProfile.atype,
                    "location":userProfile.houseid,
                    "subjects":this.questarr
                }
            };
            if(service_url){
                this.$http.post(service_url+'/o2o/question/wx/submitQuestion',items).then((data)=>{
                    this.iisLoading=false;
                    if(data.body.code==="0"){
                        alert("提交成功");
                        this.$router.replace({path:"/questionend"});
                    }else{
                        this.dialog_title="提示";
                        this.content=data.body.msg;
                        this.confirm_show=true;
                    }
            })
            }
            document.getElementById("index_loading").style.display="none";

        },
        go_back(){
            this.$router.go(-1);
        }

    }
    }
</script>

<style scoped>
    .demo4-item {
        background-color: rgba(221, 221, 221, 0.38);
        color: #222;
        font-size: 13px;
        padding: 5px 10px;
        margin-right: 10px;
        line-height: 16px;
        border-radius: 15px;
    }

    .demo4-item-selected {
        background-color: #FF3B3B;
        color: #fff;
    }
    .demo5-item {
        border: 1px solid #ad7de7;
        border-radius: 15px;
        padding: 5px 10px;
        margin-right: 10px;
        font-size: 13px;
        line-height: 16px;
    }
    .demo5-item-selected {
        /*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
        color:white;
        background-color:#ad7de7;
    }
    .myquestion_title{color:#333;text-align:center;font-size:16px;height:48px;line-height:56px;font-weight: 600;background-color: #fff;}
.myquestion_remark{color:#333;text-indent: 30px;padding: 2px 12px 6px 12px;background-color: #fff;}
</style>
