<template>
    <div class='approveDetails'>
        details
    </div>
</template>


<script>
export default {
  name: "detail",
  props: ["params"],
  data() {
    return {
      userInfo: null
    };
  },
  mounted() {
    console.log(JSON.parse(this.params));
    this.getUser().then(e => {
      console.log("获取用户信息");
      this.userInfo = e;
    });
  },
  methods: {}
};
</script>

