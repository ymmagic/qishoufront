<template>
  <div>
	<header class="mui-bar mui-bar-nav">
			<a @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">订单详情</h1>
		</header>

		<div class="mui-content">

			<div class="order">

				<div class="order-info">
					<div class="order-details">
						<div class="dis-between details-info">
							<h4>订单信息</h4>
						</div>
						<div class="dis-between details-info">
							<p>订单编号</p>
							<p>{{id}}</p>
						</div>
						<div class="dis-between details-info">
							<p>下单时间</p>
							<p>{{time|formatDate}}</p>
						</div>
					</div>
					<div class="order-details" style="border-bottom: none;">
						<div class="dis-between details-info">
							<h4>商品信息</h4>
						</div>
						<div class="dis-between details-info" v-for="(detail,index) in details" :key="index">
							<p>{{detail.NAME}}</p>
							<p>{{detail.NUM|formatpro}}</p>
						</div>
						<div class="dis-between details-info">
							<p>总计 <span></span></p>
							<p>{{details[0].TOTAL|formattotal}}</p>
						</div>
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
      proc1:"y_qishou.detailinfo",
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
         formattotal(num){
             let re = /^[0-9]+.?[0-9]* /;
             if (!re.test(num)){
               return `${num}件商品`;
             }
        },
         formatpro(num){
             let re = /^[0-9]+.?[0-9]* /;
             if (!re.test(num)){
               return `${num}个`;
             }
        },
    },
  methods: {
   back() {
      this.$router.replace({ path: "/index/content2"});
    }

}, async mounted() {
      let type = this.$route.query.type;
      let order_id = this.$route.query.order_id.slice(16);
      this.id=this.$route.query.order_id;
      this.sendday = this.$route.query.sendday;
      this.addr = this.$route.query.addr;
      this.time = this.$route.query.time;
      this.details = (await this.axios.get(`/detail/${this.proc1}/${order_id}/${type}`)).data;
    }};
</script>



<style scoped>

</style>
