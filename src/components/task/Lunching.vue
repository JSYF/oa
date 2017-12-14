<template>
  <div class='task-lunching'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <div class='luncing-form'>
      <pub-input v-model="saveData.name" placeholder="请输入任务名称(必填)"></pub-input>
      <pub-textarea v-model="saveData.content" placeholder="请输入任务描述(选填)" class='descriptions'></pub-textarea>
      <pub-file class='task-files' v-model="saveData.attachment"></pub-file>
      <pub-alone-selc label="负责人" v-model="saveData.principal"></pub-alone-selc>
      <pub-select label="执行人" class='content-item' v-model='saveData.operator'></pub-select>
      <pub-time-picker label="截止时间" isTask="true" v-model="saveData.deadline"></pub-time-picker>
      <pub-radio v-model="saveData.level" label="紧急程度" :data="deadlineData"></pub-radio>
      <div class='remind-cell' @click="toSetRemind">
        <mt-cell label="设置提醒" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import pubHeader from "../public/Header";
import pubInput from "../public/PubInput";
import pubTextarea from "../public/PubTextarea";
import pubFile from "../public/PubFile";
import pubSelect from "../public/PubSelect";
import pubAloneSelc from "../public/PubAloneSelc";
import pubTimePicker from "../public/PubTimePicker";
import pubRadio from "../public/PubRadio";
export default {
  name: "taskLunching",
  data() {
    return {
      headerData: {
        backUrl: { name: "task" },
        title: "发起任务",
        btnText: "发布"
      },
      saveData: {
        level: 1,
        name: "",
        content: "",
        attachment: {
          imgList: [],
          fileList: []
        },
        operator: [],
        principal: [],
        deadline: ""
      },
      deadlineData: [
        {
          label: "不重要且不紧急",
          value: "1",
          isSelect: true
        },
        {
          label: "重要但不紧急",
          value: "2",
          isSelect: false
        },
        {
          label: "紧急但不重要",
          value: "3",
          isSelect: false
        },
        {
          label: "重要且紧急",
          value: "4",
          isSelect: false
        }
      ]
    };
  },
  components: {
    pubRadio,
    pubAloneSelc,
    pubHeader,
    pubInput,
    pubTextarea,
    pubFile,
    pubSelect,
    pubTimePicker
  },
  methods: {
    toSetRemind() {
      this.$router.push({ name: "taskRemindTime" });
    },
    postData() {
      if (this.saveData.name == "") {
        this.$toast("请输入任务名称");
        return;
      }
      if (this.saveData.principal == null) {
        this.$toast("请选择负责人");
        return;
      }
      if (this.saveData.deadline == "") {
        this.$toast("请选择截止时间");
        return;
      }
      let params = {
        access_token: this.$store.state.userInfo.access_token,
        name: this.saveData.name,
        content: this.saveData.content,
        initiatorId: this.$store.state.userInfo.userId,
        initiatorName: this.$store.state.userInfo.realname,
        deadline: this.saveData.deadline,
        level: this.saveData.level,
        companyId: this.$store.state.userInfo.company_id
      };
      if (this.saveData.principal != null) {
        let ids = [];
        let names = [];
        this.saveData.operator.forEach(item => {
          ids.push(item.userId);
          names.push(item.realname);
        });
        params.principalId = ids.join(",");
        params.principalName = names.join(",");
      }
      //处理附件数据
      let arr = [];
      this.saveData.attachment.imgList.forEach(item => {
        arr.push({ fileName: item.path, type: "image" });
      });
      this.saveData.attachment.fileList.forEach(item => {
        arr.push({
          fileName: item.path,
          type: "file",
          name: item.fileName,
          size: item.fileSize
        });
      });
      params.attachment = JSON.stringify(arr);
      //处理附件数据结束
      if (this.saveData.operator != null) {
        let ids = [];
        let names = [];
        this.saveData.operator.forEach(item => {
          ids.push(item.userId);
          names.push(item.realname);
        });
        params.operatorId = ids.join(",");
        params.operatorName = names.join(",");
      }
      let remindData = this.$store.state.task.remindTime;
      if (remindData.remind != "") {
        params.remind = remindData.remind;
      }
      if (remindData.reday != "") {
        params.reday = remindData.reday;
      }
      console.log("请求数据", params);
      // this.$post({ url: "/oa-work/task/addTask", postData: params })
      //   .then(data => {
      //     console.log("创建任务返回", data);
      //     this.$toast("创建任务成功");
      //   })
      //   .catch(e => {
      //     console.log("err", e);
      //     this.$toast("创建任务失败,请重试");
      //   });
    }
  },
  watch: {
    $route(to, from) {
      //发起页到列表页
      if (from.name == "taskLunching" && to.name == "task") {
        let data = {
          remind: "",
          reday: ""
        };
        this.$store.commit("SAVEREMINDTIME", data);
        this.$store.commit("SAVELUNCHINGFORMDATA", null);
        console.log("发起页到列表页");
      }
      //列表页到发起页
      if (from.name == "task" && to.name == "taskLunching") {
        this.saveData = {
          level: 1,
          name: "",
          content: "",
          attachment: {
            imgList: [],
            fileList: []
          },
          operator: [],
          principal: [],
          deadline: ""
        };
        console.log("列表页到发起页");
      }
      //发起页到设置提醒页
      if (from.name == "taskLunching" && to.name == "taskRemindTime") {
        this.$store.commit("SAVELUNCHINGFORMDATA", this.saveData);
        console.log("发起页到设置提醒页");
      }
      //设置提醒页到发起页
      if (from.name == "taskRemindTime" && to.name == "taskLunching") {
        this.saveData = this.$store.state.task.lunchingFormData;
        console.log("设置提醒页到发起页");
      }
    }
  }
};
</script>

<style lang="scss">
.task-lunching {
  height: 100%;
  overflow: hidden;
  .luncing-form {
    overflow-y: scroll;
    margin-top: 1rem;
    @include contentHeight(1,0);
    .descriptions {
      margin-bottom: 0;
      .bg-wrap {
        padding-bottom: 0;
      }
    }
    .task-files {
      margin-top: 0;
    }
    > div:last-child {
      margin-bottom: 2rem;
    }
    .remind-cell {
      height: 5rem;
      line-height: 5rem;
      .mint-cell-label {
        font-size: 1.5rem;
        color: $font-11;
      }
    }
  }
}
</style>

