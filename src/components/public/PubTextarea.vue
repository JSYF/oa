<template>
  <div class='pubTextarea'>
    <div class="bg-wrap">
      <p class='input-label'>{{data.label}}</p>
      <textarea class='textarea' :placeholder="inputData.placeholder" @keyup='inputing' v-model='value' ref='textarea' />
    </div>
  </div>
</template>

<script>
export default {
  name: "pubTextarea",
  props: ["data"],
  data() {
    return {
      value: ""
    };
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  computed: {
    inputData() {
      if (this.data.view) {
        return this.data.view;
      } else {
        return { placeholder: "" };
      }
    }
  },
  methods: {
    inputing() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
      this.$emit("returnDataFunc", this.value);
    }
  }
};
</script>

<style lang="scss">
.pubTextarea {
  margin: 1rem 0;
  .bg-wrap {
    padding: 1.3rem 1.2rem 0.7rem;
    background: $bg-white;
    min-height: 5.5rem;
  }
  .input-label {
    font-size: 1.5rem;
  }
  .textarea {
    margin-top: 0.5rem;
    width: 100%;
    height: 3.4rem;
    line-height: 1.5rem;
    font-size: 1.7rem;
  }
}
</style>
