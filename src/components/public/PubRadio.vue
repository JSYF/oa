<template>
  <div class='pubRadio'>
    <bg-wrap v-bind:bgStatus="boxStatus" @close="closeBox"></bg-wrap>
    <div class='radio-input' @click='inputClick'>
      <mt-cell :title="label" :value="showValue" is-link></mt-cell>
    </div>
    <mt-radio align="right" v-model="radioValue" :options="data" class='radio-list' v-if="boxStatus">
    </mt-radio>
  </div>
</template>


<script>
import bgWrap from "./BgWrap";
export default {
  name: "pubRadio",
  props: ["data", "label", "value"],
  components: {
    bgWrap
  },
  model: {
    props: "returnValue",
    event: "returnDataFunc"
  },
  data() {
    return {
      boxStatus: false,
      radioValue: ""
    };
  },
  computed: {
    showValue() {
      let str = "";
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].value == this.radioValue) {
          str = this.data[i].label;
          break;
        }
      }
      return str;
    }
  },
  mounted() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isSelect == true) {
        this.radioValue = this.data[i].value;
        break;
      }
    }
  },
  watch: {
    value() {
      this.radioValue = this.value.toString();
    },
    radioValue() {
      this.$emit("returnDataFunc", this.radioValue);
      if (this.boxStatus == true) {
        setTimeout(() => {
          this.closeBox();
        }, 300);
      }
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
