import Vue from 'vue'
import App from './App'
import router from './router'
import { Button,Row,Col,Search,Swipe,SwipeItem,Lazyload,List
	,Field,NavBar,Tab,Tabs,PullRefresh,Tabbar,TabbarItem} from 'vant'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col).use(Search)
.use(Swipe).use(SwipeItem).use(Lazyload).use(List)
.use(Field).use(NavBar).use(Tab).use(Tabs)
.use(PullRefresh).use(Tabbar).use(TabbarItem);

// Vue.use(VueAwesomeSwiper);
// // 设置全局属性
// Vue.prototype.HOST = '/api'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
