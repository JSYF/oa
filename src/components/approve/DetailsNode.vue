<template>
  <div class='detailsNode'>
    <div class='node-item' v-for="(item,index) in listData" :key="item.id">
      <div class='node-item-top-bar'>
        <span class='node-icon'>
          <i v-if="item.status ==0 ||item.status ==2" class='oa-icon agree'></i>
          <i v-else-if="item.status ==1" class='oa-icon approval-waiting'></i>
          <i v-else class='oa-icon disagree error-icon'></i>
        </span>
        <p class='node-name'>{{nodeName(item)}}</p>
        <span :class="[nodeStatusClass(item.status),'node-status']">{{nodeStatus(item.status)}}</span>
        <span class='node-approveValue-status' v-if="(item.actortype == 2 ||item.actortype == 3) &&item.approveValue!=undefined" @click="changeApproveValueStatus(index)">
          <i class='oa-icon break1' :style="approveValuesIconRotate(item)"></i>
        </span>
        <span class='node-approveValue-num' v-if="item.actortype == 3">同意人数需≥{{item.needsums}}</span>
        <span class='node-time'>{{item.createdate|timeFilter("MM-DD HH:mm")}}</span>
      </div>
      <div class="node-item-content" v-if="item.actortype ==1 && item.context">
        <p>{{item.context}}</p>
      </div>
      <div class='node-item-approves' v-else-if="item.approveValue!==undefined" v-show="item.approveValue.isOpen == true">
        <div class='node-item-approves-item' v-for="(approveItem,index) in item.approveValue.list" :key="approveItem.index">
          <div class='top-bar'>
            <p class='name'>{{getName(item.operator_id)}}</p>
            <span :class="[nodeStatusClass(approveItem.status),'status']">{{nodeStatus(approveItem.status)}}</span>
            <span class='time'>{{approveItem.createdate | timeFilter("MM-DD HH:mm")}}</span>
          </div>
          <div class='context' v-if="approveItem.context">{{approveItem.context}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailsNode",
  props: ["nodeData"],
  data() {
    return {
      listData: this.nodeData
    };
  },
  created() {
    this.listData.forEach((item, index) => {
      if (item.actortype == 2 || item.actortype == 3) {
        this.$post({
          url: "/oa-work/approval/selectTranLong",
          postData: {
            access_token: this.$store.state.userInfo.access_token,
            nodeLogId: item.id
          }
        }).then(data => {
          this.$set(this.listData[index], "approveValue", {
            isOpen: false,
            list: data
          });
        });
      }
    });
  },
  methods: {
    nodeStatus(status) {
      if (status == 0) {
        return "发起审批";
      } else if (status == 1) {
        return "等待审批";
      } else if (status == 2) {
        return "同意审批";
      } else {
        return "不同意审批";
      }
    },
    nodeStatusClass(status) {
      if (status == 0) {
        return "grey";
      } else if (status == 1) {
        return "orange";
      } else if (status == 2) {
        return "green";
      } else {
        return "red";
      }
    },
    nodeName(item) {
      if (item.actortype == 1) {
        //根据ID获取名字
        // id:item.operator

        return this.getName();
      } else if (item.actortype == 2) {
        return "会签";
      } else {
        return "或签";
      }
    },
    approveValuesIconRotate(item) {
      if (item.approveValue.isOpen) {
        return "transform:rotate(-180deg)";
      } else {
        return "";
      }
    },
    changeApproveValueStatus(index) {
      this.$set(
        this.listData[index].approveValue,
        "isOpen",
        !this.listData[index].approveValue.isOpen
      );
    },
    getName(id) {
      return "雷神";
    }
  }
};
</script>


<style lang="scss">
.detailsNode {
  margin-top: 1rem;
  background: $bg-white;
  padding: 1.5rem 1.3rem 0.5rem;
  margin-bottom: 2rem;
  .node-item {
    min-height: 5.1rem;
    position: relative;
    .node-item-top-bar {
      height: 1.8rem;
      line-height: 1.8rem;
      @include clearFix();
      .node-icon {
        position: relative;
        float: left;
        width: 1.8rem;
        height: 100%;
        z-index: 99;
        .oa-icon {
          position: absolute;
          height: 1.8rem;
          width: 1.8rem;
          font-size: 0.8rem;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          border-radius: 50%;
          background: $col-agress;
          color: white;
          &.error-icon {
            background: $col-disagree;
          }
          &::before {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        }
      }
      .node-name {
        font-size: 1.4rem;
        color: $font-11;
        margin-left: 1rem;
        margin-right: 1.4rem;
        float: left;
        vertical-align: middle;
      }
      .node-status {
        float: left;
        vertical-align: middle;
        font-size: 1.2rem;
        &.orange {
          color: $warning;
        }
        &.red {
          color: $danger;
        }
        &.green {
          color: $green;
        }
        &.grey {
          color: $font-99;
        }
      }
      .node-approveValue-status {
        float: left;
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 0.8rem;
        text-align: center;
        .oa-icon {
          color: $font-99;
          display: block;
          font-size: 1.4rem;
        }
      }
      .node-approveValue-num {
        margin-left: 0.5rem;
        font-size: 1.1rem;
        color: $font-99;
      }
      .node-time {
        float: right;
        font-size: 1.2rem;
        color: $font-99;
      }
    }
    .node-item-content {
      margin-top: 0.5rem;
      padding: 0 2.8rem 1rem;
      p {
        color: $font-99;
        text-align: justify;
        font-size: 1.2rem;
      }
    }
    .node-item-approves {
      padding: 0 0 1rem 3.5rem;
      .node-item-approves-item {
        .top-bar {
          height: 1.8rem;
          line-height: 1.8rem;
          font-size: 1.2rem;
          @include clearFix();
          .name {
            float: left;
            color: $font-99;
          }
          .status {
            margin-left: 1rem;
            float: left;
            &.orange {
              color: $warning;
            }
            &.red {
              color: $danger;
            }
            &.green {
              color: $green;
            }
            &.grey {
              color: $font-99;
            }
          }
          .time {
            float: right;
            color: $font-99;
          }
        }
        .context {
          font-size: 1.1rem;
          color: $font-99;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      background: $border-99;
      display: block;
      height: 100%;
      width: 1px;
      top: 0;
      left: 0.9rem;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>


