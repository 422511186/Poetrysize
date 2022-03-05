<template>
  <div class="swiper" id="swiper">
    <div class="swiper-mask"></div>
<!--    <el-carousel class="swiper-box" height="600px" indicator-position="none" interval=2000 width=100% arrow="hover">-->
<!--      <el-carousel-item v-for="item in [3]" :key="item">-->
<!--        <el-image class="swiper_img" :src="url +item +'.jpg' "></el-image>-->
                    <div class="xxx"></div>
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
  </div>
</template>
<!--轮播图组件-->
<script>
export default {
  name: 'mySwiper',
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      /**
       * oss服务器ip地址
       */
      url: 'http://localhost:5000/',

      imgs: [
        'http://localhost:5000/0.jpg',
        'http://localhost:5000/1.jpg',
        'http://localhost:5000/22.jpg',
        'http://localhost:5000/26.jpg',
      ]
    }
  },

  methods: {
    x() {
      console.log(this);
      this.$router.push('/index')
    }
  },
}

</script>

<style scoped>

.swiper {
  margin: 0 auto;
  position: relative;
  width: 100% !important;
  max-height: 100%;
  overflow: hidden;
}

.swiper_img {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  /*height: 800px;*/
  /*position: absolute;*/
  /*bottom: -35%;*/
  /*left: 0;*/
  /*overflow: hidden;*/
}

.swiper-mask {
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(to bottom, transparent, rgb(246, 239, 231));
  background-size: 100% auto;
  width: 100%;
  height: 150px;
  z-index: 10;
}

/*.swiper-box {*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 600px;*/
/*  overflow: hidden;*/
/*}*/

.xxx {
  background-image: url(../assets/images/2.jpg);
  width: 100%;
  height: 600px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 50%;
  /*overflow: hidden;*/
}
</style>
