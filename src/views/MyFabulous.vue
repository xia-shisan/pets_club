<template>
  <div>
    <!-- 获得的赞页面 -->
    <!-- 导航栏 -->
    <van-nav-bar
      title="获得的赞"
      left-arrow
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <!-- 主体区域 -->
    <div v-if="likeList.length !== 0">
      <div
        class="myFabulous_content"
        v-for="item in likeList"
        :key="item.dynamic_details.id"
      >
        <!-- 最近点赞用户头像 -->
        <div class="user-photo">
          <van-image
            width="40"
            height="40"
            round
            :src="item.like_user_lists[0].avatar"
            @click="lookUserHomePage(item.like_user_lists[0].user_id)"
          />
        </div>

        <!-- 主体内容 -->
        <div class="user-content">
          <div class="content">
            <!-- 用户名 -->
            <span class="title">
              {{ item.like_user_lists[0].nickname }}
            </span>
            <span class="label">{{ item.like_count }}人赞了您的作品</span>
            <!-- 点赞用户 -->
            <div class="like-user">
              <van-image
                width="30"
                height="30"
                round
                class="img-mr"
                :src="likeUser.avatar"
                v-for="likeUser in item.like_user_lists"
                :key="likeUser.user_id"
              />
              <!-- 进入按钮 -->
              <div class="right-arrow">
                <van-icon
                  name="arrow"
                  size="15"
                  color="#fff"
                  @click="jumpPraisedPeople(item.dynamic_details.id)"
                />
              </div>
            </div>
            <!-- 日期 -->
            <span class="date">{{
              item.like_user_lists[0].create_time | formatDate('MM-dd')
            }}</span>
          </div>
          <!-- 动态图片 -->
          <van-image
            width="60"
            height="60"
            radius="20%"
            :src="item.dynamic_details.images | filterImgPath"
            @click="jumpAnimalDetails(item.dynamic_details.id)"
          />
        </div>
      </div>
    </div>

    <!-- 无数据时显示 -->
    <van-empty image-size="70%" description="暂无数据" v-else />
  </div>
</template>

<script>
import { lookMemberMessagesPush } from '@/network/api/common'
import { getMemberGetLikeLists } from '@/network/api/message'

export default {
  name: 'myFabulous',
  data() {
    return {
      // 获赞的宠物动态列表信息
      likeList: []
    }
  },
  created() {
    this.lookMemberMessagesPush()
    this.getMemberGetLikeLists()
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 查看推送消息
    lookMemberMessagesPush() {
      lookMemberMessagesPush('like')
    },
    // 获取会员获赞的宠物动态列表信息
    getMemberGetLikeLists() {
      getMemberGetLikeLists().then(result => {
        console.log(result)
        this.likeList = result.data.data
      })
    },
    // 跳转到动态页面
    jumpAnimalDetails(id) {
      this.$router.push({
        path: '/animal-details',
        query: {
          id
        }
      })
    },
    // 跳转查看点赞过对应动态的人
    jumpPraisedPeople(id) {
      this.$router.push({
        path: '/praisedPeople',
        query: {
          id
        }
      })
    },
    // 查看最近点赞的人的主页
    lookUserHomePage(userId) {
      this.$router.push({
        path: '/ownPage',
        query: {
          id: userId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
// 点赞内容样式
.myFabulous_content {
  width: 100%;
  height: 155px;
  padding: 10px 20px;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  &:first-child {
    border-top: none;
  }

  .user-photo {
    width: 50px;
    height: 100%;
  }

  .user-content {
    flex: 1;
    display: flex;
    justify-content: space-between;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      // 用户名和日期字体大小
      .title,
      .date {
        font-size: 16px;
      }

      .title {
        font-weight: 600;
      }

      // 提示和日期字体颜色
      .label,
      .date {
        color: #b1b1b1;
      }

      // 点赞用户
      .like-user {
        display: flex;

        // 右箭头
        .right-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e0e0e0;
          display: flex;
          justify-content: center;
          align-items: center;

          .van-icon {
            font-weight: 600;
            transform: translateX(1px);
          }
        }
      }
    }
  }
}
</style>
