<template>
  <div class="header" id="header">
    <h1 class="title">XXX</h1>
    <span class="logo"></span>
    <ul class="header-ul">
      <li class="header-li"><router-link to="/index">首页</router-link></li>
      <li class="header-li"><router-link to="">海报</router-link></li>
      <li class="header-li"><router-link to="/poetCard">诗人</router-link></li>
      <li class="header-li"><router-link to="/poetryPage">𡬶诗</router-link></li>
      <li class="header-li"><router-link to="">XXX</router-link></li>
    </ul>
    <search-input/>
  </div>
</template>
<!--页头组件-->
<script>
import SearchInput from "@/components/search";
export default {

  name: "pageHeader",
  components: {SearchInput}
}
</script>

<style scoped>
.header {
  font-weight: bold;
  width: 100%;
  height: 80px;
  background-color: white;
  justify-content: space-between;
  vertical-align: bottom;
  min-width: 1535px;
  box-shadow: 0 0 5px #888;
  position: fixed;
  z-index: 10;
  top: 0;
}

.title {
  display: inline-block;
  height: 80px;
  line-height: 80px;
  vertical-align: bottom;
  margin-right: 300px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.header-ul {
  display: inline-block;
  height: 80px;
}

.header-li {
  width: 100px;
  height: 80px;
  display: inline-block;
  margin-right: 60px;
  line-height: 80px;
  font-size: 23px;
}

.header .logo {
  display: inline-block;
  height: 80px;
  width: 80px;
  margin-right: 100px;
  background-color: #ff0000;
  background-image: url(../assets/images/start.svg);
  background-repeat: no-repeat;
  background-position: center center;
  /*position: relative;*/
  /*left: -60px;*/
  /*bottom: 15px*/
}
</style>
