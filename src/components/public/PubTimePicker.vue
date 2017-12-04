<template>
  <div class='pubTimePicker'>
    <div class='timePicker' @click='inputClick'>
      <mt-cell :title="data.label" :value="showValue" is-link></mt-cell>
    </div>
    <mt-datetime-picker :endDate='endTime' ref="picker" type="datetime" v-model="value" @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>


<script>
import moment from "moment";

export default {
  name: "pubTimePicker",
  props: ["data"],
  data() {
    return {
      endTime: new Date(
        moment()
          .add(20, "year")
          .format("YYYY-MM-DD")
      ),
      value: new Date(),
      showValue: "请选择"
    };
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  methods: {
    inputClick() {
      this.$refs.picker.open();
    },
    handleConfirm() {
      this.showValue = moment(this.value).format("YYYY-MM-DD HH:mm");
      this.$emit("returnDataFunc", moment(this.value).valueOf());
    }
  }
};
</script>

