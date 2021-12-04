<template>
  <div class="bg-white all-kingdom">
    <!-- 全部王国 -->
    <!-- 搜索区域 -->
    <search
      :showAction="true"
      :placeholder="'输入需要查找的宠物种类'"
      @emitValue="PetFuzzyQuery"
    >
      <template #text>
        <span @click="btnBack">取消</span>
      </template>
    </search>

    <!-- 搜索结果显示区域 -->
    <div v-show="isSearch">
      <!-- 搜索到展示区域 -->
      <van-row v-show="searchResult.length !== 0">
        <van-cell
          :title="item.category_name"
          :label="item.label"
          center
          v-for="item in searchResult"
          :key="item.id"
          @click="jumpPage(item.id, item.category_name)"
        >
          <!-- 王国图片 -->
          <template #icon>
            <van-image
              width="50"
              height="50"
              radius="10"
              class="img-mr"
              :src="item.image"
            />
          </template>
          <!-- 进王国按钮 -->
          <template #right-icon>
            <van-tag color="#f7f7f7" class="right-tag" v-if="!flag">
              进王国
            </van-tag>
          </template>
        </van-cell>
      </van-row>

      <!-- 未搜索到结果展示 -->
      <van-row
        v-show="searchResult.length === 0"
        type="flex"
        justify="center"
        align="center"
        style="padding-top:20px"
      >
        <span style="color:#888">未搜索到结果</span>
      </van-row>
    </div>

    <!-- 分类选择区域 -->
    <div class="treeSelect-box" v-show="!isSearch">
      <!-- 左侧区域 -->
      <ul class="treeSelect-left">
        <li
          :class="item.id === currentId ? 'selectItem-current' : 'selectItem'"
          v-for="item in allKingdomList"
          :key="item.id"
          @click="sumbit(item.id)"
        >
          {{ item.category_name }}
        </li>
      </ul>

      <!-- 右侧区域 -->
      <div class="treeSelect-right" id="category-box">
        <div
          class="category-box"
          v-for="kingdomItem in allKingdomList"
          :key="kingdomItem.id"
          :id="'category' + kingdomItem.id"
        >
          <!-- 总大类标题 -->
          <p>{{ kingdomItem.category_name }}</p>
          <van-cell
            :title="category.category_name"
            center
            :border="false"
            class="category"
            v-for="category in kingdomItem.children"
            :key="category.id"
            @click="jumpPage(category.id, category.category_name)"
          >
            <template #icon>
              <van-image
                width="33"
                height="33"
                round
                class="img-mr"
                :src="category.image"
              />
            </template>
            <!-- 进入按钮 -->
            <template #right-icon>
              <van-tag color="#f7f7f7" class="right-tag" v-if="!flag">
                进入
              </van-tag>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import { getTree } from '@/network/api/column'
import { PetFuzzyQuery } from '@/network/api/search'

export default {
  name: 'AllKingdom',
  components: {
    Search
  },
  data() {
    return {
      // 左侧选择列表
      allKingdomList: [],
      // 当前左侧激活的按钮
      currentId: '',
      // 定时器
      timer: null,
      // 选择种类时，不显示按钮
      flag: '',
      // 是否在搜索种类
      isSearch: false,
      // 搜索结果
      searchResult: []
    }
  },
  created() {
    this.getTree()
    if (this.$route.query.flag) {
      this.flag = this.$route.query.flag
    }
  },
  methods: {
    // 获取王国分类树状列表
    async getTree() {
      const {
        data: { list, tree }
      } = await getTree()
      console.log(list)
      console.log(tree)
      tree[0].forEach(item => {
        list[item].children = []
        tree[item].forEach(itemID => {
          list[item].children.push(list[itemID])
        })
        this.allKingdomList.push(list[item])
      })
      // 默认激活左侧按钮第一个
      this.currentId = this.allKingdomList[0].id
      console.log(this.allKingdomList)
    },
    // 左侧按钮点击事件
    sumbit(key) {
      this.currentId = key
      // 右侧父盒子元素
      const categoryBox = document.querySelector('#category-box')
      // 右侧要显示的子盒子元素
      const showChild = document.querySelector('#category' + key)

      // 右侧对应子盒滚动到父盒子的顶部
      categoryBox.scrollTo({
        top: showChild.offsetTop,
        behavior: 'smooth'
      })
    },
    // 右侧滚动事件
    rightScroll(e) {
      // console.log(e.target.scrollTop)
      if (this.timer) {
        return false
      } else {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
          console.log(e.target.scrollTop)
        }, 1000)
      }
    },
    // 点击跳转
    jumpPage(id, categoryName) {
      // 选择种类
      if (this.flag) {
        this.$route.params.value = { categoryId: id, categoryName }
        this.$router.back()
      } else {
        // 进入王国
        this.$router.push({
          path: '/level_details/',
          query: {
            id
          }
        })
      }
    },
    // 王国分类模糊搜索
    PetFuzzyQuery(value) {
      if (value) {
        PetFuzzyQuery({ category_name: value }).then(result => {
          this.isSearch = true
          this.searchResult = result.data.data
          console.log(result.data.data)
        })
      } else {
        this.isSearch = false
      }
    },
    // 取消按钮
    btnBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.all-kingdom {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  // 分类选择样式
  .treeSelect-box {
    flex: 1;
    background: #eee;
    display: flex;
    margin: 5px 8px 10px;
    // 超出隐藏
    overflow: hidden;

    .treeSelect-left {
      width: 25%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10px;

      .selectItem {
        height: 40px;
        line-height: 40px;
      }

      // 选中状态
      .selectItem-current {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ff0137;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 5px;
          height: 20px;
          border-radius: 20px 0 0 20px;
          background-color: #ff0137;
          z-index: 999;
        }
      }
    }

    .treeSelect-right {
      flex: 1;
      position: relative;
      overflow-y: scroll;

      .category-box {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        p {
          height: 50px;
          line-height: 50px;
          font-weight: 600;
          padding: 0 10px;
          background-color: #fff;
        }

        .category {
          padding: 8px 10px;
        }
      }
    }
  }

  // 进入按钮样式
  .right-tag {
    color: #888 !important;
    padding: 4px 12px;
  }
}
</style>
