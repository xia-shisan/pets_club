<template>
  <div class="bg-white">
    <!-- 审核信息 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="审核中"
      left-arrow
      fixed
      placeholder
      style="border-bottom: 1px solid #dfdfdf;"
      @click-left="onClickLeft"
    />

    <!-- 标签页 -->
    <van-tabs v-model="active" sticky offset-top="47" swipeable animated>
      <!-- 动态 -->
      <van-tab title="动态">
        <div v-if="isPetsDynamicExamine > 0">
          <div
            class="page"
            v-for="(value, key) in petsDynamicExamine"
            :key="key"
          >
            <!-- 动态 -->
            <!-- 发布时间 -->
            <van-cell :title="key" title-class="create-time" :border="false" />
            <div v-for="item in value" :key="item.id" class="content-box">
              <!-- 动态内容 -->
              <van-cell :title="item.content" class="content" :border="false" />
              <!-- 图片 -->
              <van-row type="flex" class="images" v-if="item.images">
                <van-image
                  width="28vw"
                  height="28vw"
                  radius="20"
                  class="img"
                  :src="img"
                  v-for="img in item.images.split(',')"
                  :key="img"
                />
              </van-row>
              <!-- 标签 -->
              <van-row class="label">
                <van-tag round color="#f4f8fe" class="tag-box img-mr">
                  <van-tag size="15" round color="#93bdf9" class="icon-mr">
                    #
                  </van-tag>
                  {{ item.label }}
                </van-tag>
                <van-tag round color="#f4f8fe" class="tag-box">
                  待审核
                </van-tag>
              </van-row>
            </div>
          </div>
        </div>

        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>

      <!-- 相册 -->
      <van-tab title="相册">
        <div v-if="isAlbumExamine">
          <div class="page" v-for="(value, key) in albumExamine" :key="key">
            <!-- 时间 -->
            <van-cell :title="key" title-class="create-time" :border="false" />
            <!-- 图片 -->
            <van-row type="flex" class="images">
              <div class="img-box" v-for="img in value" :key="img.id">
                <van-image width="100%" height="100%" :src="img.image" />
                <!-- 审核提示 -->
                <van-tag class="img-examine">待审核</van-tag>
              </div>
            </van-row>
          </div>
        </div>

        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>

      <!-- 帖子 -->
      <van-tab title="帖子">
        <div v-if="isPostsExamine > 0">
          <div class="page" v-for="(value, key) in postsExamine" :key="key">
            <!-- 动态 -->
            <!-- 发布时间 -->
            <van-cell :border="false">
              <template #title>
                <p class="create-time">{{ key }}</p>
              </template>
            </van-cell>
            <!-- 内容 -->
            <div v-for="item in value" :key="item.id" class="content-box">
              <!-- 动态内容 -->
              <van-cell :title="item.content" class="content" :border="false" />
              <!-- 图片 -->
              <van-row type="flex" class="images" v-if="item.images">
                <van-image
                  width="28vw"
                  height="28vw"
                  radius="20"
                  class="img"
                  :src="img"
                  v-for="img in item.images.split(',')"
                  :key="img"
                />
              </van-row>
              <!-- 标签 -->
              <van-row class="label">
                <van-tag round color="#f4f8fe" class="tag-box img-mr">
                  <van-tag size="15" round color="#93bdf9" class="icon-mr">
                    #
                  </van-tag>
                  {{ item.label }}
                </van-tag>
                <van-tag round color="#f4f8fe" class="tag-box">
                  待审核
                </van-tag>
              </van-row>
            </div>
          </div>
        </div>

        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>

      <!-- 领养 -->
      <van-tab title="领养">
        <div v-if="adoptExamine.total > 0">
          <div class="pet-box" v-for="item in adoptExamine.list" :key="item.id">
            <van-cell :border="false">
              <!-- 图片 -->
              <template #icon>
                <van-image
                  width="100"
                  height="100"
                  radius="10px"
                  class="img-mr"
                  :src="item.images.split(',')[0]"
                />
              </template>
              <!-- 宠物信息 -->
              <template #title>
                <div>{{ item.nickname }}</div>
                <div>
                  <!-- 年龄 -->
                  <van-tag color="#f4f4f5" class="tag icon-mr">
                    {{ item.age }}
                  </van-tag>
                  <!-- 性别 -->
                  <van-tag color="#f4f4f5" class="tag icon-mr">
                    <span v-if="item.sex === 0 || item.sex === 3">未知</span>
                    <span v-if="item.sex === 1">弟弟</span>
                    <span v-if="item.sex === 2">妹妹</span>
                  </van-tag>
                  <!-- 地区 -->
                  <van-tag color="#f4f4f5" class="tag">
                    {{ item.city_name }}-{{ item.area_name }}
                  </van-tag>
                </div>
              </template>
              <!-- 内容 -->
              <template #label>
                <div class="content van-ellipsis">{{ item.story }}</div>
                <div>
                  <!-- 接种 -->
                  <van-tag color="#dbf1e1" class="tag font-green icon-mr">
                    <span v-if="item.is_inoculation === 0">未接种</span>
                    <span v-if="item.is_inoculation === 1">已接种</span>
                    <span v-if="item.is_inoculation === 2">不详</span>
                  </van-tag>
                  <!-- 驱虫 -->
                  <van-tag color="#dbf1e1" class="tag font-green icon-mr">
                    <span v-if="item.is_deworming === 0">未驱虫</span>
                    <span v-if="item.is_deworming === 1">已驱虫</span>
                    <span v-if="item.is_deworming === 2">不详</span>
                  </van-tag>
                  <!-- 绝育 -->
                  <van-tag color="#dbf1e1" class="tag font-green">
                    <span v-if="item.is_sterilization === 0">未绝育</span>
                    <span v-if="item.is_sterilization === 1">已绝育</span>
                    <span v-if="item.is_sterilization === 2">不详</span>
                  </van-tag>
                </div>
              </template>
            </van-cell>
            <van-row style="margin-left:16px">
              <van-tag color="#f4f8fe" round class="tag-box">待审核</van-tag>
            </van-row>
          </div>
        </div>

        <van-empty image-size="70%" description="暂无数据" v-else />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  getMemberPetsDynamicExamine,
  getMemberPostsExamine,
  getMemberAlbumExamine,
  getMemberAdoptExamine
} from '@/network/api/examine'

export default {
  name: 'ExamineTxet',
  data() {
    return {
      active: 0,
      // 正在审核中的动态
      petsDynamicExamine: {},
      // 正在审核中的帖子
      postsExamine: {},
      // 正在审核中的宠物照片
      albumExamine: {},
      // 会员发布的领养信息（审核中）
      adoptExamine: {}
    }
  },
  computed: {
    // 是否有在审核中的动态
    isPetsDynamicExamine() {
      return Object.keys(this.petsDynamicExamine).length
    },
    // 是否有在审核中的帖子
    isPostsExamine() {
      return Object.keys(this.postsExamine).length
    },
    // 是否有在审核中的宠物照片
    isAlbumExamine() {
      return Object.keys(this.albumExamine).length
    }
  },
  created() {
    this.getMemberPetsDynamicExamine()
    this.getMemberPostsExamine()
    this.getMemberAlbumExamine()
    this.getMemberAdoptExamine()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 获取正在审核中的宠物动态
    getMemberPetsDynamicExamine() {
      getMemberPetsDynamicExamine().then(result => {
        console.log(result)
        this.petsDynamicExamine = result.data.data
      })
    },
    // 获取正在审核中的帖子
    getMemberPostsExamine() {
      getMemberPostsExamine().then(result => {
        console.log(result)
        this.postsExamine = result.data.data
      })
    },
    // 获取正在审核中的宠物照片
    getMemberAlbumExamine() {
      getMemberAlbumExamine().then(result => {
        this.albumExamine = result.data.data
        console.log(result)
      })
    },
    // 查看会员发布的领养信息（审核中）
    getMemberAdoptExamine() {
      getMemberAdoptExamine().then(result => {
        console.log(result)
        this.adoptExamine = result.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 10px;

  .create-time {
    font-size: 20px;
    font-weight: 600;
    margin-left: -10px;
  }

  .content {
    padding-top: 0;
    padding-bottom: 0;
  }

  .images {
    padding: 10px 10px 0;

    .img {
      margin: 0 10px 10px 0;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .label {
    margin-top: 10px;
  }
}
.tag-box {
  color: #93bdf9;
  padding: 5px 8px;
}

.pet-box {
  margin-bottom: 10px;

  .content {
    margin-bottom: 5px;
  }
  .tag {
    color: #333;
    padding: 3px 5px;
  }

  .font-green {
    color: #19be6b;
  }
}
.img-box {
  width: 28vw;
  height: 28vw;
  border-radius: 20px;
  margin: 0 5px 10px 0;
  background-color: skyblue;
  overflow: hidden;
  position: relative;

  .img-examine {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4px 7px;
    color: #0ff;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.content-box {
  margin-bottom: 20px;
}
</style>
