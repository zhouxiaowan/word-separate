<template>
  <div id="app">
    <headerNav></headerNav>
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
