<template>
  <div class="Box">
    <h1 class="title">功能一览</h1>
    <div class="Cards">
      <div class="card card-margin">
        <img alt="" class="img" src="../assets/images/诗词入门.png" />
        <h1 class="function-text">诗词创作入门</h1>
      </div>

      <div class="card card-margin">
        <img alt="" class="img" src="../assets/images/文学常识.png" />
        <h1 class="function-text">文学常识大全</h1>
      </div>

      <div class="card card-margin">
        <img alt="" class="img" src="../assets/images/诗人.png" />
        <h1 class="function-text">诗人名录</h1>
      </div>

      <div class="card">
        <img alt="" class="img" src="../assets/images/起名.png" />
        <h1 class="function-text"><router-link to="/doName">含诗歌姓名生成</router-link></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footCards",
};
</script>

<style scoped>
.Box {
  font-family: font2, serif;
  height: 300px;
  position: relative;
  z-index: 1;
}

.Cards {
  margin: 0 auto;
  width: 1220px;
  height: 100%;
  display: flex;
}

.card {
  flex: 1;
}

.card-margin {
}

.img {
  width: 100%;
  object-fit: cover;
}

.function-text {
  font-weight: 400;
  cursor: pointer;
}

.title {
  font-family: "font2", serif;
  font-size: 40px;
  font-weight: 400;
  width: 1220px;
  position: relative;
  left: 50%;
  transform: translateX(-45%);
  text-align: left;
}
</style>
