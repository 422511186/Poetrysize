<template>
  <div id="header" class="header">
    <div class="img"></div>
    <span class="Logo"></span>
    <search-input class="Input"></search-input>
  </div>
</template>

<script>
import SearchInput from "@/components/searchInput";

export default {
  name: "header-component",
  components: { SearchInput },
};
</script>

<style scoped>
.header {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 890px;

  overflow: hidden;
}

.Logo {
  display: inline-block;
  width: 450px;
  height: 150px;
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: url(../assets/images/logo.png);
  background-size: cover;
  background-repeat: no-repeat;
}

.Input {
  position: absolute;
  top: 350px;
}

.header .img {
  background-image: url(../assets/images/2.png);
  width: 100%;
  max-height: 100%;
  height: 890px;
  background-size: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: auto;
}
</style>
