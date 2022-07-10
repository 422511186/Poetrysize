<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>
    <!-- 标题 -->
    <h1 class="title" id="title-for">作诗</h1>
    <div class="types">
      <div class="type"
           v-for="(type,index) in args.types"
           :key="index"
           :class="types_index === index ? 'select':''"
           @click="changeIndex(index)"
      >
        {{ type }}
      </div>
    </div>
    <div class="input-box">
      <input type="text"
             @keydown.enter="commit"
             :placeholder="args.tips"
             v-model="inputValue"
             :disabled="!input_show">
      <button @click="commit">生成诗歌</button>
    </div>
    <!--生成结果-->
    <div class="result-box">
      <h3>生成结果</h3>
      <div class="poem">
        <h1 v-for="(item,index) in doPoem.split('。')" :key="index">{{ item }}</h1>
      </div>
      <div class="emo-analyze">
        <ul>
          <li>情感分析结果:
            <span>
              {{
                emo_analyze.sentiment_key === 'positive' ? '积极' : (emo_analyze.sentiment_key === 'negative' ? '消极' : '')
              }}
              </span>
          </li>
          <li>积极置信度:<span>{{ emo_analyze.positive_probs }}</span></li>
          <li>消极置信度:<span>{{ emo_analyze.negative_probs }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<!--作诗-->
<script>
export default {
  name: "doPoems",
  data() {
    return {
      input_show: false,
      types_index: 0,
      args: {
        title: '作诗',
        types: [`自由诗`, `韵律诗`, `藏头诗`],
        tips: '禁止输入...',
      },
      doPoem: '澹送襄王欢烛分，行人拜观已缤纷。宝著明年贺世妙，上归死死向吾君。',
      inputValue: '',
      emo_analyze: {
        "sentiment_label": null,
        "sentiment_key": null,
        "positive_probs": null,
        "negative_probs": null
      }
    }
  },
  computed: {},
  methods: {
    //调整选项
    changeIndex(index) {
      this.inputValue = '';
      this.types_index = index;
      if (this.types_index === 0 || this.types_index === 1) {
        this.input_show = false;
        this.args.tips = '禁止输入...';
      } else {
        this.input_show = true;
        this.args.tips = '请输入...（不超过四个字）';
      }
    },

    /**
     * 生成按钮确认请求事件
     */
    commit() {
      let httpFunc = [this.free, this.rhy, this.hideHead]
      httpFunc[this.types_index]();
    },
    /**
     * 生成自由诗
     */
    free() {
      let url = '/free/'
      this.$axios({
        url: '/api' + url,
        method: 'get',
      }).then(res => {
        this.doPoem = res.data[`data`];
        return this.doPoem;
      }).then(data => {
        this.emo(data);
      })
    },
    /**
     * 生成韵律诗
     */
    rhy() {
      let url = '/rhy/'

      this.$axios({
        url: '/api' + url,
        method: 'get',
      }).then(res => {
        this.doPoem = res.data[`data`];
        return this.doPoem;
      }).then(data => {
        this.emo(data);
      })
    },

    /**
     * 生成藏字诗
     */
    hideWords() {
      let url = '/hideWords/'
      this.$axios({
        url: '/api' + url,
        method: 'get',
        params: {
          hide: this.inputValue
        }
      }).then(res => {
        this.doPoem = res.data[`data`];
        return this.doPoem;
      }).then(data => {
        this.emo(data);
      })
    },

    /**
     * 生成藏头诗
     */
    hideHead() {
      let url = '/hideHead/';
      this.$axios({
        url: '/api' + url,
        method: 'get',
        params: {
          hide: this.inputValue
        }
      }).then(res => {
        this.doPoem = res.data[`data`];
        return this.doPoem;
      }).then(data => {
        this.emo(data);
      })
    },
    /**
     * 情感分析
     * @param content 需要分析的文字段落
     */
    emo(content) {
      console.log(content);
      let url = `/emo/`;
      this.$axios({
        url: '/model' + url,
        method: 'get',
        params: {
          content: content
        }
      }).then(res => {
        console.log(res.data[0]);
        this.emo_analyze = res.data[0];
      })
    }


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
  /*font-family: "Microsoft YaHei", serif;*/
  /*font-weight: bold;*/
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
  background-image: url(../assets/images/deadline.png);
}

.types {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  height: 200px;
}

.types .type {
  width: 200px;
  border-radius: 50%;
  background-color: rgb(169, 149, 123);
  line-height: 200px;
  margin: 0 30px;
  font-size: 24px;
  color: #eeeeee;
}

.types .select {
  background-color: rgb(161, 49, 47);
}

.input-box {
  margin-top: 80px;
  display: flex;
  justify-content: center;
}

.input-box input {
  height: 40px;
  width: 50%;
  font-size: 18px;
}

.input-box input {
  padding: 4px 10px;
  border: 2px solid rgb(161, 49, 47);
  outline: none;
}

.input-box button {
  height: 52px;
  width: 120px;
  border: none;
  background-color: rgb(161, 49, 47);
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
}

.result-box {
  margin: 70px auto 0;
  height: 300px;
  width: 755px;
  outline: 2px solid rgb(161, 49, 47);
  position: relative;
}

.result-box h3 {
  font-size: 24px;
  line-height: 50px;
  font-weight: 400;
  background-color: rgb(161, 49, 47);
  color: #ffffff;
}

.result-box .poem {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 250px;
}

.result-box .poem h1 {
  font-weight: 400;
}

.emo-analyze {
  width: 200px;
  color: rgb(161, 49, 47);
  font-size: 16px;
}

.emo-analyze {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
}

.emo-analyze li {
  list-style: none;
  padding: 6px 0;
}

.emo-analyze span {
  color: black;
}
</style>
