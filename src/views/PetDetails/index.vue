<template>
  <div>
    <!-- 宠物详情 -->
    <!-- 导航栏 -->
    <van-nav-bar
      :title="pet_details.pet_name"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <!-- 宠物信息区域 -->
    <pet-info
      :pet_details="pet_details"
      :pet_album="pet_album"
      :isMine="isMine"
      :cloudPetInfo="cloudPetInfo"
    />

    <!-- 动态区域 -->
    <pet-dynamic :pets_dynamic="pets_dynamic" :isMine="isMine" />
  </div>
</template>

<script>
import { PetInfo, PetDynamic } from './components'

import { getPetsInfo } from '@/network/api/pets'
import { isLikePet } from '@/network/api/cloud'

import { mapGetters } from 'vuex'

export default {
  name: 'PetDetails',
  components: {
    PetInfo,
    PetDynamic
  },
  data() {
    return {
      // 宠物id
      pet_id: this.$route.query.pet_id,
      // 是否是查看本人的宠物
      isMine: false,
      // 宠物详情
      pet_details: {},
      // 宠物相册
      pet_album: [],
      // 宠物动态
      pets_dynamic: {},
      // 是否云养宠物信息
      cloudPetInfo: {
        isLikePet: false
      }
    }
  },
  computed: {
    ...mapGetters(['user_id', 'token'])
  },
  created() {
    this.getPetsInfo()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取宠物详情（基本信息+动态）
    getPetsInfo() {
      getPetsInfo(this.pet_id).then(result => {
        console.log(result)
        // 保存宠物详情
        this.pet_details = result.data.data.pet_details
        // 保存宠物相册
        this.pet_album = result.data.data.pet_album
        // 保存宠物动态
        this.pets_dynamic = result.data.data.pets_dynamic
        // 判断是不是会员用户自己的宠物
        const userId = this.pet_details.user_id
        if (userId === this.user_id) {
          this.isMine = true
        } else {
          this.token && this.isLikePet()
        }
      })
    },
    // 查看别人宠物时判断是否已云养
    isLikePet() {
      isLikePet(this.pet_id).then(result => {
        console.log(result)
        this.cloudPetInfo = result.data
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
