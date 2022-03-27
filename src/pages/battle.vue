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

    <img src="https://raw.githubusercontent.com/422511186/images/main/bgi/1.jpg">
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "battle",
  mounted() {

  },
  data() {
    return {
      audio: null,
    };
  },

  methods: {
    audioPlay() {
      this.$axios({
        method: 'post',
        url: '/api/readPoem/?poem=微雨众卉新，一雷惊蛰始',
        responseType: 'arraybuffer'
      }).then((response) => {
            // 将 blob 数据转换成 url
            let mp3Url = window.URL.createObjectURL(new Blob([response.data]))
            console.log(mp3Url)
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
    }

  }
  ,
}
;
</script>

<style scoped>
.box {
  width: 1220px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
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
  background-image: url(../assets/images/deadline.png);
}

</style>