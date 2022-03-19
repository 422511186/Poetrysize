<template>
  <!--  <div class="game">-->
  <!--    <h1>time: {{ time }}</h1>-->
  <!--    <h1>userId: {{ userId }}</h1>-->
  <!--    <h1>myScore: {{ myScore }}</h1>-->
  <!--    <h1>score: {{ score }}</h1>-->
  <!--    <button @click="connect">链接服务</button>-->
  <!--    <br>-->
  <!--    <button @click="matchUser">随机匹配</button>-->
  <!--    <br>-->
  <!--    <button @click="cancelMatch">取消匹配</button>-->
  <!--    <br>-->
  <!--    <button @click="gameOver">结束游戏</button>-->
  <!--    <br>-->
  <!--    <button @click="userInPlay">更新分数</button>-->
  <!--    <br>-->
  <!--    <button @click="addScore">+5-->
  <!--    </button>-->
  <!--    <br>-->
  <!--    <div class="item" v-for="(item,index) in questions " :key="index">-->
  <!--      <p>question: {{ item.q }}</p>-->
  <!--      <p>answer: {{ item.a }}</p>-->
  <!--      <button @click="commit(index)">提交</button>-->
  <!--      <br/>-->
  <!--      <el-input :disabled="isDis[index]" v-model="value[index]" placeholder="Please input"/>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="box">
    <div>
      <div class="tag"><span class="Text"><router-link to="/">返回首页</router-link></span></div>
      <div class="yuan"></div>
      <i class="dividing-line"></i>
    </div>
    <nav class="game-list">
      <router-link to="/battle">
        <div class="item">匹配对战</div>
      </router-link>
      <router-link to="/">
        <div class="item">AI对诗</div>
      </router-link>
      <router-link to="/">
        <div class="item">AI对联</div>
      </router-link>

    </nav>
  </div>
</template>

<script>

export default {
  name: "gameIndex",
  mounted() {
    // this.connect();
    // this.timesTask();
  },
  data() {
    return {
      score: 0,
      myScore: 0,
      time: null,//游戏时间
      timeout: false,
      isDis: new Array(10).fill(false),
      userId: null,
      socket: null,
      value: [],//用户填写的答案
      questions: [],//题目和标准答案
    }
  },
  watch: {
    myScore() {
      console.log(this.myScore);
      this.userInPlay();
    },

    time(newValue) {
      if (newValue === 0) {
        this.timeout = true;
        this.gameOver();
        this.init();
        alert(`时间到了`)
      }
    }
  },
  methods: {
    //初始化数据(清空)
    init() {
      this.time = null;
      this.score = null;
      this.myScore = null;
      this.questions = null;
    },
    //定时器
    timesTask() {
      if (this.timeout)
        return;
      this.time--;
      setTimeout(this.timesTask, 1000); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
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
      let socketUrl = "ws:///192.168.50.176:5003/game/match/" + this.userId;
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
        if (chatMessage['type'] === 'MATCH_USER') {//匹配到对手
          this.questions = chatMessage["data"]["questions"];
          this.time = 30;
          this.timesTask();
        } else if (chatMessage['type'] === 'PLAY_GAME') {
          this.score = chatMessage['data']['score'];
        }

      };
      //关闭事件
      this.socket.onclose = () => {
        console.log("websocket 已关闭 userId: " + this.userId);
      };
      //发生了错误事件
      this.socket.onerror = () => {
        console.log("websocket 发生了错误 userId : " + this.userId);
      }
    },

    // 随机匹配
    matchUser() {
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
      let data = this.myScore;//TODO
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
      this.questions = null;
    },
    //获取UUID
    UUid() {
      let aaa = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }));
      return aaa;
    },
  }
}

</script>

<style scoped>
.game .item {
  margin: 0 auto;
  width: 600px;
  height: 80px;
}


.box {
  width: 1220px;
  height: 500px;
  background-color: rgba(255, 255, 255, .7);

}

.box {
  position: relative;
  margin: -375px auto 100px;
}

.tag .Text {
  font-family: 'Microsoft YaHei', serif;
  font-weight: bold;
  font-size: 22px;
  line-height: 50px;
  float: right;
}

.tag, .yuan {
  position: absolute;
  height: 50px;
  background-color: rgba(255, 255, 255, .7);
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
  background-image: url(../assets/images/分割线.png);
}

.game-list {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 60px);
}

.box .item {
  margin: 15px;
  width: 400px;
  background-color: #eeeeee;
  padding: 20px;
}

.box .item {
  font-family: "font2", serif;
  font-weight: 400;
  font-size: 40px;
}
</style>
