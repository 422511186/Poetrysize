<template>
  <el-row class="mb-4">
    <el-button type="primary" @click="x()">{{ Primary }}</el-button>
  </el-row>
  <router-view/>
</template>

<script>


export default {
  name: 'HelloWorld',
  components: {

  },
  props: {
    msg: String
  },
  data(){
    return{
      Primary:'qqq'
    }
  },

  methods:{
    x(){
      this.$router.push('/index')
    }
  },
}
</script>

<style scoped>
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-error: #f56c6c;
  --el-color-info: #909399;
}
</style>
