<template>
  <div>
    <div class="functions">
      <div class="tags">
        <h1>诗词分类</h1>
        <ul>
          <li class="tag" style="display: flex">
            <a v-for="(item, index) in tags[0]"
               :key="index"
               href="javaScript:void(0)"
               @click="clickTag(item)">{{ item }}</a>
          </li>

          <li class="tag" style="display: flex">
            <a v-for="(item, index) in tags[1]"
               :key="index"
               href="javaScript:void(0)"
               @click="clickTag(item)">{{ item }}</a>
          </li>
          <li class="tag" style="display: flex">
            <a v-for="(item, index) in tags[2]"
               :key="index"
               href="javaScript:void(0)"
               @click="clickTag(item)">{{ item }}</a>
          </li>
          <li class="tag" style="display: flex">
            <a v-for="(item, index) in tags[3]"
               :key="index"
               href="javaScript:void(0)"
               @click="clickTag(item)">{{ item }}</a>
          </li>
          <li class="tag" style="display: flex">
            <a v-for="(item, index) in tags[4]"
               :key="index"
               href="javaScript:void(0)"
               @click="clickTag(item)">{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="battle" @click="this.$router.push('/gameIndex')">
        <div class="text">
          <h2>游戏对战</h2>
          <span>Player Match</span>
        </div>
      </div>
      <div class="poster" @click="this.$router.push('/poster')">
        <div class="text">
          <h2>海报生成</h2>
          <span>Poster Generation</span>
        </div>
      </div>
    </div>
    <foot-cards></foot-cards>
  </div>
</template>

<script>
import FootCards from "@/components/footCards";

export default {
  name: "functions-component",
  // eslint-disable-next-line vue/no-unused-components
  components: {FootCards},
  data() {
    return {
      tags: [
        ["诗经", "楚辞", "乐府", "春天", "夏天", "秋天", "冬天"],
        ["写雨", "写雪", "写风", "写花", "梅花", "荷花", "菊花"],
        ["写山", "写水", "长江", "黄河", "儿童", "写鸟", "写马"],
        ["边塞", "地名", "节日", "春节", "元宵", "寒食", "清明"],
        ["中秋", "重阳", "怀古", "抒情", "爱国", "离别", "送别"],
      ],
    };
  },
  methods: {
    clickTag(value) {
      alert(value);
    },
  },
};
</script>

<style scoped>
.functions {
  box-sizing: border-box;
  width: 1220px;
  font-weight: bold;
  padding: 50px 50px 100px;
}

.functions {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.tags {
  height: 300px;
  width: 45%;
  display: inline-block;
  vertical-align: top;
}

.tags h1 {
  padding-left: 0;
  text-align: left;
  margin-bottom: 30px;
}

.tags ul {
  height: 80%;
  display: flex;
  flex-direction: column;
}

.tags ul li {
  flex: 1;
}

.battle {
  height: 300px;
  width: 25%;
  display: inline-block;
  background-image: url(../assets/images/对战图标.png);
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center 30%;
}

.battle {
  position: relative;
}

.battle:hover {
  background-color: rgb(236, 232, 233);
}

.poster {
  height: 300px;
  width: 25%;
  display: inline-block;
  background-image: url(../assets/images/海报图标.png);
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center 30%;
}

.poster {
  position: relative;
}

.poster:hover {
  background-color: rgb(236, 232, 233);
}

.tag a {
  flex: 1;
}

.text {
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.text h1,
.battle-text span {
  text-align: center;
}

.text > span {
  font-size: 12px;
  font-weight: bolder;
  color: rgb(193, 189, 190);
}
</style>
