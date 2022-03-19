<template>
  <div class="searchInput">
    <el-input
      v-model="value"
      class="input-with-select Input"
      placeholder="Please input"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 110px">
          <el-option label="诗人" value="诗人"></el-option>
          <el-option label="古诗" value="古诗"></el-option>
          <el-option label="寻诗" value="寻诗"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="test"></el-button>
      </template>
    </el-input>
  </div>
</template>
<!--主页搜索框-->
<script>
import { Search } from "@element-plus/icons-vue";

export default {
  name: "searchInput",
  data() {
    return {
      select: "诗人",
      value: "",
      Search,
    };
  },
  methods: {
    test() {
      alert("value = " + this.value + ",select = " + this.select);
    },
  },
};
</script>

<style scoped>
.searchInput {
  z-index: 2;
  width: 100%;
  height: 50px;
}

.searchInput .Input {
  z-index: 2;
  width: 813px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

div >>> .el-input__inner {
  height: 50px;
}
</style>
