<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入地址" v-model="input4" clearable>
        <template slot="append">
          <a href="#" @click="adrAnaly">地址别名查询</a>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input4: ""
    };
  },
  components: {},
  methods: {
    adrAnaly() {}
  }
};
</script>
<style scoped>
a {
  list-style: none;
  text-decoration: none;
  color: #909399;
}
</style>

