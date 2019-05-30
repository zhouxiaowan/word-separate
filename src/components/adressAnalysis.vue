<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <div style="margin-top: 15px;">
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
    <el-row>
      <el-col class="split-content">
        <div class="adressResult" v-if="is_ResultList">
          <p class="split-result">切分结果</p>
          <div class="split-result-list" v-if="best_match_result">
            <el-row>
              <el-col :span="16" class="split-adress">
                <div class="Result-list">
                  <el-button round v-if="best_match_result.source.city">{{best_match_result.source.city}}</el-button>
                  <el-button round v-if="best_match_result.source.community">{{best_match_result.source.community}}</el-button>
                  <el-button round v-if="best_match_result.source.county">{{best_match_result.source.county}}</el-button>
                  <el-button round v-if="best_match_result.source.road">{{best_match_result.source.road}}</el-button>
                  <el-button round v-if="best_match_result.source.village">{{best_match_result.source.village}}</el-button>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">
                <p class="tips">
                  <span>相似度:</span>
                  <span v-if="best_match_result.score">{{(best_match_result.score).toFixed(2)}}分</span>
                  <span style="margin-left:10px">所属地:{{best_match_result.paichusuo}}</span>
                  <!-- <span style="margin-left:10px">地址来源:</span>
                  <span>{{best_match_result.match_source === 0?'警方地址库':''}}</span>
                  <span>{{best_match_result.match_source === 1?'POI库':''}}</span>
                  <span>{{best_match_result.match_source === 2?'暂无精准匹配来源':''}}</span>-->
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
                  <el-button round v-if="item.source.road">{{item.source.road}}</el-button>
                  <el-button round v-if="item.source.village">{{item.source.village}}</el-button>
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
          <p>
            <img class="del_list" @click="handleListResult" src="../assets/img/del.png">
          </p>
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
      this.$http
        .get("http://10.9.74.145:3000/")
        .then(response => {
          loading.close();
          this.splitWord = JSON.parse(response.request.response).result;
          for (var i in this.splitWord) {
            this.tags.push(this.splitWord[i].word);
            this.tagtypes.push(this.splitWord[i].tag);
          }
          this.address = "";
          this.is_ResultList = true;
        })
        .catch(err => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
      this.$http
        .get("http://10.9.74.145:3000/")
        .then(response => {
          loading.close();
          this.best_match_result = JSON.parse(response.request.response).best_match_result;
          this.rest_match_result = JSON.parse(response.request.response).rest_match_result;
          this.is_ResultList = true;
        })
        .catch(err => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
    },
    handleSplitWord() {
      this.tags = [];
      this.is_ResultList = false;
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
  width: 65%;
  top: 23px;
  left: 13%;
}
.el-tag {
  margin-right: 10px;
}
</style>

