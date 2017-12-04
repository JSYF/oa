<template>
  <div class='pubRadio'>
    <bg-wrap v-bind:bgStatus="boxStatus" @close="closeBox"></bg-wrap>
    <div class='radio-input' @click='inputClick'>
      <mt-cell :title="data.label" :value="value" is-link></mt-cell>
    </div>
    <mt-radio @click='closeBox' align="right" v-model="value" :options="listData" class='radio-list' v-if="boxStatus">
    </mt-radio>
  </div>
</template>


<script>
import bgWrap from "./BgWrap";
export default {
  name: "pubRadio",
  props: ["data"],
  components: {
    bgWrap
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  data() {
    return {
      boxStatus: false,
      value: this.data.view.defaultValue
    };
  },
  watch: {
    value() {
      setTimeout(() => {
        if (this.value == this.data.view.defaultValue) {
          this.$emit("returnDataFunc", "");
        } else {
          this.$emit("returnDataFunc", this.value);
        }
        this.closeBox();
      }, 300);
    }
  },
  computed: {
    listData() {
      let tempData = [];
      this.data.view.data.forEach(item => {
        tempData.push({ label: item.text, value: item.value });
      });
      return tempData;
    }
  },
  methods: {
    inputClick() {
      this.boxStatus = true;
    },
    closeBox() {
      this.boxStatus = false;
    }
  }
};
</script>


<style lang="scss">
.pubRadio {
  .radio-input {
    height: 5.6rem;
    .mint-cell-wrapper {
      height: 100%;
      .mint-cell-text {
        font-size: 1.5rem;
        color: $font-11;
      }
    }
  }
  .radio-list {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: $bg-white;
    width: 80%;
    z-index: 1999;
    border-radius: 1rem;
    overflow: hidden;
    .mint-radiolist-title {
      display: none;
    }
    .mint-cell-wrapper {
      height: 5rem;
      .mint-cell-title {
        height: 100%;
        line-height: 5rem;
        .mint-radio-label {
          font-size: 1.7rem;
          color: $font-11;
        }
      }
    }
  }
}
</style>
