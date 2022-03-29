<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">每日推荐</router-link></span>
      </div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>

    <div class="top-box">
      <div class="prev" @click="reduce"></div>
      <div class="next" @click="add"></div>

      <el-carousel
          height="300px"
          indicator-position="none"
          arrow="never"
          :interval="5000"
          @change="changeCampus"
          ref="remarkCarusel"
          v-if="show"
      >
        <el-carousel-item v-for="item in poems" :key="item">
          <div class="poem">
            <div>
              <h1>--{{ item.poem }}《{{ item.name }}》</h1>
            </div>
            <p>
              {{ item.content }}
            </p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--        <functions-component class="main"></functions-component>-->
    <nav class="main">
      <div class="left">
        <div class="card" @click="this.$router.push(`/forPoetry`)">
          <i class="ic1"></i>
          <div class="text">
            <h2>寻诗</h2>
            <!--            <span>Poetry Seeking</span>-->
          </div>
        </div>

        <div class="card" @click="this.$router.push(`/doPoems`)">
          <i class="ic2"></i>
          <div class="text">
            <h2>作诗</h2>
            <!--            <span>Poetry Making</span>-->
          </div>
        </div>

        <div class="card" @click="this.$router.push('/gameIndex')">
          <i class="battle-ic"></i>
          <div class="text">
            <h2>对战</h2>
            <!--            <span>Player Match &nbsp;</span>-->
          </div>
        </div>
      </div>

      <div class="right">
        <div>
          <router-link to="/aiToPoetry">
            <img
                class="img-1"
                src="../assets/images/9cc546f784ae5f63868b180e43f02a4.png"
                alt=""
            />
            <h2>AI对诗</h2>
          </router-link>
        </div>
        <div>
          <router-link to="/poster">
            <img
                class="img-1"
                src="../assets/images/8809c146eb1770d79f1df245c4ee29d.png"
                alt=""
            />
            <h2>海报生成</h2>
          </router-link>
        </div>
        <div>
          <router-link to="/poetsList">
            <img
                class="img-1"
                src="../assets/images/314e251f95cad1c89f5749113515d00cc83d51cc.png"
                alt=""
            />
            <h2>诗人名录</h2>
          </router-link>
        </div>
        <div>
          <router-link to="/doName">
            <img
                class="img-1"
                src="../assets/images/717fbc8fd7397febe946d28e876975a.png"
                alt=""
            />
            <h2>含诗歌姓名生成</h2>
          </router-link>
        </div>

      </div>
    </nav>
  </div>
</template>
<!--    每日推荐-->
<script>
export default {
  name: "main-component",

  watch: {
    index() {
      this.$refs.remarkCarusel.setActiveItem(this.index);
    },
  },

  mounted() {
    this.$axios({
      url: "/api/recommend/",
      method: "GET",
    }).then((res) => {
      this.poems = res.data;
      this.show = true;
    }).catch(() => {
      this.show = true;
    });
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
          tag: "惊蛰",
        },
      ],
      show: false,
    };
  },
  methods: {
    reduce() {
      if (this.index === 0) this.index = this.poems.length - 1;
      else this.index--;
    },
    add() {
      if (this.index === this.poems.length - 1) this.index = 0;
      else this.index++;
    },
    changeCampus(val) {
      this.index = val;
    },

    getPoem(index) {
      let poem = this.poems[index];
      let weather = ["雨", "雪", "晴", "风", "云"];
      if (weather.indexOf(poem.tag) === -1) return poem.content;
      return poem.content.substr(0, poem.content.indexOf("。") + 1);
    },
  },
};
</script>

<style scoped>
.box {
  width: 1220px;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  position: relative;
  margin: -375px auto 100px;
}

.tag .Text {
  /*font-family: "Microsoft YaHei", serif;*/
  /*font-weight: bold;*/
  font-size: 22px;
  line-height: 50px;
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
  top: 300px;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.top-box {
  height: 300px;
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

.icons > i {
  flex: 1;
}

.icons > i > span {
  cursor: pointer;
  display: inline-block;
  background-position: center center;
  background-repeat: no-repeat;
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

.prev,
.next {
  position: absolute;
  /* 绝对定位的盒子垂直居中 */
  top: 40%;
  margin-top: -30px;
  /* 加了绝对定位的盒子可以直接设置高度和宽度 */
  width: 40px;
  height: 60px;
  text-decoration: none;
  line-height: 60px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.prev {
  left: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-image: url(../assets/images/prev.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
}

.next {
  right: 0;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-image: url(../assets/images/next.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
}

.prev:hover, .next:hover {
  transform: scale(1.25);
}


.type {
  position: relative;
  top: -100px;
}

.main {
  height: 480px;
  /*padding: 100px 100px;*/
  padding: 50px 50px;
  display: flex;
}

.main .left {
  box-sizing: border-box;
  width: 370px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
}

.main .left > div {
  padding-left: 70px;
  padding-right: 70px;
  flex: 1;
}

.main .left > div:hover {
  background-color: #eeeeee;
}

.right {
  flex: 1;
  box-sizing: border-box;
}

.main .right > div {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  height: 240px;
  padding-left: 10px;
  padding-right: 10px;
}

.main .right .pointer:hover {
  cursor: pointer;
}

.left .card {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 2px inset #eeeeee;
}

.battle-ic {
  width: 65px;
  height: 70px;
  display: inline-block;
  background-image: url(../assets/images/yinhua.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 30%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.ic1 {
  width: 70px;
  height: 100px;
  display: inline-block;
  /*background-image: url(../assets/images/forPoems.png);*/
  background-image: url("../assets/images/meihua.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 30%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.ic2 {
  width: 70px;
  height: 70px;
  display: inline-block;
  background-image: url("../assets/images/san (2).svg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center 30%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.text {
  font-family: "font2", serif;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.text > span {
  line-height: 50px;
  font-size: 12px;
  font-weight: bolder;
  color: rgb(193, 189, 190);
}

.img-1 {
  width: 240px;
  height: 180px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all .35s;
}

.img-1:hover {
  transform: scale(1.05);
}

.right h2 {
  margin-top: 10px;
  font-weight: 400;
}

.left h2 {
  font-size: 50px;
  letter-spacing: 10px;
  font-weight: 400;
}
</style>
