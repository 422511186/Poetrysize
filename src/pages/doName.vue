<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>

    <div class="title">
      <span class="name">{{ obj.name }}</span>
      <div class="args">
        <div class="verse" v-for="(it, index) in obj.cont" :key="index">
          {{ it }}
        </div>
        <div class="provenance" v-html="obj.fromPoet"></div>
      </div>
    </div>
    <button class="btn" @click="doName">
      <span class="text">一键生成</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "doName",
  data() {
    return {
      obj: {},
    };
  },
  methods: {
    doName() {
      this.$axios({
        url: "/api/recomName/",
        method: "get",
      }).then((res) => {
        let data = res.data.data[0];
        data.cont = data.cont.replaceAll("，", ".");
        data.cont = data.cont.replaceAll(",", ".");
        data.cont = data.cont.replaceAll("。", ".");
        data.cont = data.cont.replaceAll("？", ".");
        data.cont = data.cont.replaceAll("?", ".");
        data.cont = data.cont.replaceAll("!", ".");
        data.cont = data.cont.replaceAll("！", ".");
        data.cont = data.cont.replaceAll("；", ".");
        data.cont = data.cont.replaceAll(";", ".");
        data.cont = data.cont.split(".");
        data.fromPoet = data.fromPoet.replaceAll("――", "");
        data.fromPoet = data.fromPoet.replaceAll(
          "《",
          '<span style="text-orientation: sideways;">《</span> '
        );
        data.fromPoet = data.fromPoet.replaceAll(
          "》",
          '<span style="text-orientation: sideways;">》</span> '
        );
        this.obj = data;
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 1220px;
  height: 900px;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  position: relative;
  margin: -375px auto 100px;
}

.tag .Text {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
  /*float: right;*/
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
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.title {
  width: 1000px;
  height: 500px;
  background-color: #eeeeee;
  box-sizing: border-box;
  background-image: url(../assets/images/1111.jpg);
  background-size: cover;
  background-position: center center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.title {
  position: relative;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 30px;
}

.btn {
  position: absolute;
  left: 50%;
  bottom: 170px;
  transform: translate(-50%, 0);
}

.btn {
  width: 200px;
  padding: 15px;
}

.btn {
  cursor: pointer;
  border-radius: 30px;
  outline-style: none;
  border: none;
  background-color: rgb(61, 165, 238);
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn:focus {
}

.btn > .text {
  font-size: 18px;
  letter-spacing: 3px;
}

.name {
  font: 120px font5;
  position: absolute;
  top: 140px;
  right: 130px;
}

.verse {
  font-size: 36px;
}

.provenance {
  font-size: 24px;
  text-align: right;
  padding-bottom: 50px;
}

.args {
  height: 100%;
  font-family: font7, serif;
  font-weight: 400;
  writing-mode: vertical-rl;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 550px;
  line-height: 70px;
  text-align: center;
}
</style>
