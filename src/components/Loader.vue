<template>
<div class="container-loader">
  <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: "Loader",

};
</script>
<style>
.container-loader {
  position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 999999999999;
    background: #7c808475;
}
</style>