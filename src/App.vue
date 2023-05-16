<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {
    // 拉取用户信息
    getUser() {
      // 调用接口，拉取数据：get   推送数据：post
      this.axios.get("/user").then((res = {}) => {
        // to-do  保存到vuex中
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    // 拉取购物车信息
    getCartCount() {
      // 调用接口，拉取数据：get   推送数据：post
      this.axios.get("/carts/products/sum").then((res = 0) => {
        // to-do  保存到vuex中
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
  mounted() {
    if (this.$cookie.get('userId')) {
      this.getUser()
      this.getCartCount()
    }
  },
};
</script>
<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/button.scss";
@import "./assets/scss/config.scss";
</style>