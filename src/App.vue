<template>
  <div id="app">
    <div>
        <img class="vue-logo" src="./images/logo.png" />
        <p>webpack4vue</p>
        <p>比较简单的vue脚手架</p>
        <p>webpack4 + vue2 + vue-router + vuex</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>