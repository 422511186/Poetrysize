<template>
  <div class="header" id="header">
    <!--    <div class="mask"></div>-->
    <!--    <h1 class="title">XXX</h1>-->
    <span class="logo"></span>
    <ul class="header-ul">
      <li class="header-li">
        <router-link to="/index">首页</router-link>
      </li>
      <li class="header-li">
        <router-link to="">海报</router-link>
      </li>
      <li class="header-li">
        <router-link to="/poetCard">诗人</router-link>
      </li>
      <li class="header-li">
        <!--        𡬶-->
        <router-link to="/poetryPage">寻诗</router-link>
      </li>
      <li class="header-li">
        <router-link to="">XXX</router-link>
      </li>
    </ul>
    <!--    <search-input/>-->
  </div>
</template>
<!--页头组件-->
<script>
import SearchInput from "@/components/search";

export default {

  name: "pageHeader",
  // eslint-disable-next-line vue/no-unused-components
  components: {SearchInput}
}
</script>

<style scoped>
.header {
  position: relative;
  font-weight: 500;
  width: 100%;
  height: 80px;
  background-color: transparent;
  justify-content: space-between;
  vertical-align: bottom;
  z-index: 11;
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
  margin-right: 100px;
  line-height: 80px;
  font-size: 40px;
}

.header .logo {
  display: inline-block;
  height: 80px;
  width: 80px;
  margin-right: 100px;
  /*background-color: #eeee;*/
  background-image: url(../assets/images/logo.svg);
  background-repeat: no-repeat;
  background-position: center center;
  /*position: relative;*/
  /*left: -60px;*/
  /*bottom: 15px*/
}

.mask {
  z-index: -1;
  width: 100%;
  height: 80px;
  background-image: url(../assets/images/hbghi.jpg);
  object-fit: cover;
  background-position: 10px center;

  position: absolute;
  background-color: #fff;
  opacity: .7;

}
</style>
