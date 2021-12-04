<template>
  <div class="bg-white">
    <!-- 标签页 -->
    <!-- 搜索栏 -->
    <search
      :showAction="true"
      placeholder="输入感兴趣的话题"
      @emitValue="searchLabel"
      style="padding-top:5px"
    >
      <template #text>
        <span @click="$router.back()">取消</span>
      </template>
    </search>

    <!-- 热门话题区域 -->
    <van-row class="hot-topic-box" v-if="!labelName">
      <!-- 标题 -->
      <h3 class="title">热门话题</h3>
      <van-cell
        :title="labelItem.label_name"
        :value="labelItem.participate_num + '人参与'"
        center
        title-class="cell-title"
        value-class="cell-value"
        class="label"
        v-for="labelItem in labelMsgList"
        :key="labelItem.id"
        @click="chooseLabel(labelItem)"
      >
        <template #icon>
          <van-icon name="label-o" color="#93bdf9" size="20" class="img-mr" />
        </template>
      </van-cell>
    </van-row>
    <!-- 搜索显示 -->
    <van-row class="hot-topic-box" v-else>
      <!-- 创建标签 -->
      <van-cell
        v-if="!isHave"
        :title="labelName"
        center
        title-class="cell-title"
        value-class="create-label-value"
        class="label"
      >
        <template #icon>
          <van-icon name="label-o" color="#93bdf9" size="20" class="img-mr" />
        </template>
        <template #default>
          <span @click="createLabel">创建标签</span>
        </template>
      </van-cell>
      <!-- 标签 -->
      <van-cell
        :title="labelItem.label_name"
        :value="labelItem.participate_num + '人参与'"
        center
        title-class="cell-title"
        value-class="cell-value"
        class="label"
        v-for="labelItem in searchLabelList"
        :key="labelItem.id"
        @click="chooseLabel(labelItem)"
      >
        <template #icon>
          <van-icon name="label-o" color="#93bdf9" size="20" class="img-mr" />
        </template>
      </van-cell>
    </van-row>
  </div>
</template>

<script>
import Search from '@/components/Search'

import { getLabelMsg, addLabelMsgVisit, addLabelMsg } from '@/network/api/pets'
import { TagQuery, TagQueryComplete } from '@/network/api/search'

export default {
  name: 'Label',
  components: {
    Search
  },
  data() {
    return {
      // 宠物动态标签信息
      labelMsgList: [],
      // 搜索标签结果列表
      searchLabelList: [],
      // 标签是否存在
      isHave: true,
      // 创建标签显示的标签名
      labelName: ''
    }
  },
  created() {
    this.getLabelMsg()
    console.log(!this.searchLabelList)
  },
  methods: {
    // 获取宠物动态标签信息
    async getLabelMsg() {
      const {
        data: { data }
      } = await getLabelMsg()
      console.log(data)
      this.labelMsgList = data
    },
    // 搜索话题
    async searchLabel(value) {
      if (value) {
        console.log(value)
        // 标签模糊查询
        const {
          data: { data }
        } = await TagQuery(value)
        this.searchLabelList = data
        console.log(data)

        // 标签全局查询，判断标签是否存在
        const {
          data: {
            data: { isHave }
          }
        } = await TagQueryComplete(value)
        this.isHave = isHave
        this.labelName = value
      } else {
        this.searchLabelList = []
        this.isHave = false
        this.labelName = ''
      }
    },
    // 选中标签事件
    async chooseLabel(label) {
      // 增加宠物动态标签点击量
      await addLabelMsgVisit(label.id)
      // 返回post页面时携带的参数
      this.$route.params.value = label.label_name
      this.$router.back()
    },
    // 创建标签
    async createLabel() {
      await addLabelMsg(this.labelName)
      this.$route.params.value = this.labelName
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.hot-topic-box {
  padding: 10px 15px 0;

  .title {
    color: #c6c6c6;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .create-label-value {
    font-size: 14px;
    color: #2979ff;
  }

  .cell-title {
    font-size: 15px;
    font-weight: 600;
  }
  .cell-value {
    font-size: 12px;
    color: #c6c6c6;
  }

  .label {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }
}
</style>
