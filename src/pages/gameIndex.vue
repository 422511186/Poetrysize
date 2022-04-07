<template>
  <div class="box">

    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>

    <!-- 标题 -->
    <h1 class="title" id="title-ai">{{ const_variable.title }}</h1>

    <!-- 匹配界面-->
    <div v-if="v_box===1">
      <!--计时-->
      <div class="time-box">
        <div class="time-count">
          <div class="title-2" v-show="!v_show">{{ const_variable.title_2[0] }}</div>
          <div class="title-2" v-show="v_show">{{ const_variable.title_2[1] }}</div>
          <div class="time">
            <!--            {{ const_variable.time % 60 }}:-->
            {{ Math.floor(const_variable.time / 60) }}
            <span style="vertical-align: 8px">:</span>
            {{ const_variable.time % 60 }}
          </div>
        </div>
      </div>
      <!--规则-->
      <div class="rules">
        <div class="rules-text">{{ const_variable.rule }}</div>
      </div>
      <!--分割线-->
      <i class="dividing-line"></i>

      <div class="btn-box">
        <button class="btn" @click="matchUser" v-show="!v_show">开始匹配</button>
        <button class="btn" @click="cancelMatch" v-show="v_show">取消匹配</button>
      </div>
    </div>

    <!--答题界面-->
    <div v-if="v_box===2">
      <div class="question-box">
        <div class="question">
          <span class="count">{{ time }}</span>
          <div class="score">
            <span class="m">{{ myScore }}</span>
            <span class="maohao">:</span>
            <span class="dui">{{ score }}</span>
          </div>
          <div class="q-index">
            {{ index + 1 }}/10
          </div>
          <h2>{{ questions[index].name }}</h2>
          <h4>{{ questions[index].poet }}</h4>
          <h1>{{ questions[index].question }}</h1>
        </div>
      </div>
      <!--答题栏-->
      <div class="send-box">
        <button class="commit" style="margin-right: 50px" @click="preQuestion">上一题</button>
        <el-input
            class="msg"
            :disabled="isDis[index]"
            v-model="value[index]"
            placeholder="在此输入..."
            @keydown.enter="commit(index) "
        />
        <button class="commit" style="margin-left: 50px" @click="nextQuestion">下一题</button>
      </div>
      <button class="commit" style="margin-top: 20px" @click="commit(index)" :disabled="isDis[index]">提交</button>
    </div>

    <!--结果界面-->
    <div v-if="v_box===3">
      <!--结果图像-->
      <div class="result-box">
        <div class="result-image-victory" v-show="score_show"></div>
        <div class="result-image-fail" v-show="!score_show"></div>
      </div>
      <!--答题情况-->
      <div class="Answers">
        <!-- 我方情况-->
        <div class="left">
          <span style="color: rgb(105, 88, 255)">我方</span>
          <span>最终分数 : {{ myScore }}</span>
          <span>比赛时间 : {{ Time }}s</span>
        </div>
        <!-- 敌方情况-->
        <div class="right">
          <span style="color: rgb(252, 17, 37)">敌方</span>
          <span>最终分数 : {{ score }}</span>
          <span>比赛时间 : {{ Time }}s</span>
        </div>
      </div>
      <!--分割线-->
      <i class="dividing-line"></i>
      <div class="btn-box">
        <button class="btn" @click="matchUser">再试一次</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "gameIndex",
  mounted() {
    //如果为空，则重新连接
    if (this.socket === null)
      this.connect();
  },
  watch: {
    myScore() {
      this.userInPlay();
    },

  },
  data() {
    return {
      v_box: 1,//界面显示
      v_show: false,//  匹配 | 取消匹配
      const_variable: {
        title: '玩家对战',//标题
        title_2: ['', '匹配中...'],
        time: 0,
        rule: `相同时间内,答题得分高的将获得胜利。需注意，提交错误将会扣除五分,不设上限，请认真思考后再进行提交。`,//规则
      },
      userId: null, //用户id
      socket: null, //套接字连接对象
      socketUrl: "ws://124.222.182.217:5003/game/match/", //套接字连接地址
      index: 0, //题目指针
      score: 0, //对手的分数
      myScore: 0, //我的分数
      isDis: new Array(10).fill(false),//禁止输入
      value: [], //用户填写的答案
      questions: [],//题目列表
      score_show: true,//对战结果
      timeout: false,//匹配计数器开关
      time: 0,//答题计数器
      Time: 15,//答题时长
      timeout2: false,//答题计数器开关
    }
  },
  methods: {
    init() {
      this.index = 0;
      this.score = 0;
      this.myScore = 0;
      this.isDis = new Array(10).fill(false);
      this.value = [];
    },
    //上一题
    preQuestion() {
      if (this.index === 0) {
        this.$message.warning(`前面已经没有题目了！`);
      } else this.index--;
    },
    //下一题
    nextQuestion() {
      if (this.index === 9) {
        this.$message.warning(`已经是最后一题了！`);
      } else this.index++;
    },
    //提交答案并验证
    commit(index) {
      if (this.questions[index].ans === this.value[index]) {
        this.$message.success(`true`);
        this.addScore();
        this.isDis[index] = true;
        this.index++;//答案正确自动转向下一题
      } else {
        this.$message.error(`false`);
        this.reduceScore();
      }
    },
    //加分(回答正确)
    addScore() {
      this.myScore = this.myScore + 10;
    },
    //减分(回答错误) (不限次数)
    reduceScore() {
      this.myScore = this.myScore - 5;
    },
    //连接服务端
    connect() {
      // this.userId = 'hzy';
      this.userId = this.UUid();
      let socketUrl = this.socketUrl + this.userId;
      this.socket = new WebSocket(socketUrl);
      //打开事件
      this.socket.onopen = () => {
        console.log("websocket 已打开 userId: " + this.userId);
      };
      //获得消息事件
      this.socket.onmessage = (msg) => {
        let serverMsg = "收到服务端信息: " + msg.data;
        console.log(serverMsg);
        let chatMessage = JSON.parse(msg.data)["chatMessage"];
        /**
         * 判断信息类型
         */
        //匹配到对手
        if (chatMessage["type"] === "MATCH_USER") {
          //匹配到对手
          // eslint-disable-next-line no-unused-vars
          this.questions = chatMessage["data"]["questions"];
          this.$message.success(`已成功为你匹配到对手!`)
          //关闭匹配计数器
          this.timeout = true
          // 重置匹配计数器
          this.const_variable.time = 0;

          //开启答题计数器
          this.time = this.Time;
          this.timeout2 = false;
          this.counter2();

          //跳转到答题界面
          this.v_box = 2;
        }
        //(更新分数)
        else if (chatMessage["type"] === "PLAY_GAME") {
          this.score = chatMessage["data"]["score"];
        }
        //游戏结束
        else if (chatMessage["type"] === "GAME_OVER") {
          console.log(`游戏结束!`)
          if (this.myScore > this.score) {
            this.v_box = 3;
            this.score_show = true;
          } else if (this.myScore < this.score) {
            this.v_box = 3;
            this.score_show = false;
          } else {
            this.v_box = 3;
            this.score_show = true;
          }
        }
      };
      //关闭事件
      this.socket.onclose = () => {
        console.log("websocket 已关闭 userId: " + this.userId);
        this.socket = null;
      };
      //发生了错误事件
      this.socket.onerror = () => {
        console.log("websocket 发生了错误 userId : " + this.userId);
        //重新链接
        console.log(`重新链接`);
        this.connect();
      };
    },
    // 随机匹配
    matchUser() {

      //开启计数器
      this.timeout = false;
      this.counter();

      if (this.socket === null) {
        this.$message.error(`与服务器连接断开，请刷新页面...`);
      }

      this.v_show = !this.v_show;

      this.isGameing = 2;
      this.$message.info(`开始匹配......`);
      let chatMessage = {};
      let sender = this.userId;
      let type = "MATCH_USER";
      chatMessage.sender = sender;
      chatMessage.type = type;
      console.log("用户:" + sender + "开始匹配......");
      this.socket.send(JSON.stringify(chatMessage));
    },
    // 取消匹配
    cancelMatch() {
      //停止计数器，并重置
      this.timeout = true;
      this.const_variable.time = 0;

      if (this.socket === null) {
        this.$message.error(`与服务器连接断开，请刷新页面...`);
      }
      this.v_show = !this.v_show;

      this.$message.info(`取消匹配......`);
      let chatMessage = {};
      let sender = this.userId;
      let type = "CANCEL_MATCH";
      chatMessage.sender = sender;
      chatMessage.type = type;
      console.log("用户:" + sender + "取消匹配......");
      this.socket.send(JSON.stringify(chatMessage));
    },
    // 游戏中(更新分数)
    userInPlay() {
      let chatMessage = {};
      let sender = this.userId;
      // let data = $("#newScoreInput").val();
      let data = this.myScore; //TODO
      let type = "PLAY_GAME";
      chatMessage.sender = sender;
      chatMessage.data = data;
      chatMessage.type = type;
      console.log("用户:" + sender + "更新分数为" + data);
      this.socket.send(JSON.stringify(chatMessage));

    },
    // 游戏结束
    gameOver() {

      let chatMessage = {};
      let sender = this.userId;
      let type = "GAME_OVER";
      chatMessage.sender = sender;
      chatMessage.type = type;
      console.log("用户:" + sender + "结束游戏");
      this.socket.send(JSON.stringify(chatMessage));
    },
    //获取UUID
    UUid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
      );
    },
    //匹配时间计数器
    counter() {
      // console.log(this.timeout);
      if (this.timeout) return;
      this.const_variable.time = this.const_variable.time + 1;
      return setTimeout(this.counter, 1000); //counter,延时递归调用自己,1000为间隔调用时间,单位毫秒
    },
    //  答题时间计数器
    counter2() {
      // console.log(this.timeout2);
      if (this.timeout2) return;
      this.time = this.time - 1;
      if (this.time === 0) {
        this.timeout2 = true;
        this.gameOver();
      }
      return setTimeout(this.counter2, 1000); //counter,延时递归调用自己,1000为间隔调用时间,单位毫秒
    },
  },
  /**
   * 解绑结束游戏
   */
  unmounted() {
    this.gameOver();
  },
};
</script>

<style scoped>

.box {
  width: 1220px;
  min-height: 500px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
}

.box {
  position: relative;
  margin: -375px auto 100px;
  padding: 30px 60px 100px;

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
  left: 0;
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
  display: block;
  width: 906px;
  height: 8px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.title {
  font-family: "font2", Courier, monospace;
  font-size: 80px;
  font-weight: 400;
}

.time-box {
  margin-top: 60px;
  position: relative;
}

.time-count {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 3px solid #d9d9d9;
}

.time-count {
  margin: 0 auto;
}


.title-2 {
  margin-top: 40px;
  font-size: 36px;
}

.time {
  font-size: 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.rules {
  margin: 40px 0 30px;
}

.rules-text {
  width: 70%;
  padding: 20px;
  text-align: left;
  font-size: 22px;
}

.rules-text {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  letter-spacing: 2px;
}

.btn-box {
  margin-top: 60px;
}

.btn {
  height: 60px;
  width: 200px;
  border: none;
  border-radius: 10px;
  background-color: rgb(93, 126, 131);
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
}

.question-box {
  margin-top: 30px;
}

.question {
  padding: 20px 0 20px;
  margin: 0 auto;
  width: 80%;
  height: 200px;
  background-color: rgba(253, 247, 209, .8);
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.question {
  position: relative;
}

.question h2, .question h4 {
  margin-top: 8px;
}

.question h1 {
  margin-top: 15px;
}

.score {
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 10px;
}

.maohao {
  margin-left: 10px;
  margin-right: 10px;
  color: rgba(0, 0, 0, .7);
  font-weight: bold;
}


.send-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.msg {
  width: 500px;
  height: 60px;
  box-sizing: border-box;
  /*padding: 10px;*/
  font-size: 18px;

}


.msg {
  position: relative;
  /*transform: translateX(60px);*/
}

.commit {
  height: 60px;
  width: 130px;
  border: 0;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  background-color: rgb(93, 126, 131);
  cursor: pointer;
}

.commit {
  /*margin-left: 100px;*/
}


.send-box >>> input {
  height: 60px;
  width: 500px;
}

.q-index {
  position: absolute;
  left: 10px;
  top: 10px;
}

.result-box {
  position: relative;
  margin-top: 60px;
  height: 300px;
  background-image: url(../assets/images/im4.png);
  background-repeat: no-repeat;
  background-size: 300px 300px;
  background-position: center center;
}

.result-image-victory, .result-image-fail {
  height: 160px;
  width: 160px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;
}

.result-image-victory {
  background-image: url(../assets/images/im5.png);
}

.result-image-fail {
  background-image: url(../assets/images/im6.png);
}

.Answers {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
}

.Answers > .left {
  text-align: left;
}

.Answers > .right {
  text-align: right;
}

.Answers span {
  display: block;
  font-size: 24px;
  line-height: 33px;
}

.dividing-line {
  margin-top: 30px;
  display: block;
  width: 800px;
  height: 8px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/deadline.png);
}

.count {
  font-size: 30px;
  font-weight: bold;
}
</style>
