<template>
  <div class='taskPage'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <tabs :tabData='tabData'></tabs>
    <addBtn v-bind:btnData="addBtnData"></addBtn>
  </div>
</template>
<script>
import tabs from "./public/Tabs";
import addBtn from "./public/AddBtn";
import pubHeader from "./public/Header";
export default {
  components: { tabs, addBtn, pubHeader },
  data() {
    return {
      tabData: {
        from: "task",
        data: [
          {
            id: 0,
            title: "我发起的",
            isActived: true
          },
          { id: 1, title: "我负责的", isActived: false },
          { id: 2, title: "我执行的", isActived: false }
        ]
      },
      addBtnData: {
        icon: "task",
        path: { name: "taskLunching" }
      },
      headerData: {
        title: "任务",
        backUrl: "/"
      }
    };
  }
};
</script>
<style lang='scss'>
.taskPage {
  height: 100%;
}
</style>