<template>
  <div class="pub-file-item" @click="openFile">
    <i class='left-icon oa-icon file'></i>
    <p class='file-name'>{{name}}</p>
    <p class='file-size'>{{size}}</p>
    <i class='right-icon oa-icon file-cancel' @click='fileFunc'></i>
  </div>
</template>



<script>
export default {
  name: "pubFileItem",
  props: ["name", "size"],
  methods: {
    openFile() {
      cnsole.log("打开文件");
    },
    fileFunc() {
      this.$emit("fileItemFunc");
    }
  }
};
</script>


<style lang="scss">
.pub-file-item {
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
</style>


