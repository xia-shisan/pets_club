<template>
  <div>
    <!-- 选择宠物 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="选择宠物"
      right-text="新增宠物"
      left-arrow
      fixed
      placeholder
      style="border-bottom:1px solid #e5e5e5"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 宠物卡片区域 -->
    <van-radio-group v-model="radio">
      <van-cell-group
        inset
        class="pet-card"
        v-for="petItem in petsList"
        :key="petItem.pet_id"
      >
        <van-cell
          :title="petItem.pet_name"
          :label="petItem.category_name"
          center
          title-class="pet-title"
          label-class="pet-label"
        >
          <!-- 宠物图片 -->
          <template #icon>
            <img
              :src="petItem.image ? petItem.image : defaultImg"
              alt=""
              class="pet-img"
            />
          </template>
          <!-- 单选框 -->
          <template #right-icon>
            <van-radio icon-size="24" :name="petItem.pet_id"></van-radio>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 底部确认按钮 -->
    <van-row class="footer">
      <van-button round color="#f95c57" class="btn-confirm" @click="btnConfirm"
        >确定</van-button
      >
    </van-row>
  </div>
</template>

<script>
import { getPetsList } from '@/network/api/member'

export default {
  name: 'ChoosePets',
  data() {
    return {
      radio: '',
      // 宠物列表
      petsList: [],
      // 默认宠物图片
      defaultImg: require('@/assets/img/common/qt_header1.jpeg')
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
      this.petsList = data
      // 默认选中第一个
      if (data.length > 0) {
        this.radio = data[0].pet_id
      }
      console.log(data)
    },
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 新增宠物
    onClickRight() {
      this.$router.push('/petsArchives')
    },
    // 确认按钮
    btnConfirm() {
      if (this.radio) {
        console.log(this.radio)
        const petItem = this.petsList.filter(petItem => {
          return petItem.pet_id === this.radio
        })
        this.$route.params.value = petItem
        this.$router.back()
      } else {
        this.$toast('你还未选择宠物')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pet-card {
  margin: 10px !important;

  .pet-title {
    font-size: 16px;
    font-weight: 600;
  }

  .pet-label {
    font-size: 14px;
    color: #808080;
    margin-top: 10px;
  }

  .pet-img {
    width: 60px;
    height: 60px;
    border-radius: 7px;
    margin-right: 13px;
  }
}

.footer {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;

  .btn-confirm {
    width: 90%;
    height: 40px;
  }
}
</style>
