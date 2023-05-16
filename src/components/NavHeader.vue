<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"> </span>
            购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in redmiList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        v-lazy="require('../image/imgs/nav-img/nav-3-1.jpg')"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        v-lazy="require('../image/imgs/nav-img/nav-3-2.jpg')"
                        alt=""
                      />
                    </div>
                    <div class="pro-name">小米全息电视 65英寸</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
      redmiList: [],
    };
  },
  computed: {
    // username() {
    //   return this.$store.state.username;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // },
    ...mapState(["username", "cartCount"]),
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2) + "元";
    },
  },
  mounted() {
    this.getProductlist();
    let params = this.$route.params;
    // 如果从登陆页面跳转过来的，才需要重新加载数据
    if (params && params.from === "login") {
      this.getCartCount(); // 需要重新加载购物车数据，因为退出登录的功能会清除掉数据
    }
  },
  methods: {
    login() {
      this.$router.push("/login"); //跳转登录
    },
    getProductlist() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            // pageSize:6,//一页展示六条数据
          },
        })
        .then((res) => {
          if (res.list.length >= 6) {
            this.phoneList = res.list.slice(0, 6);
            this.redmiList = res.list.slice(6, 9);
          }
        });
    },
    // 拉取购物车信息
    getCartCount() {
      // 调用接口，拉取数据：get   推送数据：post
      this.axios.get("/carts/products/sum").then((res) => {
        // to-do  保存到vuex中
        this.$store.dispatch("saveCartCount", res);
      });
    },
    // 退出登录
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功");
        // 清空数据
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", ""); // 清空用户名信息
        this.$store.dispatch("saveCartCount", 0); // 清空购物车数量
      });
    },
    goToCart() {
      this.$router.push("/cart"); //跳转购物车
    },
  },
};
</script>

<style lang='scss'>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "../image/imgs/icon-cart-checked.png")
            margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();

      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer; //鼠标带手
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: 0.5s;
            background-color: #ffffff;

            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center; //文字图片居中
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: " ";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          // justify-content: space-between;//水平居中
          align-items: center; //垂直居中
        }
        input {
          border: none;
          box-sizing: border-box; //使padding和border不会在影响元素宽高
          border-right: 1px solid #e0e0e0; //设置右边线
          width: 264px;
          height: 50px;
          padding-left: 14px;
        }
        a {
          @include bgImg(18px, 18px, "../image/imgs/icon-search.png");
          margin-left: 17px;
        }
      }
    }
  }
}
</style>
