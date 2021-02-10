import Vue from 'vue'
import {
  Input, Button, Message, Menu, Submenu, Main,
  MenuItem, Row, Col, Form, FormItem, Container, Header,
  Aside, Footer, Carousel, CarouselItem, Tabs, TabPane,
  Table, TableColumn, Slider, Avatar, Popover, Progress,
  MenuItemGroup, Dialog, Tooltip, Dropdown, DropdownItem,
  DropdownMenu, ColorPicker,Pagination,Upload,Image,MessageBox
} from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Slider)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(ColorPicker)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Image)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
