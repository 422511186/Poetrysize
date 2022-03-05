<template>
  <div class="Poets-Index">
    <h2>分类</h2>
    <el-divider style="background-color:black;opacity: .5;margin: 0px;width: 100%"></el-divider>
    <div ></div>
  </div>
</template>
<!--侧边分类栏-->
<script>
export default {
  name: "poetsIndex",
  props: {
    propsList: []
  },
  data() {
    return {
      list: ['11', '22', '33', '44',]
    }
  }
}
</script>

<style scoped>
.Poets-Index {
  min-height: 300px;
  width: 40%;
  max-width: 70%;
  margin: 60px auto;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  text-align: left;
  background-color: rgb(240, 239, 226);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-position: center center;
  background-size: cover;
  overflow: hidden;
}

.Poets-Index h2 {

  font-family: "Microsoft YaHei",serif ;
  /*font-size: 100%;*/
}

.Poets-Index li {
  font-weight: bold;
  text-align: center;
  display: inline-block;
  /*width: 40px;*/
  height: 20px;
  padding: 4px;
  /*background-color: #eee;*/
  margin: 5px;
  cursor: pointer;
}
</style>
