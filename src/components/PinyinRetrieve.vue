<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="margin-top:15px">
          <el-col :span="4">
            <p class="input_header">请输入地址</p>
          </el-col>
          <el-col :span="20">
            <el-select v-model="address" filterable remote placeholder="请输入地址" :remote-method="remoteSearchAddress" :loading="loading" @change="handelSelectChange">
              <el-option v-for="item in addressMatching" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <p class="clear_p" v-if="address">
              <img @click="handleSplitWord" class="clear_input2" src="../assets/img/clear.png" />
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="split-content">
        <div class="adressResult" v-if="is_ResultList">
          <p class="split-result">标准地址库匹配结果</p>
          <div class="split-result-list" v-if="best_match_result">
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
                </p>
              </el-col>
            </el-row>
          </div>
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
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="more" @click="isRestMatch">
            <div v-if="!rest_match">
              <span>展示更多</span>
              <img class="arrow-more" src="../assets/img/arrow-down.png" />
            </div>
            <div v-else>
              <span>收起</span>
              <img class="arrow-more" src="../assets/img/arrow-up.png" />
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
      is_ResultList: false,
      addressMatching: [],
      address: "",
      list: [],
      loading: false,
      best_match_result: "",
      rest_match_result: "",
      rest_match: false
    };
  },
  mounted() {},
  methods: {
    remoteSearchAddress(query) {
      if (query !== "") {
        this.loading = true;
        const reg = /([a-z]+)/g;
        const params = {
          address: query,
          havepinyin: false
        };
        if (reg.test(query)) {
          params.havepinyin = true;
        } else {
          params.havepinyin = false;
        }
        this.$axios({
          method: "get",
          url: this.global.localURL
          // url: `${this.global.baseURL}` + "/pinyinSearch?address=" + `${params.address}` + "?havepinyin=" + `${params.havepinyin}`
        })
          .then(res => {
            this.loading = false;
            this.addressMatching = res.data.result_pinyin;
          })
          .catch(error => {
            this.$message.error("哦噢！数据出错了，请联系系统管理员");
          });
      } else {
        this.addressMatching = [];
      }
    },
    handelSelectChange() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$axios({
        method: "get",
        url: this.global.localURL
        // url: `${this.global.baseURL}` + "/search_all?address=" + `${this.address}`
      })
        .then(res => {
          loading.close();
          this.best_match_result = JSON.parse(res.request.response).best_match_result;
          this.rest_match_result = JSON.parse(res.request.response).rest_match_result;
          this.is_ResultList = true;
        })
        .catch(error => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
    },
    isRestMatch() {
      this.rest_match = !this.rest_match;
    },
    handleSplitWord() {
      this.address = "";
      this.best_match_result = "";
      this.rest_match_result = "";
      this.is_ResultList = false;
      this.rest_match = false;
    }
  }
};
</script>
<style scoped>
.el-select {
  width: 100%;
}
.input_header {
  color: #ffffff;
  font-size: 16px;
  line-height: 45px;
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
a {
  list-style: none;
  text-decoration: none;
  color: #909399;
}
.split-content {
  min-width: 83.33333%;
}
.split-adress {
  min-width: 60%;
}
.clear_p {
  position: absolute;
  right: 18px;
  top: 13px;
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
.el-tag {
  margin-right: 10px;
}
.clear_input2 {
  cursor: pointer;
  width: 20px;
  position: absolute;
  top: 0px;
  right: 10px;
}
</style>


