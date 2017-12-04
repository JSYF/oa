<template>
  <div class='BgWrap' v-if="bgStatus" @click='close()'></div>
</template>
<script>
export default {
  name: "bgWrap",
  props: ["bgStatus"],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.BgWrap {
  position: fixed;
  height: 100%;
  left: 0;
  top:0;
  width: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
}
</style>


