<template>
  <div class="footerBox">
    <div class="footer">
      <div class="left">
        <h1 id="about-us">关于我们</h1>
        <p style="line-height: 22px">{{ introduce }}</p>
      </div>

      <div class="develop" style="margin-right: -200px">
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
      introduce:
          // "诗间方寸是一个综合性的诗词网站，拥有巨量的诗词数据，在这里你可以找到任意一篇你喜欢的诗词。" +
          // "同时AI作诗也是我们的特点之一，你不仅可以在这里饱览群诗，还可以通过AI做出韵律诗以及藏头诗。" +
          // "我们也提供了一些对战游戏: AI对诗、 玩家对战，可以在放松的同时，检验自己的诗词积累量。" +
          // " 在这里，你还可以通过选择合适的字体与背景图片，将你喜欢的诗词变成一张精美的海报。" +
          // "最后，我们还提供了诗歌起名功能，在你起名的时候给你提供富有诗意的灵感。"
      `诗间方寸是由三个对诗歌有着极大兴趣的大学生所开发。自从进入大学以来，我们虽对诗歌有着极大的兴趣，但是我们却很少有机会再与诗歌接触。
      经过调研，我们发现这种情况不仅仅发生在我们身上，大部分的大学生乃至大部分的人在高中毕业之后与诗歌接触的概率几乎零。
      机缘巧合之下，一个AI作诗的视频激发了我们的灵感，于是我们开发了诗间方寸这一网站，在这里你既能欣赏万篇诗歌、还可以制作精美的海报、甚至可以与AI大战三百场。
      开发诗间方寸的目的是期望提供一个有趣的平台，激发古典诗词的时代魅力，让更多的人能够感受中国传统诗词的乐趣，为中华民族文化传承与发展出力。`
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
