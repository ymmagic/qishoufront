<template>
  <div>
  <header class="mui-bar mui-bar-nav">
			<a @click="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">设置</h1>
	</header>
	<div class="mui-content">
				<ul class="my-list">
						<li style="text-align: left;" @click="resetp">
								<i class="iconfont icon-chilun"></i> 修改密码
								<i class="iconfont icon-arrow mui-pull-right"></i>
						</li>
						<li style="text-align: left;" @click="out_sys" >
							<i class="iconfont icon-tuichufffpx"></i> 退出登录
							<i class="iconfont icon-arrow mui-pull-right"></i>
						</li>
				</ul>
  </div>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    methods:{
      resetp(){
        this.$router.replace({ path: "/resetpass"});
      },
       back(){
        this.$router.replace({ path: "/index/content3"});
      },
      out_sys(){
        MessageBox.confirm('确定执行此操作?').then(action => {
       this.$router.replace({ path: "/"});
      });
      }
    }

  }
</script>

<style scoped>

</style>
