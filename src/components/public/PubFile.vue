<template>
  <div class='pubFile'>
    <div class="bg-wrap">
      <p class='file-title'>{{data.label}}</p>
      <div class='file-img-add'>
        <div v-for="(imgItem,index) in imgList" :key='index' class='file-item'>
          <div class='img-wrap'>
            <img v-bind:src="imgItem.localPath">
            <span class='closeIcon' @click='delImg(index)'>
              <i class='oa-icon file-cancel'></i>
            </span>
          </div>
        </div>
        <div class='file-item file-add-btn'>
          <mt-button @click='addImage'>
            <i class='oa-icon add-image'></i>
          </mt-button>
        </div>
        <div class='file-item file-add-btn'>
          <mt-button @click='addFile'>
            <i class='oa-icon add-file'></i>
          </mt-button>
        </div>
      </div>
      <div class='file-list'>
        <div class='file-item' v-for="(fileItem,index) in fileList" :key="index">
          <i class='left-icon oa-icon file'></i>
          <p class='file-name'>{{fileItem.fileName}}</p>
          <p class='file-size'>{{fileItem.fileSize}}</p>
          <i class='right-icon oa-icon file-cancel' @click='delFile(index)'></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pubFile",
  props: ["data"],
  data() {
    return {
      imgList: [
        {
          path: "",
          localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          path: "",
          localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          path: "",
          localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          path: "",
          localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          path: "",
          localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        }
      ],
      fileList: [
        {
          fileName:
            "abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc",
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
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  methods: {
    addImage() {
      this.imgList.push({
        path: "",
        localPath: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
      });
      this.postData();
    },
    delImg(index) {
      this.imgList.splice(index, 1);
      this.postData();
    },
    addFile() {
      this.fileList.push({
        fileName: "abc",
        fileSize: "7.2M",
        path: "",
        localPath: ""
      });
      this.postData();
    },
    delFile(index) {
      this.fileList.splice(index, 1);
      this.postData();
    },
    postData() {
      let arr = [];
      this.imgList.forEach(item => {
        arr.push({ fileName: item.path, type: "image" });
      });
      this.fileList.forEach(item => {
        arr.push({
          fileName: item.path,
          type: "file",
          name: item.fileName,
          size: item.fileSize
        });
      });
      this.$emit("returnDataFunc", JSON.stringify(arr));
    }
  }
};
</script>

<style lang="scss">
.pubFile {
  margin: 1rem 0;
  .bg-wrap {
    padding: 1.2rem;
    background: $bg-white;
  }
  .file-title {
    font-size: 1.5rem;
    color: $font-11;
    margin-bottom: 1.7rem;
  }
  .file-img-add {
    @include clearFix();
    .file-item {
      float: left;
      width: 25%;
      text-align: center;
      margin-bottom: 1.4rem;
      .img-wrap {
        position: relative;
        height: 4.4rem;
        width: 4.4rem;
        img {
          height: 100%;
          width: 100%;
        }
        .closeIcon {
          position: absolute;
          background: $danger;
          border-radius: 50%;
          width: 1.8rem;
          height: 1.8rem;
          top: -0.9rem;
          display: block;
          right: -0.9rem;
          i {
            font-size: 1.2rem;
            color: white;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            position: absolute;
          }
        }
      }
      &.file-add-btn {
        text-align: left;
        button {
          width: 4.4rem;
          height: 4.4rem;
          i {
            font-size: 4.3rem;
          }
        }
      }
    }
  }
  .file-list {
    .file-item {
      border: 1px solid $border-99;
      border-radius: 4.5rem;
      background: $bg-ec;
      @include clearFix();
      height: 4.6rem;
      line-height: 4.6rem;
      margin-bottom: 1.5rem;
      padding: 0 1.7rem;
      .left-icon {
        float: left;
        font-size: 1.8rem;
        width: 5%;
        color: $font-99;
      }
      .file-name {
        float: left;
        margin-left: 1rem;
        width: 67.5%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.5rem;
        color: $font-11;
      }
      .file-size {
        float: left;
        width: 12%;
        font-size: 1.4rem;
        color: $font-99;
        margin-left: 1%;
      }
      .right-icon {
        float: right;
        color: $font-99;
        font-size: 1.4rem;
        font-weight: bold;
      }
    }
  }
}
</style>
