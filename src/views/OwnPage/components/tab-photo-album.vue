<template>
  <div class="tab-photo-album">
    <!-- 相册 -->

    <div v-if="userPetsAlbumList && userPetsAlbumList.length > 0">
      <van-grid :column-num="2" :gutter="10" :border="false">
        <van-grid-item
          v-for="item in userPetsAlbumList"
          :key="item.pet.pet_id"
          @click="jumpAlbumDetails(item.pet.pet_id)"
        >
          <div class="photo-box">
            <van-image
              width="40vw"
              height="40vw"
              radius="15px"
              :src="item.pet.image ? item.pet.image : defaultAlbum"
            />
            <div class="tag">
              <span>{{ item.album_images_count }}张</span>
            </div>
          </div>
          <div style="margin-top:10px">{{ item.pet.pet_name }}的相册</div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
export default {
  name: 'TabPhotoAlbum',
  props: {
    userPetsAlbumList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 默认相册图片
      defaultAlbum: 'http://qny.kingxyfh.cn/qt_nopicture.png'
    }
  },
  methods: {
    // 跳转到宠物相册详情页
    jumpAlbumDetails(petId) {
      this.$router.push({
        path: '/albumDetails',
        query: {
          pet_id: petId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tab-photo-album {
  height: 100%;
  background-color: #fff;
  padding-bottom: 10px;
}
.photo-box {
  position: relative;

  .tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 3px 15px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    color: #fff;
  }
}
</style>
