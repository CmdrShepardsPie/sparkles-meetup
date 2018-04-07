import 'vuetify/dist/vuetify.css';
// import '@styles/common.scss';

// Filters need to be loaded before everything else
import './app.filters';

import Vue  from 'vue';

// import {
//   Vuetify,
//   VApp,
//   VNavigationDrawer,
//   VFooter,
//   VList,
//   VBtn,
//   VIcon,
//   VGrid,
//   VToolbar,
//   transitions
// } from 'vuetify';
// import Vuetify from 'vuetify';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

// import Rx from 'rxjs/Rx';
// import VueRx  from 'vue-rx';
// Vue.use(VueRx, Rx);

// import services from './app.services';
// import router from './app.router';
// import store  from './app.store';

// import { sync } from 'vuex-router-sync';
// sync(store, router);

// Register global components before bootstrapping the app
import './app.global-components';

// const App = () => import('@containers/app/app.component');
import App from '@containers/app/app.component';

// Bootstrap Vue app
export default new Vue({
  el: '#app',
  // store,
  // router,
  provide: {
    // Bring in the pre-created services and make them available to Vue app components
    // ...services
  },
  render: (h) => h(App)
});
