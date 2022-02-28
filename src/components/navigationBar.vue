<template>
  <div class="bar-root">
    <div class="bar-box">
      <ul class="bar-ul">
       <li class="bar-li" @click="goAnchor('swiper')">顶部</li>
       <li class="bar-li" @click="goAnchor('')">XX</li>
       <li class="bar-li" @click="goAnchor('')">XX</li>
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
  font-weight: bold;
  position: fixed;
  left: 10px;
  top: 300px;
  display: inline-block;
  width: 0;
  height: 80px;
  padding-left: 80px;
  border-radius: 40px;
  background-color: #801c1c;
  /*opacity: 0.4;*/
  line-height: 80px;
  color: #fff;
  text-align: left;
  transition: all .15s ease-in-out;
}

.bar-box:hover {
  border-radius: 0;
  height: 166px;
  width: 80px;
}

.bar-box:hover .bar-ul {
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
}

.bar-li:hover {
  background-color: #801c1c;
  opacity: 0.8;
  cursor: pointer;
  /*color: white;*/
}
</style>
