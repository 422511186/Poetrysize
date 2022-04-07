<template>
  <div class="box">
    <div>
      <div class="tag">
        <span class="Text" @click="()=>this.$router.back(-1)">返回上页</span>
      </div>
      <div class="yuan"></div>
    </div>

    <div class="detail" v-if="details!==null">
      <div v-if="details.poem!==undefined">
        <h1 style="margin: 10px 0">{{ details.poem.name }}</h1>
        <h3 style="margin: 10px 0"><span>{{ details.poem.poet }}</span>《 <span>{{ details.poem.dynasty }}</span> 》</h3>
        <div style="font-size: 20px;" v-html="details.poem.content"></div>
        <div style="font-size: 20px;text-align: left" v-html="details.poem.appreciation"></div>
        <div style="font-size: 20px;text-align: left" v-html="details.poem.background"></div>
      </div>
      <div v-if="details.poet!==undefined">
        <h1 style="margin: 10px 0">{{ details.poet.name }}</h1>
        <h3 style="margin: 10px 0">{{ details.poet.dynasty }}</h3>
        <img style="display:inline-block;float: left;margin: 10px;height: 150px;width: 105px;object-fit: cover"
             :src="details.poet.image" alt="">
        <div style="font-size: 20px;text-align: left" v-html="details.poet.desc"></div>
        <div style="font-size: 20px;text-align: left" v-html="details.poet.content"></div>

      </div>
    </div>

  </div>
</template>

<script>
import * as qs from "qs";

export default {
  name: "recommendedDetails",
  data() {
    return {
      details: null,
      data: {},
    }
  },
  mounted() {
    if (this.$route.params['data'] !== undefined) {
      this.data = JSON.parse(this.$route.params['data']);
      this.getDetails();
    }
  },
  methods: {

    getDetails() {
      let url = `/api/reDetail/`;
      this.$axios({
        url: url,
        method: `post`,
        data: qs.stringify({
          name: this.data.name,
          poet: this.data.poet,
        })
      }).then(res => {
        console.log(res.data);
        this.details = res.data['data'];
      })

    }
  }
}
</script>

<style scoped>

.box {
  width: 1220px;
  min-height: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  /*border: 2px solid  rgb(93, 126, 131);*/
}

.box {
  position: relative;
  margin: -375px auto 100px;
  padding: 30px 0;
  line-height: 30px;
}

.tag .Text {
  font-size: 22px;
  line-height: 50px;
  cursor: pointer;
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

.detail {
  font-weight: 400;
  padding: 30px 80px;
}

.detail >>> h1, .detail >>> h2, .detail >>> h3, .detail >>> h4, .detail >>> strong {
  font-weight: 400;
  margin: 10px 0;
}
</style>