<template>
  <div class='pubAloneSelc' @click="select">
    <mt-cell :label="label" :value="showValue" is-link>
    </mt-cell>
  </div>
</template>


<script>
export default {
  name: "pubAloneSelc",
  props: ["label", "value"],
  data() {
    return {
      showValue: ""
    };
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  watch: {
    value() {
      this.showValue = this.value.realname;
    }
  },
  methods: {
    select() {
      this.$emit("returnDataFunc", { realname: "雷神", id: "10000000081" });
    }
  }
};
</script>


<style lang="scss">
.pubAloneSelc {
  .mint-cell {
    height: 5rem;
    line-height: 5rem;
    .mint-cell-wrapper {
      height: 100%;
      .mint-cell-label {
        font-size: 1.5rem;
        color: $font-11;
      }
      .mint-cell-value {
        font-size: 1.5rem;
        color: $font-11;
      }
    }
  }
}
</style>


