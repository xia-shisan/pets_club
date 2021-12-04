import Vue from 'vue'
import {
  Lazyload,
  Button,
  Toast,
  Col,
  Row,
  Tabbar,
  TabbarItem,
  Icon,
  Search,
  Sticky,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  List,
  Cell,
  CellGroup,
  Tag,
  NavBar,
  Empty,
  NoticeBar,
  Area,
  Popup,
  Form,
  Field,
  Dialog,
  Uploader,
  Checkbox,
  CheckboxGroup,
  TreeSelect,
  RadioGroup,
  Radio,
  Badge,
  DatetimePicker,
  Picker
} from 'vant'

Vue.use(Lazyload)
Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Sticky)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(NavBar)
Vue.use(Empty)
Vue.use(NoticeBar)
Vue.use(Area)
Vue.use(Popup)
Vue.use(Form)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(TreeSelect)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Badge)
Vue.use(DatetimePicker)
Vue.use(Picker)

Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast
