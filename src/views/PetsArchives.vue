<template>
  <div class="bg-white pets-archives ">
    <!-- 宠物登记 -->
    <van-row type="flex" align="center" class="Pets-archives-box">
      <!-- 头像 -->
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-image
          width="200"
          height="200"
          round
          :src="queryInfo.image ? queryInfo.image : defaultPhoto"
        >
          <template v-slot:error>
            <span class="img-err">!</span>
          </template>
        </van-image>
      </van-uploader>

      <!-- 昵称 -->
      <div class="input-box">
        <span>昵称</span>
        <div>
          <input
            type="text"
            placeholder="输入昵称"
            v-model="queryInfo.pet_name"
          />
        </div>
      </div>

      <!-- 品种 -->
      <div class="input-box">
        <span>品种</span>
        <div>
          <input
            type="text"
            placeholder="点击选择品种"
            readonly="readonly"
            v-model="categoryName"
            @click="jumpCategory"
          />
        </div>
      </div>

      <!-- 性别 -->
      <div class="input-box">
        <span>性别</span>
        <div @click="showSexPicker = true">
          <input
            type="text"
            placeholder="点击选择性别"
            readonly="readonly"
            v-model="showSex"
          />
        </div>
      </div>
      <!-- 宠物性别选择框 -->
      <van-popup v-model="showSexPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirmSex"
          @cancel="showSexPicker = false"
        />
      </van-popup>

      <!-- 生日 -->
      <div class="input-box">
        <span>生日</span>
        <div @click="showPicker = true">
          <input
            type="text"
            placeholder="点击选择生日"
            readonly="readonly"
            v-model="queryInfo.birthday"
          />
        </div>
      </div>
      <!-- 宠物生日选择弹框 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="onConfirmBirthday"
          @cancel="showPicker = false"
        />
      </van-popup>

      <!-- 描述 -->
      <div class="input-box">
        <span>描述</span>
        <div>
          <input
            type="text"
            placeholder="简单描述一下吧"
            maxlength="140"
            v-model="queryInfo.summary"
          />
        </div>
      </div>

      <!-- 私密档案 -->
      <van-row type="flex" justify="end" style="width:75vw;margin-top:25px">
        <van-checkbox v-model="checked" checked-color="#1afa29">
          私密档案
        </van-checkbox>
      </van-row>

      <!-- 保存按钮 -->
      <van-button
        size="small"
        color="#71d5a1"
        class="btn-save"
        @click="btnSave"
      >
        保存
      </van-button>
    </van-row>
  </div>
</template>

<script>
import { uploadFile } from '@/network/api/common'
import { addPetsList } from '@/network/api/member'

import { mapGetters } from 'vuex'

// 当前导航要离开的路由
let fromPath = ''
// 传过来的数据
let emitValue = ''

export default {
  name: 'PetsArchives',
  data() {
    return {
      // 默认宠物头像
      defaultPhoto: 'http://qny.kingxyfh.cn/qt_header2.jpeg',
      checked: false,
      // 请求信息
      queryInfo: {
        image: '',
        pet_name: '',
        sex: '',
        category_id: '',
        birthday: '',
        summary: ''
      },
      // 显示的种类
      categoryName: '',
      // 显示的性别
      showSex: '',
      // 宠物性别选择框
      showSexPicker: false,
      // 宠物性别选择框选项
      columns: ['弟弟', '妹妹', '保密'],
      // 控制生日选择弹框的显示与隐藏
      showPicker: false,
      // 最小日期选择范围
      minDate: new Date(1950, 0, 1),
      // 最大日期选择范围
      maxDate: new Date(2050, 11, 31),
      // 当前日期
      currentDate: new Date()
    }
  },
  computed: {
    ...mapGetters(['token']),
    // 显示头像
    photo() {
      return this.queryInfo.image
    }
  },
  watch: {
    'queryInfo.image'(newValue) {
      console.log(newValue)
      this.defaultPhoto = newValue
    }
  },
  created() {
    if (this.token) {
      return false
    } else {
      // 是否确认提示
      this.$dialog
        .confirm({
          title: '提示',
          message: '请先登录',
          width: '70%'
        })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.$router.back()
        })
    }
  },

  methods: {
    // 上传头像前置处理
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
    // 上传头像
    afterRead(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      uploadFile(formData).then(result => {
        console.log(result)
        this.queryInfo.image = result.data.url
      })
    },
    // 跳转选择种类
    jumpCategory() {
      this.$router.push({
        path: '/all-kingdom',
        query: {
          flag: 'choose'
        }
      })
    },
    // 确认选择宠物性别
    onConfirmSex(value) {
      console.log(value)
      switch (value) {
        case '弟弟':
          this.queryInfo.sex = 1
          break
        case '妹妹':
          this.queryInfo.sex = 2
          break
        case '保密':
          this.queryInfo.sex = 3
          break
        default:
          this.queryInfo.sex = 0
      }
      this.showSex = value
      this.showSexPicker = false
    },
    // 选择生日弹框显示日期格式化
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    // 生日确认选择事件
    onConfirmBirthday(time) {
      const date = new Date(time.toString())
      const Y = date.getFullYear()
      const M = (date.getMonth() + 1).toString().padStart(2, '0')
      const D = date
        .getDate()
        .toString()
        .padStart(2, '0')
      this.queryInfo.birthday = `${Y}-${M}-${D}`
      this.showPicker = false
    },
    // 保存按钮
    btnSave() {
      if (!this.queryInfo.pet_name) {
        return this.$toast('宠物昵称不能为空')
      } else if (!this.queryInfo.category_id) {
        return this.$toast('宠物种类不能为空')
      } else if (!this.queryInfo.birthday) {
        return this.$toast('宠物生日不能为空')
      } else {
        addPetsList(this.queryInfo).then(() => {
          emitValue = ''
          this.$router.back()
          this.$toast('新增宠物成功')
        })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    fromPath = from.path
    if (fromPath === '/all-kingdom') {
      if (from.params.value) {
        emitValue = from.params.value
      }
    }
    next()
  },
  activated() {
    // 获取种类名和id
    console.log(emitValue)
    if (emitValue) {
      this.queryInfo.category_id = emitValue.categoryId
      this.categoryName = emitValue.categoryName
    }
  },
  beforeRouteLeave(to, from, next) {
    const whitePath = ['/all-kingdom']
    if (!whitePath.includes(to.path)) {
      this.$vnode.parent.componentInstance.cache = {}
      this.$vnode.parent.componentInstance.keys = []
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.pets-archives {
  padding: 35px 15px 0;
  box-sizing: border-box;

  .Pets-archives-box {
    flex-direction: column;
    font-size: 15px;

    .img-err {
      font-size: 30px;
      font-weight: 600;
      color: #c3c7d1;
    }

    .input-box {
      width: 80vw;
      margin-top: 25px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      div {
        width: 60vw;
        height: 40px;
        padding: 0 10px;
        background-color: #f6fcff;
        border-radius: 20px;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        input {
          width: 100%;
          border: none;
          background-color: #f6fcff;

          &::-webkit-input-placeholder {
            color: #d2e0ff;
          }
        }
      }
    }
  }

  .btn-save {
    margin-top: 20px;
    padding: 5px 20px;
  }
}
</style>
