<template>
  <div class='pubShowFile'>
    <p class='label' v-if="label">{{label}}</p>
    <div class='file-content'>
      <div v-if="isNull">无</div>
      <div class='file-img'>
        <div v-for="(imgItem,index) in showData.imgList" :key='index' class='file-item'>
          <div class='img-wrap'>
            <img v-bind:src="imgItem.localPath">
          </div>
        </div>
      </div>
      <div class='file-list'>
        <div class='file-item' v-for="(fileItem,index) in showData.fileList" :key="index">
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
  props: ["fileData", "label"],
  data() {
    return {
      isNull: false
    };
  },
  computed: {
    showData() {
      let obj = {
        imgList: [],
        fileList: []
      };
      if (this.fileData != "[]") {
        let temp = JSON.parse(this.fileData);
        if (temp.length == 0) {
          this.isNull = true;
          return;
        }
        temp.forEach(item => {
          if (item.type == "image") {
            obj.imgList.push(item);
          } else {
            obj.fileList.push(item);
          }
        });
      } else {
        this.isNull = true;
      }
      return obj;
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
        width: 60%;
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
        margin-left: 3%;
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

