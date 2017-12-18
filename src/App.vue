<template>
  <div id="app">
    <keep-alive :exclude="unKeepLiveComponents">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      unKeepLiveComponents: ["approveDetail", "approve-lunching"]
    };
  }
};
</script>

<style lang='scss'>
@import "./assets/style/appPublic.scss";
</style>
