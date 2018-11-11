<template>
  <div>
<header class="mui-bar mui-bar-nav my-bar">
			<h1 class="mui-title">个人信息</h1>
			<a  class="mui-icon mui-icon-gear mui-pull-right" @click="myset"></a>
		</header>
		<div class="mui-content">
			<div class="order">
				<div class="my-info">
					<img src="../../static/img/touxiang.jpg"/>
					<p>{{details[0].NAME}}</p>
				</div>
				<div class="order-info">
					<div class="distance">
						<ul style="display: flex;">
							<li @click="todayc">
								<p style="height:20px">{{details[0].ORDER_TODAY}}</p>
								<span>今日完成</span>
							</li>
							<li >
								<a >
									<p>100%</p>
									<span>好评率</span>
								</a>
							</li>
							<li>
								<p>{{details[0].AVGTIMEDAY|formattime}}</p>
								<span>今日平均送达</span>
							</li>
						</ul>
						<ul style="display: flex;" class="bor-b-no">
							<li @click="wholec">
								<p style="height:20px" >{{details[0].ORDER_WHOLE}}</p>
								<span>总订单数</span>
							</li>
							<li >
								<p>100%</p>
								<span>总好评率</span>
							</li>
							<li>
								<p>{{details[0].AVGTIMEWHOLE|formattime}}</p>
								<span>总平均送达</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</div>
  </div>
</template>

<script>
import storage from '../model/storage.js';
import {formatDate} from '../model/date.js';
export default {
  data() {
    return {
      details:[0],
      sendday:"",
      addr:"",
      id:"",
      time:"",
      proc1:"y_qishou.personinfo",
      json:"",
      proc2:"y_qishou.robbooking"
    };
  },
  filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
            //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
        },
        formatsendday(num){
             if(num==="0"){
               return `今日送`;
             }else{
               return `明日送`;
             }
        },
         formatpercent(num){
             if (String(num).indexOf(".")>-1){
               return `${num*100}%`;
             }
        },
         formattime(num){
             if(num===undefined||num===null){
               return `30分钟`;
             }else{
                let re = /^[0-9]+.?[0-9]* /;
               if (!re.test(num)){
               return `${num}分钟`;
             }
             }
        },
    },
  methods: {
   myset() {
      this.$router.replace({ path: "/index/content5"});
    },
    wholec(){
      this.$router.replace({ path: "/index/content6",query:{para:0}});
    },
    todayc(){
      this.$router.replace({ path: "/index/content6",query:{para:1}});
    }

}, async mounted() {
      //let userid=this.$store.state.user;
	    let userid=storage.get('userid');
      this.details = (await this.axios.get(`/my/${this.proc1}/${userid}`)).data;
    }};
</script>


<style scoped>

</style>
