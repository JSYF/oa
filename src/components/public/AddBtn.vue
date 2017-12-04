<template>
  <router-link class='add-btn' :to="btnData.path">
    <i class='oa-icon' :class="btnData.icon"></i>
  </router-link>
</template>


<script>
export default {
  name: "abb-btn",
  props: ["btnData"]
};
</script>

<style lang="scss">
.add-btn {
  position: fixed;
  right: 1.8rem;
  bottom: 9.5rem;
  width: 5.6rem;
  z-index: 999;
  display: block;
  height: 5.6rem;
  border: none;
  border-radius: 50%;
  @include linear-bg();
  color: $secondary;
  box-shadow: 0.1rem 0.1rem 0.3rem 0rem rgba(87, 202, 255, 0.63);
  
  i {
    position: absolute;
    left: 50%;
    top:50%;
    transform: translateX(-50%) translateY(-50%);
    color: $font-ff;
    font-size: 2.2rem;
  }
}
</style>
