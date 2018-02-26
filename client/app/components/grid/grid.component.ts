import WithRender from './grid.component.html?style=./grid.component.scss';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Emit, Prop } from 'vue-property-decorator';

export interface IGridGroup {
  [s: string]: any;
  items: object[];
}

@WithRender
@Component({
  name: 'Grid',
  components: {
  }
})
export default class Grid extends Vue {
  @Prop() public data: IGridGroup[];
  @Emit() public itemClicked(item: any) { }
}
