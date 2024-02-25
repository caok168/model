import Vue from 'vue';

import {
  Button,
  Select,
  Option,
  Container,
  Header,
  Main,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Card,
  Tree,
  Upload,
  Tooltip,
  Dialog,
  Aside,
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Pagination,
  Steps,
  Step,
  Tabs,
  TabPane,
  DatePicker,
  Checkbox,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Progress,
  Cascader,
  Breadcrumb,
  BreadcrumbItem,
  Popover,
  RadioGroup,
  Radio,
  Image,
  Empty,
  Message,
  Loading,
  MessageBox,
} from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Card.name, Card);
Vue.component(Tree.name, Tree);
Vue.component(Upload.name, Upload);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Dialog.name, Dialog);
Vue.component(Aside.name, Aside);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Steps.name, Steps);
Vue.component(Step.name, Step);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Avatar.name, Avatar);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Progress.name, Progress);
Vue.component(Cascader.name, Cascader);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Popover.name, Popover);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Radio.name, Radio);
Vue.component(Image.name, Image);
Vue.component(Empty.name, Empty);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
