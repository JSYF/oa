<template>
  <div class='pubTimeArea'>
    <mt-cell class='timePicker' :title="data.label" is-link>
      <mt-button class='timer-btn' @click='timeAreaOpen(1)'>{{showValue1}}</mt-button>
      <span class='span'>—</span>
      <mt-button class='timer-btn' @click='timeAreaOpen(2)'>{{showValue2}}</mt-button>
    </mt-cell>
    <mt-datetime-picker :endDate='endTime' ref="timeArea1" type="datetime" v-model="timeArea1" @confirm="confirmFunc(1)">
    </mt-datetime-picker>
    <mt-datetime-picker :endDate='endTime' ref="timeArea2" type="datetime" v-model="timeArea2" @confirm="confirmFunc(2)">
    </mt-datetime-picker>
  </div>
</template>



<script>
import moment from "moment";
export default {
  name: "pubTimeArea",
  props: ["data"],
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  data() {
    return {
      endTime: new Date(
        moment()
          .add(20, "year")
          .format("YYYY-MM-DD")
      ),
      timeArea1: new Date(),
      timeArea2: new Date(),
      showValue1: "请选择",
      showValue2: "请选择"
    };
  },
  methods: {
    timeAreaOpen(index) {
      if (index == 1) {
        this.$refs.timeArea1.open();
      } else {
        this.$refs.timeArea2.open();
      }
    },
    confirmFunc(index) {
      if (index == 1) {
        this.showValue1 = moment(this.timeArea1).format("YYYY-MM-DD HH:mm");
      } else {
        this.showValue2 = moment(this.timeArea2).format("YYYY-MM-DD HH:mm");
      }
      let str1 = this.showValue1 == "" ? "" : moment(this.showValue1).valueOf();
      let str2 = this.showValue2 == "" ? "" : moment(this.showValue2).valueOf();
      let returnStr = JSON.stringify([str1, str2]);
      this.$emit("returnDataFunc", returnStr);
    }
  }
};
</script>
<style lang="scss">
.pubTimeArea {
  height: 5.6rem;
  .mint-cell-wrapper {
    height: 100%;
    .mint-cell-value{
      margin-right: 0.5rem;
    }
    .mint-cell-text {
      font-size: 1.5rem;
      color: $font-11;
    }
    .mint-cell-allow-right {
      display: none;
    }
  }
  .span {
    font-size: 1.5rem;
  }
  .timePicker {
    .timer-btn {
      width: 11rem;
      padding: 0;
      font-size: 1.3rem;
    }
  }
}
</style>