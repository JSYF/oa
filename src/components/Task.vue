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
  },
  beforeRouteLeave(to, from, next) {
    let arr = document.querySelectorAll(".taskList .task-content");
    let topArr = [];
    arr.forEach(item => {
      topArr.push(item.scrollTop);
    });
    this.$store.commit("SAVETASKLISTHEIGHT", topArr);
    next();
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      let arr = document.querySelectorAll(".taskList .task-content");
      let topArr = vm.$store.state.task.listScrollTop;
      for (let i = 0; i < arr.length; i++) {
        arr[i].scrollTop = topArr[i];
      }
    });
  }
};
</script>
<style lang='scss'>
.taskPage {
  height: 100%;
}
</style>