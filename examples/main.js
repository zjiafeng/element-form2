import Vue from 'vue'
import App from './App.vue'
import elementForm2 from '../packages/index'

Vue.config.productionTip = false
Vue.use(elementForm2)
new Vue({
    render: h => h(App)
}).$mount('#app')
