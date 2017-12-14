<template>
  <div class='taskDetails'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <div class='details-content' v-if="detailsData">
      <div class='task-top-box'>
        <pub-avatar class='task-details-avatar' type="large" v-if="detailsData.initiatorUserInfo" :imgsrc="detailsData.initiatorUserInfo.imgsrc" :name="detailsData.initiatorUserInfo.realname"></pub-avatar>
        <div class='task-title-content'>
          <p class='task-title'>{{detailsData.name}}</p>
          <p class='task-content'>{{detailsData.content}}</p>
        </div>
      </div>
      <mt-cell label="负责人" class='avatar-cell task-details-item'>
        <pub-avatar class='task-details-avatar' v-if="detailsData.principalUserInfo" :imgsrc="detailsData.principalUserInfo.imgsrc" :name="detailsData.principalUserInfo.realname"></pub-avatar>
      </mt-cell>
      <mt-cell label="执行人" class='avatar-cell task-details-item slide-cell'>
        <div class="avatar-item-wrap" v-if="detailsData.operatorUserInfo &&detailsData.operatorUserInfo.length !=0">
          <pub-avatar class='task-details-avatar' v-for="item in detailsData.operatorUserInfo" :key="item.imgsrc" :imgsrc="item.imgsrc" :name="item.realname"></pub-avatar>
        </div>
        <div v-else>无</div>
      </mt-cell>
      <mt-cell label="开始时间" class="task-details-item">
        {{detailsData.starttime | timeFilter("YYYY.MM.DD HH:mm")}}
      </mt-cell>
      <mt-cell label="开始时间" class="task-details-item">
        {{detailsData.deadline | timeFilter("YYYY.MM.DD HH:mm")}}
      </mt-cell>
      <mt-cell label="紧急程度" class="task-details-item level-item">
        <span :class="detailsData.levelObj.class">{{detailsData.levelObj.str}}</span>
      </mt-cell>
      <pub-show-file class='task-file' label="上传的附件" :fileData="detailsData.attachment"></pub-show-file>
      <div class='remind-cell task-details-item' @click="toSetRemind" v-if="remindShow">
        <mt-cell label="设置提醒" is-link></mt-cell>
      </div>
      <div class="task-node-box" v-if="detailsData.examining.length >0">
        <p class='node-box-label'>{{nodeLabel}}</p>
        <task-node :nodeData="detailsData.examining" :detailsData="detailsData"></task-node>
      </div>
    </div>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
import pubShowInput from "../public/PubShowInput";
import pubAvatar from "../public/PubAvatar";
import pubShowFile from "../public/PubShowFile";
import taskNode from "./TaskNode";
export default {
  name: "taskDetails",
  components: {
    pubHeader,
    pubShowInput,
    pubAvatar,
    pubShowFile,
    taskNode
  },
  data() {
    return {
      headerData: {
        backUrl: { name: "task" },
        title: "任务详情"
      },
      detailsData: null
    };
  },
  computed: {
    remindShow() {
      let detailsParams = this.$store.state.task.detailsParams;
      if (detailsParams.taskType && detailsParams.status == 1) {
        return true;
      } else {
        return false;
      }
    },
    nodeLabel() {
      let type = this.$store.state.task.detailsParams.status;
      if (type == 1) {
        return "收到的附件";
      } else if (type == 2) {
        return "添加附件";
      } else {
        return "负责人上传的附件";
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "task") {
        let data = {
          remind: "",
          reday: "",
          taskId: "",
          from: ""
        };
        this.$store.commit("SAVEREMINDTIME", data);
      }
    }
  },
  created() {
    if (this.$store.state.task.detailsParams.taskType == 1) {
      this.$set(this.headerData, "btnText", "撤销");
    }
    this.getDetails();
  },
  methods: {
    getDetails() {
      let params = {
        access_token: this.$store.state.userInfo.access_token,
        taskId: this.$store.state.task.detailsParams.taskId,
        userId: this.$store.state.userInfo.userId,
        taskType: this.$store.state.task.detailsParams.taskType
      };
      console.log("获取任务详情参数", params);
      this.$post({ url: "/oa-work/task/selectById", postData: params })
        .then(data => {
          this.headerData.title = data.name;
          data.levelObj = this.getLevelType(data.level);
          this.detailsData = data;
          this.getUsers();
          console.log("获取任务详情", data);
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("获取任务详情失败,请重试");
        });
    },
    //获取负责人，执行人，发起人的用户信息
    getUsers() {
      let tempData = this.detailsData;
      this.$getMan(tempData.initiator_id).then(data => {
        this.$set(this.detailsData, "initiatorUserInfo", data);
      });

      this.$getMan(tempData.principal_id).then(data => {
        this.$set(this.detailsData, "principalUserInfo", data);
      });
      if (tempData.operatorIdList.length != 0) {
        let arr = [];
        tempData.operatorIdList.forEach(item => {
          this.$getMan(item).then(data => {
            arr.push(data);
          });
          this.$set(this.detailsData, "operatorUserInfo", arr);
        });
      }
    },
    //跳转到设置提醒
    toSetRemind() {
      let data = {
        remind: "",
        reday: "",
        from: "details",
        taskId: this.detailsData.id
      };
      if (this.$store.state.task.remindTime.remind) {
        data.remind = this.$store.state.task.remindTime.remind;
      }
      if (this.$store.state.task.remindTime.reday) {
        data.reday = this.$store.state.task.remindTime.reday;
      }
      if (this.detailsData.remind) {
        data.remind = this.detailsData.remind;
      }
      if (this.detailsData.reday) {
        data.reday = this.detailsData.reday;
      }
      // console.log("data", data);
      this.$store.commit("SAVEREMINDTIME", data);
      this.$router.push({ name: "taskRemindTime" });
    },
    /**获取任务等级 */
    getLevelType(level) {
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


<style lang='scss'>
.taskDetails {
  height: 100%;
  .details-content {
    @include contentHeight(1,0);
    overflow-y: scroll;
    .task-top-box {
      @include clearFix();
      padding: 0.6rem 1.2rem 1.2rem;
      .task-details-avatar {
        float: left;
      }
      .task-title-content {
        margin-left: 1.5rem;
        float: left;
        max-width: 75%;
        .task-title {
          font-size: 1.5rem;
          color: $font-11;
          margin-bottom: 1rem;
          text-align: justify;
        }
        .task-content {
          font-size: 1.3rem;
          text-align: justify;
          color: $font-11;
        }
      }
    }
    .task-details-item {
      height: 5rem;
      line-height: 5rem;
      .mint-cell-label {
        font-size: 1.5rem;
        color: $font-99;
      }
      .mint-cell-value {
        margin-right: 0;
      }

      &.avatar-cell {
        height: 5.6rem;
        margin-bottom: 1rem;
        line-height: 5.6rem;
        &.slide-cell {
          .mint-cell-value {
            max-width: 80%;
            height: 100%;
            .avatar-item-wrap {
              white-space: nowrap;
              overflow-x: scroll;
              padding: 0.6rem 0;
              .task-details-avatar {
                // text-align: right;
                display: inline-block;
                margin-left: 1.5rem;
              }
            }
          }
        }
      }
      &.level-item {
        .red {
          color: $danger;
        }
        .grey {
          color: $bg-bc;
        }
        .orange {
          color: $warning;
        }
        .blue {
          color: $secondary;
        }
      }
    }
    .task-file {
      background: $bg-white;
      padding: 1.2rem;
      .label {
        color: $font-11;
      }
    }
    .remind-cell {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      .mint-cell-label {
        color: $font-11;
      }
      &:last-child {
        margin-bottom: 3.5rem;
      }
    }
    .task-node-box {
      margin-top: 1.3rem;
      .node-box-label {
        padding: 0 1.2rem;
        font-size: 1.5rem;
        color: $font-11;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
