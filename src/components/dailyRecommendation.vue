<template>
  <div class="dailyRecommendation">
    <div class="dailyRecommendation-2"></div>
    <div class="dailyRecommendation-1">
      <div class="tag"><span class="Text">每日推荐</span></div>
      <i class="yuan"></i>
      <i class="dividing-line"></i>
      <div class="box">
        <div>
          <img alt="11" class="img" src="../assets/images/poetImg.png"/>
          <div class="ic">
            <i><span class="ic1"></span></i>
            <i><span class="ic2"></span></i>
          </div>
        </div>
        <div class="poem">
          <h1>独坐敬亭山</h1>
          <br/>
          <p>众鸟高飞尽,孤云独去闲。</p>
          <p>相看两不厌,只有敬亭山。</p>
        </div>
      </div>

      <div class="icons">
        <i><span class="icon1"></span></i>
        <i><span class="icon2"></span></i>
        <i><span class="icon3"></span></i>
      </div>
    </div>
  </div>
</template>
<!--每日推荐-->
<script>
export default {
  name: "dailyRecommendation",
  methods: {},
};
</script>

<style scoped>
.dailyRecommendation {
  position: relative;
  height: 400px;
}

.dailyRecommendation-1 {
  width: 1220px;
  height: 100%;
  position: relative;
  left: 50%;
  top: -200%;
  transform: translate(-50%, 0);
}

.dailyRecommendation .dailyRecommendation-1 .tag {
  width: 160px;
  height: 50px;
  background-color: #fff;
  opacity: 0.7;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, -100%);
  border-top-left-radius: 10px;
}

.yuan {
  width: 50px;
  height: 50px;
  background-color: #fff;
  opacity: 0.7;
  border-top-right-radius: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(160px, -100%);
}

.dailyRecommendation .dailyRecommendation-1 .tag .Text {
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
  float: right;
}

.dividing-line {
  width: 906px;
  height: 8px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.img {
  width: 220px;
  height: 220px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(130px, -65%);
  z-index: 11;
}

.dailyRecommendation-2 {
  width: 1220px;
  height: 100%;
  position: relative;
  left: 50%;
  top: -100%;
  transform: translate(-50%, 0);
  background-image: linear-gradient(to bottom, #ffffff, #ffffff);
  border-radius: 0 10px 0 0;
  opacity: 0.7;
}

.poem {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  position: absolute;
  letter-spacing: 3px;
  right: 170px;
  top: 70px;
}

.poem h1 {
  line-height: 80px;
}

.poem p {
  font-size: 24px;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  height: 50px;
  width: 210px;
}

.icons {
  position: absolute;
  right: 225px;
  bottom: 50px;
}

.icons {
  display: flex;
}

.icons > i {
  flex: 1;
}

.icons > i > span {
  cursor: pointer;
  display: inline-block;
  background-position: center center;
  background-repeat: no-repeat;
}

.icon1 {
  width: 18px;
  height: 50px;
  background-size: 18px;
  background-image: url(../assets/images/shanyisou.svg);
}

.icon2 {
  width: 30px;
  height: 50px;
  background-size: 30px;
  background-image: url(../assets/images/bofan.svg);
}

.icon3 {
  width: 18px;
  height: 50px;
  background-size: 18px;
  background-image: url(../assets/images/yixiasou.svg);
}

.ic {
  height: 50px;
  width: 160px;
}

.ic {
  position: absolute;
  top: 300px;
  left: 160px;
}

.ic {
  display: flex;
}

.ic > i {
  flex: 1;
}

.ic > i > span {
  cursor: pointer;
  display: inline-block;
  background-position: center center;
  background-repeat: no-repeat;
  width: 24px;
  height: 50px;
  background-size: 24px;
}

.ic1 {
  background-image: url(../assets/images/souchan.svg);
}

.ic1:active {
  width: 32px;
  background-size: 32px;
}

.ic2 {
  background-image: url(../assets/images/fenxian.svg);
}

.ic2:active {
  width: 32px;
  background-size: 32px;
}
</style>
