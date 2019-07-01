<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="margin-top:15px">
          <el-col :span="4">
            <p class="input_header">请输入地址</p>
          </el-col>
          <el-col :span="20">
            <el-input v-if="address" v-model="address" @keyup.enter.native="adrAnaly">
              <template slot="append">
                <a href="#" @click="adrAnaly">地址分析</a>
              </template>
            </el-input>
            <el-input v-else v-model="address" clearable>
              <template slot="append">
                <a href="#">地址分析</a>
              </template>
            </el-input>
            <!-- 地址分析 -->
            <div class="tags" v-if="type===1">
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
            <!-- 地址碰撞 -->
            <div v-else-if="type===0">
              <div class="special-word" v-if="splitWords.length">
                <el-row>
                  <el-col :span="21" style="text-align:left" v-html="splitWords"></el-col>
                  <el-col :span="3">
                    <p class="clear_p">
                      <img @click="handleSplitWordCollision" class="clear_input2" src="../assets/img/clear.png">
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
          <!-- 地址分析 -->
          <div v-if="type===1">
            <p class="split-result">标准库匹配结果</p>
            <div class="split-result-list" v-if="Object.keys(best_match_result).length">
              <el-row>
                <el-col :span="16" class="split-adress">
                  <div class="Result-list">
                    <!-- <el-button round v-if="best_match_result.source.city">{{best_match_result.source.city}}</el-button> -->
                    <el-button round v-if="best_match_result.source.county">{{best_match_result.source.county}}</el-button>
                    <el-button round v-if="best_match_result.source.village">{{best_match_result.source.village}}</el-button>
                    <el-button round v-if="best_match_result.source.community">{{best_match_result.source.community}}</el-button>
                    <el-button round v-if="best_match_result.source.road&&best_match_result.tag !== 2">{{best_match_result.source.road}}</el-button>
                    <el-button round v-if="best_match_result.source.road&&best_match_result.tag === 2" type="info">{{best_match_result.source.road}}</el-button>
                    <el-button round v-if="best_match_result.source.hao||best_match_result.source.zhuang">{{best_match_result.source.hao||''}}{{best_match_result.source.zhuang||''}}</el-button>
                    <el-button round v-if="best_match_result.source.hamlet&&best_match_result.tag === 0">{{best_match_result.source.hamlet}}</el-button>
                    <el-button round v-if="best_match_result.source.hamlet&&best_match_result.tag !== 0" type="info">{{best_match_result.source.hamlet}}</el-button>
                    <el-button round v-if="best_match_result.source.unit">{{best_match_result.source.unit}}</el-button>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <p class="tips">
                    <span>归属地:{{best_match_result.paichusuo}}</span>
                  </p>
                </el-col>
              </el-row>
            </div>
            <div v-if="rest_match_result.length">
              <div v-show="rest_match" class="split-result-list" v-for="(item,index) in rest_match_result" :key="index">
                <el-row>
                  <el-col :span="16">
                    <div class="Result-list">
                      <!-- <el-button round v-if="item.source.city">{{item.source.city}}</el-button> -->
                      <el-button round v-if="item.source.county">{{item.source.county}}</el-button>
                      <el-button round v-if="item.source.village">{{item.source.village}}</el-button>
                      <el-button round v-if="item.source.community">{{item.source.community}}</el-button>
                      <el-button round v-if="item.source.road">{{item.source.road}}</el-button>
                      <el-button round v-if="item.source.hao||item.source.zhuang">{{item.source.hao||''}}{{item.source.zhuang||''}}</el-button>
                      <el-button round v-if="item.source.hamlet">{{item.source.hamlet}}</el-button>
                      <el-button round v-if="item.source.unit">{{item.source.unit}}</el-button>
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
            </div>
          </div>
          <div v-else-if="type===0">
            <div class="split-result-list" v-if="Object.keys(best_match_result).length">
              <p class="split-result">标准地址库匹配结果</p>
              <el-row>
                <el-col class="split-adress">
                  <div class="Result-list">
                    <el-button round v-if="best_match_result.address.city">{{best_match_result.address.city}}</el-button>
                    <el-button round v-if="best_match_result.address.county">{{best_match_result.address.county}}</el-button>
                    <el-button round v-if="best_match_result.address.village">{{best_match_result.address.village}}</el-button>
                    <el-button round v-if="best_match_result.address.community">{{best_match_result.address.community}}</el-button>
                    <el-button round v-if="best_match_result.address.road">{{best_match_result.address.road}}</el-button>
                    <el-button round v-if="best_match_result.address.hamlet">{{best_match_result.address.hamlet}}</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-if="rest_match_result.length">
              <div v-show="rest_match">
                <p class="collision-result">碰撞地址对结果</p>
                <div class="collision-result-list" v-for="(item,index) in rest_match_result" :key="index">
                  <el-row>
                    <el-col :span="1" style="line-height:100px;color:#fff">{{index+1}}:</el-col>
                    <el-col :span="3" style="line-height:100px;color:#fff">
                      <span class="collision-list">
                        <i class="el-icon-check" style="font-size:18px;margin-right:10px;" v-if="item.tag === 0"></i>
                        {{item.tag === 0?'已选中':''}}
                      </span>
                    </el-col>
                    <el-col :span="20" style="text-align:left">
                      <div class="left-result-list">
                        <span class="tag-sort">地址一</span>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.city">{{item.left.city}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.county">{{item.left.county}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.village">{{item.left.village}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.community">{{item.left.community}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.road">{{item.left.road}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.left.hamlet">{{item.left.hamlet}}</el-button>
                      </div>
                      <div class="right-result-list">
                        <span class="tag-sort">地址二</span>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.city">{{item.right.city}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.county">{{item.right.county}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.village">{{item.right.village}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.community">{{item.right.community}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.road">{{item.right.road}}</el-button>
                        <el-button :type="buttontype[item.tag]" round v-if="item.right.hamlet">{{item.right.hamlet}}</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
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
        <!-- 地址碰撞 -->
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
      tagtypes: [],
      type: 1,

      splitWords: "",
      buttontype: ["primary", ""]
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
      const specialWords = ["旁边", "附近", "左边", "右边"]; //任意多个
      if (this.address.match(new RegExp(specialWords.join("|"), "g"))) {
        // 地址碰撞
        this.type = 0;
      } else {
        // 地址分析
        this.type = 1;
      }
      if (this.type === 1) {
        this.$axios({
          method: "get",
          // url: this.global.localURL
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
          // url: this.global.localURL
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
      } else if (this.type === 0) {
        // const specialWords = ["旁边", "附近", "左边", "右边"]; //任意多个
        this.splitWords = this.address.replace(new RegExp(specialWords.join("|"), "g"), function(a) {
          return '<font style="color:red">' + a + "</font>";
        });
        this.$axios({
          method: "get",
          // url: `${this.global.localURL}` + "/pengzhuang"
          url: `${this.global.baseURL}` + "/addrCollide?address=" + `${this.address}`
        })
          .then(res => {
            loading.close();
            console.log(res);
            this.best_match_result = res.data.best_match;
            this.rest_match_result = res.data.rest_match;
            this.is_ResultList = true;
          })
          .catch(err => {
            loading.close();
            this.$message.error("哦噢！数据出错了，请联系系统管理员");
          });
      }
    },
    handleSplitWord() {
      this.tags = [];
      this.best_match_result = "";
      this.rest_match_result = "";
      this.is_ResultList = false;
      this.rest_match = false;
    },
    handleSplitWordCollision() {
      this.splitWords = "";
      this.address = "";
      this.best_match_result = "";
      this.rest_match_result = "";
      this.is_ResultList = false;
      this.rest_match = false;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (this.tags.length === 0) {
        this.is_ResultList = false;
        this.rest_match = false;
      }
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
.special-word {
  background: #ffffff;
  position: absolute;
  width: 70%;
  top: 1px;
  left: 18%;
  height: 43px;
  line-height: 43px;
}
.el-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
  margin-right: 10px;
  /* margin-top: 10px; */
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>

