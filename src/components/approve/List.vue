<template>
  <div class='approve-list'>
    <slide-btn v-model="slideIndex"></slide-btn>
    <div class='content' v-if="listData">
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change='loadTopStauts'>
        <div v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <mt-button v-for="item in listData" :key='item.id' class='approve-item' @click='toDetails(item)'>
            <div class='avatar-box'>
              <img src="http://www.w3school.com.cn/i/eg_tulip.jpg">
            </div>
            <div class='content-wrap'>
              <div class='title'>{{item.name}}</div>
              <p v-for="content in item.context" :key='content.id'>{{content.label}} {{content.values}}</p>
            </div>
            <p class="create-time">{{item.createdate|timeFilter('MM-DD')}}</p>
          </mt-button>
          <div slot="top" class="mint-loadmore-top">
            <span class='icon' v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
              <i class='oa-icon break1'></i>
            </span>
            <span class='refreshing' v-show="topStatus === 'loading'"><img src="~@/assets/img/refreshing.png"></span>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div>{{change}}</div>
  </div>
</template>

<script>
import moment from "moment";
import slideBtn from "../public/SlideBtn";
export default {
  name: "approveList",
  props: ["id"],
  components: { slideBtn },
  data() {
    return {
      slideIndex: 0, //0 未审批 1 已审批
      loading: false,
      listData: null,
      isInit: true,
      getListParam: {
        type: parseInt(this.id) + 1, //1 我发起的 2 我审批的 3 抄送我的
        num: this.$store.state.approve.listPageNum //分页数
      },
      topStatus: null
    };
  },
  computed: {
    change() {
      let data = this.$store.state.approve.willUpdate;
      if (this.isInit) {
        this.isInit = false;
      } else {
        this.loading = false;
        this.updatedData(data);
      }
      return data;
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    slideIndex() {
      let status = this.$store.state.approve.listSlideIndex;
      status[this.id] == this.slideIndex;
      this.$store.commit("SETLISTSLIDEINDEX", status);
      let listData = this.$store.state.approve.listData[this.id];
      if (this.slideIndex == 0) {
        if (listData.approvingData.listData.length == 0) {
          this.getList();
        } else {
          this.listData = listData.approvingData.listData;
        }
      } else if (listData.approvedData.listData.length == 0) {
        this.getList();
      } else {
        this.listData = listData.approvedData.listData;
      }
    }
  },
  methods: {
    //发起和审批后更新
    updatedData(data) {
      if (data.type == parseInt(this.id) + 1) {
        let listData = this.$store.state.approve.listData[this.id];
        if (data.type == 1) {
          //发起
          listData.approvingData.listData = [];
          listData.approvingData.startNum = 0;
          this.$store.commit("SETLISTDATA", { data: listData, index: this.id });
          this.getList({ index: 0, type: data.type });
        } else if (data.type == 2) {
          //审批
          listData.approvingData.listData = [];
          listData.approvingData.startNum = 0;
          listData.approvedData.listData = [];
          listData.approvedData.startNum = 0;
          this.$store.commit("SETLISTDATA", { data: listData, index: this.id });
          this.getList({ index: 1, type: data.type });
          this.getList({ index: 0, type: data.type });
        }
      }
    },
    loadMore() {
      console.log("loadmore");
      if (this.loading == false) {
        this.loading = true;
        this.getList({ isLoadBottom: true });
      }
    },
    /**获取审批列表 */
    getList(obj) {
      let listData = JSON.parse(
        JSON.stringify(this.$store.state.approve.listData[this.id])
      );

      let index = null; //已审批还是待审批
      if (obj && obj.index) {
        index = obj.index;
      } else {
        index = this.slideIndex;
      }
      let type = null;
      if (obj && obj.type) {
        type = obj.type;
      } else {
        type = this.getListParam.type;
      }
      let param = {
        access_token: this.$store.state.userInfo.access_token,
        userId: this.$store.state.userInfo.userId,
        num: this.getListParam.num,
        type: type,
        companyId: this.$store.state.userInfo.company_id
      };

      if (index == 0) {
        param.status = listData.approvingData.status;
        param.startNum = listData.approvingData.startNum;
      } else {
        param.status = listData.approvedData.status;
        param.startNum = listData.approvedData.startNum;
      }
      // console.log("查询参数", param);
      this.$post({
        url: "/oa-work/approval/selectApprovalList",
        postData: param
      })
        .then(data => {
          // console.log("查询列表数据", data);
          let list =
            index == 0
              ? listData.approvingData.listData
              : listData.approvedData.listData;
          data.forEach(item => {
            item.context = JSON.parse(item.context);
            item.context.forEach(item2 => {
              if (item2.type == 6) {
                item2.values = moment(item2.values).format("MM.DD HH:mm");
              } else if (item2.type == 7) {
                let temp = JSON.parse(item2.values);
                item2.values =
                  moment(temp[0]).format("MM.DD HH:mm") +
                  " - " +
                  moment(temp[1]).format("MM.DD HH:mm");
              }
            });
            list.push(item);
          });
          if (index == 0) {
            listData.approvingData.startNum += this.getListParam.num;
            this.listData = listData.approvingData.listData;
          } else {
            listData.approvedData.startNum += this.getListParam.num;
            this.listData = listData.approvedData.listData;
          }
          this.$store.commit("SETLISTDATA", { data: listData, index: this.id });
          if (obj) {
            if (obj.isLoadTop) {
              this.$refs.loadmore.onTopLoaded();
            } else if (obj.isLoadBottom) {
              if (data.length < 5) {
                this.loading = true;
              } else {
                this.loading = false;
              }
            }
          }
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("查询审批列表失败");
        });
    },
    /**跳转到详情页 */
    toDetails(item) {
      // console.log("item", item);
      const params = {
        approvalId: item.id,
        name: item.name,
        type: this.getListParam.type,
        nodemark: item.nodemark
      };
      if (this.slideIndex == 0) {
        params.status = 1;
      } else {
        params.status = 0;
      }
      this.$store.dispatch("setApproveParams", params);
      this.$router.push({ name: "approveDetails" });
    },
    //下拉刷新
    loadTop() {
      let listData = this.$store.state.approve.listData[this.id];
      if (this.slideIndex == 0) {
        listData.approvingData.listData = [];
        listData.approvingData.startNum = 0;
      } else {
        listData.approvedData.listData = [];
        listData.approvedData.startNum = 0;
      }
      this.loading = false;
      this.$store.commit("SETLISTDATA", { data: listData, index: this.id });
      this.getList({ isLoadTop: true });
    },
    //监听下拉状态
    loadTopStauts(status) {
      this.topStatus = status;
    }
  }
};
</script>
<style lang='scss'>
@keyframes rotate {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.approve-list {
  height: 100%;
  .content {
    height: calc(100% - 5.1rem);
    margin-top: 5.1rem;
    overflow-y: scroll;
  }
  .mint-loadmore-top {
    .icon {
      display: block;
      i {
        font-size: 1.4rem;
      }
      &.rotate {
        transform: rotate(180deg);
      }
    }
    .refreshing {
      img {
        width: 4.2rem;
        animation: rotate 1s infinite;
        height: 4.2rem;
      }
    }
  }
  .approve-item {
    border-radius: 1rem;
    height: 9.2rem;
    margin: 0 1rem 1rem 1rem;
    width: calc(100% - 2rem);
    padding: 0;
    background: $bg-white;
    overflow: initial;
    .mint-button-text {
      overflow: initial;
      @include clearFix();
      .avatar-box {
        float: left;
        background: $bg-white;
        position: relative;
        width: 6.8rem;
        margin-left: -1rem;
        height: 5.8rem;
        box-shadow: 3px 0px 8px 0px rgba(180, 180, 180, 0.39);
        border-top-right-radius: 50%;
        overflow: hidden;
        border-bottom-right-radius: 50%;
        img {
          border-radius: 50%;
          position: absolute;
          height: 4.5rem;
          width: 4.5rem;
          top: 0.6rem;
          right: 0.9rem;
        }
      }
      .content-wrap {
        float: left;
        margin-left: 1.5rem;
        text-align: left;
        max-width: 18rem;
        .title {
          font-size: 1.5rem;
          color: $font-11;
          margin-bottom: 1rem;
        }
        p {
          width: 100%;
          overflow: hidden;
          font-size: 1.3rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:last-child {
            margin-top: 1rem;
          }
        }
      }
      .create-time {
        float: right;
        font-size: 1.2rem;
        color: $font-99;
        margin-right: 1.3rem;
      }
    }
  }
}
</style>