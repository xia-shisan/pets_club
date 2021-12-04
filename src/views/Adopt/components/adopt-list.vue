<template>
  <div>
    <van-tabs
      v-model="activeName"
      swipeable
      sticky
      offset-top="219"
      animated
      @disabled="getAddress"
      @change="changeTitle"
    >
      <!-- 全国标题按钮 -->
      <van-tab disabled title-class="adopt-address">
        <template #title>
          <van-row type="flex" align="center">
            <van-icon
              name="location-o"
              size="15"
              color="#303133"
              style="font-weight:600"
            />
            <h4 style="color:#303133;font-size:15px">全国</h4>
          </van-row>
        </template>
      </van-tab>

      <!-- 全部 -->
      <van-tab title="全部" name="0">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          v-if="petsAdoptList.total > 0"
        >
          <van-cell
            v-for="item in petsAdoptList.list"
            :key="item.id"
            class="pet-box"
            @click="jumpAdoptDetails(item.id)"
          >
            <!-- 宠物照片 -->
            <template #icon>
              <van-image
                width="30vw"
                height="110"
                radius="6px"
                class="img-mr"
                :src="item.images | filterImgPath"
              />
            </template>
            <template #title>
              <!-- 宠物昵称 -->
              <div class="nickname">{{ item.nickname }}</div>
              <!-- 宠物年龄 -->
              <van-tag color="#DCDCDC" text-color="#333" class="tag-style">
                {{ item.age }}
              </van-tag>
              <!-- 宠物性别 -->
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 1"
              >
                弟弟
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 2"
              >
                妹妹
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 0 || item.sex === 3"
              >
                未知
              </van-tag>
              <!-- 所在地 -->
              <van-tag color="#DCDCDC" text-color="#909399" class="tag-style">
                {{ item.city_name }}-{{ item.area_name }}
              </van-tag>
            </template>
            <template #label>
              <!-- 内容 -->
              <div class="van-multi-ellipsis--l2">{{ item.story }}</div>
              <!-- 是否接种 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_inoculation ? '已接种' : '未接种' }}
              </van-tag>
              <!-- 是否驱虫 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_deworming ? '已驱虫' : '未驱虫' }}
              </van-tag>
              <!-- 是否绝育 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_sterilization ? '已绝育' : '未绝育' }}
              </van-tag>
            </template>
          </van-cell>
        </van-list>

        <!-- 无数据时显示 -->
        <van-empty v-else description="暂无数据" />
      </van-tab>

      <!-- 狗狗 -->
      <van-tab title="狗狗" name="1">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          v-if="petsAdoptList.total > 0"
        >
          <van-cell
            v-for="item in petsAdoptList.list"
            :key="item.id"
            class="pet-box"
            @click="jumpAdoptDetails(item.id)"
          >
            <!-- 宠物照片 -->
            <template #icon>
              <van-image
                width="30vw"
                height="110"
                radius="6px"
                class="img-mr"
                :src="item.images | filterImgPath"
              />
            </template>
            <template #title>
              <!-- 宠物昵称 -->
              <div class="nickname">{{ item.nickname }}</div>
              <!-- 宠物年龄 -->
              <van-tag color="#DCDCDC" text-color="#333" class="tag-style">
                {{ item.age }}
              </van-tag>
              <!-- 宠物性别 -->
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 1"
              >
                弟弟
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 2"
              >
                妹妹
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 0 || item.sex === 3"
              >
                未知
              </van-tag>
              <!-- 所在地 -->
              <van-tag color="#DCDCDC" text-color="#909399" class="tag-style">
                {{ item.city_name }}-{{ item.area_name }}
              </van-tag>
            </template>
            <template #label>
              <!-- 内容 -->
              <div class="van-multi-ellipsis--l2">{{ item.story }}</div>
              <!-- 是否接种 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_inoculation ? '已接种' : '未接种' }}
              </van-tag>
              <!-- 是否驱虫 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_deworming ? '已驱虫' : '未驱虫' }}
              </van-tag>
              <!-- 是否绝育 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_sterilization ? '已绝育' : '未绝育' }}
              </van-tag>
            </template>
          </van-cell>
        </van-list>

        <!-- 无数据时显示 -->
        <van-empty v-else description="暂无数据" />
      </van-tab>

      <!-- 猫咪 -->
      <van-tab title="猫咪" name="2">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          v-if="petsAdoptList.total > 0"
        >
          <van-cell
            v-for="item in petsAdoptList.list"
            :key="item.id"
            class="pet-box"
            @click="jumpAdoptDetails(item.id)"
          >
            <!-- 宠物照片 -->
            <template #icon>
              <van-image
                width="30vw"
                height="110"
                radius="6px"
                class="img-mr"
                :src="item.images | filterImgPath"
              />
            </template>
            <template #title>
              <!-- 宠物昵称 -->
              <div class="nickname">{{ item.nickname }}</div>
              <!-- 宠物年龄 -->
              <van-tag color="#DCDCDC" text-color="#333" class="tag-style">
                {{ item.age }}
              </van-tag>
              <!-- 宠物性别 -->
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 1"
              >
                弟弟
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 2"
              >
                妹妹
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 0 || item.sex === 3"
              >
                未知
              </van-tag>
              <!-- 所在地 -->
              <van-tag color="#DCDCDC" text-color="#909399" class="tag-style">
                {{ item.city_name }}-{{ item.area_name }}
              </van-tag>
            </template>
            <template #label>
              <!-- 内容 -->
              <div class="van-multi-ellipsis--l2">{{ item.story }}</div>
              <!-- 是否接种 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_inoculation ? '已接种' : '未接种' }}
              </van-tag>
              <!-- 是否驱虫 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_deworming ? '已驱虫' : '未驱虫' }}
              </van-tag>
              <!-- 是否绝育 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_sterilization ? '已绝育' : '未绝育' }}
              </van-tag>
            </template>
          </van-cell>
        </van-list>

        <!-- 无数据时显示 -->
        <van-empty v-else description="暂无数据" />
      </van-tab>

      <!-- 小宠 -->
      <van-tab title="小宠" name="3">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          v-if="petsAdoptList.total > 0"
        >
          <van-cell
            v-for="item in petsAdoptList.list"
            :key="item.id"
            class="pet-box"
            @click="jumpAdoptDetails(item.id)"
          >
            <!-- 宠物照片 -->
            <template #icon>
              <van-image
                width="30vw"
                height="110"
                radius="6px"
                class="img-mr"
                :src="item.images | filterImgPath"
              />
            </template>
            <template #title>
              <!-- 宠物昵称 -->
              <div class="nickname">{{ item.nickname }}</div>
              <!-- 宠物年龄 -->
              <van-tag color="#DCDCDC" text-color="#333" class="tag-style">
                {{ item.age }}
              </van-tag>
              <!-- 宠物性别 -->
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 1"
              >
                弟弟
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 2"
              >
                妹妹
              </van-tag>
              <van-tag
                color="#DCDCDC"
                text-color="#333"
                class="tag-style"
                v-if="item.sex === 0 || item.sex === 3"
              >
                未知
              </van-tag>
              <!-- 所在地 -->
              <van-tag color="#DCDCDC" text-color="#909399" class="tag-style">
                {{ item.city_name }}-{{ item.area_name }}
              </van-tag>
            </template>
            <template #label>
              <!-- 内容 -->
              <div class="van-multi-ellipsis--l2">{{ item.story }}</div>
              <!-- 是否接种 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_inoculation ? '已接种' : '未接种' }}
              </van-tag>
              <!-- 是否驱虫 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_deworming ? '已驱虫' : '未驱虫' }}
              </van-tag>
              <!-- 是否绝育 -->
              <van-tag color="#DCFFF3" text-color="#19be6b" class="tag-style">
                {{ item.is_sterilization ? '已绝育' : '未绝育' }}
              </van-tag>
            </template>
          </van-cell>
        </van-list>

        <!-- 无数据时显示 -->
        <van-empty v-else description="暂无数据" />
      </van-tab>
    </van-tabs>

    <!-- 地址弹出层 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '48%' }"
    >
      <van-area
        :area-list="areaList"
        ref="Area"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'AdoptList',
  props: {
    // 宠物领养列表
    petsAdoptList: {
      type: Object,
      default: null
    },
    // 省市区数据
    areaList: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 默认激活标签页
      activeName: '0x ',
      // 控制弹出层的显示与隐藏
      show: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    // 显示选择区域弹框
    getAddress() {
      this.show = true
    },
    // list 加载事件
    onLoad() {
      const page = this.$parent.queryInfo.page
      const last = this.petsAdoptList.last
      if (page <= last) {
        this.$parent.getPetsAdoptList()
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast('没有更多了...')
        this.finished = true
      }
    },
    // 标签标题改变事件
    changeTitle(name) {
      this.$parent.queryInfo.type = name
      this.$parent.queryInfo.page = 1
      console.log(this.$parent.queryInfo.type)
      this.$parent.getPetsAdoptList()
    },
    // 地区选择确认
    onConfirm(val) {
      console.log(val)
      this.$parent.queryInfo.page = 1
      if (val[0].code === '100000') {
        this.$parent.queryInfo.address_type = 'all'
        this.$parent.getPetsAdoptList()
      } else {
        this.$parent.queryInfo.address_type = 'area'
        this.$parent.queryInfo.code.province_code = val[0].code.slice(0, 2)
        this.$parent.queryInfo.code.city_code = val[1].code.slice(0, 4)
        this.$parent.queryInfo.code.area_code = val[2].code
        this.$parent.getPetsAdoptList()
      }
      this.show = false
      this.$refs.Area.reset() // 重置地区列表
    },
    // 地区选择取消
    onCancel() {
      this.show = false
      this.$refs.Area.reset() // 重置地区列表
    },
    // 查看宠物领养详情
    jumpAdoptDetails(id) {
      this.$router.push({
        path: '/adoptDetails',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pet-box {
  padding: 10px;
}
.nickname {
  font-weight: 600;
}
.tag-style {
  margin-right: 3px;
  padding: 2px 6px;
}
</style>
