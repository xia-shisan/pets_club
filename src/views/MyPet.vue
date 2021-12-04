<template>
  <div class="bg-white">
    <!-- 我的宠物 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="我的宠物"
      right-text="添加宠物"
      left-arrow
      style="border-bottom: 1px solid #dfdfdf;"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 宠物卡片 -->
    <div v-if="petsList && petsList.length !== 0">
      <van-cell
        class="pet-info-box"
        title-class="pet-title"
        v-for="petItem in petsList"
        :key="petItem.pet_id"
      >
        <!-- 宠物头像 -->
        <template #icon>
          <img
            :src="petItem.image ? petItem.image : defaultPhoto"
            class="pet-photo"
            @click="jumpPetDetails(petItem.pet_id)"
          />
        </template>
        <!-- 宠物名、性别 -->
        <template #title>
          <span class="icon-mr" @click="jumpPetDetails(petItem.pet_id)">
            {{ petItem.pet_name }}
          </span>
          <!-- 性别 -->
          <!-- 弟弟 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="xingbie-nan"
            color="#85c1ed"
            v-if="petItem.sex === 1"
          />
          <!-- 妹妹 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="xingbie-nv"
            color="#ff6cd5"
            v-if="petItem.sex === 2"
          />
          <!-- 保密 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="mi"
            color="#e9e9e9"
            size="20"
            v-if="petItem.sex === 0 || petItem.sex === 3"
          />
        </template>
        <!-- 标签 -->
        <template #label>
          <van-tag color="#eaa652" class="pet-tag">{{
            petItem.category_name
          }}</van-tag>
          <van-tag color="#8086e1" class="pet-tag">{{
            petItem.birthday | filterBirthday
          }}</van-tag>
        </template>
        <!-- 右侧删除宠物按钮 -->
        <template #right-icon>
          <van-icon
            name="clear"
            size="20"
            color="#c0ccda"
            @click="delMemberPets(petItem.pet_id)"
          />
        </template>
      </van-cell>
    </div>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { getPetsList, deleteMemberPets } from '@/network/api/member'

export default {
  name: 'MyPet',
  data() {
    return {
      // 宠物列表
      petsList: [],
      // 默认头像
      defaultPhoto: require('@/assets/img/common/qt_header2.jpeg')
    }
  },
  created() {
    this.getPetsList()
  },
  methods: {
    // 获取会员宠物列表信息
    async getPetsList() {
      const {
        data: { data }
      } = await getPetsList()
      console.log(data)
      this.petsList = data
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },
    // 跳转到添加宠物页面
    onClickRight() {
      this.$router.push('/petsArchives')
    },
    // 删除宠物
    delMemberPets(petId) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除',
          width: '70%'
        })
        .then(async () => {
          await deleteMemberPets(petId)
          this.$toast({
            message: '删除成功',
            duration: 800
          })
          this.getPetsList()
        })
        .catch(() => {
          return false
        })
    },
    // 查看宠物详情
    jumpPetDetails(petId) {
      this.$router.push({
        path: '/pet-details',
        query: {
          pet_id: petId,
          flag: 'mine'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pet-info-box {
  padding: 20px 20px 20px 30px;
  border-bottom: 1px solid #dfdfdf;

  .pet-photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .pet-title {
    font-size: 15px;
    font-weight: 600;
    margin-top: 3px;
  }

  .pet-tag {
    padding: 3px 5px;
    border-radius: 5px;
    margin-right: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
