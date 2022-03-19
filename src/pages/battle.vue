<template>
  <div class="box">
    <div>
      <div class="tag"><span class="Text"><router-link to="/">返回首页</router-link></span></div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>

  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
name: "battle"
}
</script>

<style scoped>


.box {
  width: 1220px;
  height: 500px;
  background-color: rgba(255, 255, 255, .7);

}

.box {
  position: relative;
  margin: -375px auto 100px;
}

.tag .Text {
  font-family: 'Microsoft YaHei', serif;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
  float: right;
}

.tag, .yuan {
  position: absolute;
  height: 50px;
  background-color: rgba(255, 255, 255, .7);
  opacity: 0.9;
  top: -50px;
}

.tag {
  width: 160px;
}

.yuan {
  width: 50px;
  left: 160px;
  border-top-right-radius: 100%;
}


.dividing-line {
  width: 906px;
  height: 8px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/分割线.png);
}

</style>