<template>
    <div class="no-data">
        <img src="../image/imgs/icon-no-data.png" alt="">
        <p>当前暂无提交的订单记录</p>
    </div>
</template>
<script>
export default {
    name:"no-data",
}
</script>
<style lang="scss">
.no-data{
    text-align: center;
    font-size: 20px;
    color: #999999;
    margin: 50px 0;
    img{
        height: 240px;
        // width: 180px;
        width: 340px;
        margin-bottom: 30px;
    }
}
</style>