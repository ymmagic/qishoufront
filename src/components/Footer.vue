<template>
  <div>
	<!--底部选项卡-->
   <div class="mui-content">
			<div class="footer">
				<ul>
          <router-link :to="{path:'/index/content1'}" @click.native="touch1"><li>
							<img :src="src1" />
							<p :class="{active:qisActive}">抢单</p>
						</li>
            </router-link>
          <router-link :to="{path:'/index/content2'}" @click.native="touch2" ><li >
							<img :src="src2" />
							<p :class="{active:pisActive}">配送中</p>
						</li>
            </router-link>
          <router-link :to="{path:'/index/content3'}" @click.native="touch3"><li>
							<img :src="src3" />
							<p :class="{active:wisActive}">我的</p>
						</li>
            </router-link>
				</ul>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      src1:"../../static/img/order2.png",
      src2:"../../static/img/transport1.png",
      src3:"../../static/img/my1.png",
      qisActive:true,
      pisActive:false,
      wisActive:false
    }
  },methods :{
    touch1(){
      this.src1="../../static/img/order2.png"
      this.src2="../../static/img/transport1.png";
      this.src3="../../static/img/my1.png"
      this.pisActive=false;
      this.qisActive=true;
      this.wisActive=false;
    },
     touch2(){
      this.src1="../../static/img/order1.png"
      this.src2="../../static/img/transport2.png";
      this.src3="../../static/img/my1.png"
      this.pisActive=true;
      this.qisActive=false;
      this.wisActive=false;
    },
     touch3(){
      this.src1="../../static/img/order1.png"
      this.src2="../../static/img/transport1.png";
      this.src3="../../static/img/my2.png"
      this.pisActive=false;
      this.qisActive=false;
      this.wisActive=true;
    },
  }
};
</script>

<style scoped>
@import "../../static/css/my-css.css";
@import "../../static/fonts/my-font.css";
@import "../../static/css/reset.css";
</style>
