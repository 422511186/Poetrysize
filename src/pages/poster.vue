<template>
  <div class="poster-box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>

    <div class="pre-view">
      <el-image
          v-loading="loading"
          :preview-src-list="[result]"
          :src="result"
          class="gif-img"
          fit="cover"
      >
        <template v-slot:error>
          <div>
            <img src="../assets/images/tip.gif" alt=""/>
          </div>
        </template>
        <template v-slot:placeholder>
          <div>
            <img src="../assets/images/tip.gif" alt=""/>
          </div>
        </template>
      </el-image>
    </div>



    <el-input v-model="value" class="input" placeholder="请输入诗句"></el-input>
    <div class="more">
      <el-select
          v-model="font.value"
          placeholder="字体"
          size="small"
          suffix-icon="none"
      >
        <el-option
            v-for="(item, index) in font.font_options"
            :class="fontClass[index]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="type.value"
          placeholder="横竖"
          size="small"
          suffix-icon="none"
      >
        <el-option
            v-for="item in type.type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-select
          v-model="g.value"
          placeholder="静动"
          size="small"
          suffix-icon="none"
      >
        <el-option
            v-for="item in g.type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <button class="btn" @click="load">
      <span class="text">一键生成</span>
    </button>
    <div class="dividing-line"></div>
    <div class="images-cards">
      <div
          v-for="(v, i) in 9"
          :key="i"
          :class="i === index ? 'selected' : ''"
          class="card"
      >
        <el-image
            :src="Url + v + '.jpg'"
            class="img"
            fit="cover"
            @click="fi(i)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "poster",
  data() {
    return {
      fontClass: ["font1", "font2", "font3", "font4"],
      index: 0,
      value: "",
      Url: "https://raw.githubusercontent.com/422511186/images/main/bgi/",
      result: "",
      loading: false,
      font: {
        value: 1,
        font_options: [
          {
            label: "字体1",
            value: 1,
          },
          {
            label: "字体2",
            value: 2,
          },
          {
            label: "字体3",
            value: 3,
          },
          {
            label: "字体4",
            value: 4,
          },
        ],
      }, //字体
      type: {
        value: 1,
        type_options: [
          {
            label: "横",
            value: 1,
          },
          {
            label: "竖",
            value: 2,
          },
        ],
      }, //横竖
      g: {
        value: 2,
        type_options: [
          {
            label: "动",
            value: 1,
          },
          {
            label: "静",
            value: 2,
          },
        ],
      }, //静动

    };
  },
  mounted() {

  },
  methods: {
    load() {
      let len = this.value.length;
      // eslint-disable-next-line no-unused-vars
      new Promise((resolve, reject) => {
        resolve(this.value.replaceAll(".", "。"));
      }).then((res) => {
        this.value = res;
      }).then(() => {
        if (this.value[len - 1] !== "。") {
          this.value = this.value + "。";
        }
      }).then(() => {
        this.loading = true;
        console.log(this.index)
        console.log(this.index + 1)
        this.$axios({
          url: "/api/gif/",
          method: "post",
          data: qs.stringify({
            fontID: this.font.value, //字体
            imgID: this.index + 1, //图片ID
            poem: this.value, //诗句
            type: this.type.value, //横竖
            isGif: this.g.value, //静动
          }),
          responseType: "blob",
        }).then((res) => {
          this.result = window.URL.createObjectURL(res.data);
          this.loading = false;

        });
      });
    },
    fi(i) {
      this.index = i;
    },
  },
};
</script>

<style scoped>
.poster-box {
  width: 1220px;
  background-color: rgba(255, 255, 255, 0.7);
}

.poster-box {
  position: relative;
  margin: -375px auto 100px;
  padding: 100px 0;
}

.tag .Text {
  /*font-family: "Microsoft YaHei", serif;*/
  /*font-weight: bold;*/
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

.pre-view {
  width: 1000px;
  /*height: 313px;*/
  /*background-color: #accfe0;*/
}

.pre-view {
  margin: 0 auto;
}

.pre-view .gif-img {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

div > .input >>> .el-input__inner {
  height: 60px;
  width: 800px;
  outline-style: none;
  font-size: 18px;
}

.input {
  margin-top: 60px;
  margin-left: 100px;
}

.images-cards {
  padding: 10px;
  margin: 100px auto 0;
  width: 1000px;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.images-cards > .card {
  box-sizing: border-box;
  padding: 15px;
  margin: 10px;
  text-align: center;
  border-radius: 9px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.selected {
  background-color: #eeeeee;
}

.images-cards::-webkit-scrollbar {
  width: 5px;
}

.images-cards::-webkit-scrollbar-track {
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.images-cards::-webkit-scrollbar-thumb {
  background-color: #cbc5c5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.more {
  height: 60px;
  width: 200px;
  /*background-color: red;*/
  position: absolute;
  right: 70px;
  transform: translateY(-60px);
  display: flex;
}

.fromHeader .el-select .el-input {
  border-color: #409eff;
}

div >>> .el-input__inner {
  margin-top: 15px;
  margin-right: 10px;
  height: 30px;
  width: 70px;
  font-size: 13px;
}

.btn {
  position: absolute;
  left: 940px;
  margin-top: 20px;
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
  background-color: rgb(93, 126, 131);
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn:active {
  background-color: orange;
}

.btn > .text {
  font-size: 18px;
  letter-spacing: 3px;
}

.dividing-line {
  width: 906px;
  height: 8px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 100px);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.font1 {
  font-family: "1", serif;
}

.font2 {
  font-family: "2", serif;
}

.font3 {
  font-family: "3", serif;
}

.font4 {
  font-family: "4", serif;
}
</style>
