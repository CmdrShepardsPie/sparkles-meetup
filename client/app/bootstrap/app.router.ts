import Vue  from 'vue';
import VueRouter  from 'vue-router';

const Groups = (() => import('components/groups/groups.component'));
const Group = (() => import('components/group/group.component'));
const Event = (() => import('components/event/event.component'));

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { name: 'groups', path: '/', component: Groups },
    { name: 'event', path: '/:groupName/events/:eventId', component: Event, props: true },
    { name: 'group', path: '/:groupName', component: Group, props: true },
  ]
});

export default router;
