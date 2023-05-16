<template>
  <div class="order-header">
    <!--为该类添加clearfix可以自动消除浮动 -->
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>{{ title }}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "order-header",
  props: {
    title: String,
  },
  computed: {
    ...mapState(["username"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/base.scss";
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .header-logo {
    float: left;
  }
  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    float: left;
    margin-left: 54px;
    h2 {
      color: #333333;
      font-size: 28px;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999999;
      font-weight: 200;
    }
  }
  .username {
    float: right;
    a {
      color: #666666;
      font-size: 16px;
    }
  }
}
</style>