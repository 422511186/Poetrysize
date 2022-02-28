<template>
  <div class="search bar7">
    <div>
      <input type="text" placeholder="请输入">
      <button></button>
    </div>
  </div>
</template>
<script>
export default {
name: "searchInput"
}
</script>

<style scoped>

div.search {
  position: absolute;
  top: 20px;
  right: 80px;
  padding:10px 0;
}
div {
  position:relative;
  width:300px;
  margin:0 auto;
}

input,button {
  border:none;
  outline:none;
}
input {
  width:100%;
  height:42px;
  padding-left:13px;
}
button {
  height:42px;
  width:42px;
  cursor:pointer;
  position:absolute;
}

/*搜索框7*/
.bar7 div {
  height:42px;
}
.bar7 input {
  width:180px;
  border-radius:42px;
  border:2px solid #324B4E;
  background:#F9F0DA;
  transition:.3s linear;
  float:right;
}

.bar7 input:focus {
  width:240px;
}
.bar7 button {
  background:none;
  top:-2px;
  right:20px;
}
.bar7 button:before {
  content:"Search";
  font-family:FontAwesome,serif;
  color:#324b4e;
}
/*搜索框8*/
</style>
