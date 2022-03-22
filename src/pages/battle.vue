<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text">
          <router-link to="/gameIndex">返回上一级</router-link>
        </span>
      </div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>

    <!--分数显示-->
    <div class="Scores">
      <i class="myScore">我的分数:{{ myScore }}</i>
      <i class="score">对手的分数:{{ score }}</i>
      <i class="time">时间:{{ time }}</i>
    </div>

    <div v-if="isIf">
      <div class="question-item">
        <!--          题目-->
        <h1>{{ questions[index].q }}</h1>
        <el-input
            class="question-input"
            :disabled="isDis[index]"
            v-model="value[index]"
            placeholder="Please input"
        />
        <button class="commit" @click="commit(index)">提交</button>
      </div>

      <div class="btns">
        <button class="pre" @click="preQuestion">上一题</button>
        <button class="next" @click="nextQuestion">下一题</button>
      </div>
    </div>

    <!--    <div>-->
    <!--      <button @click="matchUser" v-if="isGameing === 1">开始匹配</button>-->
    <!--      <button @click="cancelMatch" v-if="isGameing === 2">取消匹配</button>-->
    <!--      <button @click="gameOver" v-if="isGameing===3">结束游戏</button>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "battle",
  mounted() {
    console.log(this.socket);
    console.log(this.socket.onclose);
    console.log(this.userId);
    // console.log(this.$route.params.p_socket);
    // 如果为空，则重新连接
    this.connect();
  },
  data() {
    return {
      userId: this.$route.params.uid !== undefined ? this.$route.params.uid : null, //用户id
      socket: this.$route.params.p_socket !== undefined ? JSON.parse(this.$route.params.p_socket) : null, //套接字连接对象
      socketUrl: "ws://127.0.0.1:5003/game/match/", //套接字连接地址
      isIf: true,//是否显示题目
      isGameing: 1, //按钮显示类型
      index: 0, //题目指针
      score: 0, //对手的分数
      myScore: 0, //我的分数
      time: 0, //游戏时间
      isDis: new Array(10).fill(false),
      value: [], //用户填写的答案
      questions: this.$route.params.q !== undefined ? JSON.parse(this.$route.params.q) : null, //题目和标准答案
      timeout: false,
    };
  },
  watch: {
    myScore() {
      // console.log(this.myScore);
      this.userInPlay();
    },
    time(newValue) {
      //时间到达后，执行结束游戏函数
      if (newValue === 0) {
        this.timeout = true;
        this.isIf = false;
        this.$message.warning(`游戏结束！`);
        if (this.myScore > this.score) {
          this.$message.info(
              `你的分数为:${this.myScore},超过对手的${this.score},获得胜利！`
          );
        } else if (this.myScore < this.score) {
          this.$message.info(
              `你的分数为:${this.myScore},遗憾落后于对手的${this.score},下次继续努力哦！`
          );
        } else {
          this.$message.info(
              `你们的分数都是${this.myScore},下次努力超过对手！`
          );
        }

        this.init();
        this.gameOver();
      }
    },
  },
  methods: {
    //初始化数据(清空)
    init() {
      this.time = 0;
      this.score = 0;
      this.myScore = 0;
      this.questions = [];
      this.isGameing = 1;
      this.index = 0;
      this.value = [];
      this.isDis = new Array(10).fill(false);
    },
    //上一题
    preQuestion() {
      if (this.index === 0) {
        this.$message.warning(`前面已经没有题目了！`);
      } else this.index--;
    },
    //下一题
    nextQuestion() {
      if (this.index === this.questions.length - 1) {
        this.$message.warning(`已经是最后一题了！`);
      } else this.index++;
    },

    //定时器
    timesTask() {
      if (this.timeout) return;
      if (this.time == null) return;
      this.time--;
      setTimeout(this.timesTask, 1000); //time是指本身,延时递归调用自己,1000为间隔调用时间,单位毫秒
    },

    //提交答案并验证
    commit(index) {
      if (this.questions[index].a === this.value[index]) {
        this.$message.success(`true`);
        this.addScore();
        this.isDis[index] = true;
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
    connect: function () {
      // this.userId = 'hzy';
      this.userId = this.UUid();
      let socketUrl = this.socketUrl + this.userId;
      if (this.socket === null)
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
          this.questions = chatMessage["data"]["questions"];
          this.isIf = true;
          this.isGameing = 3;
          this.time = 30;
          this.timeout = false;
          this.timesTask();
        }
        //(更新分数)
        else if (chatMessage["type"] === "PLAY_GAME") {
          this.score = chatMessage["data"]["score"];
        }
        // else if (chatMessage["type"] === "GAME_OVER") {
        //
        // }
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
      if (this.socket === null)
        this.connect();
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
      this.isGameing = 1;
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
      let aaa = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
      );
      return aaa;
    },
  },
};
</script>

<style scoped>
.box {
  width: 1220px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  box-sizing: border-box;
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
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../assets/images/分割线.png);
}

.Scores {
  position: absolute;
  top: 50px;
  right: 80px;
  font-size: 24px;
  font-weight: bold;
}

.Scores i {
  display: block;
}

.question-item {
  box-sizing: border-box;
  width: 100%;
  height: 370px;
  padding: 130px;
}

.btns {
  margin-top: 30px;
}

.btns button {
  padding: 15px;
}

.pre {
  float: left;
  margin-left: 40px;
}

.next {
  float: right;
  margin-right: 40px;
}

.question-input {
  margin-top: 60px;
}

.question-item >>> input {
  height: 60px;
}
</style>