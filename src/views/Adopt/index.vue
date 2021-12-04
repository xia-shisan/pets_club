<template>
  <div class="adopt">
    <!-- 领养中心 -->
    <van-nav-bar title="领养中心" left-arrow @click-left="onClickLeft" />
    <!-- 通知栏 -->
    <van-notice-bar :scrollable="false" left-icon="volume-o" background="#fff">
      <template #default>
        <div v-html="adoptNotice"></div>
      </template>
    </van-notice-bar>

    <!-- 轮播图 -->
    <van-cell-group inset class="adopt-swipe">
      <swipe :banner="banner" imgHeight="130" imgFit="scale - down" />
    </van-cell-group>

    <!-- 宠物领养列表 -->
    <div class="adopt-list">
      <adopt-list :petsAdoptList="petsAdoptList" :areaList="areaList" />
    </div>
  </div>
</template>

<script>
import Swipe from '@/components/Swipe'
import AdoptList from './components/adopt-list'
// 导入省市区数据
import { areaList } from '@vant/area-data'

import { GetCarousel, getTextSettings } from '@/network/api/common'
import { getPetsAdoptList } from '@/network/api/pets'

export default {
  name: 'Adopt',
  components: {
    Swipe,
    AdoptList
  },
  data() {
    return {
      // 轮播图
      banner: [],
      // 领养通告
      adoptNotice: '',
      // 宠物领养列表请求信息
      queryInfo: {
        // 需要展示的分类
        type: 0,
        // 查询页码
        page: 1,
        // 每页显示条数
        per_count: 10,
        // 行政区编码
        code: {},
        // 查询行政区层级
        address_type: ''
      },
      // 宠物领养列表
      petsAdoptList: {},
      // 省市区数据
      areaList
    }
  },
  created() {
    this.$set(this.areaList.province_list, '100000', '全国')
    this.$set(this.areaList.city_list, '100100', '不限')
    this.$set(this.areaList.county_list, '100101', '不限')
    this.GetCarousel()
    this.getTextSettings()
    this.getPetsAdoptList()
  },
  methods: {
    // 获取轮播图
    async GetCarousel() {
      const {
        data: { data }
      } = await GetCarousel()
      data.forEach(item => {
        this.banner.push(item.url)
      })
    },
    // 获取领养公告
    async getTextSettings() {
      const {
        data: { data }
      } = await getTextSettings('adopt_announcement')
      this.adoptNotice = data[0].settings
    },
    // 获取宠物领养列表信息
    getPetsAdoptList() {
      // 加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 首次加载数据
      if (this.queryInfo.page === 1) {
        getPetsAdoptList(this.queryInfo).then(result => {
          console.log(result)
          this.petsAdoptList = result.data
          this.queryInfo.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
        })
      } else if (this.queryInfo.page <= this.petsAdoptList.last) {
        getPetsAdoptList(this.queryInfo).then(result => {
          this.petsAdoptList.list.push(...result.data.list)
          this.queryInfo.page++
          // 关闭加载提示
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 1
          })
        })
      } else {
        return false
      }
    },
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.adopt {
  height: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .adopt-list {
    position: relative;
    width: 100vw;
    flex: 1;
    background-color: #fff;
    padding-bottom: 20px;
    overflow: scroll;
  }
}
</style>
