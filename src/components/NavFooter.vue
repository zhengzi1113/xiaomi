<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="../image/imgs/logo-footer.png" alt="" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://www.bilibili.com/" target="_blank">Gnoix主页</a
      ><span>|</span> <a href="">Vue全栈课程</a><span>|</span>
      <a href="">React全家桶</a><span>|</span>
      <a href="">微信支付专项课程</a>
    </div>
    <div class="copyright">
      Copyright @2019 <span class="domain">2022/11/2</span>Gnoix
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-footer",
};
</script>

<style lang="scss">
.footer {
  height: 234px;
  border-block: 4px solid #ff6600;
  background-color: #333333;
  color: #999999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 53px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: #999999;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>