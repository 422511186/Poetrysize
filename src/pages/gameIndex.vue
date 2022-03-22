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
    <!--计时-->
    <div class="time-box">
      <div class="time-count">
        <div class="title-2">{{ const_variable.title_2[1] }}</div>
        <div class="time">{{ const_variable.time }}</div>
      </div>
    </div>
    <!--规则-->
    <div class="rules">
      <div class="rules-text">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </div>
    <!--分割线-->
    <i class="dividing-line"></i>

    <div class="btn-box">
      <button class="btn" @click="matchUser" v-show="!v_show">开始匹配</button>
      <button class="btn" @click="cancelMatch" v-show="v_show">取消匹配</button>
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
  data() {
    return {
      v_show: false,
      const_variable: {
        title: '玩家对战',//标题
        title_2: ['', '匹配中'],
        time: '00:00:00',
        rule: '',//规则
      },

      userId: null, //用户id
      socket: null, //套接字连接对象
      socketUrl: "ws://127.0.0.1:5003/game/match/", //套接字连接地址

    }
  },
  methods: {
    //连接服务端
    connect: function () {
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
         let questions = chatMessage["data"]["questions"];
          this.$message.success(`已成功为你匹配到对手!`)

          // console.log(this.socket.send);

          this.$router.push({
            name: 'battle',
            params: {
              p_socket: JSON.stringify(this.socket),
              uid: this.userId,
              q: JSON.stringify(questions),
            }
          });

        }
        //(更新分数)
        else if (chatMessage["type"] === "PLAY_GAME") {
          this.score = chatMessage["data"]["score"];
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

  }
};
</script>

<style scoped>

.box {
  width: 1220px;
  min-height: 500px;
  background-color: rgba(255, 255, 255, 1);
}

.box {
  position: relative;
  margin: -375px auto 100px;
  padding: 30px 60px 100px;

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
  background-color: rgba(255, 255, 255, 1);
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
  background-image: url(../assets/images/分割线.png);
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
  color: #d9d9d9;
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
}

.rules-text {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  letter-spacing: 2px;
}

.btn-box {
  margin-top: 100px;
}

.btn {
  height: 60px;
  width: 200px;
  border: none;
  border-radius: 10px;
  background-color: rgba(90, 219, 96, 1);
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
}
</style>
