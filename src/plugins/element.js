import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Scrollbar,
  Select,
  Option,
  Drawer,
  Divider
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Scrollbar)
Vue.use(Select)
Vue.use(Option)
Vue.use(Drawer)
Vue.use(Divider)

Vue.use(VXETable)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
