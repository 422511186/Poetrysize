<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text"><router-link to="/">返回首页</router-link></span>
      </div>
      <div class="yuan"></div>
    </div>


  </div>
</template>

<script>
export default {
  name: "recommendedDetails",
  data() {
    return {
      details: {}
    }
  },
  methods: {
    getDetails() {
      let url = ``;
      this.$axios({
        url: url,
        method: `get`,

      }).then(res => {
        console.log(res.data);
      })

    }
  }
}
</script>

<style scoped>

.box {
  width: 1220px;
  min-height: 600px;
  background-color: rgba(255, 255, 255, 0.7);
}

.box {
  position: relative;
  margin: -375px auto 100px;
}

.tag .Text {
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

</style>