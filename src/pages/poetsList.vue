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
      <div>
<!--        <span class="tags-2">朝代</span>-->
        <span
            class="tags-2"
            v-for="(item, index) in tags.slice(0,1)"
            :key="index"
            @click="getPoets(index)">
          {{ item }}
        </span>


        <span
            class="item"
            style="margin-left: 10px"
            v-for="(item, index) in tags.slice(1,11)"
            :key="index+1"
            :class="index+1 === typeValue ? 'checked' : ''"
            @click="getPoets(index+1)"
        >
        {{ item }}
      </span>
      </div>

      <div style="margin-top: 10px">
        <span class="tags-2">派别</span>
        <span
            class="item"
            v-for="(item, index) in tags.slice(11,tags.length)"
            :key="index+11"
            :class="index+11 === typeValue ? 'checked' : ''"
            @click="getPoets(index+11)"
        >
        {{ item }}
      </span>
      </div>
    </nav>
    <!--搜索框-->
    <div class="input-btn">
      <el-input v-model="value" placeholder="请输入..."/>
      <button class="btn" @click="search">
        <span class="text">搜索</span>
      </button>
    </div>
    <!--寻诗结果分割线-->
    <div><i class="dividing-line" id="start"></i></div>
    <!--诗人结果展示-->
    <div class="poets">
      <div class="drop-shadow" v-for="(item, index) in poets" :key="index">

        <img style="display:inline-block;float: left;margin: 10px;height: 150px;width: 105px;object-fit: cover"
             :src="item.image===''? img:item.image" alt="">

        <h2 class="title">{{ item['name'] }}</h2>
        <p class="poet">{{ item["dynasty"] }}</p>
        <p class="content" v-html="item[`desc`]+`<br>`+item[`content`]"></p>
        <!--        <p class="content" v-html="item[`desc`]+`<br>`+item[`content`]" :class="displayAll[index]"></p>-->

        <!--        <div class="more" @click="more(index)" v-show="displayAll[index]===''">展开</div>-->
        <!--        <div class="reduce" @click="reduce(index)" v-show="displayAll[index]!==''">收起</div>-->
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
import {ElLoading} from "element-plus";

export default {
  name: "poetsList",
  data() {
    return {
      img: 'https://song.gushiwen.cn/authorImg/wangbo.jpg',
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
  /**
   * 数据更新时，设置元素内嵌滚动条自动回到顶部
   */
  updated() {
    this.$nextTick(() => {
      let ele = document.getElementsByClassName('drop-shadow');
      for (let i = 0; i < ele.length; i++) {
        ele[i].scrollTop = 350 + 'px';
      }
    })
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
      const loadingInstance = ElLoading.service({fullscreen: true})

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
        loadingInstance.close();

      }).catch(error => {
        this.$message.error(`请求发生错误，错误原因为${error}`)
        loadingInstance.close();
      })

    },
    //获取诗人列表
    async getPoets(label_index) {
      if (this.typeValue !== label_index) {
        this.typeValue = label_index;
        this.page = 1;
      }
      const loadingInstance = ElLoading.service({fullscreen: true})
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
        loadingInstance.close();

      }).catch(error => {
        this.$message.error(`请求发生错误，错误原因为${error}`)
        loadingInstance.close();
      })
    },
  }
}
</script>


<style scoped>
.box {
  width: 1220px;
  min-height: 800px;
  background-color: rgba(255, 255, 255, 0.7);
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
  text-align: left;
  font-size: 22px;
}

.tags .item {
  display: inline-block;
  padding: 10px;
  margin-right: 0;
  /*border-radius: 5px;*/
  cursor: pointer;
}

.checked {
  color: #fff;
  background-color: rgb(93, 126, 131);
}

.input-btn {
  padding-left: 105px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
}

.input-btn >>> input {
  height: 60px;
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
  background-color: rgb(93, 126, 131);
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
  margin: 120px auto;
  border-radius: 10px;
  position: relative;
  width: 60%;
  max-width: 70%;
  padding: 2em 2em 3em;
  /*background-color: rgba(253, 247, 209, 0.4);*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /*background-image: url("../assets/images/bgi1.jpg");*/
  background-image: url("../assets/images/bB9o2WVxmK.jpg");
  background-size: cover;
  background-position: top right;
  background-repeat: no-repeat;
}

.drop-shadow {
  text-align: left;
  height: 350px;
  overflow: auto;
}

.drop-shadow::-webkit-scrollbar {
  width: 2px;
}

.drop-shadow::-webkit-scrollbar-track {
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.drop-shadow::-webkit-scrollbar-thumb {
  background-color: #cbc5c5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
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
  /*display: -webkit-box;*/
  /*-webkit-box-orient: vertical;*/
  /*-webkit-line-clamp: 5;*/
  /*overflow: hidden;*/
}

.drop-shadow .displayAll {
  -webkit-line-clamp: unset;
  /*height: auto;*/
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

.tags-2 {
  padding: 10px;
  background-color: rgb(93, 126, 131);
  margin-right: 20px;
  color: #ffffff;
  margin-left: 30px;
}

</style>