<template>
  <div>
    <!-- 第一组菜单功能 -->
    <van-cell-group inset class="functions-card">
      <van-cell
        v-for="menuItem in menuListOne"
        :key="menuItem.text"
        :title="menuItem.text"
        center
        is-link
        size="large"
        @click="menuItem.jumpPage"
      >
        <template #icon>
          <img class="img-mr" :src="menuItem.iconPath" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 第二组菜单功能 -->
    <van-cell-group inset class="functions-card">
      <van-cell
        v-for="menuItem in menuListTwo"
        :key="menuItem.text"
        :title="menuItem.text"
        center
        is-link
        size="large"
        @click="menuItem.jumpPage"
      >
        <template #icon>
          <img class="img-mr" :src="menuItem.iconPath" />
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 第三组菜单功能 -->
    <van-cell-group inset class="functions-card">
      <van-cell
        v-for="menuItem in menuListThree"
        :key="menuItem.text"
        :title="menuItem.text"
        center
        is-link
        size="large"
        @click="menuItem.jumpPage"
      >
        <template #icon>
          <img class="img-mr" :src="menuItem.iconPath" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  data() {
    return {
      // 第一组功能菜单
      menuListOne: [
        {
          iconPath: require('@/assets/img/profile/qt_mine1.png'),
          text: '我的宠物',
          jumpPage: () => {
            this.$router.push('/MyPet')
          }
        },
        {
          iconPath: require('@/assets/img/profile/myDopt.png'),
          text: '我的领养',
          jumpPage: () => {
            this.$router.push('/MyAdoption')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine2.png'),
          text: '审核信息',
          jumpPage: () => {
            this.$router.push('/examinetxet')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine3.png'),
          text: '我的云养',
          jumpPage: () => {
            this.$router.push('/Yunyang')
          }
        }
      ],
      // 第二组功能菜单
      menuListTwo: [
        {
          iconPath: require('@/assets/img/profile/qt_mine4.png'),
          text: '我的作品',
          jumpPage: () => {
            this.$router.push('/MyWork')
          }
        },
        {
          iconPath: require('@/assets/img/profile/post_bar.png'),
          text: '我的帖子',
          jumpPage: () => {
            this.$router.push('/MyPost')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine5.png'),
          text: '我的收藏',
          jumpPage: () => {
            this.$router.push('/MyCollection')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine6.png'),
          text: '草稿箱',
          jumpPage: () => {
            this.$router.push('/drafts')
          }
        },
        {
          iconPath: require('@/assets/img/profile/footmark.png'),
          text: '我的足迹',
          jumpPage: () => {
            this.$router.push('/footprint')
          }
        }
      ],
      // 第三组功能菜单
      menuListThree: [
        {
          iconPath: require('@/assets/img/profile/qt_mine7.png'),
          text: '认证号招募',
          jumpPage: () => {
            this.$toast('该功能暂未开放，请尽情期待')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine8.png'),
          text: '微信客服',
          jumpPage: () => {
            this.$toast('该功能暂未开放，请尽情期待')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine9.png'),
          text: '意见反馈',
          jumpPage: () => {
            this.$toast('该功能暂未开放，请尽情期待')
          }
        },
        {
          iconPath: require('@/assets/img/profile/qt_mine10.png'),
          text: '设置',
          jumpPage: () => {
            this.$router.push('/personal-setup')
          }
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.functions-card {
  margin-top: 10px !important;
  margin-bottom: 10px !important;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
}
</style>
