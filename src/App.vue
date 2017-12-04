<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang='scss'>
html {
  font-size: 62.5%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: $bg-f6;
}
p,
img,
h1,
h2,
h3,
h4,
h5,
h6,
input,
textarea {
  margin: 0;
  padding: 0;
}
input,
textarea {
  border: none;
  outline: none;
  resize: none;
}
#app {
  height: 100%;
}
.mint-button--default {
  background: none;
  box-shadow: none;
}
.mint-button::after {
  background-color: $bg-ec;
}
.mint-button--normal {
  padding: 0;
}
</style>
