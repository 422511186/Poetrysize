<template>
  <!-- 灯笼主要区域 -->
  <div class="lantern-light">
    <!-- 灯笼穗 -->
    <div class="lantern-tassel-top">
      <div class="lantern-tassel-middle"></div>
      <div class="lantern-tassel-bottom"></div>
    </div>
  </div>
</template>
<!--灯笼组件-->
<script>
export default {
name: "lanternCard",
 props: {
   text: String
 },
}
</script>

<style scoped>
/* 灯笼中间红色区域 */
.lantern-light {
  position: relative;
  width: 120px;
  height: 90px;
  background-color: #ff0000;
  opacity: 0.5;
  margin: 30px;
  border-radius: 50%;
  box-shadow: -5px 5px 50px 4px #fa6c00;
  /* 设置旋转点 */
  transform-origin: top center;
  animation: swing 3s infinite ease-in-out;
}

/* 灯笼顶部和底部的样式 */
.lantern-light::before,
.lantern-light::after {
  content: '';
  position: absolute;
  border: 1px solid #dc8f03;
  width: 60px;
  height: 12px;
  /* 背景渐变 */
  background: linear-gradient(
      to right,
      #dc8f03,
      #ffa500,
      #dc8f03,
      #ffa500,
      #dc8f03
  );
  left: 30px;
}

/* 顶部位置 */
.lantern-light::before {
  top: -7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

/* 底部位置 */
.lantern-light::after {
  bottom: -7px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* 灯笼的动画效果 */
@keyframes swing {
  0% {
    transform: rotate(-6deg);
  }

  50% {
    transform: rotate(6deg);
  }

  100% {
    transform: rotate(-6deg);
  }
}

/* 灯穗 */
.lantern-tassel-top {
  width: 5px;
  height: 20px;
  background-color: #ffa500;
  border-radius: 0 0 5px 5px;
  position: relative;
  margin: -5px 0 0 59px;
  /* 让灯穗也有一个动画效果 */
  animation: swing 3s infinite ease-in-out;
}

.lantern-tassel-middle,
.lantern-tassel-bottom {
  position: absolute;
  width: 10px;
  left: -2px;
}

.lantern-tassel-middle {
  border-radius: 50%;
  top: 14px;
  height: 10px;
  background-color: #dc8f03;
  z-index: 2;
}

.lantern-tassel-bottom {
  background-color: #ffa500;
  border-bottom-left-radius: 5px;
  height: 35px;
  top: 18px;
  z-index: 1;
}

</style>
