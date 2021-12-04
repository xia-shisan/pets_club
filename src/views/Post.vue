<template>
  <div class="bg-white">
    <!-- 发帖 -->
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

      <!-- 标题区域 -->
      <van-cell-group :border="false">
        <van-field
          v-model="queryInfo.title"
          placeholder="好标题可以收获更多赞"
          class="post-title"
        />
      </van-cell-group>
      <!-- 正文区域 -->
      <van-cell-group :border="false">
        <van-field
          v-model.trim="queryInfo.content"
          type="textarea"
          maxlength="140"
          placeholder="添加正文"
          :autosize="{ minHeight: 150 }"
          class="post-content"
        />
      </van-cell-group>
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
      <!-- 关联王国区域 -->
      <van-cell
        title="关联王国"
        :value="showCategoryName"
        :is-link="category_name ? false : true"
        center
        class="cell-box"
        :value-class="[category_name ? 'font-color' : '']"
        @click="jumpKingdom"
      >
        <template #icon>
          <van-icon
            class-prefix="icon"
            class="iconfont icon-weight icon-mr"
            name="wangguan"
            size="20"
            color="#60646b"
          />
        </template>
      </van-cell>
    </van-row>

    <!-- 底部按钮区域 -->
    <van-row type="flex" justify="space-between" align="center" class="footer">
      <!-- 存草稿 -->
      <van-col v-if="isShowDraftBtn">
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
          >发布图文</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { uploadFile } from '@/network/api/common'
import { addPetsDynamic, MemberPostDraftRelease } from '@/network/api/member'
import { mapGetters } from 'vuex'

// 之前导航离开的路由
let fromPath = ''
// 传过来的数据
let emitValue = ''

export default {
  name: 'Post',
  data() {
    return {
      // 是否显示存草稿按钮(草稿箱进入该页面不显示)
      isShowDraftBtn: true,
      // 上传的文件预览列表
      fileList: [],
      // 请求信息
      queryInfo: {
        // 请求类型：王国发帖
        type: 'bar',
        // 图片列表
        images: [],
        // 标题
        title: '',
        // 正文
        content: '',
        // 标签
        label: '',
        // 宠物ID
        pet_id: 0,
        // 所属王国ID
        category_id: '',
        // 是否存为草稿
        is_draft: ''
      },
      // 关联宠物名
      pet_name: '',
      // 关联王国名
      category_name: ''
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
    },
    // 判断显示王国名还是默认提示
    showCategoryName() {
      return this.category_name ? this.category_name : '关联王国让更多人看到'
    }
  },
  created() {
    // 是否从草稿箱进入
    if (this.$route.query.flag) {
      console.log(emitValue)
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
      // 判断是否有选择宠物
      if (emitValue.pet_name) {
        this.pet_name = emitValue.pet_name
      } else {
        this.queryInfo.pet_id = ''
      }
      // 王国名
      this.category_name = emitValue.category_name
      // 草稿id
      this.queryInfo.id = emitValue.id
      // 隐藏存草稿按钮
      this.isShowDraftBtn = false
    } else {
      // 王国进入
      // 王国名
      this.category_name = this.$route.query.category_name
      // 王国id
      this.queryInfo.category_id = this.$route.query.id
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
    // 跳转到关联王国
    jumpKingdom() {
      this.$router.push({
        path: '/all-kingdom',
        query: {
          flag: 'choose'
        }
      })
    },
    // 存草稿箱或发布图文
    btnDraftsOrPost() {
      if (!this.token) {
        this.$toast('请先登录')
        return false
      }
      const title = this.queryInfo.title
      const content = this.queryInfo.content
      const categoryId = this.queryInfo.category_id
      // 保存前校验
      if (!title) {
        this.$toast('标题不能为空')
        return false
      } else if (!content) {
        this.$toast('正文不能为空')
        return false
      } else if (!categoryId) {
        this.$toast('请选择王国')
        return false
      } else {
        // 校验通过
        this.queryInfo.images = this.queryInfo.images.join(',')
        // 是否从草稿箱进入
        if (this.isShowDraftBtn) {
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
              this.$toast.success('帖子审核中...')
            })
          }
          this.$router.back()
        } else {
          // 是
          MemberPostDraftRelease(this.queryInfo).then(() => {
            this.$toast.success('动态审核中...')
            this.$router.back()
          })
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from)
    fromPath = from.path
    // 之前离开的路由白名单
    const whitePath = ['/all-kingdom', '/choosePets', '/label', '/drafts']
    if (whitePath.includes(fromPath)) {
      // 选择完后返回该页面传参
      if (from.params.value) {
        emitValue = from.params.value
      }
      console.log(emitValue)
    }
    next()
  },
  activated() {
    console.log(fromPath, emitValue)
    // 获取标签、宠物、王国信息
    if (fromPath === '/label') {
      if (emitValue) {
        // 标签
        this.queryInfo.label = emitValue
      }
    } else if (fromPath === '/choosePets') {
      if (emitValue) {
        // 宠物id
        this.queryInfo.pet_id = emitValue[0].pet_id
        // 宠物名
        this.pet_name = emitValue[0].pet_name
      }
    } else if (fromPath === '/all-kingdom') {
      if (emitValue) {
        // 种类id
        this.queryInfo.category_id = emitValue.categoryId
        // 种类名
        this.category_name = emitValue.categoryName
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 白名单
    const whitePath = ['/all-kingdom', '/choosePets', '/label']
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

  .post-title,
  .post-content {
    padding: 10px 5px;
    font-size: 16px;
    border-bottom: 1px solid #e7e8eb;
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
