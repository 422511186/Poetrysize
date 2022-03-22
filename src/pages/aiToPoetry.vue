<template>
  <div class="box">
    <!--修饰块-->
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>
    <!-- 标题 -->
    <h1 class="title" id="title-ai">{{ const_variable.title }}</h1>
    <!--正在输入中-->
    <div class="tip"><span>{{ tip }}</span></div>
    <!--消息列表-->
    <div class="message-box">

      <div class="item" v-for="(v,i) in messageList" :key="i+''+v" :class="v.user==='ai'?'left':'right'">
        <!--ai对话框-->
        <div v-show="v.user==='ai'">
          <img src="../assets/images/aa536446042692d2d2137126b2488f6.png" alt="" class="avatar1">
          <span class="text">{{ v.msg }}</span>
        </div>
        <!--用户对话框-->
        <div v-show="v.user!=='ai'">
          <span class="text">{{ v.msg }}</span>
          <img src="../assets/images/我.png" alt="" class="avatar2">
        </div>
      </div>

    </div>
    <!--分割线-->
    <i class="dividing-line"></i>
    <!--发送栏-->
    <div class="send-box">
      <input class="msg"
             type="text"
             v-model="value"
             @blur="()=> this.tip = ''"
             @focus="()=> this.tip = '正在输入中...'">
      <button class="commit" @click="commit">发送</button>
    </div>
  </div>
</template>
<!--AI对诗-->
<script>
export default {
  name: "aiToPoetry",
  data() {
    return {
      const_variable: {
        title: `AI对诗`,
      },
      tip: '',//tip
      value: '',//用户输入
      messageList: [
        {
          user: 'ai',
          msg: '请严格按照以下例子作为输入...',
        },
        {
          user: 'mine',
          msg: '阳气初惊蛰，韶光大地周',
        },
        {
          user: 'ai',
          msg: '草木萌芽甲，山川草木抽。万物有生意，如何不解愁。'
        },
      ], //消息列表
    };
  },
  watch: {},
  methods: {
    commit() {
      if (this.value === null || this.value === '') {
        this.$message.warning('禁止输入为空...')
        return;
      }
      let V = this.value;

      this.messageList.push({user: 'mine', msg: V});
      this.value = '';

      this.$axios({
        url: '/model/robotPoem/?poem=' + V,
        method: 'get',
      }).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data[0][0];
          this.messageList.push({user: 'ai', msg: data});
          console.log(data);
        }else {
          this.messageList.push({user: 'ai', msg: '对不起，你输入的内容太过超前，本ai智障无法答复！'});
        }
      }).catch(reason => {
        console.log(reason);
        this.$message.error(reason.data);

      })
      // this.$set(this.messageList, 0 + '', {user: 'mine', msg: this.value});
      // this.messageList[0] = ({user: 'mine', msg: this.value});
      // console.log(this.messageList);

    },
  }
};
</script>

<style scoped>
.box {
  width: 1220px;
  /*height: 900px;*/
  background-color: rgba(255, 255, 255, 0.9);
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
  background-color: rgba(255, 255, 255, 0.9);
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
  width: 800px;
  height: 8px;
  position: relative;
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

.tip {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin-top: 30px;
}

.tip {
  background-image: url(../assets/images/矩形.png);
}

.tip > span {
  font-size: 32px;
  color: #ffffff;
}

.message-box {
  margin-top: 60px;
  padding-bottom: 30px;
  height: 600px;
  overflow-y: auto;
}


.message-box {
  background-image: url(../assets/images/AVOQ4F}[G@WB1P]6EZ}M@]S.png);
  background-size: 50%;
  background-position: center -10px;
  background-repeat: no-repeat;
}

.message-box::-webkit-scrollbar {
  width: 5px;
}

.message-box::-webkit-scrollbar-track {
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.message-box::-webkit-scrollbar-thumb {
  background-color: #cbc5c5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.send-box {
  margin-top: 50px;
}


.msg {
  width: 800px;
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
  font-size: 18px;
}

.msg {
  border: 2px solid #e2e2e2;
  vertical-align: bottom;
  outline: none;
  border-radius: 8px;
}

.msg {
  position: relative;
  transform: translateX(60px);
}

.commit {
  height: 60px;
  width: 130px;
  border: 0;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  background-color: rgba(206, 179, 133, 1);
  cursor: pointer;
}

.commit {
  float: right;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.item {
  margin-top: 30px;
}

.avatar1, .avatar2 {
  width: 100px;
  height: 100px;
  object-fit: cover;
  vertical-align: top;
}

.avatar1 {
  margin-right: 30px;

}

.avatar2 {
  margin-left: 30px;
}

.text {
  text-align: left;
}

.text {
  display: inline-block;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(206, 179, 133, 1);
  font-size: 24px;
  max-width: 50%;
  overflow-wrap: anywhere;
  color: #ffffff;
  letter-spacing: 2px;
}
</style>