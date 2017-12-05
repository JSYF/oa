<template>
    <div class='detailsNode'>

    </div>
</template>

<script>
export default {
  name: "detailsNode",
  props: ["nodeData"],
  created() {
    console.log(this.nodeData);
  }
};
</script>

