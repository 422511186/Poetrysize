<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>
    <!-- 标题 -->
    <h1 class="title" id="title-for">寻诗</h1>
    <!--古诗分类标签-->
    <nav class="tags">
      <span
        class="item"
        v-for="(item, index) in tags"
        :key="index"
        :class="index === typeValue ? 'checked' : ''"
        @click="getPoemsBLabel(1, 5, index)"
      >
        {{ item }}
      </span>
    </nav>
    <!--搜索框-->
    <div class="input-btn">
      <el-input v-model="value" placeholder="Please input" />
      <button class="btn" @click="search">
        <span class="text">搜索</span>
      </button>
    </div>
    <!--寻诗结果分割线-->
    <div><i class="dividing-line" id="start"></i></div>
    <!--寻诗结果展示-->
    <div class="poems">
      <div class="drop-shadow" v-for="(item, index) in poety" :key="index">
        <h3 class="title">{{ item.name }}</h3>
        <h4 class="poet">{{ item["poet"] }}</h4>
        <p v-html="item.content"></p>
      </div>

      <div class="pagination">
        <el-pagination
          class="pagination-1"
          v-model:current-page="page"
          v-model:page-size="size"
          background
          layout="prev, pager, next"
          v-model:total="len"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forPoetry",

  data: function () {
    return {
      page: 1, //页码
      size: 5,
      value: "",
      tags: [
        "诗经",
        "楚辞",
        "乐府",
        "春天",
        "夏天",
        "秋天",
        "冬天",
        "写雨",
        "写风",
        "写花",
        "梅花",
        "荷花",
        "菊花",
        "写山",
        "写水",
        "长江",
        "黄河",
        "儿童",
        "写鸟",
        "写马",
        "边塞",
        "地名",
        "节日",
        "春节",
        "元宵",
        "寒食",
        "清明",
      ],
      poety: [],
      len: 0,
      type: 1, //分页访问的接口类型 1代表全部古诗接口，其他代表标签接口
      typeValue: -1, //记录当前选择标签的下标
    };
  },
  watch: {
    //监控页码变换
    page() {
      if (this.type === 1) this.getPoems(this.page, this.size);
      else this.getPoemsBLabel(this.page, this.size, this.typeValue);
      //设置页面移动到诗歌展示的顶部
      document.getElementById("start").scrollIntoView();
    },
  },
  mounted() {
    this.getPoems(1, this.size);
  },
  methods: {
    //获取全部古诗接口
    getPoems(p, s) {
      if (p === 1 && this.page !== 1) {
        this.page = 1;
      }

      this.$axios({
        url: "/api/poemsList/",
        method: "get",
        params: {
          page: p,
          size: s,
        },
      }).then((res) => {
        console.log(res.data);
        this.poety = res.data.data;
        this.len = res.data.totalLen;
      });
    },

    getPoemsBLabel(p, s, label_index) {
      this.typeValue = label_index;

      if (p === 1 && this.page !== 1) {
        this.page = 1;
      }
      //设置分页为标签列表的分类
      this.type = 2;
      console.log(this.typeValue);
      console.log(`p = ${p},s = ${s},label = ${this.tags[label_index]}`);

      this.$axios({
        url: "/api/multiPoem/",
        method: "get",
        params: {
          page: p,
          size: s,
          label: this.tags[label_index],
        },
      }).then((res) => {
        console.log(res.data);
        this.poety = res.data.data;
        this.len = res.data.totalLen;
      });
    },
    //搜索
    search() {
      if (this.page !== 1) {
        this.page = 1;
      }
      this.$axios({
        url: "/model/trans/",
        method: "get",
        params: {
          search: this.value,
        },
      }).then((res) => {
        console.log(res.data);
        this.poety = res.data;
        this.len = 1;
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 1220px;
  /*min-height: 300px;*/
  background-color: rgba(255, 255, 255, 0.9);
}

.box {
  position: relative;
  margin: -375px auto 100px;
  padding-top: 30px;
  padding-bottom: 100px;
}

.box {
  background-image: url(../assets/images/鲤鱼.png);
  background-repeat: no-repeat;
  background-size: 150px auto;
  background-position: 100% 100%;
}

.tag .Text {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
}

.tag,
.yuan {
  position: absolute;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
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

.title {
  font-family: "font2", Courier, monospace;
  font-size: 64px;
  font-weight: 400;
}

.tags {
  margin-top: 30px;
  padding: 15px;
  /* background-color: #eee; */
  text-align: left;
}

.tags > .item {
  font-weight: bold;
  padding: 5px 15px;
  margin-right: 12px;
  border-radius: 5px;
  line-height: 40px;
  cursor: pointer;
}

.checked {
  color: #fff;
  background-color: rgb(61, 165, 238);
}

.input-btn {
  padding-left: 30px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
}

.input-btn >>> input {
  height: 50px;
  width: 800px;
}

.btn {
  position: relative;
  transform: translate(-100px, 0);
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

.btn > .text {
  font-size: 18px;
  letter-spacing: 3px;
}

.dividing-line {
  width: 906px;
  height: 48px;
  margin-top: 60px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/分割线寻诗结果.png);
}

.poems {
  margin-top: 150px;
}

.poem {
  margin-top: 30px;
}

.poem > p {
  font-size: 18px;
  font-weight: 600;
}

.pagination {
  margin-top: 60px;
  position: relative;
}

.pagination-1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.drop-shadow {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  margin: 120px auto;
  border-radius: 10px;
  position: relative;
  width: 60%;
  max-width: 70%;
  padding: 2em;
  text-align: center;
  background-color: rgba(253, 247, 209, 0.4);
  /*background-color: #eeeeee;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /*background-image: url(../assets/images/bgi1.jpg);*/
  background-position: center center;
  background-size: cover;
}

.drop-shadow .title {
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.drop-shadow .poet {
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.drop-shadow p {
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 3px;
}
</style>