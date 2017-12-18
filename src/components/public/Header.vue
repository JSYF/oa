<template>
  <mt-header :title="headerData.title" class='pub-header'>
    <router-link :to="headerData.backUrl" slot="left">
      <mt-button @click.prevent="back">
        <i class='oa-icon back'></i>
      </mt-button>
    </router-link>
    <mt-button class='right-btn' slot="right" v-if="rightBtnText" @click='btnSubmit'>{{rightBtnText}}</mt-button>
  </mt-header>
</template>


<script>
export default {
  name: "pubHeader",
  props: ["headerData", "btnText"],
  computed: {
    rightBtnText() {
      if (this.btnText) {
        return this.btnText;
      } else if (this.headerData.btnText) {
        return this.headerData.btnText;
      } else {
        return "";
      }
    }
  },
  methods: {
    btnSubmit() {
      this.$emit("rightBtnMehod");
    },
    back() {
      if (this.headerData.isBack) {
        // console.log("back");
        this.$router.go(-1);
      } else {
        // console.log("replace");
        this.$router.replace(this.headerData.backUrl);
      }
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