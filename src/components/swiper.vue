<template>
  <div class="swiper" id="swiper">
    <div class="swiper-mask"></div>
    <el-carousel height=600px indicator-position="none" interval=2000 width=50%  arrow="hover">
      <el-carousel-item v-for="item in 10" :key="item">
        <el-image  class="swiper_img" :src="url +item +'.jpg' "> </el-image>
<!--        <div :style="{' background-image': 'url(\'http://localhost:5000/1.jpg\')',}"></div>-->
<!--        <img class="swiper_img" :src="item" alt="#">-->
      </el-carousel-item>
    </el-carousel>
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
      url:'http://localhost:5000/',

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

  width: 100%;
  max-width: 3200px;
  min-width: 1000px;
}

.swiper_img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.swiper-mask {
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(to bottom, transparent, rgb(246, 239, 231));
  background-size: 100%;
  width: 100%;
  height: 150px;
  z-index: 10;
}
</style>
