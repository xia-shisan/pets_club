<template>
  <div class="bg-white">
    <!-- 日记 -->
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
      class="nav-bar"
    />

    <!-- 中间内容区域 -->
    <van-row class="post-main">
      <!-- 正文区域 -->
      <van-cell-group :border="false">
        <van-field
          v-model.trim="queryInfo.content"
          type="textarea"
          maxlength="140"
          placeholder="给主子写一篇日记"
          :autosize="{ minHeight: 150 }"
          class="post-content"
        />
      </van-cell-group>

      <!-- 上传图片区域 -->
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="9"
        :before-read="beforeRead"
        :after-read="afterRead"
        :before-delete="beforeDelete"
        accept=".png,.jpg,.jpeg"
        preview-size="100"
      >
        <!-- 上传样式 -->
        <div class="defaultuploader">
          <van-icon name="plus" size="20" />
          <span>选择图片</span>
        </div>
      </van-uploader>

      <!-- 选择标签区域 -->
      <van-cell
        title="选择标签"
        :value="showLabel"
        :is-link="queryInfo.label ? false : true"
        center
        class="cell-box"
        :value-class="[queryInfo.label ? 'font-color' : '']"
        @click="$router.push('/label')"
      >
        <template #icon>
          <van-icon
            class-prefix="icon"
            class="iconfont icon-weight img-mr"
            name="jinghao"
            size="15"
            color="#60646b"
          />
        </template>
      </van-cell>
      <!-- 关联宠物区域 -->
      <van-cell
        title="关联宠物"
        :value="showPetName"
        :is-link="pet_name ? false : true"
        center
        class="cell-box"
        :value-class="[pet_name ? 'font-color' : '']"
        @click="jumpChoosePets"
      >
        <template #icon>
          <van-icon
            class-prefix="icon"
            class="iconfont icon-weight icon-mr"
            name="chongwu"
            size="20"
            color="#60646b"
          />
        </template>
      </van-cell>
      <!-- 日记时间 -->
      <van-cell
        title="日记时间"
        :value="current_time | formatDate('yyyy-MM-dd')"
        center
        class="cell-box"
      >
        <template #icon>
          <van-icon
            name="todo-list-o"
            size="20"
            color="#60646b"
            class="icon-weight icon-mr"
          />
        </template>
      </van-cell>
    </van-row>

    <!-- 底部按钮区域 -->
    <van-row type="flex" justify="space-between" align="center" class="footer">
      <!-- 存草稿 -->
      <van-col v-if="isShowDrafts">
        <van-row
          type="flex"
          align="center"
          class="drafts"
          @click="btnDraftsOrPost((queryInfo.is_draft = 'draft'))"
        >
          <van-icon name="records" size="30" />
          <span>存草稿</span>
        </van-row>
      </van-col>
      <!-- 按钮 -->
      <van-col class="btn-post">
        <van-button
          round
          color="#f95c57"
          @click="btnDraftsOrPost((queryInfo.is_draft = ''))"
        >
          发布图文
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { uploadFile } from '@/network/api/common'
import {
  addPetsDynamic,
  MemberPetsDynamicDraftRelease
} from '@/network/api/member'

import { mapGetters } from 'vuex'

// 当前导航要离开的路由
let fromPath = ''
// 传过来的数据
let emitValue = ''

export default {
  name: 'ReleaseNews',
  data() {
    return {
      // 是否显示存草稿
      isShowDrafts: true,
      // 上传的文件预览列表
      fileList: [],
      // 请求信息
      queryInfo: {
        // 请求类型：宠物动态
        type: 'dynamic',
        // 宠物ID
        pet_id: '',
        // 图片列表
        images: [],
        // 标签
        label: '',
        // 内容
        content: '',
        // 是否存为草稿
        is_draft: ''
      },
      // 关联宠物名
      pet_name: '',
      // 当前时间
      current_time: new Date()
    }
  },
  computed: {
    ...mapGetters(['token']),
    // 判断显示标签还是默认提示
    showLabel() {
      return this.queryInfo.label
        ? '#' + this.queryInfo.label
        : '标签可以提高热度'
    },
    // 判断显示宠物名还是默认提示
    showPetName() {
      return this.pet_name ? this.pet_name : '同步到宠物档案'
    }
  },
  created() {
    if (this.$route.query.flag === 'drafts') {
      console.log(emitValue)
      // 从草稿箱进入
      Object.keys(this.queryInfo).forEach(k => {
        if (emitValue[k]) {
          this.queryInfo[k] = emitValue[k]
        } else {
          return false
        }
      })
      // 判断图片数据格式
      const isArr = Array.isArray(this.queryInfo.images)
      if (!isArr) {
        this.queryInfo.images = this.queryInfo.images.split(',')
      }
      // 上传的文件预览列表
      this.queryInfo.images.forEach(img => {
        this.fileList.push({ url: img })
      })
      // 保存宠物名
      this.pet_name = emitValue.pet_name
      // 保存草稿id
      this.queryInfo.id = emitValue.id
      // 隐藏存草稿按钮
      this.isShowDrafts = false
    } else if (this.$route.query.flag === 'choose') {
      // 从 midTabBar 页面进入
      return false
    } else {
      // 从宠物页面进入，保存宠物 id 和 名字
      this.queryInfo.pet_id = this.$route.query.id
      this.pet_name = this.$route.query.pet_name
    }
  },
  methods: {
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 上传图片前置处理
    beforeRead(file) {
      // 白名单
      const whiteList = ['png', 'jpg', 'jpeg']
      // 判断是否选择多个文件
      const isArr = Array.isArray(file)
      if (isArr) {
        const fileSuffix = []
        // 获取多个文件后缀名
        file.forEach(fileItem => {
          const fileSuffixItem = fileItem.name.slice(
            fileItem.name.lastIndexOf('.') + 1
          )
          fileSuffix.push(fileSuffixItem)
        })
        for (let i = 0; i < fileSuffix.length; i++) {
          // 判断是否在白名单内
          if (whiteList.includes(fileSuffix[i])) {
            return true
          } else {
            this.$toast(`不允许选择${fileSuffix[i]}格式的文件`)
            return false
          }
        }
      } else {
        const fileSuffix = file.name.slice(file.name.lastIndexOf('.') + 1)
        if (!whiteList.includes(fileSuffix)) {
          this.$toast(`不允许选择${fileSuffix}格式的文件`)
          return false
        }
      }
      console.log(isArr)
      return true
    },
    // 上传图片
    async afterRead(file) {
      const formData = new FormData()
      const isArr = Array.isArray(file)
      if (isArr) {
        file.forEach(async fileItem => {
          formData.append('file', fileItem.file)
          const { data } = await uploadFile(formData)
          this.queryInfo.images.push(data.url)
          console.log(this.queryInfo.images)
        })
      } else {
        formData.append('file', file.file)
        console.log(file)
        const { data } = await uploadFile(formData)
        this.queryInfo.images.push(data.url)
        console.log(this.fileList)
        console.log(this.queryInfo.images)
      }

      console.log(file)
    },
    // 移除图片
    beforeDelete(detail) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您确定要删除此项吗？',
          width: '70%'
        })
        .then(() => {
          const i = detail.index
          this.fileList.splice(i, 1)
          this.queryInfo.images.splice(i, 1)
          console.log(detail)
          return true
        })
        .catch(() => {
          return false
        })
    },
    // 跳转到选择宠物页面
    jumpChoosePets() {
      this.$router.push('/choosePets')
    },
    // 存草稿箱或发布图文
    btnDraftsOrPost() {
      if (!this.token) {
        this.$toast('请先登录')
        return false
      }
      console.log(this.queryInfo.is_draft)
      const content = this.queryInfo.content
      const petId = this.queryInfo.pet_id
      // 保存前校验
      if (!content) {
        this.$toast('内容不能为空')
        return false
      } else if (!petId) {
        this.$toast('请选择关联宠物')
        return false
      } else {
        // 校验通过
        this.queryInfo.images = this.queryInfo.images.join(',')
        // 是否从草稿箱进入
        if (this.isShowDrafts) {
          // 不是
          //  判断是发布还是存草稿
          if (this.queryInfo.is_draft === 'draft') {
            // 存草稿
            addPetsDynamic(this.queryInfo).then(() => {
              this.$toast.success('存入草稿成功')
            })
          } else {
            // 发布
            addPetsDynamic(this.queryInfo).then(() => {
              this.$toast.success('动态审核中...')
            })
          }
          this.$router.back()
        } else {
          // 是
          MemberPetsDynamicDraftRelease(this.queryInfo).then(() => {
            this.$toast.success('动态审核中...')
            this.$router.back()
          })
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    fromPath = from.path
    const whitePath = ['/choosePets', '/label', '/drafts']
    if (whitePath.includes(fromPath)) {
      if (from.params.value) {
        emitValue = from.params.value
      }
      console.log(emitValue)
    }
    next()
  },
  activated() {
    // 获取标签、宠物
    if (fromPath === '/label') {
      if (emitValue) {
        this.queryInfo.label = emitValue
      }
    } else if (fromPath === '/choosePets') {
      if (emitValue) {
        this.queryInfo.pet_id = emitValue[0].pet_id
        this.pet_name = emitValue[0].pet_name
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 白名单
    const whitePath = ['/choosePets', '/label']
    if (!whitePath.includes(to.path)) {
      this.$vnode.parent.componentInstance.cache = {}
      this.$vnode.parent.componentInstance.keys = []
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  border-bottom: 1px solid #e5e5e5;
}
.post-main {
  padding: 20px 10px;

  .defaultuploader {
    width: 100px;
    height: 100px;
    color: #606266;
    background-color: #f4f5f6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 13px;
      margin-top: 10px;
    }
  }

  .post-content {
    padding: 10px 5px;
    font-size: 16px;
    margin-top: 8px;
  }

  .cell-box {
    padding: 15px 5px;
    border-bottom: 1px solid #e7e8eb;
  }
  .font-color {
    color: #007aff;
  }
}
.footer {
  height: 50px;
  padding: 5px 10px 10px 10px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .drafts {
    flex-direction: column;
    padding: 0 10px;

    span {
      margin-top: 3px;
    }
  }

  .btn-post {
    flex: 1;
  }
  .van-button {
    width: 100%;
    height: 40px;
  }
}
.icon-weight {
  font-weight: 600;
}
</style>
