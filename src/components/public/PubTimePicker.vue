<template>
  <div class='pubTimePicker'>
    <bg-wrap v-bind:bgStatus="boxStatus" @close="closeBox"></bg-wrap>
    <div class='timePicker' @click='inputClick'>
      <mt-cell :title="label" :value="showValue" is-link></mt-cell>
    </div>
    <div class='task-deadline' v-if='boxStatus'>
      <p class='title'>设置截止时间</p>
      <mt-button class='deadline-btns' v-for="(item,index) in taskDeadLineTime" :key="index" @click="selectTime(index)">
        <i :class="[item.icon,'oa-icon']"></i>
        <p class='text'>{{item.text}}</p>
        <p class='time-text'>{{item.timeText}}</p>
      </mt-button>
    </div>
    <mt-datetime-picker :endDate='endTime' ref="picker" type="datetime" v-model="timePickValue" @confirm="handleConfirm">
    </mt-datetime-picker>

  </div>
</template>


<script>
import moment from "moment";
import bgWrap from "./BgWrap";
export default {
  name: "pubTimePicker",
  props: ["label", "isTask", "value"],
  components: { bgWrap },
  data() {
    return {
      endTime: new Date(
        moment()
          .add(20, "year")
          .format("YYYY-MM-DD")
      ),
      boxStatus: false,
      timePickValue: new Date(),
      showValue: "请选择",
      taskDeadLineTime: [
        { icon: "clock-12", text: "今天中午", timeText: "12:00" },
        { icon: "clock-18", text: "今天下班", timeText: "18:00" },
        { icon: "clockT-18", text: "明天下班", timeText: "18:00" },
        { icon: "clock-custom", text: "自定义" }
      ]
    };
  },
  model: {
    props: "returnValue",
    event: "returnDataFunc"
  },
  watch: {
    value() {
      console.log("value", this.value);
      if (this.value) {
        this.timePickValue = new Date(this.value);
        this.showValue = moment(this.value).format("YYYY.MM.DD HH:mm");
      } else {
        this.showValue = "请选择";
        this.timePickValue = new Date();
      }
    }
  },
  methods: {
    inputClick() {
      if (this.isTask == "true") {
        this.boxStatus = true;
        console.log(true);
      } else {
        this.$refs.picker.open();
      }
    },
    handleConfirm() {
      if (this.isTask == "true") {
        if (moment(this.timePickValue).isBefore(new Date())) {
          this.$toast("已晚于当前时间，请重新选择");
        } else {
          this.$emit("returnDataFunc", moment(this.timePickValue).valueOf());
          this.boxStatus = false;
        }
      } else {
        this.$emit("returnDataFunc", moment(this.timePickValue).valueOf());
      }
    },
    selectTime(index) {
      if (index != 3) {
        let returnTime = "";
        if (index == 0) {
          returnTime = moment()
            .hours(12)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .format("YYYY.MM.DD HH:mm");
          if (moment(returnTime).isBefore(new Date())) {
            this.$toast("已晚于当前时间，请重新选择");
            return;
          }
        } else if (index == 1) {
          returnTime = moment()
            .hours(18)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .format("YYYY.MM.DD HH:mm");
          if (moment(returnTime).isBefore(new Date())) {
            this.$toast("已晚于当前时间，请重新选择");
            return;
          }
        } else {
          returnTime = moment()
            .add(1, "days")
            .hours(18)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .format("YYYY.MM.DD HH:mm");
        }
        this.$emit("returnDataFunc", moment(returnTime).valueOf());
        this.boxStatus = false;
      } else {
        this.timePickValue = new Date();
        this.$refs.picker.open();
      }
    },
    closeBox() {
      this.boxStatus = false;
    }
  }
};
</script>



<style lang='scss'>
.pubTimePicker {
  .mint-cell {
    height: 5rem;
    line-height: 5rem;
  }
  .task-deadline {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    background: white;
    width: 73%;
    background-color: #ffffff;
    border-radius: 10px;
    .title {
      font-size: 1.8rem;
      text-align: center;
      color: $font-11;
      margin: 1.6rem 0 4rem;
    }
    .deadline-btns {
      margin-bottom: 2.5rem;
      width: 50%;
      height: initial;
      .oa-icon {
        color: $secondary;
        font-size: 3.6rem;
      }
      .text {
        margin: 1.4rem 0 1rem;
        font-size: 1.5rem;
        color: $font-11;
      }
      .time-text {
        font-size: 1.5rem;
        color: $font-99;
      }
    }
  }
}
</style>


