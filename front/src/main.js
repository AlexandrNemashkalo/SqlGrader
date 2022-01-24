import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import vuetify from './plugins/vuetify'
import RichTextEditor from 'rich-text-editor-vuetify'
import DatetimePicker from 'vuetify-datetime-picker'

import '../src/assets/style.scss';

Vue.config.productionTip = false

Vue.use(RichTextEditor)
Vue.use(DatetimePicker)


new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
