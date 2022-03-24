<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>
    <!-- 标题 -->
    <h1 class="title" id="title-for">诗人名录</h1>
    <!--古诗分类标签-->
    <nav class="tags">
      <span
          class="item"
          v-for="(item, index) in tags"
          :key="index"
          :class="index === typeValue ? 'checked' : ''"
          @click="getPoets(index)"
      >
        {{ item }}
      </span>
    </nav>
    <!--搜索框-->
    <div class="input-btn">
      <el-input v-model="value" placeholder="Please input"/>
      <button class="btn" @click="search">
        <span class="text">搜索</span>
      </button>
    </div>
    <!--寻诗结果分割线-->
    <div><i class="dividing-line" id="start"></i></div>
    <!--诗人结果展示-->
    <div class="poets">
      <div class="drop-shadow" v-for="(item, index) in poets" :key="index">
        <h2 class="title">{{ item['name'] }}</h2>
        <h3 class="poet">{{ item["dynasty"] }}</h3>
        <div class="content" v-html="item[`desc`]+`<br>`+item[`content`]" :class="displayAll[index]"></div>
        <div class="more" @click="more(index)" v-show="displayAll[index]===''">展开...</div>
        <div class="reduce" @click="reduce(index)" v-show="displayAll[index]!==''">收起...</div>
      </div>
      <!--分页器-->
      <div class="pagination">
        <el-pagination
            class="pagination-1"
            :hide-on-single-page='hidePage'
            v-model:current-page="page"
            v-model:page-size="size"
            background
            layout="prev, pager, next"
            v-model:total="len"
            @current-change="changeClick"
        />
      </div>
    </div>
  </div>
</template>
<!--诗人名录xs-->
<script>
import bus from "@/assets/js/bus";

export default {
  name: "poetsList",
  data() {
    return {
      hidePage: false,
      displayAll: new Array(this.size).fill(``),
      value: '',//搜索框的值
      typeValue: -1, //记录当前选择标签的下标
      tags: [
        "全部",
        "先秦",
        "五代",
        "魏晋",
        "南北朝",
        "两汉",
        "唐代",
        "宋代",
        "元代",
        "明代",
        "清代",
        "现实主义",
        "浪漫主义",
        "建安七子",
        "竹林七贤",
        "初唐四杰",
        "婉约派",
        "豪放派",
        "山水诗派",
        "田园诗派",
        "边塞诗派",
      ],
      page: 1, //页码
      len: 0,//总长度
      size: 3,//一页数量
      poets: [],//诗人对象列表
    }
  },

  mounted() {
    bus.emit('bus', false);

    let data = this.$route.params.data
    if (data !== undefined) {
      this.poets = JSON.parse(data).data;
      this.len = JSON.parse(data).totalLen;
      this.displayAll = new Array(this.size).fill(``);
    } else {
      this.typeValue = 0;
      this.getPoets(0);
    }
    this.hidePage = true;
  },
  unmounted() {
    bus.emit('bus', true);
  },
  methods: {
    more(index) {
      this.displayAll[index] = `displayAll`;
    },
    reduce(index) {
      this.displayAll[index] = ``;
    },
    changeClick() {
      if (this.typeValue !== -1)
        this.getPoets(this.typeValue).then(() => {
          //设置页面移动到诗歌展示的顶部
          document.getElementById("start").scrollIntoView();
        });
      else {
        this.search().then(() => {
          //设置页面移动到诗歌展示的顶部
          document.getElementById("start").scrollIntoView();
        });
      }


    },
    //搜索标签
    async search() {
      if (this.typeValue !== -1)
        this.page = 1;
      this.typeValue = -1;
      await this.$axios({
        url: "/api/multiPoet/",
        method: "get",
        params: {
          style: this.value,
          page: this.page,
          size: this.size,
        },
      }).then(res => {
        this.poets = res.data.data;
        this.len = res.data.totalLen;
        this.displayAll = new Array(this.size).fill(``);
        //设置页面移动到诗歌展示的顶部
        // document.getElementById("start").scrollIntoView();
      }).catch(() => {
        this.$message.error('请求出现错误...')
      })

    },
    //获取诗人列表
    async getPoets(label_index) {
      if (this.typeValue !== label_index) {
        this.typeValue = label_index;
        this.page = 1;
      }

      await this.$axios({
        url: "/api/multiPoet/",
        method: "get",
        params: {
          style: this.tags[label_index],
          page: this.page,
          size: this.size,
        },
      }).then(res => {
        this.poets = res.data.data;
        this.len = res.data[`totalLen`];
        this.displayAll = new Array(this.size).fill(``);
        //设置页面移动到诗歌展示的顶部
        // document.getElementById("start").scrollIntoView();
      }).catch(() => {
        this.$message.error('请求出现错误...')
      })
    },
  }
}
</script>


<style scoped>
.box {
  width: 1220px;
  min-height: 800px;
  background-color: rgba(255, 255, 255, 0.9);
}

.box {
  position: relative;
  margin: -375px auto 100px;
  padding-top: 30px;
  padding-bottom: 100px;
}

.box {
  background-image: url(../assets/images/liyu.png);
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
  display: inline-block;
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
  background-image: url(../assets/images/deadline.png);
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
  padding: 2em 2em 3em;
  text-align: center;
  background-color: rgba(253, 247, 209, 0.4);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.drop-shadow {
  text-align: left;
}

.drop-shadow .title {
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.drop-shadow .poet {
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.drop-shadow .content {
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 3px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

.drop-shadow .displayAll {
  -webkit-line-clamp: unset;
}

.content h1, .content h2, .content h3, .content h4, .content h5 {
  margin: 100px 0;
}

.more, .reduce {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 10px;
  opacity: .4;
  padding: 8px;
  border-radius: 10px;
}


</style>