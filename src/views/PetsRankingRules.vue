<template>
  <div>
    <van-nav-bar
      title="宠物排名规则"
      fixed
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group inset class="card-marTop">
      <van-cell>
        <template #icon>
          <img src="~@/assets/img/common/qt_dot.png" class="rules-icon" />
        </template>
        <template #title>
          <h3>
            如何提高粉丝量
          </h3>
        </template>
        <template #label>
          <span>
            用户可以在宠物档案页面点击右上角按钮生成宠物名片，分享给别人，提高曝光量；发布优质内容并关联宠物也可以大量戏份
          </span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h3>
            如何提高粉丝量
          </h3>
        </template>
        <template #icon>
          <img src="~@/assets/img/common/qt_dot.png" class="rules-icon" />
        </template>
        <template #label>
          <span>
            用户可以在宠物档案页面点击右上角按钮生成宠物名片，分享给别人，提高曝光量；发布优质内容并关联宠物也可以大量戏份
          </span>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <h3>
            如何提高粉丝量
          </h3>
        </template>
        <template #icon>
          <img src="~@/assets/img/common/qt_dot.png" class="rules-icon" />
        </template>
        <template #label>
          <span>
            用户可以在宠物档案页面点击右上角按钮生成宠物名片，分享给别人，提高曝光量；发布优质内容并关联宠物也可以大量戏份
          </span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'PetsRankingRules',
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.card-marTop {
  margin-top: 55px !important;
  padding: 15px 0;

  .rules-icon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  h3 {
    padding-bottom: 8px;
  }

  span {
    font-size: 14px;
  }
}
</style>
