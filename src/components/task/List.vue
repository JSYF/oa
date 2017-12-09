<template>
  <div class='taskList'>
    <slide-btn v-model="slideIndex" from="task"></slide-btn>
    <div class='task-content'>
      <div class='filterbar'>
        <task-filter v-model="fileterData"></task-filter>
      </div>
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change='loadTopStauts'>
        <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <mt-button v-for="item in showData.list" :key='item.id' class='task-item' @click='toDetails(item)'>
            <div class='avatar'>
              <!-- <img src="http://www.w3school.com.cn/i/eg_tulip.jpg"> -->
            </div>
            <div class='content-wrap'>
              <p class='title'>{{item.name}}</p>
              <p class='endTime'>距离截止时间还有：<sapn class='time'>{{item.deadline}}</sapn></p>
            </div>
            <p class="create-time">{{item.createdate |timeFilter('MM-DD')}}</p>
          </mt-button>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <span class='icon' v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
            <i class='oa-icon break1'></i>
          </span>
          <span class='refreshing' v-show="topStatus === 'loading'"><img src="~@/assets/img/refreshing.png"></span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>


<script>
import slideBtn from "../public/SlideBtn";
import taskFilter from "./Filter";
export default {
  name: "taskList",
  props: ["id"], // id 0//我发起的 1//我负责的 2我执行的
  components: { slideBtn, taskFilter },
  data() {
    return {
      slideIndex: 1, //1 未完成 3已完成
      listPage: this.$store.state.task.listPageNum, //分页数
      fileterData: {
        deadline: "",
        level: ""
      },
      showData: {
        list: [],
        startNum: 0,
        status: 1
      },
      loading: false,
      topStatus: null
    };
  },
  computed: {
    listData() {
      this.showData.list.forEach(item => {
        this.$getMan(item.initiator_id).then(data => {
          item.initiatorUserInfo = data;
        });
        this.$getMan(item.principal_id).then(data => {
          item.principalUserInfo = data;
        });
      });
      console.log(this.showData.list);
      return this.showData.list;
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    fileterData() {
      this.showData.list = [];
      this.showData.startNum = 0;
      this.getList();
    },
    slideIndex() {
      this.showData.list = [];
      this.showData.startNum = 0;
      this.showData.status = this.slideIndex;
      this.getList();
    }
  },
  methods: {
    getList(obj) {
      let index = null;
      let param = {
        access_token: this.$store.state.userInfo.access_token,
        id: this.$store.state.userInfo.userId,
        type: parseInt(this.id) + 1,
        num: this.listPage,
        startNum: this.showData.startNum,
        status: this.showData.status
      };
      if (this.fileterData.deadline != "") {
        param.deadline = this.fileterData.deadline;
      }
      if (this.fileterData.level != "") {
        param.level = this.fileterData.level;
      }
      if (obj && obj.index) {
        index = obj.index;
      } else {
        index = this.slideIndex;
      }
      console.log("任务参数", param);
      this.$post({ url: "/oa-work/task/selectTask", postData: param })
        .then(data => {
          console.log("success", data);
          let list = this.showData.list;
          data.result.forEach(item => {
            list.push(item);
          });
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("获取任务列表失败");
        });
    },
    loadTop() {},
    loadTopStauts(status) {
      this.topStatus = status;
    }
  }
};
</script>
<style lang="scss">
.taskList {
  height: 100%;
  .task-content {
    margin-top: $slideBarHeight;
  }
}
</style>

