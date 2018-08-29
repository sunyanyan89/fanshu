<template>
  <div id="app">
    <my-header/>
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import MyHeader from "@/components/Header";
export default {
  name: "App",
  components: { MyHeader },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
  }
};
</script>

<style>
</style>
