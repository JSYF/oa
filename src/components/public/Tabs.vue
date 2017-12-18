<template>
  <div class='tabs'>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-bind:id="tab.id" v-for="tab in tabData.data" :key="tab.id">
        <approveList v-bind:id="tab.id" v-if="tabData.from === 'approve' "></approveList>
        <taskList v-bind:id="tab.id" v-if="tabData.from === 'task'"></taskList>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" fixed class="pb-tabs">
      <mt-tab-item v-bind:id="tab.id" v-for="tab in tabData.data" :key="tab.id">
        <div class='tab-wrap'>
          {{tab.title}}
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import approveList from "../approve/List";
import taskList from "../task/List";
export default {
  name: "tabs",
  props: ["tabData"],
  components: { approveList, taskList },
  data() {
    return {
      selected: 0
    };
  },
  watch: {
    selected: function(index) {
      //设置审批列表位置
      if (this.tabData.from == "approve") {
        this.$store.commit("SETLISTINDEX_APPROVE", index);
      } else {
        this.$store.commit("SAVELISTINDEX_TASK", index);
      }
    }
  }
};
</script>

<style lang="scss">
.tabs {
  height: 100%;
  .mint-tab-container {
    height: 100%;
    .mint-tab-container-wrap {
      height: 100%;
      .mint-tab-container-item {
        height: calc(100% - #{$fot-height} - #{$header-height});
        padding-bottom: $fot-height;
      }
    }
  }
  .pb-tabs {
    height: $fot-height;
    background-image: none;
    .mint-tab-item {
      padding: 0;
      .mint-tab-item-label {
        height: $fot-height;
        box-shadow: 3px 0px 8px 0px rgba(180, 180, 180, 0.39);
        border-radius: 5px 5px 0px 0px;
        .tab-wrap {
          font-size: 1.6rem;
          line-height: 4.9rem;
        }
        color: $font-bc;
      }
      &.is-selected {
        position: relative;
        height: $fot-actived-height;
        .mint-tab-item-label {
          display: flex;
          align-items: flex-end;
          position: relative;
          .tab-wrap {
            width: 100%;
            background: $secondary;
            height: $fot-actived-height;
            color: $font-ff;
            line-height: $fot-actived-height;
            border-radius: 5px 5px 0 0;
          }
        }
      }
    }
  }
}
</style>
