<template>
  <div class="drop-shadow ">
      <!--    <span class="top-two"></span>-->
<!--      <span class="top-one"></span>-->
      <h2 class="title">{{ main_body.title }}</h2>
      <h4 class="poet">{{ main_body.poet }}</h4>
      <p v-for="item in main_body.body" :key="item">{{ item }}</p>
    </div>
</template>
<!--诗歌卡片-->
<script>
export default {
  name: "poetryCard",
  components: {},
  props: {
    main_body: Object
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

.drop-shadow {
  font-family: "Microsoft YaHei",serif;
  margin: 120px auto;
  /*border: #a56c6c 3px solid;*/
  border-radius: 10px;
  position: relative;
  width: 40%;
  max-width: 70%;
  padding: 2em;
  text-align: center;
  background-color: rgb(240, 239, 226);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-image: url(../assets/images/bgi1.jpg);
  /*object-fit: cover;*/
  background-position: center center;
  background-size: cover;
  /*height: 140px;*/
  /*writing-mode: vertical-lr;!*从左向右 从右向左是 writing-mode: vertical-rl;*!*/
  /*writing-mode: tb-rl;!*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*!*/
}


.top-one {
  width: 20px;
  height: 50px;
  display: inline-block;
  position: absolute;
  top: -40px;
  left: 50%;
  background-color: #801c1c;
  border-radius: 3px;
}

.drop-shadow  .title{
  margin-bottom: 10px;
  letter-spacing: 3px;
}
.drop-shadow  .poet{
  margin-bottom: 10px;
  letter-spacing: 3px;
  /*text-indent: 1.5em;*/
}

.drop-shadow p {
  line-height: 30px;
  letter-spacing: 3px;
}
</style>
