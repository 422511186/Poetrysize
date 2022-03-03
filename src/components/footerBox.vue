<template>
  <div class="footerBox">
    <div class="logo"></div>
    <div class="footer">
      <div class="left">
        <h1 id="about-us">关于我们</h1>
        <p>
          在现代 UI 开发中，我们发现与其将代码库划分为三个相互交织的巨大层，不如将它们划分为松散耦合的组件并进行组合更有意义。在组件内部，它的模板、逻辑和样式是内在耦合的，将它们搭配起来实际上可以使组件更具凝聚力和可维护性。
          注意，即使不喜欢单文件组件的想法，仍然可以通过使用 src 导入 将 JavaScript 与 CSS 分离到单独的文件中来利用其热重载和预编译功能。
        </p>
      </div>
      <div class="develop">
        <h2>开发人员</h2>
        <ul>
          <li>前端:p1</li>
          <li>后端:p2</li>
          <li>UI设计与素材收集:p3</li>
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
      p1: ['hzy'],
      p2: ['wyy'],
      p3: ['yxy'],
    }
  }

}

</script>

<style scoped>
.footerBox {
  position: relative;
  height: 300px;
  background-color: #586079;
  font-family: "Microsoft YaHei", serif;
}

.footer {
  /*margin: 0 auto;*/
  float: right;
  height: 300px;
  width: 50%;

  position: relative;
  min-width: 1000px;
}

h2 {
  text-align: left;
}

.develop {
  height: 70%;
  width: 400px;
  font-size: 18px;
  font-family: "Century Schoolbook", serif;
  color: wheat;
  padding: 20px;
  position: absolute;
  top: 30px;
  right: 30px;
}

.develop li {
  text-align: left;
  padding-left: 2em;
}

.footer .left {
  text-align: left;
  height: 70%;
  width: 400px;
  padding: 20px;
  position: absolute;
  top: 30px;
  left: 30px;
  /*background-color: #eeee;*/
  color: wheat;
}

.left p {
  margin-left: 2em;
  text-indent: 2em;
}

.logo {
  height: 100%;
  width: 300px;
  display: inline-block;
  background-image: url(../assets/images/start.svg);
  background-repeat: no-repeat;
}
</style>
