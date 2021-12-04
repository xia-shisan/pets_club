<template>
  <div class="bg-white">
    <!-- 宠物相册详情页 -->
    <!-- 导航栏 -->
    <van-nav-bar
      :title="pet_details.pet_name"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />

    <!-- 宠物相册标题区域 -->
    <van-cell center>
      <!-- 相册图片 -->
      <template #icon>
        <van-image
          width="100"
          height="100"
          radius="10"
          class="album-img"
          :src="pet_details.image ? pet_details.image : defaultAlbum"
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
      <!-- 生日、相册总数 -->
      <template #label>
        <!-- 生日 -->
        <div class="birthday">
          生日：{{ pet_details.birthday | formatDate('yyyy-MM-dd') }}
        </div>
        <!-- 相册总数提示 -->
        <div class="album-num">相册：{{ albumNum }}</div>
      </template>
      <!-- 上传图标 -->
      <template #right-icon>
        <!-- 上传图标 -->
        <div class="upload-box" v-if="flag">
          <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <van-icon
              class-prefix="icon"
              class="iconfont upload"
              name="upload"
              size="40"
              color="#02d4c6"
            />
          </van-uploader>
          <!-- 确认上传按钮 -->
          <van-tag
            class="btn-confirm"
            color="#4de1d7"
            v-show="isUploadBtn"
            @click="addPetsAlbum"
          >
            确认上传
          </van-tag>
        </div>
      </template>
    </van-cell>

    <!-- 相册内容 -->
    <div v-if="albumNum !== 0">
      <div class="photo-box" v-for="(value, key) in album_images" :key="key">
        <!-- 相册创建时间 -->
        <div class="album-time">{{ key }}</div>
        <!-- 照片 -->
        <van-row type="flex" class="photo">
          <van-image
            v-for="item in value"
            :key="item.id"
            width="28vw"
            height="28vw"
            class="img"
            :src="item.image"
          />
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserPetsAlbumDetails } from '@/network/api/member_homepage'
import { uploadFile } from '@/network/api/common'
import { addPetsAlbum } from '@/network/api/member'

export default {
  name: 'AlbumDetails',
  data() {
    return {
      // 默认相册图片
      defaultAlbum: 'http://qny.kingxyfh.cn/qt_nopicture.png',
      // 宠物id
      petId: this.$route.query.pet_id,
      // 宠物相册详情
      album_images: {},
      // 宠物详情
      pet_details: {},
      // 是否是本人打开页面，是显示上传照片按钮
      flag: '',
      // 上传文件后显示按钮
      isUploadBtn: false,
      // 上传的图片链接
      uploadImg: ''
    }
  },
  computed: {
    albumNum() {
      return Object.keys(this.album_images).length
    }
  },
  created() {
    if (this.$route.query.flag) {
      this.flag = this.$route.query.flag
    }
    this.getUserPetsAlbumDetails()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 获取会员宠物相册详情
    getUserPetsAlbumDetails() {
      getUserPetsAlbumDetails(this.petId).then(result => {
        console.log(result)
        this.album_images = result.data.data.album_images
        this.pet_details = result.data.data.pet_details
      })
    },
    // 上传照片前置处理
    beforeRead(file) {
      // 白名单
      const whiteList = ['png', 'jpg', 'jpeg']
      const fileSuffix = file.name.slice(file.name.lastIndexOf('.') + 1)
      if (!whiteList.includes(fileSuffix)) {
        this.$toast(`不允许选择${fileSuffix}格式的文件`)
        return false
      }
      return true
    },
    // 上传照片
    afterRead(file) {
      // 上传提示
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      const formData = new FormData()
      formData.append('file', file.file)
      // 上传图片
      uploadFile(formData).then(result => {
        this.uploadImg = result.data.url
        // 关闭上传提示
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 1
        })
        // 显示确认上传按钮
        this.isUploadBtn = true
      })
    },
    // 确认上传
    addPetsAlbum() {
      addPetsAlbum(this.petId, this.uploadImg).then(result => {
        console.log(result)
        // 上传成功提示
        this.$toast.success({
          message: '正在审核中',
          forbidClick: true
        })
        // 隐藏确认上传按钮
        this.isUploadBtn = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.album-img {
  margin-right: 20px;
}
.nickname {
  font-size: 18px;
  font-weight: 600;
}

.birthday,
.album-num {
  font-size: 14px;
  margin-top: 10px;
}
.birthday {
  color: #333;
}

.upload-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upload {
  font-weight: 600;
}
.btn-confirm {
  width: auto;
  height: auto;
  padding: 5px 7px;
  border-radius: 5px;
  margin-top: 10px;
}

.photo-box {
  padding: 10px 16px;

  .album-time {
    font-size: 16px;
    font-weight: 600;
    padding-left: 10px;
  }

  .photo {
    flex-wrap: wrap;

    .img {
      padding: 10px 10px 0 0;

      &:nth-child(3n) {
        padding-right: 0;
      }
    }
  }
}
</style>
