import Vue from 'vue'
import App from './App'
import router from './router'
import { Button,Row,Col,Search,Swipe,SwipeItem,Lazyload,List } from 'vant'


Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col).use(Search)
.use(Swipe).use(SwipeItem).use(Lazyload).use(List);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
