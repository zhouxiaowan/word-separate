<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="margin-top:15px">
          <el-col :span="4">
            <p class="input_header">请输入地址</p>
          </el-col>
          <el-col :span="20">
            <div>
              <el-input v-if="address" v-model="address" @keyup.enter.native="adrAnaly" clearable>
                <template slot="append">
                  <a href="#" @click="adrAnaly">地址分析</a>
                </template>
              </el-input>
              <el-input v-else v-model="address" clearable>
                <template slot="append">
                  <a href="#">地址分析</a>
                </template>
              </el-input>
              <div class="tags">
                <el-row>
                  <el-col :span="21" style="text-align:left">
                    <el-tag :type="tagtypes[index]===0?'':'info'" v-for="(tag,index) in tags" :key="index" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
                  </el-col>
                  <el-col :span="3">
                    <p v-if="tags.length" class="clear_p">
                      <img @click="handleSplitWord" class="clear_input" src="../assets/img/clear.png">
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="split-content">
        <div class="adressResult" v-if="is_ResultList">
          <p class="split-result">标准库匹配结果</p>
          <div class="split-result-list" v-if="Object.keys(best_match_result).length">
            <el-row>
              <el-col :span="16" class="split-adress">
                <div class="Result-list">
                  <el-button round v-if="best_match_result.source.city">{{best_match_result.source.city}}</el-button>
                  <el-button round v-if="best_match_result.source.county">{{best_match_result.source.county}}</el-button>
                  <el-button round v-if="best_match_result.source.village">{{best_match_result.source.village}}</el-button>
                  <el-button round v-if="best_match_result.source.community">{{best_match_result.source.community}}</el-button>
                  <el-button round v-if="best_match_result.source.road">{{best_match_result.source.road}}</el-button>
                  <el-button round v-if="best_match_result.source.hamlet">{{best_match_result.source.hamlet}}</el-button>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">
                <p class="tips">
                  <span>归属地:{{best_match_result.paichusuo}}</span>
                  <!-- <span style="margin-left:10px">地址来源:</span>
                  <span>{{best_match_result.match_source === 0?'警方地址库':''}}</span>
                  <span>{{best_match_result.match_source === 1?'POI库':''}}</span>
                  <span>{{best_match_result.match_source === 2?'暂无精准匹配来源':''}}</span>-->
                </p>
              </el-col>
            </el-row>
          </div>
          <div v-if="rest_match_result.length">
            <div v-show="rest_match" class="split-result-list" v-for="(item,index) in rest_match_result" :key="index">
              <el-row>
                <el-col :span="16">
                  <div class="Result-list">
                    <el-button round v-if="item.source.city">{{item.source.city}}</el-button>
                    <el-button round v-if="item.source.county">{{item.source.county}}</el-button>
                    <el-button round v-if="item.source.village">{{item.source.village}}</el-button>
                    <el-button round v-if="item.source.community">{{item.source.community}}</el-button>
                    <el-button round v-if="item.source.road">{{item.source.road}}</el-button>
                    <el-button round v-if="item.source.hamlet">{{item.source.hamlet}}</el-button>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <p class="tips">
                    <span>相似度:</span>
                    <span v-if="item.score">{{(item.score).toFixed(2)}}分</span>
                    <span style="margin-left:10px">归属地:{{item.paichusuo}}</span>
                    <!-- <span style="margin-left:10px">地址来源:</span>
                  <span>{{item.match_source === 0?'警方地址库':''}}</span>
                  <span>{{item.match_source === 1?'Poli库':''}}</span>
                    <span>{{item.match_source === 2?'暂无精准匹配来源':''}}</span>-->
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="more" @click="isRestMatch">
            <div v-if="!rest_match">
              <span>展示更多</span>
              <img class="arrow-more" src="../assets/img/arrow-down.png">
            </div>
            <div v-else>
              <span>收起</span>
              <img class="arrow-more" src="../assets/img/arrow-up.png">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "",
      is_ResultList: false,
      dataList: "",
      rest_match: false,
      best_match_result: "",
      rest_match_result: "",
      splitWord: "",
      tags: [],
      tagtypes: []
    };
  },
  components: {},
  methods: {
    adrAnaly() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$axios({
        method: "get",
        // url: "http://10.9.74.16:3000/"
        url: `${this.global.baseURL}` + "/splitword?address=" + `${this.address}`
      })
        .then(res => {
          this.splitWord = JSON.parse(res.request.response).result;
          for (var i in this.splitWord) {
            this.tags.push(this.splitWord[i].word);
            this.tagtypes.push(this.splitWord[i].tag);
          }
          this.address = "";
        })
        .catch(err => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
      this.$axios({
        method: "get",
        // url: "http://10.9.74.16:3000/"
        url: `${this.global.baseURL}` + "/search_all?address=" + `${this.address}`
      })
        .then(res => {
          loading.close();
          this.best_match_result = JSON.parse(res.request.response).best_match_result;
          this.rest_match_result = JSON.parse(res.request.response).rest_match_result;
          this.is_ResultList = true;
        })
        .catch(err => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
    },
    handleSplitWord() {
      this.tags = [];
      this.best_match_result = "";
      this.rest_match_result = "";
      this.is_ResultList = false;
      this.rest_match = false;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    isRestMatch() {
      this.rest_match = !this.rest_match;
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
.input_header {
  color: #ffffff;
  font-size: 16px;
  line-height: 45px;
}
.split-content {
  min-width: 83.33333%;
}
.split-adress {
  min-width: 60%;
}
.del_list {
  width: 40px;
  cursor: pointer;
  margin-top: 50px;
}
.clear_p {
  text-align: right;
}
.clear_input {
  cursor: pointer;
  width: 20px;
  vertical-align: -webkit-baseline-middle;
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
  text-align: left;
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
  width: 69%;
  top: 7px;
  left: 18%;
}
.el-tag {
  margin-right: 10px;
}
.more {
  color: #ffffff;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 30px;
}
.arrow-more {
  width: 18px;
  vertical-align: text-top;
  margin-left: 5px;
}
</style>

