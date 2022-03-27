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
      <el-input v-model="value" placeholder=""/>

      <label class="upload_img" for="file"></label>
      <input type="file" name="file" id="file" class="upload" @change="update">

      <button class="btn" @click="search">
        <span class="text">搜索</span>
      </button>
    </div>
    <!--寻诗结果分割线-->
    <div><i class="dividing-line" id="start"></i></div>
    <!--寻诗结果展示-->
    <div class="poems">
      <div class="drop-shadow" v-for="(item, index) in poety" :key="index">
        <h4 class="title">{{ item.name }}</h4>
        <h4 class="poet">{{ item["poet"] }}</h4>
        <div class="content" v-html="item.content" :class="displayAll[index]" :id="'content'+item.id"></div>
        <button class="play" @click="audioPlay(item.content)">播放</button>
        <div class="more" @click="more(index)" v-show="countBr(item.content)&&displayAll[index]===''">展开</div>
        <div class="reduce" @click="reduce(index)" v-show="countBr(item.content)&&displayAll[index]!==''">收起</div>
      </div>

      <div class="pagination">
        <el-pagination
            :hide-on-single-page='hidePage'
            class="pagination-1"
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

<script>
import bus from '../assets/js/bus'
import {ElLoading} from 'element-plus'

export default {
  name: "forPoetry",
  data() {
    return {
      hidePage: false,
      page: 1, //页码
      len: 0,
      typeValue: -1, //记录当前选择标签的下标
      size: 5,
      value: "",
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
        "写景",
        "写人",
        "山水",
        "写山",
        "写水",
        "写雪",
        "月亮",
        "写风",
        "边塞",
        "地名",
        "节日",
        "春节",
        "元宵",
        "寒食",
        "清明",
        "咏物",
        "女子",
        "春天",
        "秋天",
        "赞美",
        "春节",
        "三曹",
        "元宵节",
        "清明节",
        "端午",
        "中秋",
        "重阳",
        "七夕",
        "寒食",
        "抒情",
        "婉约",
        "抒怀",
        "思念",
        "爱情",
        "送别",
        "思乡",
        "离别",
        "怀人",
        "友情",
        "相思",
        "孤独",
        "励志",
        "豪放",
        // "现实主义",
        // "浪漫主义",
        // "建安七子",
        // "竹林七贤",
        // "初唐四杰",
        // "婉约派",
        // "豪放派",
        // "山水诗派",
        // "田园诗派",
        // "边塞诗派",
      ],
      poety: [],
      type: 1, //分页访问的接口类型 1代表全部古诗接口，其他代表标签接口
      audio: null,
      displayAll: new Array(5).fill(``),
    };
  },
  mounted() {

    bus.emit('bus', false);

    let data = this.$route.params.data
    if (data !== undefined) {
      this.poety = JSON.parse(data);
      // this.len = JSON.parse(data).totalLen;
      // this.displayAll = new Array(this.size).fill(``);
    } else {
      this.typeValue = 0;
      this.getPoems(1, this.size);
    }
    this.hidePage = true;


  },
  unmounted() {
    bus.emit('bus', true);
    if (this.audio !== null) {
      this.audio.pause();
    }
  },
  methods: {
    /**
     * 展开更多
     */
    more(index) {
      this.displayAll[index] = `displayAll`;
    },
    /**
     * 收起更多
     */
    reduce(index) {
      this.displayAll[index] = ``;
    },
    /**
     * 上传图片文件进行寻诗
     * @param e
     */
    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('img', file);//通过append向form对象添加数据
      // console.log(param.get('img')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        //添加请求头
        headers: {"Content-Type": "multipart/form-data"},
        // //添加上传进度监听事件
        // onUploadProgress: e => {
        //   this.progress = ((e.loaded / e.total * 100) | 0) + "%";
        // }
      };
      const loadingInstance = ElLoading.service({fullscreen: true})
      let url = '/imgUpload/picPoem/';
      this.$axios.post(url, param, config)
          .then(res => {
            this.poety = res.data.data;
            this.len = 1;
            loadingInstance.close();
          })
          .catch(error => {
            this.$message.error(`发生错误，错误原因为${error}`)
            loadingInstance.close();
          })

    },
    /**
     * 切换分页
     */
    changeClick() {
      if (this.type === 1) {
        this.getPoems(this.page, this.size).then(() => {
          //设置页面移动到诗歌展示的顶部
          document.getElementById("start").scrollIntoView();
          this.displayAll = new Array(this.size).fill(``);
        });
      } else
        this.getPoemsBLabel(this.page, this.size, this.typeValue).then(() => {
          //设置页面移动到诗歌展示的顶部
          document.getElementById("start").scrollIntoView();
          this.displayAll = new Array(this.size).fill(``);
        });
    },
    //获取全部古诗接口
    async getPoems(p, s) {
      if (p === 1 && this.page !== 1) {
        this.page = 1;
      }
      const loadingInstance = ElLoading.service({fullscreen: true})
      await this.$axios({
        url: "/api/poemsList/",
        method: "get",
        params: {
          page: p,
          size: s,
        },
      }).then((res) => {
        this.poety = res.data.data;
        this.len = res.data.totalLen;
        // console.log(1)
        loadingInstance.close();
      }).catch(error => {
        this.$message.error(`发生错误，错误原因为${error}`)
        loadingInstance.close();
      })

    },

    async getPoemsBLabel(p, s, label_index) {
      this.typeValue = label_index;

      if (p === 1 && this.page !== 1) {
        this.page = 1;
      }
      //设置分页为标签列表的分类
      this.type = 2;
      const loadingInstance = ElLoading.service({fullscreen: true})
      await this.$axios({
        url: "/api/multiPoem/",
        method: "get",
        params: {
          page: p,
          size: s,
          label: this.tags[label_index],
        },
      }).then((res) => {
        this.poety = res.data.data;
        this.len = res.data.totalLen;
        loadingInstance.close();
      }).catch(error => {
        this.$message.error(`发生错误，错误原因为${error}`)
        loadingInstance.close();
      })
    },
    /**
     *搜索
     */
    search() {
      if (this.page !== 1) {
        this.page = 1;
      }
      const loadingInstance = ElLoading.service({fullscreen: true})
      this.$axios({
        url: "/model/trans/",
        method: "get",
        params: {
          search: this.value,
        },
      }).then((res) => {
        this.poety = res.data;
        this.len = 1;
        this.displayAll = new Array(this.size).fill(``);
        loadingInstance.close();
      }).catch(error => {
        this.$message.error(`发生错误，错误原因为${error}`)
        loadingInstance.close();
      })
    },
    /**
     * 语音朗读
     */
    audioPlay(value) {
      value = value.replaceAll('<br>', '');
      this.$axios({
        method: 'post',
        url: '/api/readPoem/?poem=' + value,
        responseType: 'arraybuffer'
      }).then((response) => {
            // 将 blob 数据转换成 url
            let mp3Url = window.URL.createObjectURL(new Blob([response.data]))
            // console.log(mp3Url)
            // 进行音频播放
            try {
              //是否已经声明过
              if (this.audio == null) {
                this.audio = new Audio();
                // this.audio.addEventListener('ended', function () {
                //   localStorage.setItem('audioEnded', true);
                // }, false);
              }
              if (mp3Url) {
                this.audio.src = mp3Url;
                this.audio.play();
              }
            } catch (e) {
              console.log(e);
            }
          }
      ).catch(error => {
        console.log(error)
      })
    },
    /**
     * 判断是否显示更多按钮
     * @param content
     * @returns {boolean}
     */
    countBr(content) {
      let split = content.split('<br>');
      let brLen = split.length;
      for (const i in split) {
        let x = Math.floor(split[i].length / 40);
        brLen = brLen + x;
      }
      if (brLen > 5)
        return true;
      return false;
    },
  }
  ,
}
;
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

.tags > .item {
  display: inline-block;
  /*font-weight: bold;*/
  padding: 5px 15px;
  margin-right: 12px;
  border-radius: 5px;
  line-height: 30px;
  cursor: pointer;
  word-wrap: break-word;
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
  background-image: url(../assets/images/dline.png);
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
  /*font-family: "Microsoft YaHei", serif;*/
  font-family: font7, "Microsoft YaHei", serif;
  margin: 120px auto;
  border-radius: 10px;
  position: relative;
  width: 60%;
  max-width: 70%;
  padding: 2em;
  text-align: center;
  background-color: rgba(253, 247, 209, 0.4);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.drop-shadow {
  /*text-align: left;*/
}

.drop-shadow .title {
  margin-bottom: 10px;
  /*letter-spacing: 3px;*/
  font-size: 40px;
}

.drop-shadow .poet {
  margin-left: 20px;
  margin-bottom: 10px;
  /*letter-spacing: 3px;*/
}

.drop-shadow .content {

  font-size: 18px;
  line-height: 30px;
  /*letter-spacing: 3px;*/
  /*display: -webkit-box;*/
  /*-webkit-box-orient: vertical;*/
  /*-webkit-line-clamp: 5;*/
  max-height: 150px;
  overflow: hidden;
}

.drop-shadow .displayAll {
  /*-webkit-line-clamp: unset;*/
  max-height: 100%;
}

.upload_img {
  width: 40px;
  height: 50px;
  background-image: url(../assets/images/imgUpload.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  left: -160px;
  cursor: pointer;
}

.upload {
  visibility: hidden;
  position: absolute;
}

.play {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 10px;
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