<template>
  <div class="search bar8">
    <div>
      <input type="text" placeholder="请输入">
      <button type="submit"></button>
    </div>
  </div>
</template>
<script>
export default {
name: "searchInput"
}
</script>

<style scoped>
* {
  box-sizing:border-box;
}


div.search {
  padding:10px 0;
}

input,button {
  border:none;
  outline:none;
}
input {
  width:100%;
  height:60px;
  padding-left:13px;
}
button {
  height:60px;
  width:60px;
  cursor:pointer;
  position:absolute;
}

.bar8{
  position: absolute;
  top: 130px;
  right: 70px;
}
/*搜索框8*/
.bar8 div {
  height:60px;
}
.bar8 input {
  width:0;
  padding:0 60px 0 15px;
  border-bottom:2px solid transparent;
  background:transparent;
  transition:.3s linear;
  position:absolute;
  top:0;
  right:0;
  z-index:2;
  /*background-color: rgb(240, 239, 226);*/
}
.bar8 input:focus {
  width:300px;
  z-index:1;
  border-bottom:2px solid #ffffff;
}

.bar8 button {
  background:#683B4D;
  top:0;
  right:0;
}


.bar8 button:before {
  content:"搜索";
  font-family:FontAwesome,serif;
  font-weight: bold;
  font-size:16px;
  color:#F9F0DA;
}
</style>
