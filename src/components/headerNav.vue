<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="地址分析" name="first">
      <adressAnalysis></adressAnalysis>
    </el-tab-pane>
    <el-tab-pane label="地址碰撞" name="second">
      <addressCollision></addressCollision>
    </el-tab-pane>
    <el-tab-pane label="混合检索" name="third">
      <PinyinRetrieve></PinyinRetrieve>
    </el-tab-pane>
    <el-tab-pane label="缩写全称匹配" name="four">
      <div class="grid-content bg-purple">
        <adressSelect></adressSelect>
      </div>
    </el-tab-pane>
    <el-tab-pane label="地址纠错" name="five">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <adressError></adressError>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import adressAnalysis from "./adressAnalysis.vue";
import adressSelect from "./adressSelect.vue";
import adressError from "./adressError.vue";
import addressCollision from "./addressCollision.vue";
import PinyinRetrieve from "./PinyinRetrieve.vue";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    adressAnalysis,
    adressSelect,
    adressError,
    addressCollision,
    PinyinRetrieve
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style>
.el-tabs__header {
}
.el-tabs__item {
  color: #ffffff;
  font-size: 16px;
}
</style>
