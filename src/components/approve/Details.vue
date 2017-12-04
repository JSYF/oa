<template>
  <div class='approveDetails'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
export default {
  name: "detail",
  components: {
    pubHeader
  },
  data() {
    return {
      headerData: {
        title: "审批详情",
        backUrl: { name: "approve" }
      },
      params: JSON.parse(window.localStorage.getItem("approveDetails")),
      userInfo: null
    };
  },
  mounted() {
    console.log(this.params);
    this.getUser().then(e => {
      console.log("获取用户信息");
      this.userInfo = e;
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log(vm);
    });
  },
  methods: {}
};
</script>

