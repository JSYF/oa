<template>
  <div class='taskList'>
    <slide-btn class='slide-bar' v-model="slideIndex" from="task"></slide-btn>
    <div class='task-content'>
      <div class='filterbar'>
        <task-filter v-model="fileterData"></task-filter>
      </div>
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change='loadTopStauts'>
        <div class='list-wrap' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <mt-button v-for="(item,index) in listData" :key='item.id' class='task-item' @click='toDetails(item)'>
            <span class="isRevoke" v-if="item.status == 4">
              <i class='oa-icon check-revoke'></i>
            </span>
            <span class='isOverdue' v-if="item.taskTime.isOverdue">逾期</span>
            <div class='avatar'>
              <img v-if="item.initiatorUserInfo" :src="item.initiatorUserInfo.imgsrc">
            </div>
            <div class='content-wrap'>
              <p class='title'>{{item.name}}</p>
              <p class='principalName'>负责人:{{item.principal_name}}</p>
              <p class='endTime'>距离截止时间还有：
                <span :class="[item.taskTime.class,'task-time']">{{item.taskTime.time}}
                  <i class='oa-icon Tenure'></i>
                </span>
              </p>
            </div>
            <p :class="[item.taskLevel.class,'level']">
              <span>{{item.taskLevel.str}}</span>
            </p>
            <div class='task-item-bg'></div>
          </mt-button>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <span class='icon' v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
            <i class='oa-icon break1'></i>
          </span>
          <span class='refreshing' v-show="topStatus === 'loading'"><img src="~@/assets/img/refreshing.png"></span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>


<script>
import slideBtn from "../public/SlideBtn";
import taskFilter from "./Filter";
import moment from "moment";
export default {
  name: "taskList",
  props: ["id"], // id 0//我发起的 1//我负责的 2我执行的
  components: { slideBtn, taskFilter },
  data() {
    return {
      slideIndex: 1, //1 未完成 3已完成
      listPage: this.$store.state.task.listPageNum, //分页数
      fileterData: {
        deadline: "",
        level: ""
      },
      showData: {
        list: [],
        startNum: 0,
        status: 1
      },
      loading: false,
      topStatus: null
    };
  },
  computed: {
    listData() {
      let data = this.showData.list;
      data.forEach((item, index) => {
        //获取发起人资料
        this.$getMan(item.initiator_id).then(data => {
          this.$set(this.listData[index], "initiatorUserInfo", data);
        });
        item.taskTime = this.calTime(item.deadline);
        item.taskLevel = this.returnTaskLevel(item.level);
      });
      return data;
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    fileterData() {
      this.showData.list = [];
      this.showData.startNum = 0;
      this.getList();
    },
    slideIndex() {
      this.showData.list = [];
      this.showData.startNum = 0;
      this.showData.status = this.slideIndex;
      this.getList();
    }
  },
  methods: {
    getList(obj) {
      let index = null;
      let param = {
        access_token: this.$store.state.userInfo.access_token,
        id: this.$store.state.userInfo.userId,
        type: parseInt(this.id) + 1,
        num: this.listPage,
        startNum: this.showData.startNum,
        status: this.showData.status,
        companyId: this.$store.state.userInfo.company_id
      };
      if (this.fileterData.deadline != "") {
        param.deadline = this.fileterData.deadline;
      }
      if (this.fileterData.level != "") {
        param.level = this.fileterData.level;
      }
      if (obj && obj.index) {
        index = obj.index;
      } else {
        index = this.slideIndex;
      }
      console.log("任务参数", param);
      this.$post({ url: "/oa-work/task/selectTask", postData: param })
        .then(data => {
          console.log("success", data);
          let list = this.showData.list;
          data.result.forEach(item => {
            list.push(item);
          });
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("获取任务列表失败");
        });
    },
    toDetails(item) {
      console.log("item", item);
      let detailsParam = {
        taskId: item.id,
        taskType: parseInt(this.id + 1),
        status: this.slideIndex
      };
      this.$store.commit("SAVEDETAILSPARAMS", detailsParam);
      this.$router.push({ name: "taskDetails" });
    },
    loadTop() {},
    loadTopStauts(status) {
      this.topStatus = status;
    },
    loadMore() {},
    calTime(time) {
      let nowTime = moment().valueOf();
      let returnData = {
        isOverdue: false,
        time: "0",
        class: ""
      };
      if (time < nowTime) {
        //逾期
        returnData.isOverdue = true;
      } else {
        let pareTime = time - nowTime;
        let daysTime = Math.floor(pareTime / (24 * 3600 * 1000));
        let hoursTempTime = pareTime % (24 * 3600 * 1000);
        let hoursTime = Math.floor(hoursTempTime / (3600 * 1000));
        let minutesTempTime = hoursTempTime % (3600 * 1000);
        let minutesTime = Math.floor(minutesTempTime / (60 * 1000));
        if (daysTime == 0) {
          returnData.time = hoursTime + ":" + minutesTime;
          returnData.class = "danger";
        } else {
          returnData.class = "default";
          returnData.time =
            daysTime + "天" + " " + hoursTime + ":" + minutesTime;
        }
      }
      return returnData;
    },
    returnTaskLevel(level) {
      let returnObj = {
        class: "",
        str: ""
      };
      if (level == 1) {
        returnObj.str = "不紧急不重要";
        returnObj.class = "grey";
      } else if (level == 2) {
        returnObj.str = "重要不紧急";
        returnObj.class = "blue";
      } else if (level == 3) {
        returnObj.str = "紧急不重要";
        returnObj.class = "orange";
      } else {
        returnObj.str = "重要且紧急";
        returnObj.class = "red";
      }
      return returnObj;
    }
  }
};
</script>
<style lang="scss">
.taskList {
  height: 100%;
  .slide-bar {
    background: $bg-f6;
  }
  .task-content {
    margin-top: $slideBarHeight;
    overflow-y: scroll;
    height: calc(100% - #{$slideBarHeight});
    .filterbar {
      margin-bottom: 1rem;
    }
    .list-wrap {
      padding: 0 1rem;
    }
    .task-item {
      width: 100%;
      position: relative;
      margin-bottom: 1rem;
      height: calc(10rem + 0.7rem);
      .mint-button-text {
        overflow: hidden;
        top: 0;
        width: 100%;
        position: absolute;
        height: calc(10rem - 2rem);
        display: block;
        border-radius: 1rem;
        padding: 1rem 0 1rem 1.2rem;
        background: $bg-white;
        box-shadow: 0px 7px 12px 0px rgba(165, 165, 165, 0.08),
          0px 2px 9px 0px rgba(191, 191, 191, 0.18);
        @include clearFix();
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0rem;
        z-index: -1;
        border-radius: 1rem;
        background: white;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0px 10px 13px 0px rgba(156, 156, 156, 0.15);
        width: calc(100% - 3rem);
        height: 0.7rem;
      }
      .isOverdue {
        position: absolute;
        text-align: center;
        font-size: 0.9rem;
        color: white;
        display: block;
        width: 5.3rem;
        height: 1.5rem;
        left: -1.25rem;
        top: 0.6rem;
        transform: rotate(-45deg);
        background: $bg-88;
        box-shadow: 0px 4px 10px 3px rgba(180, 180, 180, 0.39);
      }
      .isRevoke {
        position: absolute;
        top: 0;
        right: 5.2rem;
        .oa-icon {
          font-size: 6.3rem;
        }
      }
      .avatar {
        float: left;
        width: 4.5rem;
        height: 100%;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          border-radius: 50%;
          height: 4.5rem;
          width: 4.5rem;
        }
      }
      .content-wrap {
        margin-left: 1rem;
        font-size: 1.4rem;
        color: $font-99;
        text-align: left;
        float: left;
        .title {
          font-size: 1.5rem;
          color: $font-11;
        }
        .principalName {
          margin: 1.3rem 0 0.9rem;
        }
        .task-time {
          font-size: 1.3rem;
          .oa-icon {
            font-size: 1.2rem;
          }
          &.default {
            color: $secondary;
          }
          &.danger {
            color: $danger;
          }
        }
      }
      .level {
        position: absolute;
        right: 0.9rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.8rem;
        font-size: 1.2rem;
        color: white;
        height: 9.1rem;
        border-top-left-radius: 1.3rem;
        border-bottom-left-radius: 1.3rem;
        span {
          position: absolute;
          display: block;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        &.red {
          background: $danger;
        }
        &.grey {
          background: $bg-bc;
        }
        &.orange {
          background: $warning;
        }
        &.blue {
          background: $secondary;
        }
      }
    }
  }
}
</style>

