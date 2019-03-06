import Vue from 'vue';
import axios from './lib/axios';

import {
  Form, FormItem, Input, Button, Tag, Pagination,
  Icon, Dialog, Message
} from 'element-ui';
import { $json } from './lib/axios';

Vue.use(axios);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Dialog);

Vue.prototype.$message = Message;
export default Vue;