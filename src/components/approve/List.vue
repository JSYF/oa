<template>
  <div class='approve-list'>
    <slide-btn v-bind:slideData="slideData" @slideFunc="slideFunc"></slide-btn>
    <div class='content'>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change='loadTopStauts'>
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
      </mt-loadmore>
    </div>
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
      approvingData: {
        //未审批数据
        listData: [],
        startNum: 0,
        status: 1
      },
      approvedData: {
        //已审批数据
        listData: [],
        startNum: 0,
        status: 0
      },

      userInfo: null, //存储用户信息
      listData: [],
      slideIndex: 0, //0 未审批 1 已审批
      slideData: [
        {
          id: 0,
          text: "待审批"
        },
        {
          id: 1,
          text: "已审批"
        }
      ],
      allLoaded: false,
      getListParam: {
        type: parseInt(this.id) + 1, //1 我发起的 2 我审批的 3 抄送我的
        num: 5 //分页数
      },
      topStatus: null
    };
  },
  mounted() {
    this.getUser()
      .then(e => {
        this.userInfo = e;
        this.getList();
      })
      .catch(e => console.log(e));
  },
  methods: {
    slideFunc(data) {
      this.slideIndex = data;
      // this.listData.splice(0, this.listData.length);
      // console.log(JSON.stringify(this.listData))
      if (this.slideIndex == 0) {
        if (this.approvingData.listData.length == 0) {
          this.getList();
        } else {
          this.listData = this.approvingData.listData;
        }
      } else {
        if (this.approvedData.listData.length == 0) {
          this.getList();
        } else {
          this.listData = this.approvedData.listData;
        }
      }
    },
    getList(moreStr) {
      let param = {
        access_token: this.userInfo.access_token,
        userId: this.userInfo.userId,
        num: this.getListParam.num,
        type: this.getListParam.type,
        companyId: this.userInfo.company_id
      };
      if (this.slideIndex == 0) {
        param.status = this.approvingData.status;
        param.startNum = this.approvingData.startNum;
      } else {
        param.status = this.approvedData.status;
        param.startNum = this.approvedData.startNum;
      }
      console.log("查询审批参数：", param);
      this.$http
        .post(baseURL + "/oa-work/approval/selectApprovalList", param)
        .then(
          result => {
            console.log("审批列表成功:", result);
            if (result.ok && result.data.status == true) {
              let list =
                this.slideIndex == 0
                  ? this.approvingData.listData
                  : this.approvedData.listData;
              let data = result.data.data;
              data.forEach(item => {
                item.context = JSON.parse(item.context);
                item.context.forEach(item2 => {
                  if (item2.type == 6) {
                    item2.values = moment(item2.values).format("MM-DD HH:mm");
                  } else if (item2.type == 7) {
                    let temp = JSON.parse(item2.values);
                    item2.values =
                      moment(temp[0]).format("MM-DD HH:mm") +
                      " - " +
                      moment(temp[1]).format("MM-DD HH:mm");
                  }
                });
                list.push(item);
              });
              if (this.slideIndex == 0) {
                this.approvingData.startNum += this.getListParam.num;
              } else {
                this.approvedData.startNum += this.getListParam.num;
              }
              this.listData = list;
              if (data.length < 5) {
                this.allLoaded = true;
              }
              if (moreStr != undefined) {
                if (moreStr == "top") {
                  this.$refs.loadmore.onTopLoaded();
                } else {
                  this.$refs.loadmore.onBottomLoaded();
                }
              }
            } else {
              throw "err";
            }
          },
          err => {
            throw err;
          }
        )
        .catch(e => {
          console.log("查询审批列表失败", e);
        });
    },
    //跳转到详情页
    toDetails(item) {
      console.log(item);
      const params = {
        approvalId: item.id,
        name: item.name,
        status: this.slideIndex,
        type: this.getListParam.type,
        nodemark: item.nodemark
      };
      this.$router.push({
        name: "approveDetails",
        params: JSON.stringify(params),
        props: true
      });
    },
    //下拉刷新
    loadTop() {
      if (this.slideIndex == 0) {
        this.approvingData.listData = [];
        this.approvingData.startNum = 0;
      } else {
        this.approvedData.listData = [];
        this.approvedData.startNum = 0;
      }
      this.listData.splice(0, this.listData.length);
      this.allLoaded = false;
      this.getList("top");
    },
    //监听下拉状态
    loadTopStauts(status) {
      this.topStatus = status;
    },
    //
    loadBottom() {
      this.getList("bottom");
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
        .title {
          font-size: 1.5rem;
          color: $font-11;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.3rem;
          &:last-child {
            margin-top: 1rem;
          }
        }
      }
      .create-time {
        float: right;
        font-size: 1.2rem;
        color: $font-99;
        margin-right: 1.5rem;
      }
    }
  }
}
</style>