<template>
  <div class='pubCheckBox'>
    <bg-wrap v-bind:bgStatus="boxStatus" @close="closeBox"></bg-wrap>
    <div class='pubCheckBox-input' @click='inputClick'>
      <mt-cell :title="data.label" :value="showValue" is-link></mt-cell>
    </div>
    <div class='pubCheckBox-list' v-if="listData && boxStatus">
      <mt-checklist align="right" v-model="value" :options="listData">
      </mt-checklist>
      <mt-button @click='submit' class='checkBoxBtn'>确定</mt-button>
    </div>
  </div>
</template>
<script>
import bgWrap from "./BgWrap";
export default {
  name: "pubCheckBox",
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
      value: [],
      showValue: this.data.view.defaultValue
    };
  },
  watch: {
    value() {
      this.showValue = this.value.join(",");
    }
  },
  computed: {
    listData() {
      let tempData = [];
      this.data.view.data.forEach((item, index) => {
        if (index == 0) {
          tempData.push({
            label: item.text,
            value: item.value,
            disabled: true
          });
        } else {
          tempData.push({ label: item.text, value: item.value });
        }
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
    },
    submit() {
      this.$emit("returnDataFunc", JSON.stringify(this.value));
      this.closeBox();
    }
  }
};
</script>


<style lang="scss">
.pubCheckBox {
  .pubCheckBox-input {
    height: 5.6rem;
    .mint-cell-wrapper {
      height: 100%;
      .mint-cell-text {
        font-size: 1.5rem;
        color: $font-11;
      }
    }
  }
  .pubCheckBox-list {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: $bg-white;
    width: 80%;
    z-index: 1999;
    border-radius: 1rem;
    overflow: hidden;
    .mint-checklist-title {
      display: none;
    }
    .mint-cell-wrapper {
      height: 5rem;
      background-image: none;
      .mint-cell-title {
        height: 100%;
        line-height: 5rem;
        .mint-checklist-label {
          .mint-checkbox-core {
            border-radius: 0.5rem;
          }
          .mint-checkbox-label {
            font-size: 1.7rem;
            color: $font-11;
          }
        }
      }
    }
    .checkBoxBtn {
      width: 100%;
      border-top: 1px solid $border-ec;
      height: 5rem;
      font-size: 1.8rem;
      text-align: center;
    }
  }
}
</style>
