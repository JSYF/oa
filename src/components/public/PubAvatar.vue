<template>
    <div :class="[avatarClass,'avatar-box']">
        <img class='avatar-img' :src="imgsrc">
        <p class='avatar-name'>{{name}}</p>
    </div>
</template>

<script>
export default {
  name: "avatarBox",
  props: ["imgsrc", "name", "type"],
  computed: {
    avatarClass() {
      if (this.type && this.type == "large") {
        return "large";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
.avatar-box {
  text-align: center;
  width: 3rem;
  .avatar-img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .avatar-name {
    margin-top: 0.25rem;
    font-size: 1rem;
    color: $font-11;
  }
  &.large {
    width: 4.5rem;
    .avatar-img {
      width: 4.5rem;
      height: 4.5rem;
    }
    .avatar-name {
      margin-top: 0.5rem;
      font-size: 1.4rem;
    }
  }
}
</style>
