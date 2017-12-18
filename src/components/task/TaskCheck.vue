<template>
  <div class='task-check'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <pub-textarea class='task-textarea' v-model='opinion' placeholder="选填"></pub-textarea>
  </div>
</template>


<script>
import pubHeader from "../public/Header";
import pubTextarea from "../public/PubTextarea";
export default {
  name: "TaskCheck",
  components: {
    pubHeader,
    pubTextarea
  },
  data() {
    return {
      headerData: {
        backUrl: { name: "task" },
        title: "验收意见",
        btnText: "确定",
        isBack: true
      },
      opinion: ""
    };
  },

  methods: {
    postData() {
      let param = this.$store.state.task.taskCheckData;
      param.access_token = this.$store.state.userInfo.access_token;
      param.opinion = this.opinion;
      console.log("验收参数", param);
      this.$post({ url: "/oa-work/task/confirmTask", postData: param })
        .then(data => {
          this.$router.go(-1);
          this.$toast("验收成功");
          this.$store.commit("LISTSHOULDREFRESH", true);
        })
        .catch(e => {
          console.log(e, "err");
          this.$toast("验收失败请重试");
        });
    }
  }
};
</script>


<style lang='scss'>
.task-check {
  .task-textarea {
    margin: 0;
    textarea {
      min-height: 17rem;
    }
  }
}
</style>

