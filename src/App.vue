<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <!-- <img style="width:300px;margin-bottom:30px" src="./assets/img/iinspection_logo_darkbackground.png" /> -->
        <p class="title">智能地址分析</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <headerNav></headerNav>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headerNav from "./components/headerNav.vue";

export default {
  name: "app",
  components: {
    headerNav
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.el-message-box {
  width: 100% !important;
}
.title {
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
