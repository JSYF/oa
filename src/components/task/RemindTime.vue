<template>
  <div class='setRemindTime'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <mt-cell class="settime-cell" label="设置时间">
      <mt-switch v-model="isSetTime"></mt-switch>
    </mt-cell>
    <pub-time-picker timePickType="time" v-model='timeValue' label="提醒时间" formate="HH:mm"></pub-time-picker>
    <pub-radio label="重复" v-model="repeactValue" :data="radioData"></pub-radio>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
import pubRadio from "../public/PubRadio";
import moment from "moment";
import bgWrap from "../public/BgWrap";
import pubTimePicker from "../public/PubTimePicker";
export default {
  name: "taskRemindTime",
  components: {
    pubHeader,
    pubRadio,
    bgWrap,
    pubTimePicker
  },
  data() {
    return {
      headerData: {
        backUrl: "",
        title: "设置提醒",
        btnText: "确定",
        isBack: true
      },
      radioData: [
        { label: "仅此一次", value: "0", isSelect: true },
        { label: "每天", value: "8", isSelect: false },
        { label: "每周一", value: "1", isSelect: false },
        { label: "每周二", value: "2", isSelect: false },
        { label: "每周三", value: "3", isSelect: false },
        { label: "每周四", value: "4", isSelect: false },
        { label: "每周五", value: "5", isSelect: false },
        { label: "每周六", value: "6", isSelect: false },
        { label: "每周日", value: "7", isSelect: false }
      ],
      isSetTime: false,
      timeValue: "",
      repeactValue: "0",
      remindType: "" // 0 发起 1详情
    };
  },
  watch: {
    $route(to, from) {
      if (from.name == "taskRemindTime") {
        this.repeactValue = "0";
        this.timeValue = "";
        this.isSetTime = false;
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (from.name == "taskLunching" && to.name == "taskRemindTime") {
        let data = vm.$store.state.task.lunchingFormData;
        vm.remindType = 0;
        if (data.isRemind == 1) {
          vm.isSetTime = true;
          vm.timeValue = data.remind;
          vm.repeactValue = data.reday;
        } else {
          vm.isSetTime = false;
        }
      }
      if (from.name == "taskDetails" && to.name == "taskRemindTime") {
        let data = vm.$store.state.task.detailsToRemindData;
        vm.remindType = 1;
        if (data.isRemind == 1) {
          vm.isSetTime = true;
          vm.timeValue = data.remind;
          vm.repeactValue = data.reday;
        } else {
          vm.isSetTime = false;
        }
      }
    });
  },
  methods: {
    postData() {
      if (!this.isSetTime) {
        this.$toast("打开设置提醒开关，才能正确的设置提醒时间");
        return;
      }
      if (this.timeValue == "") {
        this.$toast("请设置提醒时间");
        return;
      }
      let time = moment(this.timeValue);
      switch (this.repeactValue) {
        case "0":
        case "8":
          if (time.isBefore(new Date())) {
            time.add(1, "days");
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
          let days = "0";
          if (this.repeactValue != "7") {
            days = this.repeactValue;
          }
          if (time.day(days).isBefore(new Date())) {
            time.day(parseInt(days) + 7);
          } else {
            time.day(days);
          }
          break;
      }
      time = time.valueOf();
      if (this.remindType == 1) {
        let param = {
          access_token: this.$store.state.userInfo.access_token,
          remind: time,
          reday: this.repeactValue,
          taskId: this.$store.state.task.detailsToRemindData.taskId
        };
        if (this.isSetTime) {
          param.isRemind = 1;
        } else {
          param.isRemind = 0;
        }
        console.log("params", param);
        this.$post({
          url: "/oa-work/task/updateRemind",
          postData: param
        })
          .then(data => {
            this.$toast("修改提醒时间成功");
            this.$store.commit("SAVEREMINDToDETAILS", true);
            this.$router.go(-1);
          })
          .catch(e => {
            // console.log("err", e);
            this.$toast("修改提醒时间失败，请重试");
          });
      } else {
        let data = this.$store.state.task.lunchingFormData;
        if (this.isSetTime) {
          data.isRemind = 1;
        } else {
          data.isRemind = 0;
        }
        data.remind = time;
        data.reday = this.repeactValue;
        this.$router.go(-1);
        this.$store.commit("SAVELUNCHINGFORMDATA", data);
      }
    }
  }
};
</script>


<style lang="scss">
.setRemindTime {
  .settime-cell {
    margin-bottom: 1rem;
    .mint-cell-label {
      font-size: 1.5rem;
      color: $font-11;
    }
    .mint-cell-value {
      margin-right: 0;
    }
  }
  //   .timePicker {
  //     height: 5rem;
  //     line-height: 5rem;
  //     .mint-cell {
  //       height: 100%;
  //     }
  //   }
  //   .radio-input {
  //     height: 5rem;
  //     line-height: 5rem;
  //   }
  //   .radio-list {
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     transform: translateX(-50%) translateY(-50%);
  //     background: $bg-white;
  //     width: 80%;
  //     z-index: 1999;
  //     border-radius: 1rem;
  //     overflow: hidden;
  //     .mint-radiolist-title {
  //       display: none;
  //     }
  //     .mint-cell-wrapper {
  //       height: 5rem;
  //       .mint-cell-title {
  //         height: 100%;
  //         line-height: 5rem;
  //         .mint-radio-label {
  //           font-size: 1.7rem;
  //           color: $font-11;
  //         }
  //       }
  //     }
  //   }
}
</style>

