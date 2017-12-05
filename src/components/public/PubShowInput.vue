<template>
    <div :class="[isInput?'isInput':'','pubShowInput']">
        <p class='label'>{{label}}</p>
        <div class="input-content">
            {{values}}
        </div>
    </div>
</template>

<script>
export default {
  name: "pubShowInput",
  props: ["values", "isInput", "label"]
};
</script>

<style lang="scss">
.pubShowInput {
  padding: 1.6rem 0 1.1rem;
  min-height: 4.5rem;
  font-size: 1.5rem;
  .label {
    width: 9rem;
    margin-bottom: 1.6rem;
    color: $font-99;
  }
  .input-content {
    color: $font-11;
    word-break: break-all;
    line-height: 2rem;
    text-align: justify;
  }
  &.isInput {
    min-height: 2.1rem;
    line-height: 2.1rem;
    @include clearFix();
    .label {
      margin-bottom: 0;
      float: left;
    }
    .input-content {
      float: right;
    }
  }
}
</style>


