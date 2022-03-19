<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">每日推荐</router-link></span>
      </div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>
    <div class="top-box" v-if="show">
      <div class="prev" @click="reduce"></div>
      <div class="next" @click="add"></div>
      <el-carousel height="400px"
                   indicator-position="none"
                   arrow="never"
                   :interval="5000"
                   @change="changeCampus"
                   ref="remarkCarusel"
      >
        <el-carousel-item v-for="item in poems" :key="item">
          <i class="type">{{ item.tag }}</i>
          <div class="poem">
            <div>
              <h1>--{{ item.name }}({{ item.poem }})</h1>
            </div>
            <p>{{ item.content }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <functions-component class="main"></functions-component>
  </div>

</template>
<!--    每日推荐-->
<script>
import DailyRecommendation from "@/components/dailyRecommendation";
import FunctionsComponent from "@/components/functions";

export default {
  name: "main-component",
  // eslint-disable-next-line vue/no-unused-components
  components: {FunctionsComponent, DailyRecommendation},
  watch: {
    index() {
      console.log(this.index);
      this.$refs.remarkCarusel.setActiveItem(this.index)
    }
  },

  mounted() {
    this.$axios({
      url: '/api/recommend/',
      method: "GET",
    }).then(res => {
      this.poems = res.data;
      this.show = true;
    }).catch(error => {
      console.log(error);
      this.show = true;
    })
  },

  data() {
    return {
      index: 0,
      poems: [
        {
          id: 512,
          name: "观田家",
          dynasty: null,
          poem: "韦应物",
          content: "微雨众卉新，一雷惊蛰始",
          tag: "惊蛰"
        }
      ],
      show: false,
    }
  },
  methods: {
    reduce() {
      if (this.index === 0)
        this.index = this.poems.length - 1;
      else
        this.index--;
    },
    add() {
      if (this.index === this.poems.length - 1)
        this.index = 0;
      else
        this.index++;
    },
    changeCampus(val) {
      this.index = val
    },
  },

};
</script>

<style scoped>
.box {
  width: 1220px;
  height: 1100px;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  position: relative;
  margin: -375px auto 200px;
}

.tag .Text {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
  float: right;
}

.tag,
.yuan {
  position: absolute;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
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
  top: 400px;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/分割线.png);
}


.img {
  width: 220px;
  height: 220px;
  position: absolute;
  top: 50%;
  transform: translate(130px, -220%);
  z-index: 11;
}

.top-box {
  height: 400px;
  width: 100%;
  position: relative;
}

.poem {
  width: 100%;
  height: 100%;
  font-family: "font2", serif;
  letter-spacing: 3px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  padding-top: 10px;
  overflow: hidden;
}

.poem div {
  position: absolute;
  right: 30px;
  bottom: 50px;
}

.poem h1 {
  font-weight: 400;
}

.poem p {
  width: 100%;
  font-size: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
}


.icons {
  height: 50px;
  width: 210px;
}

.icons {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
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
  background-image: url(../assets/images/上一首.svg);
}

.icon2 {
  width: 64px;
  height: 64px;
  background-size: 45px;
  background-image: url(../assets/images/播放.svg);
}

.icon3 {
  width: 18px;
  height: 50px;
  background-size: 18px;
  background-image: url(../assets/images/下一首.svg);
}

.ic {
  height: 50px;
  width: 160px;
}

.ic {
  position: absolute;
  top: 310px;
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
  background-image: url(../assets/images/收藏.svg);
}

.ic1:active {
  width: 32px;
  background-size: 32px;
}

.ic2 {
  background-image: url(../assets/images/分享.svg);
}

.ic2:active {
  width: 32px;
  background-size: 32px;
}

.main {
  position: absolute;
  top: 400px;
  margin-bottom: 100px;
}

.prev,
.next {
  position: absolute;
  /* 绝对定位的盒子垂直居中 */
  top: 50%;
  margin-top: -30px;
  /* 加了绝对定位的盒子可以直接设置高度和宽度 */
  width: 40px;
  height: 60px;
  text-decoration: none;
  line-height: 60px;
  cursor: pointer;
  z-index: 10;
}

.prev {
  left: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-image: url(../assets/images/上一张.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
}

.next {
  right: 0;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-image: url(../assets/images/下一张.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;

}


.type {
  position: relative;
  top: -100px;
}
</style>
