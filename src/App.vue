<!--suppress CssUnknownTarget -->
<template>
  <div id="root">
    <!--    <router-view></router-view>-->
    <div class="index-box">
      <div class="mask"></div>

      <header-component></header-component>

      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <footer-box style="z-index: 1"></footer-box>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/header";
import FooterBox from "@/components/footerBox";

export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: {FooterBox, HeaderComponent},
  mounted() {

  },
};
</script>

<style>
@import "assets/font/font.css";


* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

#root {
  font-family: font7, "Microsoft YaHei", serif;
  font-weight: 400;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1400px;
}

.index-box {
  position: relative;
  background-image: url(./assets/images/bg0.png);
  object-fit: cover;
}

.mask {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255,255,255,.5);
}


.component-fade-enter-active,
.component-fade-leave-active {
  transition: all .5s linear;
}

.component-fade-enter-from,
.component-fade-leave-to {
  /*opacity: 0;*/
  transform: rotateY(90deg);
}


</style>
