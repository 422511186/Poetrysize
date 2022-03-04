<template>
  <div class="bar-root">
    <div class="bar-box">
      <ul class="bar-ul">
        <li class="bar-li" @click="goAnchor('swiper')">顶部</li>
        <li class="bar-li" @click="goAnchor('')">每日推荐</li>
        <li class="bar-li" @click="goAnchor('')">每日一遍</li>
        <li class="bar-li" @click="goAnchor('about-us')">关于我们</li>
      </ul>
    </div>
  </div>
</template>
<!--侧边导航栏-->
<script>
export default {
  name: "navigationBar",
  components: {},
  data() {
    return {}
  },
  methods: {
    goAnchor(id) {
      document.getElementById(id).scrollIntoView();
    }
  }
}
</script>
<style scoped>
.bar-box {
  float: right;
  margin-right: 100px;
  margin-top: 30px;
  display: inline-block;
  /*width: 80px;*/
  height: 80px;
  padding-left: 80px;
  border-radius: 8px;
  background-image: url(../assets/images/诗间方寸.png);
  background-size: 100%;
  background-position: center center;
  object-fit: cover;
  line-height: 80px;
  color: #fff;
  text-align: left;
  transition: all .15s ease-in-out;
}

.bar-box:hover {
  border-radius: 0;
  height: 166px;
  width: 80px;
  background-image: none;
}

.bar-box:hover .bar-ul {
  background-color: #801c1c;
  display: block;
}

.bar-ul {
  list-style: none;
  display: none;
}

.bar-li {
  width: 160px;
  height: 40px;
  line-height: 40px;
  position: relative;
  left: -80px;
  list-style: none;
  display: block;
  text-align: center;
  border-bottom: 2px solid rgb(72, 71, 69);
  background-color: #801c1c;
}

.bar-li:hover {
  cursor: pointer;
  color: white;
}

.bar-root {
  z-index: 10;
}

</style>
