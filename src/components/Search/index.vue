<template>
  <div>
    <van-search
      :disabled="ifdisabled"
      :show-action="showAction"
      shape="round"
      autofocus
      :clearable="isClearable"
      :left-icon="leftIcon"
      v-model="value"
      :placeholder="placeholder"
      @input="emitValue"
    >
      <template #action>
        <slot name="text"></slot>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    // 是否禁用搜索
    ifdisabled: {
      type: Boolean,
      default: false
    },
    // 是否显示右侧按钮
    showAction: {
      type: Boolean,
      default: false
    },
    // 是否显示清除图标
    isClearable: {
      type: Boolean,
      default: true
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: 'search'
    },
    // 提示文本
    placeholder: {
      type: String,
      default: '快来寻找感兴趣的王国'
    },
    // 点击传过来的值
    propValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 用户输入值
      value: '',
      // 计时器
      timer: null
    }
  },
  watch: {
    propValue(newVal) {
      this.value = newVal
      this.emitValue()
    }
  },
  methods: {
    emitValue() {
      if (this.timer) {
        return false
      } else {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
          this.$emit('emitValue', this.value.trim())
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
