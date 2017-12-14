<template>
  <div class='pubInput'>
    <div class='bg-wrap'>
      <p class='input-label' v-if="label">{{label}}</p>
      <input class='input' :placeholder="placeholder" @keyup='inputing' v-model='showValue' />
    </div>
  </div>
</template>

<script>
export default {
  name: "pubInput",
  props: ["label", "placeholder", "type", "value"],
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
      this.showValue = this.value;
    }
  },
  methods: {
    inputing() {
      this.$emit("returnDataFunc", this.showValue);
    }
  }
};
</script>

<style lang="scss">
.pubInput {
  margin: 1rem 0;

  .bg-wrap {
    height: 100%;
    padding: 0 1.2rem;
    background: $bg-white;
    @include clearFix();
  }
  .input-label {
    padding-top: 1.2rem;
    font-size: 1.5rem;
    float: left;
  }
  .input {
    width: 100%;
    margin-top: 0.5rem;
    line-height: 4rem;
    font-size: 1.5rem;
  }
  .input-label + .input {
    width: initial;
    float: right;
    text-align: right;
  }
}
</style>

