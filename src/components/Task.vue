<template>
  <div class='approve'>
    <tabs :tabData='tabData'></tabs>
    <addBtn v-bind:icon="addIcon"></addBtn>
  </div>
</template>
<script>
import tabs from "./public/Tabs";
import addBtn from "./public/AddBtn";
export default {
  components: { tabs, addBtn },
  data() {
    return {
      tabData: [
        {
          id: 0,
          title: "任务1",
          isActived: true
        },
        { id: 1, title: "任务1", isActived: false },
        { id: 2, title: "任务1", isActived: false }
      ],
      addIcon: "approve"
    };
  }
};
</script>
<style lang='scss'>
.approve {
  height: 100%;
}
</style>