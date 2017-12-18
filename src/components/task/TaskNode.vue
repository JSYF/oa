<template>
  <div class="task-node">
    <div class='node-item' v-for="item in nodeData" :key="item.id">
      <div class="node-top-box" v-if="item.status != 0">
        <div class="node-top-bar">
          <span :class="[item.status == 1 ? 'error':'success','icon']"></span>
          <p class='name'>{{returnName(0)}}</p>
          <p class='error status' v-if="item.status == 1">验收不通过</p>
          <p class='success status' v-else>验收通过</p>
          <p class='time'>{{item.confirm_time | timeFilter("M.DD HH:mm")}}</p>
        </div>
        <p class='content'>{{item.opinion}}</p>
      </div>
      <div class="node-bottom-box">
        <div class='node-bottom-bar'>
          <span class="success icon"></span>
          <p class='name'>{{returnName(1)}}</p>
          <p class='status'>申请验收</p>
          <p class='time'>{{item.createdate | timeFilter("M.DD HH:mm")}}</p>
        </div>
        <div class="file-list" v-if="fileData.fileList.length >0">
          <pubFileItem v-for="(file,index) in fileData.fileList" :key="index" @fileItemFunc="flieItemFunc(index)" :name="file.fileName" :size="file.fileSize"></pubFileItem>
        </div>
        <div class="img-list" v-if="fileData.imgList.length >0">
          <div class='img-item' v-for="(img,index) in fileData.imgList" :key="index">
            <img :src="img.localPath">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import pubFileItem from "../public/PubFileItem";
export default {
  name: "taskNode",
  props: ["nodeData", "detailsData"],
  components: {
    pubFileItem
  },
  data() {
    return {
      type: this.$store.state.task.detailsParams.taskType
    };
  },
  computed: {
    fileData() {
      let obj = {
        imgList: [
          {
            path: "http://www.w3school.com.cn/i/eg_tulip.jpg",
            localPath: "http://www.w3school.com.cn/i/eg_tulip.jpg"
          },
          {
            path: "http://www.w3school.com.cn/i/eg_tulip.jpg",
            localPath: "http://www.w3school.com.cn/i/eg_tulip.jpg"
          },
          {
            path: "http://www.w3school.com.cn/i/eg_tulip.jpg",
            localPath: "http://www.w3school.com.cn/i/eg_tulip.jpg"
          },
          {
            path: "http://www.w3school.com.cn/i/eg_tulip.jpg",
            localPath: "http://www.w3school.com.cn/i/eg_tulip.jpg"
          },
          {
            path: "http://www.w3school.com.cn/i/eg_tulip.jpg",
            localPath: "http://www.w3school.com.cn/i/eg_tulip.jpg"
          }
        ],
        fileList: [
          {
            fileName: "abc",
            fileSize: "7.2M",
            path: "",
            localPath: ""
          },
          {
            fileName: "abc",
            fileSize: "7.2M",
            path: "",
            localPath: ""
          },
          {
            fileName: "abc",
            fileSize: "7.2M",
            path: "",
            localPath: ""
          }
        ]
      };
      console.log(this.nodeData, this.nodeData.principal_file != "[]");
      // if (this.nodeData.principal_file != "[]") {
      //   let temp = JSON.parse(this.nodeData.principal_file);
      //   if (temp.length == 0) {
      //     return;
      //   }
      //   temp.forEach(item => {
      //     if (item.type == "image") {
      //       obj.imgList.push(item);
      //     } else {
      //       obj.fileList.push(item);
      //     }
      //   });
      // }
      return obj;
    }
  },
  methods: {
    returnName(index) {
      let str = "";
      if (this.type == 1) {
        str = index == 0 ? "我" : this.detailsData.principal_name;
      } else if (this.type == 2) {
        str = index == 0 ? this.detailsData.initiator_name : "我";
      } else {
        str =
          index == 0
            ? this.detailsData.initiator_name
            : this.detailsData.principal_name;
      }
      return str;
    },
    flieItemFunc(index) {}
  }
};
</script>



<style lang="scss">
.task-node {
  overflow: hidden;
  padding: 0 1.2rem;
  background: $bg-white;
  .node-item {
    .icon {
      position: relative;
      display: block;
      float: left;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
      &::before {
        display: block;
        font-size: 1.2rem;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        position: absolute;
        color: white;
        font-family: "oa-icon";
      }
      &.success {
        background: $green;
        &::before {
          content: "\e66c";
        }
      }
      &.error {
        background: $danger;
        &::before {
          content: "\e66b";
        }
      }
    }
    .name {
      margin-left: 1.7rem;
      color: $font-11;
      font-size: 1.4rem;
      float: left;
    }
    .status {
      float: left;
      font-size: 1.2rem;
      margin-left: 1.2rem;
    }
    .time {
      float: right;
      font-size: 1.2rem;
      color: $font-99;
    }
    .node-top-box {
      min-height: 4rem;
      padding: 1.5rem 0;
      position: relative;
      .node-top-bar {
        height: 1.8rem;
        line-height: 1.8rem;
        @include clearFix();
      }
      .content {
        margin-top: 1.3rem;
        margin-left: 17.5%;
        width: 82.5%;
        text-align: justify;
        font-size: 1.2rem;
        color: $font-99;
      }
      &::after {
        content: "";
        display: block;
        bottom: 0;
        height: 1px;
        width: 100%;
        background: $bg-ec;
        left: 20%;
        position: absolute;
      }
      &::before {
        content: "";
        width: 1px;
        left: 0.9rem;
        top: 0;
        position: absolute;
        display: block;
        background: $border-99;
        height: 100%;
      }
    }
    .node-bottom-box {
      min-height: 4rem;
      padding: 1.5rem 0;
      position: relative;
      .node-bottom-bar {
        margin-bottom: 1rem;
        height: 1.8rem;
        line-height: 1.8rem;
        @include clearFix();
      }
      .file-list {
        margin-left: 15%;
        width: 85%;
      }
      .img-list {
        margin-left: 20%;
        width: 80%;
        @include clearFix();
        .img-item {
          float: left;
          width: 20%;
          img {
            height: 4.2rem;
            width: 4.2rem;
          }
        }
      }
      &::after {
        content: "";
        display: block;
        bottom: 0;
        height: 1px;
        width: 100%;
        background: $bg-ec;
        left: 20%;
        position: absolute;
      }
      &::before {
        content: "";
        width: 1px;
        left: 0.9rem;
        top: 0;
        position: absolute;
        display: block;
        background: $border-99;
        height: 100%;
      }
    }
    &:first-child {
      .node-top-box {
        // background: red;
        &::before {
          margin-top: 1.5rem;
        }
      }
      .node-bottom-box {
        &::before {
          margin-top: 1.5rem;
        }
      }
      .node-top-box + .node-botton-box {
        &::before {
          margin-top: 0;
        }
      }
    }
    &:last-child {
      .node-bottom-box {
        // background: red;
        &::before {
          height: 1.5rem;
        }
      }
    }
  }
}
</style>
