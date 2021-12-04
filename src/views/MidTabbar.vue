<template>
  <div class="midtabbar bg-white">
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        v-for="menuItem in menuList"
        :key="menuItem.text"
        @click="menuItem.jumpPage"
      >
        <img :src="menuItem.imgPath" alt="" />
        <span>{{ menuItem.text }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 关闭按钮 -->
    <van-row type="flex" justify="center" align="center" class="close">
      <van-col>
        <van-icon name="cross" size="25" @click="close" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'MidTabbar',
  data() {
    return {
      menuList: [
        {
          imgPath: require('@/assets/img/midTabbar/video.png'),
          text: '原创视频',
          jumpPage: () => {
            this.$toast('该功能暂未开放')
          }
        },
        {
          imgPath: require('@/assets/img/midTabbar/img-text.png'),
          text: '图文',
          jumpPage: () => {
            this.$router.push({
              path: '/post'
            })
          }
        },
        {
          imgPath: require('@/assets/img/midTabbar/diary.png'),
          text: '日记',
          jumpPage: () => {
            this.$router.push({
              path: '/release_news',
              query: {
                flag: 'choose'
              }
            })
          }
        },
        {
          imgPath: require('@/assets/img/midTabbar/seek-help.png'),
          text: '求助',
          jumpPage: () => {
            this.$toast('该功能暂未开放')
          }
        }
      ]
    }
  },
  methods: {
    close() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.midtabbar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  span {
    margin-top: 5px;
  }
}
.close {
  width: 100%;
  height: 60px;
  margin: 20px 0 40px 0;
}
</style>
