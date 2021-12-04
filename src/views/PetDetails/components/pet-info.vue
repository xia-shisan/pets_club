<template>
  <div>
    <!-- 宠物信息 -->
    <van-cell center :border="false">
      <!-- 头像 -->
      <template #icon>
        <van-image
          width="80"
          height="80"
          round
          class="img-mr"
          :src="pet_details.image ? pet_details.image : defaultPhoto"
        />
      </template>
      <!-- 宠物名、性别 -->
      <template #title>
        <van-row type="flex" align="center">
          <!-- 宠物名 -->
          <span class="icon-mr nickname">{{ pet_details.pet_name }}</span>
          <!-- 性别 -->
          <!-- 弟弟 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="xingbie-nan"
            color="#85c1ed"
            v-if="pet_details.sex === 1"
          />
          <!-- 妹妹 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="xingbie-nv"
            color="#ff6cd5"
            v-if="pet_details.sex === 2"
          />
          <!-- 保密 -->
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="mi"
            color="#969696"
            size="20"
            v-if="pet_details.sex === 0 || pet_details.sex === 3"
          />
        </van-row>
      </template>
      <!-- 宠物ID、种类、生日 -->
      <template #label>
        <!-- 宠物ID -->
        <div class="pet-id">宠物ID：{{ pet_details.pet_id }}</div>
        <!-- 宠物种类、生日 -->
        <div>
          <!-- 种类 -->
          <van-tag round color="#66a3ff" class="pet-tag icon-mr">
            {{ pet_details.category_name }}
          </van-tag>
          <!-- 生日 -->
          <van-tag round color="#66a3ff" class="pet-tag">
            生日：{{ pet_details.birthday | formatDate('MM-dd') }}
          </van-tag>
        </div>
      </template>
      <!-- 云养按钮 -->
      <template #right-icon>
        <div
          v-if="!isMine"
          class="menu cloud"
          @click="cloudPets(pet_details.pet_id)"
        >
          <van-icon
            name="like"
            size="20"
            class="icon-mr"
            v-show="cloudPetInfo.isLikePet"
          />
          <van-icon
            name="like-o"
            size="20"
            class="icon-mr"
            v-show="!cloudPetInfo.isLikePet"
          />
          {{ cloudPetInfo.isLikePet ? '已云养' : '云养' }}
        </div>
      </template>
    </van-cell>

    <!-- 宠物魅力、粉丝、签名、看王国按钮 -->
    <van-cell :border="false">
      <!-- 魅力、粉丝 -->
      <template #title>
        <span class="title">
          魅力：{{ pet_details.charm }} 粉丝：{{ pet_details.fans }}
        </span>
      </template>
      <!-- 签名 -->
      <template #label>
        <span class="label">签名：{{ pet_details.summary }}</span>
      </template>
      <!-- 看王国按钮 -->
      <template #right-icon>
        <div class="menu" @click="jumpLevelDetails(pet_details.category_id)">
          <van-icon
            class-prefix="icon"
            class="iconfont icon-mr"
            name="huangguan"
            size="20"
            color="#f4ea2a"
          />
          看王国
        </div>
      </template>
    </van-cell>

    <!-- 相册 -->
    <van-row type="flex" class="album" v-if="pet_album.length !== 0">
      <van-image
        width="20vw"
        height="20vw"
        class="album-img"
        v-for="img in pet_album"
        :key="img.id"
        :src="img.image"
      />
    </van-row>

    <!-- 没相册图片时显示上传 -->
    <van-cell
      center
      :border="false"
      title="点击创建宠物相册"
      label="上传照片墙，开启相册功能"
      title-class="upload-title"
      label-class="upload-title"
      v-if="isMine && pet_album.length === 0"
    >
      <!-- 上传图标 -->
      <template #icon>
        <div class="upload" @click="jumpAlbumDetails">
          <van-icon name="plus" size="30" class="upload-tag" />
        </div>
      </template>
    </van-cell>

    <van-row type="flex" justify="space-between" class="menu-box" v-if="isMine">
      <div class="menu" @click="jumpAlbumDetails">
        <van-icon size="30" name="photo" class="img-mr" color="#66a3ff" />
        看相册
      </div>
      <div class="menu" @click="releaseDynamic">
        <van-icon size="30" name="photograph" class="img-mr" color="#9113ff" />
        发布动态
      </div>
    </van-row>
  </div>
</template>

<script>
import { addCloudPetsLists, cancelCloudPetsLists } from '@/network/api/cloud'

export default {
  name: 'PetInfo',
  props: {
    // 宠物详情
    pet_details: {
      type: Object,
      default: null
    },
    // 宠物相册
    pet_album: {
      type: Array,
      default: null
    },
    // 是否是本人宠物
    isMine: {
      type: Boolean,
      default: false
    },
    // 是否云养该宠物
    cloudPetInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 默认头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg'
    }
  },
  methods: {
    // 看王国按钮事件
    jumpLevelDetails(id) {
      this.$router.push({
        path: '/level_details',
        query: {
          id
        }
      })
    },
    // 上传相册
    jumpAlbumDetails() {
      this.$router.push({
        path: '/albumDetails',
        query: {
          pet_id: this.pet_details.pet_id,
          flag: 'mine'
        }
      })
    },
    // 云养/取消云养该宠物
    async cloudPets(petId) {
      if (this.$parent.token) {
        if (this.cloudPetInfo.isLikePet) {
          // 取消云养
          const id = this.cloudPetInfo.follow_user_info.id
          await cancelCloudPetsLists(id, petId)
          this.$parent.isLikePet()
        } else {
          // 云养
          await addCloudPetsLists(petId)
          this.$parent.isLikePet()
        }
      } else {
        // 是否确认提示
        this.$dialog
          .confirm({
            title: '提示',
            message: '请先登录',
            width: '70%'
          })
          .then(() => {
            this.$router.push('login')
          })
          .catch(() => {
            return false
          })
      }
    },
    // 跳转到发布动态页面
    releaseDynamic() {
      this.$router.push({
        path: '/release_news',
        query: {
          id: this.pet_details.pet_id,
          pet_name: this.pet_details.pet_name
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  padding: 10px 20px;
}
// 宠物昵称
.nickname {
  font-size: 16px;
  font-weight: 600;
}
// 宠物id
.pet-id {
  color: #c0c0c0;
  margin-bottom: 5px;
}
// 宠物种类、生日标签
.pet-tag {
  padding: 1px 6px;
}

// 魅力、粉丝样式
.title {
  font-weight: 600;
}
// 签名字体颜色
.label {
  color: #c0c0c0;
}
// 看王国按钮样式
.menu {
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px #9e9e9e49;
  display: flex;
  align-items: center;
}
// 云养按钮样式
.cloud {
  color: #f45467;
  padding: 2px 5px;
}

// 相册
.album {
  padding: 5px 20px;
  background-color: #fff;
  padding-bottom: 10px;

  .album-img {
    margin-right: 8px;
  }
}

// 上传样式
.upload {
  width: 110px;
  height: 110px;
  background-color: #f4f5f6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  .upload-tag {
    font-weight: 600;
  }
}
.upload-title {
  font-size: 14px;
  color: #bbbbbb;
}

.menu-box {
  padding: 15px 25px 20px;
  background-color: #fff;

  .menu {
    font-size: 15px;
    font-weight: 600;
    padding: 5px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px #9e9e9e49;
    display: flex;
    align-items: center;
  }
}
</style>
