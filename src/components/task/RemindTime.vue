<template>
  <div class='setRemindTime'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <div class='timePicker' @click='openTimePicker'>
      <mt-cell title="提醒时间" :value="showValue" is-link></mt-cell>
    </div>
    <div class='pubRadio'>
      <bg-wrap v-bind:bgStatus="boxStatus" @close="closeBox"></bg-wrap>
      <div class='radio-input' @click='openRemind'>
        <mt-cell title="重复" :value="reamindShowValue" is-link></mt-cell>
      </div>
      <mt-radio align="right" v-model="remindValue" :options="radioData" class='radio-list' v-if="boxStatus">
      </mt-radio>
    </div>
    <mt-datetime-picker ref="picker" type="time" v-model="value" @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
import pubRadio from "../public/PubRadio";
import moment from "moment";
import bgWrap from "../public/BgWrap";
export default {
  name: "taskRemindTime",
  components: {
    pubHeader,
    pubRadio,
    bgWrap
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
        { label: "每天", value: "1" },
        { label: "每两天", value: "2" },
        { label: "每周", value: "7" }
      ],
      value: moment(new Date()).format("HH:mm"),
      showValue: "",
      remindValue: "",
      reamindShowValue: "",
      boxStatus: false
    };
  },
  watch: {
    remindValue() {
      for (let i = 0; i < this.radioData.length; i++) {
        if (this.radioData[i].value == this.remindValue) {
          this.reamindShowValue = this.radioData[i].label;
          break;
        }
      }
      setTimeout(() => {
        this.boxStatus = false;
      }, 300);
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      let data = vm.$store.state.task.remindTime;
      if (data.reday != "") {
        for (let i = 0; i < vm.radioData.length; i++) {
          if (vm.radioData[i].value == data.reday) {
            vm.reamindShowValue = vm.radioData[i].label;
            break;
          }
        }
        vm.remindValue = data.reday.toString();
      }
      if (data.remind != "") {
        vm.value = moment(data.remind).format("HH:mm");
        vm.showValue = moment(data.remind).format("HH:mm");
      }
      // console.log(vm);
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    closeBox() {
      // console.log("111");
      this.boxStatus = false;
    },
    openRemind() {
      this.boxStatus = true;
    },
    openTimePicker() {
      this.$refs.picker.open();
    },
    handleConfirm() {
      this.showValue = this.value;
    },
    postData() {
      if (this.showValue == "") {
        this.$toast("请设置提醒时间");
        return;
      }
      if (this.repeactVal == "") {
        this.$toast("请设置重复类型");
        return;
      }
      let arr = this.value.split(":");
      let date = moment()
        .hours(arr[0])
        .minutes(arr[1])
        .seconds(0)
        .milliseconds(0);
      if (date.isBefore(new Date())) {
        date.add(1, "days");
      }
      let remindTime = {
        remind: date.valueOf(),
        reday: this.remindValue
      };
      if (this.$store.state.task.remindTime.from == "details") {
        let param = {
          access_token: this.$store.state.userInfo.access_token,
          remind: date.valueOf(),
          reday: this.remindValue,
          taskId: this.$store.state.task.remindTime.taskId,
          from: "details"
        };
        this.$post({
          url: "/oa-work/task/updateRemind",
          postData: param
        })
          .then(data => {
            this.$toast("修改提醒时间成功");
            this.$router.go(-1);
          })
          .catch(e => {
            console.log("err", e);
            this.$toast("修改提醒时间失败，请重试");
          });
      } else {
        this.$router.go(-1);
        this.$store.commit("SAVEREMINDTIME", remindTime);
      }
    }
  }
};
</script>


<style lang="scss">
.setRemindTime {
  .timePicker {
    height: 5rem;
    line-height: 5rem;
    .mint-cell {
      height: 100%;
    }
  }
  .radio-input {
    height: 5rem;
    line-height: 5rem;
  }
  .radio-list {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: $bg-white;
    width: 80%;
    z-index: 1999;
    border-radius: 1rem;
    overflow: hidden;
    .mint-radiolist-title {
      display: none;
    }
    .mint-cell-wrapper {
      height: 5rem;
      .mint-cell-title {
        height: 100%;
        line-height: 5rem;
        .mint-radio-label {
          font-size: 1.7rem;
          color: $font-11;
        }
      }
    }
  }
}
</style>

