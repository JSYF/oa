<template>
  <mt-header :title="headerData.title" class='pub-header'>
    <router-link :to="headerData.backUrl" slot="left">
      <mt-button>
        <i class='oa-icon back'></i>
      </mt-button>
    </router-link>
    <mt-button class='right-btn' slot="right" v-if="headerData.btnText" @click='btnSubmit'>{{headerData.btnText}}</mt-button>
  </mt-header>
</template>


<script>
export default {
  name: "pubHeader",
  props: ["headerData"],
  methods: {
    btnSubmit() {
      this.$emit("rightBtnMehod");
    }
  }
};
</script>

<style lang='scss'>
.pub-header {
  height: $header-height;
  font-size: 1.4rem;
  background: $header-bg;
  .mint-header-title {
    font-size: 1.8rem;
  }
  i.oa-icon {
    font-size: 2.2rem;
  }
  .right-btn {
    font-size: 1.7rem;
  }
}
</style>