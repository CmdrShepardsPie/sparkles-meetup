import WithRender from './event.component.html?style=./event.component.scss';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import moment from 'moment';

@WithRender
@Component({
  name: 'Event',
  components: {
  }
})
export default class Event extends Vue {
  @Prop() private groupName: string;
  @Prop() private eventId: string;
  private eventData: any = [];
  private commentData: any = [];

  private get event() {
    // const filter = new RegExp(this.eventFilter, 'i');
    // const items = this.eventData
    //   .filter((event: any) => filter.test(event.name))
    //   .reduce((eventings: any, event: any) => {
    //     if (!eventings[event.status]) {
    //       eventings[event.status] = [];
    //     }
    //     eventings[event.status].push(event);
    //     return eventings;
    //   }, {});
    // // TODO: Make simpler/more efficient
    // return Object.entries(items)
    //   .sort(this.sortStatus)
    //   .reduce((prev: any, next: any) => {
    //     return [...prev, { title: next[0], items: next[1] }];
    //   }, []);
    return this.eventData;
  }

  private get comments() {
    return this.commentData;
  }

  private created() {
    this.getData();
  }

  private async getData() {
    try {
      this.eventData = await (await fetch(`/api/${this.groupName}/events/${this.eventId}`, { credentials: 'include' })).json();
      this.commentData = await (await fetch(`/api/${this.groupName}/events/${this.eventId}/comments`, { credentials: 'include' })).json();
    } catch (e) {
      window.location.assign('/auth/meetup');
    }
  }
}
