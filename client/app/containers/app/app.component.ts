import WithRender from './app.component.html?style=./app.component.scss';
import Component from 'vue-class-component';
import Vue from 'vue';

@WithRender
@Component({
  name: 'App',
  components: {
  }
})
export default class App extends Vue {

}
