<template>
  <div class="swiper" id="swiper">
    <el-carousel height=600px indicator-position="none" interval=2000 width=50%  arrow="hover">
      <el-carousel-item v-for="item in imgs" :key="item">
        <el-image  class="swiper_img" :src="item"> </el-image>
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
      Primary: 'qqq',
      imgs: [
        // 'http://106.55.53.162/static/l2.png',
        // 'http://106.55.53.162/static/l3.png',
        // 'http://106.55.53.162/static/l4.png',
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
  margin: 120px auto;
  height: 600px;
  width: 1535px;
  border-radius: 30px;
}

.swiper_img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 30px;
}

</style>
