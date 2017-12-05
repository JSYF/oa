<template>
  <div id='approve-page'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <tabs :tabData='tabData'></tabs>
    <addBtn v-bind:btnData="addBtnData"></addBtn>
  </div>
</template>
<script>
import pubHeader from "./public/Header";
import tabs from "./public/Tabs";
import addBtn from "./public/AddBtn";
import store from "../store";
export default {
  components: { tabs, addBtn, pubHeader },
  data() {
    return {
      tabData: {
        from: "approve",
        data: [
          {
            id: 0,
            title: "我发起的",
            isActived: true
          },
          { id: 1, title: "我审批的", isActived: false },
          { id: 2, title: "抄送我的", isActived: false }
        ]
      },
      addBtnData: {
        icon: "approve",
        path: { name: "approveList" }
      },
      headerData: {
        title: "审批",
        backUrl: "/"
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    let arr = document.querySelectorAll(".approve-list .content");
    let topArr = [];
    arr.forEach(item => {
      topArr.push(item.scrollTop);
    });
    this.$store.commit("SAVEAPPROVELISTPOSITION", topArr);
    next();
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      let arr = document.querySelectorAll(".approve-list .content");
      let topArr = vm.$store.state.approve.listScrollTop;
      for (let i = 0; i < arr.length; i++) {
        arr[i].scrollTop = topArr[i];
      }
    });
  }
};
</script>
<style lang='scss'>
#approve-page {
  height: 100%;
}
</style>