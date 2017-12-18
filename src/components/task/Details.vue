<template>
  <div class='taskDetails'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="revoke"></pubHeader>
    <div :class="[hasFooter?'hasfooter':'','details-content']" v-if="detailsData">
      <div class='task-top-box'>
        <pub-avatar class='task-details-avatar' type="large" v-if="detailsData.initiatorUserInfo" :imgsrc="detailsData.initiatorUserInfo.imgsrc" :name="detailsData.initiatorUserInfo.realname"></pub-avatar>
        <div :class="[detailsData.content == ''?'no-content':'','task-title-content']">
          <p class='task-title'>{{detailsData.name}}</p>
          <p class='task-content' v-if="detailsData.content!=''">{{detailsData.content}}</p>
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
      <mt-cell label="结束时间" class="task-details-item">
        {{detailsData.deadline | timeFilter("YYYY.MM.DD HH:mm")}}
      </mt-cell>
      <mt-cell label="紧急程度" class="task-details-item level-item">
        <span :class="detailsData.levelObj.class">{{detailsData.levelObj.str}}</span>
      </mt-cell>
      <pub-show-file class='task-file' label="上传的附件" :fileData="detailsData.attachment"></pub-show-file>
      <div class='remind-cell task-details-item' @click="toSetRemind" v-if="remindShow">
        <mt-cell label="设置提醒" is-link></mt-cell>
      </div>
      <div class="task-node-box" v-if="nodeLabelShow">
        <p class='node-box-label'>{{nodeLabel}}</p>
        <pub-file v-model='principalData' v-if="addFileShow"></pub-file>
        <task-node :nodeData="detailsData.examining" :detailsData="detailsData" v-if="detailsData.examining.length >0"></task-node>
      </div>
      <div class="task-footer" v-if="hasFooter">
        <div class='footer-box' v-if="footerStatus == 1">
          <mt-button class='initiator-btn btns success' @click="toTaskCheck(1)">
            <i class='oa-icon agree footer-icon'></i>验收通过</mt-button>
          <mt-button class='initiator-btn btns error' @click="toTaskCheck(0)">
            <i class='oa-icon disagree footer-icon'></i>验收不通过</mt-button>
        </div>
        <mt-button class='principal-btn btns' @click="submitPrincipal" v-else-if="footerStatus == 2">
          <i class='oa-icon agree footer-icon'></i>已完成请验收</mt-button>
        <mt-button class='principal-btn' disabled v-else>
          <i class='oa-icon agree footer-icon'></i>
          发起人验收中，请等待</mt-button>
      </div>
    </div>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
import pubShowInput from "../public/PubShowInput";
import pubAvatar from "../public/PubAvatar";
import pubShowFile from "../public/PubShowFile";
import pubFile from "../public/PubFile";
import taskNode from "./TaskNode";
export default {
  name: "taskDetails",
  components: {
    pubHeader,
    pubShowInput,
    pubAvatar,
    pubShowFile,
    taskNode,
    pubFile
  },
  data() {
    return {
      headerData: {
        backUrl: { name: "task" },
        title: "任务详情"
      },
      detailsData: null,
      principalData: {
        imgList: [],
        fileList: []
      }
    };
  },
  computed: {
    remindShow() {
      let detailsParams = this.$store.state.task.detailsParams;
      if (this.detailsData.deadline < Date.parse(new Date())) {
        return false;
      }
      if (detailsParams.taskType == 1 && this.detailsData.status == 1) {
        return true;
      } else {
        return false;
      }
    },
    //节点标题
    nodeLabel() {
      let type = this.$store.state.task.detailsParams.taskType;
      if (type == 1) {
        return "收到的附件";
      } else if (type == 2) {
        return "添加附件";
      } else {
        return "负责人上传的附件";
      }
    },
    // 节点label是否显示
    nodeLabelShow() {
      let type = this.$store.state.task.detailsParams.taskType;
      if (this.detailsData.examining.length > 0) {
        return true;
      } else if (type == 2 && this.addFileShow) {
        return true;
      } else {
        return false;
      }
    },
    //添加附件是否显示
    addFileShow() {
      if (this.detailsData.deadline < Date.parse(new Date())) {
        return false;
      }
      if (
        this.detailsData.status == 1 &&
        this.$store.state.task.detailsParams.taskType == 2
      ) {
        return true;
      } else {
        return false;
      }
    },
    //是否有尾部
    hasFooter() {
      let returnStatus = 0;
      let type = this.$store.state.task.detailsParams.taskType;
      let status = this.detailsData.status;
      if (this.detailsData.deadline < Date.parse(new Date())) {
        return false;
      }
      if (type != 3) {
        if (type == 2 && (status == 1 || status == 2)) {
          returnStatus = 1;
        }
        if (type == 1 && status == 2) {
          returnStatus = 1;
        }
      }
      if (returnStatus == 0) {
        return false;
      } else {
        return true;
      }
    },
    //尾部状态  1 发起人  2 审批人（未完成） 3 审批人(验收中)
    footerStatus() {
      if (this.$store.state.task.detailsParams.taskType == 1) {
        return 1;
      } else if (this.detailsData.status == 1) {
        return 2;
      } else {
        return 3;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (from.name == "task" && to.name == "taskDetails") {
        this.getDetails();
      }
      if (from.name == "taskDetails" && to.name == "task") {
        this.detailsData = null;
        this.headerData.title = "任务详情";
      }
      if (from.name == "taskRemindTime" && to.name == "taskDetails") {
        let status = this.$store.state.task.remindToDetails;
        console.log("status", status, status == false);
        if (status == true) {
          this.getDetails();
          this.$store.commit("SAVEREMINDToDETAILS", false);
        }
      }
    }
  },
  mounted() {
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
      // console.log("获取任务详情参数", params);
      this.$post({ url: "/oa-work/task/selectById", postData: params })
        .then(data => {
          this.headerData.title = data.name;
          data.levelObj = this.getLevelType(data.level);
          this.detailsData = data;
          console.log("获取任务详情", data);
        })
        .then(() => {
          this.getUsers();
          this.canRevoke();
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
        remind: this.detailsData.remind,
        reday: this.detailsData.reday,
        taskId: this.detailsData.id,
        isRemind: this.detailsData.is_remind
      };
      this.$store.commit("SAVEDETAILSTOREMINDDATA", data);
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
    },
    /**发起验收 */
    submitPrincipal() {
      let param = {
        access_token: this.$store.state.userInfo.access_token,
        taskId: this.detailsData.id,
        initiatorId: this.detailsData.initiator_id,
        taskType: 1
      };
      let arr = [];
      this.principalData.imgList.forEach(item => {
        arr.push({ fileName: item.path, type: "image" });
      });
      this.principalData.fileList.forEach(item => {
        arr.push({
          fileName: item.path,
          type: "file",
          name: item.fileName,
          size: item.fileSize
        });
      });
      param.principal_file = JSON.stringify(arr);
      console.log("发起验收参数", param);
      this.$post({ url: "/oa-work/task/submitTask", postData: param })
        .then(() => {
          this.getDetails();
          this.$toast("发起验收成功");
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("发起验收失败,请重试");
        });
    },
    //跳转到验收任务页面
    toTaskCheck(type) {
      let param = {
        taskId: this.detailsData.id,
        examiningId: this.detailsData.examining[0].id,
        principalId: this.detailsData.principal_id,
        type: type,
        taskType: this.$store.state.task.detailsParams.taskType
      };
      this.$store.commit("SAVETASKCHECKDATA", param);
      this.$router.push({ name: "taskCheck" });
    },
    //是否有撤销按钮
    canRevoke() {
      if (this.detailsData.deadline < Date.parse(new Date())) {
        this.$set(this.headerData, "btnText", "");
        return;
      }
      if (
        (this.detailsData.status == 1 || this.detailsData.status == 2) &&
        this.$store.state.task.detailsParams.taskType == 1
      ) {
        this.$set(this.headerData, "btnText", "撤销");
      } else {
        this.$set(this.headerData, "btnText", "");
      }
    },
    //撤销任务
    revoke() {
      let param = {
        access_token: this.$store.state.userInfo.access_token,
        taskId: this.detailsData.id,
        principalId: this.detailsData.principal_id
      };
      this.$post({ url: "/oa-work/task/repealTask", postData: param })
        .then(data => {
          this.$toast("撤销任务成功");
          this.$store.commit("LISTSHOULDREFRESH", true);
          this.getDetails();
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("撤销任务失败,请重试");
        });
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
    &.hasfooter {
      height: calc(100% - #{$taskFooterHeight} - #{$header-height});
    }
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
        &.no-content {
          // background:red;
          .task-title {
            margin-top: 1.3rem;
          }
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
    .task-footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: white;
      border-top: 1px solid $border-ec;
      height: $taskFooterHeight;
      text-align: center;
      line-height: $taskFooterHeight;
      display: block;
      @include clearFix();
      .footer-icon {
        display: inline-block;
        vertical-align: middle;
        height: 2.2rem;
        width: 2.2rem;
        margin-right: 0.5rem;
        font-size: 1rem;
        color: white;
        position: relative;
        border-radius: 50%;
        &::before {
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          position: absolute;
        }
      }
      .btns {
        height: 100%;
        .mint-button-text {
          height: 100%;
          display: block;
          line-height: 5rem;
          color: $font-11;
          font-size: 1.5rem;
        }
      }
      .initiator-btn {
        width: 50%;
        float: left;
        position: relative;
        &.success {
          .footer-icon {
            background: $secondary;
          }
        }
        &.error {
          .footer-icon {
            background: $danger;
          }
        }

        &:first-child {
          &::before {
            content: "";
            position: absolute;
            right: 0;
            top: 15%;
            width: 1px;
            height: 70%;
            background: $bg-ec;
          }
        }
      }
      .principal-btn {
        height: 100%;
        display: block;
        width: 100%;
        .mint-button-text {
          height: 100%;
          display: block;
          line-height: 5rem;
          color: $font-11;
          font-size: 1.5rem;
          .footer-icon {
            background: $secondary;
          }
        }
        &.is-disabled {
          .footer-icon {
            background: $bg-88;
          }
        }
      }
    }
  }
}
</style>
