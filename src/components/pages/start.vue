<template>
    <div class="a">
      <div class="b"></div>
      <div class="c"></div>
      <div class="d"></div>
      <div class="e"></div>
      <p class="f" @click="toIndex">LOGO</p>
    </div>
</template>

<script>
export default {
name: "startX",
  methods:{
    toIndex(){
      this.$router.push('/index')
    }
  }
}
</script>

<style scoped>

.a {
  text-align: left;
  position: relative;
  height: 100%;
  width: 100%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url("../../assets/images/7.jpg");
  object-fit: cover;
}

.b,
.c,
.d,
.e {
  position: absolute;
  height: 100%;
  width: 100%;
  /* 设置阴影 */
  filter: drop-shadow(4px 4px 12px rgba(0, 0, 0, .5));
  background-size: cover;
  opacity: .8;
  transition: 1.5s;
}

.b::after,
.c::after,
.d::after,
.e::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/7.jpg");
  object-fit: cover;
  background-size: cover;
}

.b {
  left: -40%;
  transform: rotateZ(100deg);
  overflow: hidden;
}

.b::after {
  /*transform: rotateZ(-100deg);*/
}

.c {
  left: -40%;
  transform: rotateZ(-100deg);
  overflow: hidden;
}

.c::after {
  transform: rotateZ(100deg);
}

.d {
  right: -40%;
  transform: rotateZ(105deg);
  overflow: hidden;
}

.d::after {
  transform: rotateZ(-105deg);
}

.e {
  right: -40%;
  transform: rotateZ(-100deg);
  overflow: hidden;
}

.e::after {
  transform: rotateZ(100deg);
}

.f {
  opacity: 0;
  font: 900 50px '';
  /* 设置字体间距 */
  letter-spacing: 10px;
  color: rgb(60, 60, 70);
  transition: 1.5s;
}

/* 设置动画 */
.a:hover .b {
  left: -55%;
  opacity: 0.2;
}

.a:hover .c {
  left: -60%;
  opacity: 0.2;
}

.a:hover .d {
  right: -55%;
  opacity: 0.2;
}

.a:hover .e {
  right: -60%;
  opacity: 0.2;
}

.a:hover .f {
  opacity: 1;
  cursor: pointer;
}
</style>
