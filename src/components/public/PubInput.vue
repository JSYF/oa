<template>
  <div class='pubInput'>
    <div class='bg-wrap'>
      <p class='input-label'>{{data.label}}</p>
      <input class='input' :placeholder="inputData.placeholder" @keyup='inputing' v-model='value' />
    </div>
  </div>
</template>

<script>
export default {
  name: "pubInput",
  props: ["data"],
  data() {
    return {
      value: "",
      inputData: this.data.view
    };
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  methods: {
    inputing() {
      this.$emit("returnDataFunc", this.value);
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
    float: right;
    text-align: right;
    margin-top: 0.5rem;
    line-height: 4rem;
    font-size: 1.5rem;
  }
}
</style>

