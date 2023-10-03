import Vue from 'vue';
import App from './App.vue';
import { registerSparkComponents } from 'genesys-spark';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/gux-:*/];

registerSparkComponents();

new Vue({
  render: h => h(App)
}).$mount('#app');
