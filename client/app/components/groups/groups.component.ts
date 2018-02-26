import WithRender from './groups.component.html?style=./groups.component.scss';
import Component from 'vue-class-component';
import Vue from 'vue';
import { IGridGroup } from 'components/grid/grid.component';

@WithRender
@Component({
  name: 'Groups',
  components: {
    Grid: (() => import('components/grid/grid.component'))
  }
})
export default class Groups extends Vue {
  private groupData: any = [];
  private groupFilter: string = '';

  private get groups(): IGridGroup[] {
    const filter = new RegExp(this.groupFilter, 'i');
    const items = this.groupData
      .filter((group: any) => filter.test(group.name))
      .reduce((groupings: any, group: any) => {
        if (!groupings[group.self.role]) {
          groupings[group.self.role] = [];
        }
        groupings[group.self.role].push(group);
        return groupings;
      }, {});
    // TODO: Make simpler/more efficient
    return Object.entries(items)
      .sort(this.sortRole)
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
      this.groupData = await (await fetch(`/api/groups`, { credentials: 'include' })).json();
    } catch (e) {
      window.location.assign('/auth/meetup');
    }
    this.groupData.sort((a: any, b: any) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
  }
  private groupClicked(group: any) {
    this.$router.push({ name: 'group', params: { groupName: group.urlname } });
  }
  private roleName(role: string) {
    switch (role) {
      case 'event_organizer':
        return 'Event Organizer';
      default:
        return 'Member';
    }
  }
  private sortRole(left: any, right: any) {
    const sortOrder = ['event_organizer', 'undefined'];
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
  private getPhoto(group: any) {
    return (group.group_photo && group.group_photo.photo_link) ||
      (group.key_photo && group.key_photo.photo_link) ||
      (group.meta_category.photo && group.meta_category.photo.photo_link);
  }
}
