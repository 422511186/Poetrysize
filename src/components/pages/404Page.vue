<template>
  <el-empty class="unFound" description=" " image-size="300"></el-empty>
  <h1 class="code">{{ obj.code }}</h1>
  <h3 class="msg">{{ obj['msg'] }}</h3>
</template>

<script>
export default {
  name: "404Page",
  data() {
    return {
      obj: {
        'code': '404',
        'msg': '找不到网页',
      }
    }
  }
}
</script>

<style scoped>
.unFound {

}

.code {
  font-size: 48px;
}
.msg{
  font-size: 32px;
}
</style>
