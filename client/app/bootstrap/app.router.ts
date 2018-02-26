import Vue  from 'vue';
import VueRouter  from 'vue-router';

const Groups = (() => import('components/groups/groups.component'));
const Group = (() => import('components/group/group.component'));
const Event = (() => import('components/event/event.component'));

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { name: 'groups', path: '/groups', component: Groups },
    { name: 'group', path: '/groups/:groupName', component: Group, props: true },
    { name: 'event', path: '/groups/:groupName/events/:eventId', component: Event, props: true },
    { path: '/', redirect: { name: 'groups' } }
  ]
});

export default router;
