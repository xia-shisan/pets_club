<template>
  <div class="bg-white">
    <!-- 萌宠档案 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="萌宠档案"
      left-arrow
      fixed
      placeholder
      z-index="999"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="25" />
      </template>
    </van-nav-bar>

    <!-- tab 栏 -->
    <van-tabs
      v-model="activeName"
      sticky
      offset-top="46"
      swipeable
      color="#2979ff"
      title-active-color="#2979ff"
      @change="tabChange"
    >
      <!-- 自己的宠物 -->
      <van-swipe :loop="false" class="my-swipe" @change="onChange">
        <!-- 创建宠物 -->
        <van-swipe-item @click="createPet">
          <van-cell center :border="false" class="my-pets">
            <!-- 添加图标 -->
            <template #icon>
              <van-icon
                name="add-o"
                size="45"
                color="#f2f2f2"
                class="add-icon"
              />
            </template>
            <!-- 标题 -->
            <template #title>
              <div class="create-title">创建我的宠物</div>
              <div class="create-label">
                解锁天梯玩法，查看当前排名
              </div>
            </template>
            <!-- 排名 -->
            <template #right-icon>
              <van-row type="flex" align="center" class="ranking">
                <div>?</div>
                <div>#排名</div>
              </van-row>
            </template>
          </van-cell>
        </van-swipe-item>

        <!-- 我的宠物 -->
        <van-swipe-item
          v-for="item in myPetsList"
          :key="item.pet_id"
          @click="lookPetDetails(item.pet_id)"
        >
          <van-cell center :border="false" class="my-pets">
            <!-- 宠物头像 -->
            <template #icon>
              <van-image
                width="45"
                height="45"
                round
                :src="item.image ? item.image : defaultPhoto"
                class="add-icon"
              />
            </template>
            <!-- 宠物名、魅力值、粉丝 -->
            <template #title>
              <div class="pet-name">{{ item.pet_name }}</div>
              <div class="create-label">
                <span class="img-mr">魅力值：{{ item.charm }}</span>
                <span>粉丝：{{ item.fans }}</span>
              </div>
            </template>
            <!-- 排名 -->
            <template #right-icon>
              <van-row type="flex" align="center" class="ranking">
                <div>{{ item.order_num }}</div>
                <div>#排名</div>
              </van-row>
            </template>
          </van-cell>
        </van-swipe-item>
        <!-- 自定义指示器 -->
        <template #indicator>
          <div class="custom-indicator">
            <div
              :class="['indicator', index === current ? 'current' : '']"
              v-for="index in indicator"
              :key="index"
            ></div>
          </div>
        </template>
      </van-swipe>

      <!-- tab 标签页内容 -->
      <van-tab
        :name="item.id"
        :title="item.category_name"
        v-for="item in categoryList"
        :key="item.id"
      >
        <!-- 宠物排行 -->
        <div v-if="orderByPet.length > 0">
          <van-cell-group
            v-for="(petItem, index) in orderByPet"
            :key="petItem.pet_id"
            @click="lookPetDetails(petItem.pet_id)"
          >
            <van-cell center class="win-pet-box">
              <!-- 宠物头像 -->
              <template #icon>
                <div class="pet-img">
                  <!-- 第一名 -->
                  <img
                    src="~@/assets/img/common/pet_one.png"
                    class="palms"
                    v-if="index === 0"
                  />
                  <!-- 第二名 -->
                  <img
                    src="~@/assets/img/common/pet_two.png"
                    class="palms"
                    v-if="index === 1"
                  />
                  <!-- 第三名 -->
                  <img
                    src="~@/assets/img/common/pet_three.png"
                    class="palms"
                    v-if="index === 2"
                  />
                  <!-- 宠物头像 -->
                  <van-image
                    width="80"
                    height="80"
                    round
                    :src="petItem.image ? petItem.image : defaultPhoto"
                  />
                </div>
              </template>
              <!-- 宠物名、性别、魅力值 -->
              <template #title>
                <!-- 宠物名 -->
                <div class="pet-name">{{ petItem.pet_name }}</div>
                <!-- 魅力值、粉丝 -->
                <div class="font-gray">
                  <span class="img-mr">
                    魅力值：{{ petItem.charm ? petItem.charm : '0' }}
                  </span>
                  <span>粉丝：{{ petItem.fans ? petItem.fans : 0 }}</span>
                </div>
              </template>
              <!-- 种类、生日、铲屎官-->
              <template #label>
                <!-- 种类、生日 -->
                <div class="pet-tag">
                  <van-tag color="#2979ff" class="icon-mr">
                    {{ petItem.category_name }}
                  </van-tag>
                  <van-tag color="#f9a136">
                    生日：{{ petItem.birthday | filterBirthday }}
                  </van-tag>
                </div>
                <!-- 用户信息 -->
                <van-row type="flex" align="bottom">
                  <!-- 用户头像 -->
                  <van-image
                    width="25"
                    height="25"
                    round
                    :src="petItem.avatar ? petItem.avatar : defaultUserPhoto"
                    class="img-mr"
                  />
                  <!-- 用户名 -->
                  <span class="font-gray">
                    铲屎官：{{ petItem.nickname ? petItem.nickname : '未知' }}
                  </span>
                </van-row>
              </template>
              <!-- 排名 -->
              <template #right-icon>
                <van-row type="flex" align="center" class="ranking">
                  <div>{{ index + 1 }}</div>
                  <div>#排名</div>
                </van-row>
              </template>
            </van-cell>
          </van-cell-group>
        </div>

        <!-- 无数据时显示 -->
        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getPetsList } from '@/network/api/member'
import { getTree } from '@/network/api/column'
import { getOrderByPet } from '@/network/api/ranking_list'

import { mapGetters } from 'vuex'

export default {
  name: 'Archives',
  data() {
    return {
      activeName: '',
      // 默认宠物照片
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      // 默认用户头像
      defaultUserPhoto:
        'http://qny.kingxyfh.cn/8533dbbbcdf254a2f3e735a2511b9d85.jpeg',
      // 会员宠物列表信息
      myPetsList: [],
      // 当前激活项(宠物展示轮播)
      current: 1,
      // 种类列表 (tab标签页标题列表)
      categoryList: [],
      // 宠物排行榜列表
      orderByPet: []
    }
  },
  computed: {
    ...mapGetters(['token']),
    // my宠物栏指示器数量
    indicator() {
      return this.myPetsList.length + 1
    }
  },
  created() {
    this.getTree()
    this.token && this.getPetsList()
  },
  methods: {
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },
    // 分享
    onClickRight() {},
    // 获取会员宠物列表信息
    getPetsList() {
      getPetsList().then(result => {
        console.log(result.data.data)
        this.myPetsList = result.data.data
        console.log(this.myPetsList)
      })
    },
    // 轮播切换触发(my宠物展示栏)
    onChange(index) {
      this.current = index + 1
    },
    // 获取王国分类树状列表
    getTree() {
      getTree().then(result => {
        result.data.tree[0].forEach(item => {
          this.categoryList.push(result.data.list[item])
        })
        this.activeName = this.categoryList[0].id
        console.log(result)
        console.log(this.categoryList)
        // 获取排行榜列表（宠物排行）
        this.getOrderByPet(this.activeName)
      })
    },
    // 获取排行榜列表（宠物排行）
    getOrderByPet(categoryId) {
      this.orderByPet = []
      getOrderByPet(categoryId).then(result => {
        console.log(result)
        this.orderByPet = result.data.data
      })
    },
    // tab标签页切换时触发
    tabChange(name) {
      console.log(name)
      this.getOrderByPet(name)
    },
    // 创建宠物
    createPet() {
      this.$router.push('/petsArchives')
    },
    // 查看宠物详情
    lookPetDetails(petId) {
      this.$router.push({
        path: '/pet-details',
        query: {
          pet_id: petId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 轮播指示器样式
.custom-indicator {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  font-size: 12px;
  display: flex;
  justify-content: space-around;

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 3px;
  }
  .current {
    background-color: rgb(241, 113, 102);
  }
}

.my-pets {
  padding: 30px 16px;

  .add-icon {
    font-weight: 600;
    margin-right: 20px;
  }
  .create-title {
    font-weight: 600;
    color: #9d9d9d;
  }
  .create-label {
    font-size: 14px;
    color: #b8b8b8;
  }
}
// 宠物名
.pet-name {
  font-weight: 600;
}
.font-gray {
  color: #9e9e9e;
}
.ranking {
  flex-direction: column;

  div:first-child {
    font-weight: 600;
  }
  div:last-child {
    color: #9d9d9d;
  }
}

.win-pet-box {
  height: 130px;
  padding: 10px;

  .pet-img {
    position: relative;
    margin-right: 20px;

    .palms {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 50%;
      top: 90%;
      transform: translateX(-50%);
    }
  }

  .pet-tag {
    margin-bottom: 5px;

    .van-tag {
      padding: 1px 5px;
    }
  }
}
</style>
