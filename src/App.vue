<template>
  <div id="root">
    <router-view/>
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

body {
  /*background-image: linear-gradient(to bottom, rgb(241, 231, 221), rgb(189, 203, 202));*/
  /*background-image: linear-gradient(to right, rgb(241, 231, 221), rgb(189, 203, 202));*/
  background-color: rgb(222, 221, 210);
  /*background-image: url(./assets/images/bgi.jpg);*/
  /*background-repeat: no-repeat;*/
  /*background-size: auto;*/
  font: 14px/1.5 Arial, sans-serif;
  font-weight: bold;
}

#root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
