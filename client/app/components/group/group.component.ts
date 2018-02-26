import WithRender from './group.component.html?style=./group.component.scss';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { IGridGroup } from 'components/grid/grid.component';

@WithRender
@Component({
  name: 'Group',
  components: {
    Grid: (() => import('components/grid/grid.component'))
  }
})
export default class Group extends Vue {
  @Prop() private groupName: string;
  private group: any = {};
  private eventData: any = [];
  private eventFilter: string = '';

  private get events(): IGridGroup[] {
    const filter = new RegExp(this.eventFilter, 'i');
    const items = this.eventData
      .filter((event: any) => filter.test(event.name))
      .reduce((eventings: any, event: any) => {
        if (!eventings[event.status]) {
          eventings[event.status] = [];
        }
        eventings[event.status].push(event);
        return eventings;
      }, {});
    // TODO: Make simpler/more efficient
    return Object.entries(items)
      .sort(this.sortStatus)
      .reduce((prev: any, next: any) => {
        return [...prev, { title: next[0], items: next[1] }];
      }, []);
  }

  private created() {
    this.getData();
  }

  private async getData() {
    // const pars = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    try {
      this.group = await (await fetch(`/api/${this.groupName}`, { credentials: 'include' })).json();
      this.eventData = await (await fetch(`/api/${this.groupName}/events`, { credentials: 'include' })).json();
    } catch (e) {
      window.location.assign('/auth/meetup');
    }
  }
  private eventClicked(event: any) {
    this.$router.push({ name: 'event', params: { groupName: this.groupName, eventId: event.id } });
  }
  private sortStatus(left: any, right: any) {
    const sortOrder = ['draft', 'proposed', 'upcoming', 'suggested', 'past', 'cancelled'];
    // Sorting 'algorithm'
    const leftIndex = sortOrder.indexOf(left[0]);
    const rightIndex = sortOrder.indexOf(right[0]);
    if (leftIndex > rightIndex) {
      return 1;
    } else if (leftIndex < rightIndex) {
      return -1;
    } else {
      return 0;
    }
  }
}
