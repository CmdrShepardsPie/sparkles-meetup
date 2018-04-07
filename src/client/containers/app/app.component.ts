// import './app.component.styl';
import WithRender from './app.component.html?style=./app.component.scss';
// import template from './app.component.html';

import Component from 'vue-class-component';
import Vue from 'vue';

@WithRender
@Component({
  // template,
  name: 'App',
  components: {},
  mixins: []
})
export default class App extends Vue {
  private created() {
    console.log('App', 'created');
  }

  private mounted() {
    console.log('App', 'mounted');
  }

  private beforeDestroy() {
    console.log('App', 'beforeDestroy');
  }
}
