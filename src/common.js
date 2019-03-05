import Vue from 'vue';
import axios from './lib/axios';

import {
  Form, FormItem, Input, Button, Tag, Pagination,
  Icon, Dialog
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

export default Vue;