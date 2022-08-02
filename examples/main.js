import Vue from 'vue'
import App from './App.vue'
import elementForm2 from '../packages/index'
import './core/element_ui_use';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(elementForm2)
new Vue({
    render: h => h(App)
}).$mount('#app')
