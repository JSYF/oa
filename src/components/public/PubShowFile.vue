<template>
  <div class='pubShowFile'>
    <p class='label'>{{fileData.label}}</p>
    <div class='file-content'>
      <div v-if="isNull">无</div>
      <div class='file-img'>
        <div v-for="(imgItem,index) in imgList" :key='index' class='file-item'>
          <div class='img-wrap'>
            <img v-bind:src="imgItem.localPath">
          </div>
        </div>
      </div>
      <div class='file-list'>
        <div class='file-item' v-for="(fileItem,index) in fileList" :key="index">
          <i class='left-icon oa-icon file'></i>
          <p class='file-name'>{{fileItem.fileName}}</p>
          <p class='file-size'>{{fileItem.fileSize}}</p>
          <i class='right-icon oa-icon download'></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pubShowFile",
  props: ["fileData"],
  data() {
    return {
      isNull: false,
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
  computed: {
    a() {
      if (this.fileData != "[]") {
        let temp = JSON.parse(this.fileData.values);
        temp.forEach(item => {
          if (item.type == "image") {
            this.imgList.push(item);
          } else {
            this.fileList.push(item);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.pubShowFile {
  padding: 1.2rem 0;
  .label {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: $font-99;
  }
  .file-img {
    @include clearFix();
    .file-item {
      float: left;
      width: 25%;
      margin-bottom: 1.4rem;
      .img-wrap {
        position: relative;
        height: 4.4rem;
        width: 4.4rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .file-list {
    .file-item {
      background: $bg-ec;
      border: 1px solid $border-99;
      border-radius: 4.5rem;
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
        color: $secondary;
        font-size: 3rem;
        font-weight: bold;
      }
    }
  }
}
</style>

