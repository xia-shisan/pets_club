<template>
  <div>
    <!-- 标题 -->
    <van-cell
      title="大家都在玩"
      value="345245参与"
      :border="false"
      title-class="card-title"
    />

    <!-- 卡片区域 -->
    <van-row type="flex" justify="space-around">
      <!-- 萌宠排行榜 -->
      <van-col span="11" class="card-box" @click="toPage('archives')">
        <div class="card-left"></div>
      </van-col>
      <!-- 发动态，领积分 -->
      <van-col span="11" class="card-box" @click="toPage('doTask')">
        <div class="card-right"></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HomeCard',
  methods: {
    // 跳转页面
    toPage(value) {
      if (value === 'archives') {
        // 跳转萌宠排行榜
        this.$router.push('/archives')
      } else if (value === 'doTask') {
        // 跳转到发动态、领积分
        this.$toast('该功能暂未开放')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card-title {
  font-size: 16px;
  font-weight: 600;
}

.card-box {
  padding: 5px 0;
}

.card-left,
.card-right {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background-color: black;
  background-size: cover;
  background-position: right center;
}
.card-left {
  background-image: url('~@/assets/img/home-card/card_1.jpg');
}
.card-right {
  background-image: url('~@/assets/img/home-card/card_2.jpg');
}

.card-left::before,
.card-right::before {
  position: absolute;
  top: 30%;
  left: 25%;
  font-size: 16px;
  font-weight: 600;
}
.card-left::before {
  content: '萌宠排行榜';
  transform: translate(-30%, -50%);
  color: #558c8d;
}
.card-right::before {
  content: '发动态';
  transform: translate(-50%, -50%);
  color: #fdde00;
}

.card-left::after,
.card-right::after {
  position: absolute;
  top: 50%;
  left: 25%;
  font-size: 12px;
  color: #fff;
}

.card-left::after {
  content: '遇见更多萌宠';
  transform: translateX(-30%);
}

.card-right::after {
  content: '领积分';
  transform: translateX(-50%);
}
</style>
