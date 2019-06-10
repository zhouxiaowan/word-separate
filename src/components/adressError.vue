<template>
  <div>
    <div class="address">请输入地址：</div>
    <div class="addressError">
      <el-input placeholder="请输入地址" v-model="address" @keyup.enter.native="adrAnaly">
        <template slot="append">
          <a href="#" @click="adrAnaly">地址纠错查询</a>
        </template>
      </el-input>
    </div>
    <div style="display:flex ;margin-left:20px;">
      <div class="result">
        <span class="analysis-result">分析结果:</span>
        <div class="error">地址纠错</div>
        <img class="imgae" src="../assets/img/4.png">
      </div>
      <div v-if="is_ResultList">
        <div class="listed">{{address}}</div>
        <ul v-for="list in result2 " :key="list">
          <li>
            <div class="lists">{{list=='null'||list==''?'暂无纠错':list}}</div>
          </li>`
        </ul>
        <p>
          <img class="del_list" @click="handleListResult" src="../assets/img/del.png">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      is_ResultList: false,
      result2: ""
    };
  },
  components: {},
  methods: {
    adrAnaly() {
      this.$http.get("http://localhost:5000/correct?address=" + `${this.address}`).then(response => {
        this.result2 = JSON.parse(response.request.response).result2;
        this.is_ResultList = true;
      });
    },
    handleListResult() {
      this.address = [];
      this.is_ResultList = false;
    }
  }
};
</script>
<style scoped>
.address {
  top: 42px;
  position: relative;
  text-align: left;
  font-size: 16px;
  left: -150px;
  color: #c2c5d5;
  width: 500px;
}

a {
  position: relative;
  list-style: none;
  text-decoration: none;
  color: #909399;
}
ul {
  margin-top: 45px;
}
li {
  list-style: none;
  display: flex;
}
.lists {
  background-color: #ececec;
  color: rgb(83, 78, 78);
  margin-top: -82px;
  width: 105px;
  height: 30px;
  border-radius: 6px;
  font-size: 15px;
  z-index: 999;
  margin-left: 505px;
  margin-right: 390px;
  text-align: center;
  padding-top: 7px;
  top: 50%;
}
.listed {
  background-color: #ececec;
  color: rgb(83, 78, 78);
  width: 100px;
  height: 30px;
  border-radius: 6px;
  font-size: 15px;
  margin-left: 10px;
  margin-right: 390px;
  text-align: center;
  padding-top: 7px;
  margin-top: 105px;
  top: 50%;
}
.result {
  position: absolute;
  text-align: left;
  font-size: 16px;
  margin-left: -26px;
  top: 100px;
  float: left;
  z-index: 100;
  color: cornflowerblue;
}
.imgae {
  width: 390px;
  margin-left: 140px;
  position: relative;
  top: -10px;
}
.analysis-result {
  position: relative;
  top: 25px;
  font-size: 16px;
  left: -145px;
  color: #c2c5d5;
}
.error {
  width: 160px;
  height: 30px;
  margin-left: 295px;
  margin-top: 50px;
  color: #ececec;
}
.tags {
  position: absolute;
  top: 23px;
  left: 13%;
}
.el-tag {
  margin-right: 10px;
}
.del_list {
  width: 40px;
  cursor: pointer;
  margin-top: 50px;
  margin-top: 35px;
  margin-left: -41%;
}
.addressError {
  margin-top: 9px;
  margin-left: -50px;
  width: 134%;
}
</style>

