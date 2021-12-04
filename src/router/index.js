import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
const Home = () => import(/* webpackChunkName: "first-screen" */ '@/views/Home')
// 王国
const Kingdom = () =>
  import(/* webpackChunkName: "first-screen" */ '@/views/Kingdom')
// 消息
const Message = () =>
  import(/* webpackChunkName: "first-screen" */ '@/views/Message')
// 我的
const Profile = () =>
  import(/* webpackChunkName: "first-screen" */ '@/views/Profile')
// 中间菜单页
const MidTabbar = () =>
  import(/* webpackChunkName: "first-screen" */ '@/views/MidTabbar')
// 排行榜
const RankingList = () =>
  import(/* webpackChunkName: "first-screen" */ '@/views/RankingList')

// 帖子详情
const PostDetails = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/PostDetails')
// 动态
const AnimalDetails = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/AnimalDetails')
// 动态/帖子 一级评论的回复页面
const Reply = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/Reply')
// 发帖
const Post = () => import(/* webpackChunkName: "post_dynamic" */ '@/views/Post')
// 日记（发动态）
const ReleaseNews = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/ReleaseNews')
// 关联标签页
const Label = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/Label')
// 选择关联宠物页
const ChoosePets = () =>
  import(/* webpackChunkName: "post_dynamic" */ '@/views/ChoosePets')

// 王国搜索
const KingdomSearch = () =>
  import(/* webpackChunkName: "kingdom" */ '@/views/KingdomSearch')
// 搜索结果
const SearchResult = () =>
  import(/* webpackChunkName: "kingdom" */ '@/views/SearchResult')
// 所有王国搜索页
const AllKingdom = () =>
  import(/* webpackChunkName: "kingdom" */ '@/views/AllKingdom')
// 宠物王国主页
const LevelDetails = () =>
  import(/* webpackChunkName: "kingdom" */ '@/views/LevelDetails')

// 宠物登记（创建宠物）
const PetsArchives = () =>
  import(/* webpackChunkName: "pets" */ '@/views/PetsArchives')
// 宠物详情页
const PetDetails = () =>
  import(/* webpackChunkName: "pets" */ '@/views/PetDetails')
// 宠物相册详情页
const AlbumDetails = () =>
  import(/* webpackChunkName: "pets" */ '@/views/AlbumDetails')
// 领养中心
const Adopt = () => import(/* webpackChunkName: "pets" */ '@/views/Adopt')
// 领养详情页
const AdoptDetails = () =>
  import(/* webpackChunkName: "pets" */ '@/views/AdoptDetails')
// 萌宠档案（萌宠排行榜）
const Archives = () => import(/* webpackChunkName: "pets" */ '@/views/Archives')
// 宠物排名规则
const PetsRankingRules = () =>
  import(/* webpackChunkName: "pets" */ '@/views/PetsRankingRules')

// 登录
const Login = () => import(/* webpackChunkName: "system" */ '@/views/Login')
// 注册
const Register = () =>
  import(/* webpackChunkName: "system" */ '@/views/Register')
// 设置
const PersonalSetup = () =>
  import(/* webpackChunkName: "system" */ '@/views/PersonalSetup')
// 用户协议
const Agreement = () =>
  import(/* webpackChunkName: "system" */ '@/views/Agreement')
// 隐私条款
const Privacy = () => import(/* webpackChunkName: "system" */ '@/views/Privacy')

// 个人主页
const OwnPage = () => import(/* webpackChunkName: "user" */ '@/views/OwnPage')
// 个人中心
const PersonalInformation = () =>
  import(/* webpackChunkName: "user" */ '@/views/PersonalInformation')
// 我的宠物
const MyPet = () => import(/* webpackChunkName: "user" */ '@/views/MyPet')
// 我的领养
const MyAdoption = () =>
  import(/* webpackChunkName: "user" */ '@/views/MyAdoption')
// 审核信息
const ExamineTxet = () =>
  import(/* webpackChunkName: "user" */ '@/views/ExamineTxet')
// 我的云养
const YunYang = () => import(/* webpackChunkName: "user" */ '@/views/YunYang')
// 我的作品
const MyWork = () => import(/* webpackChunkName: "user" */ '@/views/MyWork')
// 我的帖子
const MyPost = () => import(/* webpackChunkName: "user" */ '@/views/MyPost')
// 我的收藏
const MyCollection = () =>
  import(/* webpackChunkName: "user" */ '@/views/MyCollection')
// 草稿箱
const Drafts = () => import(/* webpackChunkName: "user" */ '@/views/Drafts')
// 我的足迹
const Footprint = () =>
  import(/* webpackChunkName: "user" */ '@/views/Footprint')
// 我的粉丝
const MyFans = () => import(/* webpackChunkName: "user" */ '@/views/MyFans')
// 我的关注
const MyFollow = () => import(/* webpackChunkName: "user" */ '@/views/MyFollow')

// 查看获得的赞的页面
const MyFabulous = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/MyFabulous')
// 查看赞过对应动态的用户
const PraisedPeople = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/PraisedPeople')
// 新增粉丝消息页
const NewAddFans = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/NewAddFans')
// 收到的评论互动消息
const Comment = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/Comment')
// 系统消息通知页
const SystemNotice = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/SystemNotice')
// 宠物被云养消息
const PetsMessage = () =>
  import(/* webpackChunkName: "user-message" */ '@/views/PetsMessage')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  // 首页
  {
    path: '/home',
    component: Home,
    meta: {
      ifShowTabbar: true,
      keepAlive: true
    }
  },
  // 王国
  {
    path: '/kingdom',
    component: Kingdom,
    meta: {
      ifShowTabbar: true,
      keepAlive: false
    }
  },
  // 消息
  {
    path: '/message',
    component: Message,
    meta: {
      ifShowTabbar: true,
      keepAlive: false
    }
  },
  // 我的
  {
    path: '/profile',
    component: Profile,
    meta: {
      ifShowTabbar: true,
      keepAlive: false
    }
  },
  // 中间菜单页
  {
    path: '/mid_tabbar',
    component: MidTabbar,
    meta: { keepAlive: false }
  },
  // 排行榜
  {
    path: '/ranking-list',
    component: RankingList,
    meta: { keepAlive: false }
  },

  // 帖子详情
  {
    path: '/postDetails',
    component: PostDetails,
    meta: { keepAlive: false }
  },
  // 动态
  {
    path: '/animal-details',
    component: AnimalDetails,
    meta: { keepAlive: false }
  },
  // 动态/帖子 一级评论的回复页面
  {
    path: '/reply',
    component: Reply,
    meta: { keepAlive: false }
  },
  // 发帖页面
  {
    path: '/post',
    component: Post,
    meta: { keepAlive: true }
  },
  // 日记（发动态）
  {
    path: '/release_news',
    component: ReleaseNews,
    meta: { keepAlive: true }
  },
  // 标签页
  {
    path: '/label',
    component: Label,
    meta: { keepAlive: false }
  },
  // 选择宠物
  {
    path: '/choosePets',
    component: ChoosePets,
    meta: { keepAlive: false }
  },

  // 王国搜索
  {
    path: '/kingdom_search',
    component: KingdomSearch,
    meta: { keepAlive: false }
  },
  // 搜索结果
  {
    path: '/search_result',
    component: SearchResult,
    meta: { keepAlive: false }
  },
  // 全部王国
  {
    path: '/all-kingdom',
    component: AllKingdom,
    meta: { keepAlive: false }
  },
  // 宠物王国主页
  {
    path: '/level_details',
    component: LevelDetails,
    meta: { keepAlive: false }
  },

  // 宠物登记（创建宠物）
  {
    path: '/petsArchives',
    component: PetsArchives,
    meta: { keepAlive: true }
  },
  // 宠物详情页面
  {
    path: '/pet-details',
    component: PetDetails,
    meta: { keepAlive: false }
  },
  // 宠物相册详情页
  {
    path: '/albumDetails',
    component: AlbumDetails,
    meta: { keepAlive: false }
  },
  // 领养中心
  {
    path: '/adopt',
    component: Adopt,
    meta: { keepAlive: false }
  },
  // 领养详情页面
  {
    path: '/adoptDetails',
    component: AdoptDetails,
    meta: { keepAlive: false }
  },
  // 萌宠档案（萌宠排行榜）
  {
    path: '/archives',
    component: Archives,
    meta: { keepAlive: false }
  },
  // 宠物排名规则
  {
    path: '/petsRanking_rules',
    component: PetsRankingRules,
    meta: { keepAlive: false }
  },

  // 登录页面
  {
    path: '/login',
    component: Login,
    meta: { keepAlive: false }
  },
  // 注册页
  {
    path: '/register',
    component: Register,
    meta: { keepAlive: false }
  },
  // 设置
  {
    path: '/personal-setup',
    component: PersonalSetup,
    meta: { keepAlive: false }
  },
  // 用户协议
  {
    path: '/user_agreement',
    component: Agreement,
    meta: { keepAlive: false }
  },
  // 隐私条款
  {
    path: '/privacy_clause',
    component: Privacy,
    meta: { keepAlive: false }
  },

  // 个人主页
  {
    path: '/ownPage',
    component: OwnPage,
    meta: { keepAlive: false }
  },
  // 个人中心
  {
    path: '/PersonalInformation',
    component: PersonalInformation,
    meta: { keepAlive: false }
  },
  // 我的宠物
  {
    path: '/MyPet',
    component: MyPet,
    meta: { keepAlive: false }
  },
  // 我的领养
  {
    path: '/MyAdoption',
    component: MyAdoption,
    meta: { keepAlive: false }
  },
  // 审核信息
  {
    path: '/examinetxet',
    component: ExamineTxet,
    meta: { keepAlive: false }
  },
  // 我的云养
  {
    path: '/Yunyang',
    component: YunYang,
    meta: { keepAlive: false }
  },
  // 我的作品
  {
    path: '/MyWork',
    component: MyWork,
    meta: { keepAlive: false }
  },
  // 我的帖子
  {
    path: '/MyPost',
    component: MyPost,
    meta: { keepAlive: false }
  },
  // 我的收藏
  {
    path: '/MyCollection',
    component: MyCollection,
    meta: { keepAlive: false }
  },
  // 草稿箱
  {
    path: '/drafts',
    component: Drafts,
    meta: { keepAlive: false }
  },
  // 我的足迹
  {
    path: '/footprint',
    component: Footprint,
    meta: { keepAlive: false }
  },
  // 我的粉丝
  {
    path: '/my_fans',
    component: MyFans,
    meta: { keepAlive: false }
  },
  // 我关注的
  {
    path: '/my_follow',
    component: MyFollow,
    meta: { keepAlive: false }
  },

  // 查看获得的赞的页面
  {
    path: '/myFabulous',
    component: MyFabulous,
    meta: { keepAlive: false }
  },
  // 查看赞过对应动态的人
  {
    path: '/praisedPeople',
    component: PraisedPeople,
    meta: { keepAlive: false }
  },
  // 新增粉丝消息页面
  {
    path: '/newAddFans',
    component: NewAddFans,
    meta: { keepAlive: false }
  },
  // 收到的评论互动消息
  {
    path: '/comment',
    component: Comment,
    meta: { keepAlive: false }
  },
  // 系统消息通知页面
  {
    path: '/SystemNotice',
    component: SystemNotice,
    meta: { keepAlive: false }
  },
  // 宠物被云养消息
  {
    path: '/petsMessage',
    component: PetsMessage,
    meta: { keepAlive: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
