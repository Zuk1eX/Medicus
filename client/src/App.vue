<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("@/assets/main.css");
body {
  font-family: "Mont";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #000000;
  line-height: 100%;
}

.container {
  max-width: 1275px;
  margin: 0 auto;
}
</style>