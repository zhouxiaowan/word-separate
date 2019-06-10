<template>
  <div class="adressSelect">
    <div class="search_wrap">
      <div class="name text">请输入地址：</div>
      <div class="input_wrap">
        <el-input placeholder="请输入地址" v-model="address" @keyup.enter.native="adrAnaly">
          <template slot="append">
            <a href="#" @click="adrAnaly">地址别名查询</a>
          </template>
        </el-input>
      </div>
    </div>
    <span class="text result_title" v-show="is_ResultList">分析结果：</span>
    <div class="result_wrap" v-show="is_ResultList">
      <div class="left">
        <div class="item address" style="width:120px">{{address}}</div>
      </div>
      <div class="middle">
        <div class="text short-name">简称</div>
        <div class="text full-name">全称</div>
        <img class="background" src="../assets/img/5.png">
      </div>
      <div class="right">
        <div class="short-name_wrap">
          <div class="item" v-for="(item, index) of shortNameList" :key="index">{{item=='null'||item==''?'暂无简称':item}}</div>
        </div>
        <div class="full-name_wrap">
          <div class="item" v-for="(item, index) of fullNameList" :key="index">{{item=='null'||item==''?'暂无全称':item}}</div>
        </div>
      </div>
      <p>
        <img class="del_list" @click="handleListResult" src="../assets/img/del.png">
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      address: "",
      result1: [],
      is_ResultList: false
    };
  },
  components: {},
  mounted() {},
  methods: {
    adrAnaly() {
      this.$http.get("http://localhost:5000/abbreviation?address=" + `${this.address}`).then(response => {
        this.result1 = JSON.parse(response.request.response).result1;
        this.is_ResultList = true;
      });
    },
    handleListResult() {
      this.address = [];
      this.is_ResultList = false;
    }
  },
  computed: {
    shortNameList() {
      // let list = [];
      // this.result1.map(item => {
      //   if (item.word1) list.push(item.word1);
      // });
      // return list;
      //},
      let list = [];
      let len = this.result1.length;
      let hasAllNull = false;
      this.result1.map(item => {
        if (item.word1 == "null" || item.word1 == "") {
          len = len - 1;
          if (len == 0) hasAllNull = true;
        } else {
          list.push(item.word1);
        }
      });
      if (hasAllNull) return ["null"];
      return list;
    },
    fullNameList() {
      // let list = [];
      //this.result1.map(item => {
      //if (item.word2) list.push(item.word2);
      //});
      //return list;
      let list = [];
      let len = this.result1.length;
      let hasAllNull = false;
      this.result1.map(item => {
        if (item.word2 == "null" || item.word2 == "") {
          len = len - 1;
          if (len == 0) hasAllNull = true;
        } else {
          list.push(item.word2);
        }
      });
      if (hasAllNull) return ["null"];
      return list;
    }
  }
};
</script>
<style scoped>
.adressSelect {
  display: flex;
  text-align: left;
  margin: 0 auto;
  /* width: 75%; */
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}
.adressSelect .search_wrap {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
.adressSelect .search_wrap .name {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  width: 100px;
  color: #c2c5d5;
  font-size: 16px;
}
.adressSelect .search_wrap .input_wrap {
  flex: 1;
}

.adressSelect .result_wrap {
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.adressSelect .result_title {
  margin-top: 50px;
  margin-left: 125px;
  width: 100px;
  text-align: right;
  color: #c2c5d5;
  font-size: 16px;
}

.adressSelect .result_wrap .left {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: -200px;
}
.adressSelect .result_wrap .left .address {
  position: absolute;
  right: -2px;
  top: 50px;
}
.adressSelect .result_wrap .middle {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
}
.adressSelect .result_wrap .middle .short-name {
  letter-spacing: 15px;
  text-align: center;
}
.adressSelect .result_wrap .middle .background {
  display: block;
  width: 400px;
  height: 100px;
}
.adressSelect .result_wrap .middle .full-name {
  letter-spacing: 15px;
  position: absolute;
  margin-top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
.adressSelect .result_wrap .right {
  min-height: 140px;
  padding-left: 50%;
  margin-left: 156px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.adressSelect .result_wrap .right .short-name_wrap {
  height: 84px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 15px;
  padding-right: -30px;
}
.adressSelect .result_wrap .right .full-name_wrap {
  height: 84px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 15px;
}
.text {
  color: #fff;
}

.item {
  margin: 4px;
  display: flex;
  width: 59%;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: rgb(83, 78, 78);
  background: #fff;
  padding: 0 4px;
  height: 30px;
  border-radius: 10px;
  box-sizing: border-box;
}

a {
  list-style: none;
  text-decoration: none;
  color: #909399;
}
.del_list {
  width: 40px;
  cursor: pointer;
  margin-top: 140px;
  /* margin-top: 195px; */
  margin-left: -53%;
  position: absolute;
}
.result_wrap {
  left: -90px;
}
.search_wrap {
  width: 75%;
  margin-left: 140px;
}
</style>

