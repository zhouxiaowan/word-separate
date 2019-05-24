<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div style="margin-top: 15px;">
          <el-input v-model="address" clearable>
            <template slot="append">
              <a href="#" @click="adrAnaly">地址分析</a>
            </template>
          </el-input>
          <div class="tags">
            <el-tag v-for="(tag,index) in tags" :key="index" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="adressResult" v-if="is_ResultList">
          <p class="split-result">切分结果</p>
          <div class="split-result-list" v-if="best_match_result">
            <el-row>
              <el-col :span="16">
                <div class="Result-list">
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.city}}</el-button>
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.community}}</el-button>
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.county}}</el-button>
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.paichusuo}}</el-button>
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.road}}</el-button>
                  <el-button round v-if="best_match_result.source">{{best_match_result.source.village}}</el-button>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">
                <p class="tips">
                  <span>相似度:</span>
                  <span v-if="best_match_result.score">{{(best_match_result.score).toFixed(2)}}分</span>
                  <span style="margin-left:10px">地址来源:</span>
                  <span>{{best_match_result.match_source === 0?'警方地址库':''}}</span>
                  <span>{{best_match_result.match_source === 1?'Poli库':''}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="split-result-list" v-for="(item,index) in rest_match_result" :key="index">
            <el-row>
              <el-col :span="16">
                <div class="Result-list">
                  <el-button round v-if="item.source.city">{{item.source.city}}</el-button>
                  <el-button round v-if="item.source.community">{{item.source.community}}</el-button>
                  <el-button round v-if="item.source.county">{{item.source.county}}</el-button>
                  <el-button round v-if="item.source.paichusuo">{{item.source.paichusuo}}</el-button>
                  <el-button round v-if="item.source.road">{{item.source.road}}</el-button>
                  <el-button round v-if="item.source.road">{{item.source.village}}</el-button>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">
                <p class="tips">
                  <span>相似度:</span>
                  <span v-if="item.score">{{(item.score).toFixed(2)}}分</span>
                  <span style="margin-left:10px">地址来源:</span>
                  <span>{{item.best_match_source === 0?'警方地址库':''}}</span>
                  <span>{{item.best_match_source === 1?'Poli库':''}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <p>
            <img class="del_list" @click="handleListResult" src="../assets/img/del.png">
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { type } from "os";

export default {
  data() {
    return {
      address: "",
      is_ResultList: false,
      dataList: "",
      best_match_result: "",
      rest_match_result: "",
      splitWord: "",
      tags: []
    };
  },
  components: {},
  methods: {
    adrAnaly() {
      this.$http.get("http://172.21.39.76:3000/").then(response => {
        this.splitWord = JSON.parse(response.request.response).result;
        for (var i in this.splitWord) {
          this.tags.push(this.splitWord[i].word);
        }
        this.address = "";
        this.is_ResultList = true;
      });
      this.$http.get("http://172.21.39.76:3000/").then(response => {
        this.best_match_result = JSON.parse(response.request.response).best_match_result;
        this.rest_match_result = JSON.parse(response.request.response).rest_match_result;
        this.is_ResultList = true;
      });
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleListResult() {
      this.is_ResultList = false;
    }
  }
};
</script>
<style scoped>
a {
  list-style: none;
  text-decoration: none;
  color: #909399;
}
.del_list {
  width: 40px;
  cursor: pointer;
  margin-top: 50px;
}
.tips {
  color: #ffffff;
  margin-top: 10px;
}
.split-result {
  margin-top: 90px;
  margin-bottom: 40px;
  color: #eee;
  font-size: 18px;
}
.split-result-list {
  text-align: left;
}
.Result-list {
  margin-bottom: 20px;
}
.el-input__inner {
  height: 45px;
  line-height: 45px;
}
.tags {
  position: absolute;
  top: 23px;
  left: 13%;
}
.el-tag {
  margin-right: 10px;
}
</style>

