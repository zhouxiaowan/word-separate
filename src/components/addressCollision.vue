<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="margin-top:15px">
          <el-col :span="4">
            <p class="input_header">请输入地址</p>
          </el-col>
          <el-col :span="20">
            <el-input v-if="address" placeholder="请输入地址" v-model="address" @keyup.enter.native="addrCollision">
              <el-button slot="append" icon="el-icon-search" @click="addrCollision"></el-button>
            </el-input>
            <el-input v-else placeholder="请输入地址" v-model="address">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="special-word" v-if="splitWords.length">
              <el-row>
                <el-col :span="21" style="text-align:left" v-html="splitWords"></el-col>
                <el-col :span="3">
                  <p class="clear_p">
                    <img @click="handleSplitWord" class="clear_input2" src="../assets/img/clear.png">
                  </p>
                </el-col>
              </el-row>
            </div>
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
          <div v-show="rest_match">
            <p class="collision-result">碰撞地址对结果</p>
            <div class="collision-result-list" v-for="(item,index) in rest_match_result" :key="index">
              <el-row>
                <el-col :span="1" class="collision-list">{{index+1}}:</el-col>
                <el-col :span="21" style="text-align:left">
                  <div class="left-result-list">
                    <span class="tag-sort">A{{index+1}}</span>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.city">{{item.left.city}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.county">{{item.left.county}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.village">{{item.left.village}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.community">{{item.left.community}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.road">{{item.left.road}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.left.hamlet">{{item.left.hamlet}}</el-button>
                  </div>
                  <div class="right-result-list">
                    <span class="tag-sort">B{{index+1}}</span>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.city">{{item.right.city}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.county">{{item.right.county}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.village">{{item.right.village}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.community">{{item.right.community}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.road">{{item.right.road}}</el-button>
                    <el-button :type="buttontype[item.tag]" round v-if="item.right.hamlet">{{item.right.hamlet}}</el-button>
                  </div>
                </el-col>
                <el-col :span="2" class="collision-list">{{item.tag === 0?"已选中":""}}</el-col>
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
      is_ResultList: false,
      addressMatching: [],
      address: "",
      splitWords: "",
      loading: false,
      best_match_result: "",
      rest_match_result: "",
      rest_match: false,
      buttontype: ["primary", ""]
    };
  },
  mounted() {},
  methods: {
    addrCollision() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //   const specialWords = ["旁边", "附近"];
      //   const splittags = [];
      //   specialWords.forEach(value => {
      //     if (this.address.indexOf(value) > 0) {
      //       splittags.push(this.address.indexOf(value));
      //       splittags.push(this.address.indexOf(value) + value.length);
      //     }
      //   });
      //   const splittagsSort = splittags.sort((a, b) => {
      //     return a - b;
      //   });
      const specialWords = ["旁边", "附近", "左边", "右边"]; //任意多个
      this.splitWords = this.address.replace(new RegExp(specialWords.join("|"), "g"), function(a) {
        return '<font style="color:red">' + a + "</font>";
      });

      this.$axios({
        method: "get",
        // url: "http://10.9.74.16:3000/"
        url: `${this.global.baseURL}` + "/addrCollide?address=" + `${this.address}`
      })
        .then(res => {
          loading.close();
          this.best_match_result = res.data.result.best_match;
          this.rest_match_result = res.data.result.rest_match;
          this.is_ResultList = true;
        })
        .catch(err => {
          loading.close();
          this.$message.error("哦噢！数据出错了，请联系系统管理员");
        });
    },
    isRestMatch() {
      this.rest_match = !this.rest_match;
    },
    handleSplitWord() {
      this.splitWords = "";
      this.address = "";
      this.best_match_result = "";
      this.rest_match_result = "";
      this.is_ResultList = false;
      this.rest_match = false;
    }
  }
};
</script>
<style>
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
  text-align: right;
}
.clear_input2 {
  cursor: pointer;
  width: 20px;
  vertical-align: text-top;
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
.collision-result {
  margin-top: 50px;
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
.collision-result-list {
  margin-bottom: 10px;
}
.left-result-list {
  margin-bottom: 20px;
}
.right-result-list {
  margin-bottom: 20px;
}
.collision-list {
  color: #ffffff;
  line-height: 100px;
}
.tag-sort {
  color: #ffffff;
  margin-left: 20px;
  margin-right: 10px;
}
.el-input__inner {
  height: 45px;
  line-height: 45px;
}
.special-word {
  background: #ffffff;
  position: absolute;
  width: 73%;
  top: 1px;
  left: 18%;
  height: 43px;
  line-height: 43px;
}
</style>


