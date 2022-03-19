<template>
  <div class="footerBox">
    <div class="footer">
      <div class="left">
        <h1 id="about-us">关于我们</h1>
        <p>
          在现代 UI
          开发中，我们发现与其将代码库划分为三个相互交织的巨大层，不如将它们划分为松散耦合的组件并进行组合更有意义。在组件内部，它的模板、逻辑和样式是内在耦合的，将它们搭配起来实际上可以使组件更具凝聚力和可维护性。
          注意，即使不喜欢单文件组件的想法，仍然可以通过使用 src 导入 将
          JavaScript 与 CSS 分离到单独的文件中来利用其热重载和预编译功能。
        </p>
      </div>

      <div class="develop">
        <h1>开发人员</h1>
        <ul>
          <li>前端:{{ p1 }}</li>
          <li>后端:{{ p2 }}</li>
          <li>UI设计与素材收集:{{ p3 }}</li>
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
      p1: ["XXX"],
      p2: ["XXX"],
      p3: ["XXX"],
    };
  },
};
</script>

<style scoped>
.footerBox {
  color: #eeeeee;
  position: relative;
  height: 240px;
  background-color: rgb(145, 109, 65);
  font-family: "font2", serif;
  font-weight: 100;
}

.footer {
  margin: 0 auto;
  width: 80%;
  position: relative;
  min-width: 1000px;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
}

.footerBox h2,
.footerBox h1 {
  text-align: left;
  margin-bottom: 10px;
}

.develop {
  width: 400px;
  font-size: 22px;
  padding: 20px;
}

.develop li {
  text-align: left;
  padding-left: 2em;
}

.footer .left {
  font-size: 18px;
  text-align: left;
  width: 500px;
  padding: 20px;
}

.left p {
  margin-left: 2em;
  text-indent: 2em;
}
</style>
