<template>
  <div class="footerBox">
    <div class="footer">
      <div class="left">
        <h1 id="about-us">关于我们</h1>
        <p style="line-height: 22px">{{ introduce }}</p>
      </div>

      <div class="develop" style="transform: translateX(70%)">
        <h1>开发人员</h1>
        <ul style="margin-left: 2.5em">
          <li style="padding: 8px">
            <i class="uImg u2"></i>
            <span style="font-size: 18px">靠谱</span>
          </li>
          <li style="padding: 8px">
            <i class="uImg u1"></i>
            <span style="font-size: 18px">大师说我有佛根</span>
          </li>
          <li style="padding: 8px">
            <i class="uImg u3"></i>
            <span style="font-size: 18px">救救我的数学</span>
          </li>
        </ul>
      </div>
      <div class="develop">
        <h1>特别鸣谢</h1>
        <ul style="margin-left: 2.5em">
          <li style="padding: 8px">
            <i class="uImg u4"></i>
            <span style="font-size: 18px">治愈系恶人</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<!--页脚-->
<script>
export default {
  name: "footerBox",
  data() {
    return {
      p1: "XXX",
      p2: "XXX",
      p3: "XXX",
      introduce: `
      诗间方寸是一个综合性的诗词网站，拥有巨量的诗词数据，在这里你可以找到任意一篇你喜欢的诗词。同时AI作诗也是我们的特点之一，你不仅可以在这里饱览群诗，还可以通过AI做出韵律诗以及藏头诗。我们也提供了一些对战游戏: AI对诗、 玩家对战，可以在放松当同时检验自己的诗词积累量。在这里，你还可以通过选择合适的字体与背景图片，将你喜欢的诗词变成一张精美的海报。最后，我们还提供了诗歌起名功能，在你起名的时候给你提供富有诗意的灵感。
      `
    };
  },
};
</script>

<style scoped>
.footerBox {
  color: #eeeeee;
  position: relative;
  background-color: rgb(145, 109, 65);
  /*font-family: "font2", serif;*/
  font-weight: 100;
  font-family: "1", serif;
}

.footer {
  margin: 0 auto;
  width: 80%;
  position: relative;
  min-width: 1000px;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
  /*justify-content: space-around;*/
}

.footerBox h2,
.footerBox h1 {
  text-align: left;
  margin-bottom: 10px;
}

.develop {
  /*width: 400px;*/
  font-size: 22px;
  padding: 20px;
}

.develop li {

  text-align: left;
  padding-left: 2em;
  list-style: none;
}

.footer .left {
  font-size: 18px;
  text-align: left;
  width: 500px;
  padding: 20px;
  display: flex;
}

.left p {
  margin-top: 20px;
  margin-left: 2em;
  text-indent: 2em;
}

.uImg {
  display: inline-block;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  /*background-image: url("../assets/images/20220402103911.jpg");*/
  background-size: 100%;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 10px;
}

.u1 {
  background-image: url("../assets/images/20220402103911.jpg");
}

.u2 {
  background-image: url("../assets/images/wyy.jpg");
}

.u3 {
  background-image: url("../assets/images/yxy.jpg");
}

#about-us {
  display: inline-block;
  writing-mode: vertical-rl;
  font-size: 48px;
}

.u4 {
  background-image: url("../assets/images/dimei.jpg");
}
</style>
