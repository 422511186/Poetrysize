<!--suppress CssUnknownTarget -->
<template>
  <div id="root">
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  mounted() {

  }
}
</script>

<style>
@import "assets/font/font.css";

* {
  margin: 0;
  padding: 0;
}


a {
  text-decoration: none;
  color: black;;
}

ul {
  list-style: none;
}

#app {
  height: 100%;
  width: 100%;
}

html {
  height: 100%;
  width: 100%;
  min-width: 1230px;
}

body {
  height: 100%;
  width: 100%;
  background-color: rgb(222, 221, 210);
  /*background-image: url(./assets/images/bgi.jpg);*/
  /*background-repeat: no-repeat;*/
  /*background-size: auto;*/
  /*font-weight: bold;*/
}

#root {
  height: 100%;
  width: 100%;
  font-family: 'Regular',monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*.component-fade-enter-active,*/
/*.component-fade-leave-active {*/
/*  transition: all .5s ease;*/
/*}*/
/*.component-fade-enter-to {*/
/*  position: absolute;*/
/*  right: 0;*/
/*}*/
/*.component-fade-enter-from {*/
/*  position: absolute;*/
/*  right: -100%;*/
/*}*/
/*.component-fade-leave-to {*/
/*  position: absolute;*/
/*  left: -100%;*/
/*}*/
/*.component-fade-leave-from {*/
/*  position: absolute;*/
/*  left: 0;*/
/*}*/

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .35s linear;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}


</style>
