<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import words from '@/assets/words.json';
export default {
  name: 'App',
  mounted() {
    this.$store.commit('clearWords');
    words.forEach(word => {
      this.$store.commit('addWord', word);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
