<template>
  <div>
<header class="mui-bar mui-bar-nav">
			<a @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">{{title|formattitle}}</h1>
		</header>
		<div class="mui-content">

			<div class="order">
				<div class="order-info" v-for="(detail,index) in json" :key="index">
						<p style="text-align:left">订单号：<span>{{detail.ORDER_ID}}</span></p>
						<p style="text-align:left">下单时间: {{detail.TIME|formatDate}}</p>
						<p style="text-align:left">配送时间: <span>{{detail.SENDDAY|formatsendday}}</span></p>
						<p style="text-align:left">顾客姓名: <span>{{detail.USERNAME}}</span></p>
						<p style="text-align:left">配送地址: <span>{{detail.ADDR}}</span></p>
						<p style="text-align:left">顾客电话: <span>{{detail.USERPHONE}}</span></p>

				</div>
			</div>

		
			</div>
  </div>
</template>

<script>
import {formatDate} from '../model/date.js';
import storage from '../model/storage.js';
  export default {
    data(){
      return{
        proc:"y_qishou.booking",
        json:[0],
        title:""
      }
    },
     filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
            //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
        },
        formatsendday(num){
                if (num === "0") {
	
        return `今日送`;
      } else if(num === "1") {
	   
        return `明日送`;
      }else if(num === "2"){
       
         return `即时送`;
      }
        },
        formattitle(num){
             if(num==="0"){
               return `今日已完成订单`;
             }else{
               return `全部订单`;
             }
        },
    },
   methods:{
     back(){
        this.$router.replace({ path: "/index/content3"});
     }
   }, async mounted(){
     //let userid=this.$store.state.user;
	   let userid=storage.get('userid');
     this.title= this.$route.query.para;
     let para = this.$route.query.para;
     this.json =(await this.axios.get(`/booking/${this.proc}/${userid}/${para}`)).data;
    //  layui.use(['rate'], function() {
		// 	var rate = layui.rate;
		// 	//显示文字
		// 	 rate.render({
		// 	    elem: '#test9'
		// 	    ,value: 5
		// 	    ,readonly: true
		// 	  });
		// });
   }
  }
</script>

<style scoped>
@import "../../static/layui/css/layui.css";
</style>
