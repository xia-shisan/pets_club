<template>
  <div class="personal-information bg-white">
    <!-- 个人资料 -->
    <!-- 头像 -->
    <van-row>
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-image width="120" height="120" round fit="cover" :src="portrait">
          <template #error>
            <van-icon name="warning-o" size="25" color="#909399" />
          </template>
        </van-image>
      </van-uploader>
    </van-row>

    <!-- 昵称 -->
    <van-row class="input-box">
      <span>昵称</span>
      <input type="text" v-model="nickname" />
    </van-row>

    <!-- 性别 -->
    <van-row class="input-box">
      <span>性别</span>
      <input
        type="text"
        readonly="readonly"
        placeholder="未知"
        v-model="showSex"
        @click="showSexPicker = true"
      />

      <!-- 选择框 -->
      <van-popup v-model="showSexPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirmSex"
          @cancel="showSexPicker = false"
        />
      </van-popup>
    </van-row>

    <!-- 生日 -->
    <van-row class="input-box">
      <span>生日</span>
      <input
        type="text"
        readonly="readonly"
        placeholder="- -"
        v-model="birthday"
        @click="showPicker = true"
      />

      <!-- 选择弹框 -->
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
    </van-row>

    <!-- 签名 -->
    <van-row class="input-box">
      <span>签名</span>
      <div class="input-textarea">
        <textarea maxlength="12" v-model="summary" />
      </div>
    </van-row>

    <!-- 保存按钮 -->
    <van-button plain class="btn-save" @click="btnSave">保存</van-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { uploadFile } from '@/network/api/common'
import { uploadPhoto, modifyInfo } from '@/network/api/member'

export default {
  name: 'PersonalInformation',
  data() {
    return {
      // 头像链接
      portrait: '',
      // 昵称
      nickname: '',
      // 性别
      sex: '',
      // 生日
      birthday: '',
      // 签名
      summary: '',
      // 显示的性别
      showSex: '未知',
      // 控制性别选择弹框的显示与隐藏
      showSexPicker: false,
      // 性别选择框选项
      columns: ['未知', '男', '女', '保密'],
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
    ...mapGetters(['userInfo'])
  },
  watch: {
    // 判断显示的性别
    sex(value) {
      switch (value) {
        case '0':
          this.showSex = '未知'
          break
        case '1':
          this.showSex = '男'
          break
        case '2':
          this.showSex = '女'
          break
        case '3':
          this.showSex = '保密'
          break
        default:
          this.showSex = '未知'
      }
    }
  },
  mounted() {
    if (this.userInfo) {
      // 获取用户头像
      this.portrait = this.userInfo.avatar
      // 获取用户昵称
      this.nickname = this.userInfo.nickname
      // 获取用户性别
      this.sex = this.userInfo.sex
      // 获取用户签名
      this.summary = this.userInfo.summary
      // 获取用户生日
      const index = this.userInfo.birthday.indexOf('T', 0)
      this.birthday = this.userInfo.birthday.slice(0, index)
    }
  },
  methods: {
    // 头像文件上传前置处理
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
    // 头像文件上传
    afterRead(file) {
      console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      uploadFile(formData).then(result => {
        this.portrait = result.data.url
      })
    },
    // 性别确认事件
    onConfirmSex(value) {
      switch (value) {
        case '未知':
          this.sex = '0'
          break
        case '男':
          this.sex = '1'
          break
        case '女':
          this.sex = '2'
          break
        case '保密':
          this.sex = '3'
          break
        default:
          this.sex = '0'
      }
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
      this.birthday = `${Y}-${M}-${D}`
      this.showPicker = false
    },
    // 保存
    btnSave() {
      // 修改会员头像
      if (this.portrait) {
        uploadPhoto(this.portrait)
      }
      // 修改名称
      if (this.nickname) {
        modifyInfo('nickname', this.nickname)
      }
      // 修改性别
      if (this.sex) {
        modifyInfo('sex', this.sex)
      }
      // 修改生日
      if (this.birthday) {
        modifyInfo('birthday', this.birthday)
      }
      // 修改签名
      if (this.summary) {
        modifyInfo('summary', this.summary)
      }

      this.$router.replace('/profile')
    }
  }
}
</script>

<style lang="less" scoped>
.personal-information {
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  align-items: center;
  box-sizing: border-box;
  font-size: 16px;

  .input-box {
    width: 100%;
    margin: 15px 0;
    padding-left: 5%;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;

    span {
      line-height: 35px;
    }

    input::-webkit-input-placeholder {
      color: #333;
    }

    input,
    .input-textarea {
      width: 50%;
      font-size: 14px;
      padding: 0 20px;
      background-color: #f8f8f8;
      border: none;
      border-radius: 20px;
    }

    .input-textarea {
      height: 80px;
      padding: 20px;

      textarea {
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
        border: none;
        resize: none;
        padding-right: 10px;
      }
    }
  }

  .btn-save {
    width: 50%;
    height: 35px;
    font-size: 16px;
    font-weight: 600;
    line-height: 35px;
    padding: 12px;
    margin-top: 20px;
    border: 1px solid #333;
    border-radius: 20px;
  }
}
</style>
