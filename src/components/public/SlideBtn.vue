<template>
  <div class='slideBtn-wrap'>
    <div class='sldeBtn-bar' :class="{'toRight':slideStatus}">
      <p @click="btnClick(0)" :class="{'actived':!slideStatus}">{{data[0].text}}</p>
      <p @click="btnClick(1)" :class="{'actived':slideStatus}">{{data[1].text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "slideBtn",
  props: ["from"],
  data() {
    return {
      // data: this.$store.state.approve.slideData,
      slideStatus: false
    };
  },
  computed: {
    data() {
      if (this.from == "task") {
        return this.$store.state.task.slideData;
      } else {
        return this.$store.state.approve.slideData;
      }
    }
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  methods: {
    btnClick: function(index) {
      if (index == this.slideStatus) {
        return;
      }
      let returnData = null;
      if (index == 0) {
        if (this.from == "task") {
          returnData = this.$store.state.task.slideData[0].id;
        } else {
          returnData = this.$store.state.approve.slideData[0].id;
        }
        this.slideStatus = false;
      } else {
        if (this.from == "task") {
          returnData = this.$store.state.task.slideData[1].id;
        } else {
          returnData = this.$store.state.approve.slideData[1].id;
        }
        this.slideStatus = true;
      }
      this.$emit("returnDataFunc", returnData);
    }
  }
};
</script>
<style lang="scss">
.slideBtn-wrap {
  position: fixed;
  width: 100%;
  top: $header-height;
  z-index: 99;
  background: $bg-white;
  text-align: center;
  height: 3.3rem;
  padding-top: 0.8rem;
  .sldeBtn-bar {
    width: 23rem;
    margin: 0 auto;
    height: 2.5rem;
    border-radius: 25px;
    background: $bg-ec;
    line-height: 2.5rem;
    position: relative;
    p {
      width: 11rem;
      position: absolute;
      z-index: 99;
      color: $font-11;
      font-size: 1.6rem;
      transition: color 0.5s;
      &:first-child {
        left: 0;
      }
      &:nth-child(2) {
        right: 0;
      }
      &.actived {
        color: $secondary;
      }
    }
    &:after {
      left: 0;
      top: 50%;
      top: 50%;
      z-index: 1;
      margin-top: -1.65rem;
      position: absolute;
      width: 11.7rem;
      height: 3.3rem;
      content: "";
      display: block;
      border-radius: 1.65rem;
      box-shadow: 0px 7px 12px 0px rgba(165, 165, 165, 0.08),
        0px 2px 9px 0px rgba(191, 191, 191, 0.18);
      background: $bg-white;
      transition: left 0.5s;
    }
    &.toRight {
      &:after {
        left: 50%;
      }
    }
  }
}
</style>



