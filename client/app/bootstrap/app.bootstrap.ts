import 'styles/common.scss';

import Vue            from 'vue';

import VueMoment from 'vue-moment';
Vue.use(VueMoment);

import services       from './app.services';
import router         from './app.router';
import './app.filters';

const App = (() => import('containers/app/app.component'));

// Bootstrap Vue app
export default new Vue({
  el: '#app',
  router,
  provide: {
    // Bring in the pre-created services and make them available to Vue app components
    ...services
  },
  render: (h) => h(App)
});
