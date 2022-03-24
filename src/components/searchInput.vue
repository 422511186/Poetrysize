<template>
  <div class="searchInput" id="searchInput">
    <el-input
        v-model="value"
        class="input-with-select Input"
        placeholder="Please input"
        v-if="dis"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 110px">
          <el-option label="诗人" value="poets"></el-option>
          <el-option label="古诗" value="poems"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="commit"></el-button>
      </template>
    </el-input>
  </div>
</template>
<!--主页搜索框-->
<script>
import {Search} from "@element-plus/icons-vue";
import bus from "../assets/js/bus"

export default {
  name: "searchInput",
  data() {
    return {
      dis: true,
      select: "",
      value: "",//搜索框的值
      Search,
      // data: {},
    };
  },
  mounted() {
    bus.on("bus", value => {
      if (value === false || value === true)
        this.dis = value;

    })
  },
  methods: {
    commit() {
      if (this.value === null || this.value === '') {
        alert(`输入不能为空！`)
        return;
      } else if (this.select === `poets`) {
        this.searchPoets();
      } else if (this.select === `poems`) {
        this.searchPoems();
      } else {
        alert(`请选择搜索类型！`)
      }
    },
    //搜索诗人
    searchPoets() {
      if (this.typeValue !== -1)
        this.page = 1;
      this.typeValue = -1;
      this.$axios({
        url: "/api/multiPoet/",
        method: "get",
        params: {
          style: this.value,
          page: this.page,
          size: this.size,
        },
      }).then(res => {
        return res.data;
      }).then(data => {
        this.$router.push({
          name: `poetsList`,
          params: {
            data: JSON.stringify(data),
          }
        });
      }).catch(() => {
        this.$message.error('请求出现错误...')
      });
    },
    //搜索古诗
    searchPoems() {
      if (this.page !== 1) {
        this.page = 1;
      }
      this.$axios({
        url: "/model/trans/",
        method: "get",
        params: {
          search: this.value,
        },
      }).then((res) => {
        return res.data;
      }).then(data => {
        this.$router.push({
          name: `forPoetry`,
          params: {
            data: JSON.stringify(data),
          }
        });

      }).catch(() => {
        this.$message.error('请求出现错误...')
      });
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
  border: none;
  outline: none;
}
</style>
