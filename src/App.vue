<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getMainData: function() {
      this.$axios
        .post("url", this.$qs(参数))
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body{
  margin: 0;
}
@font-face {
  font-family: 'specialNumber';
  src: url('../display_free_tfb.ttf') format('truetype');
}
</style>
