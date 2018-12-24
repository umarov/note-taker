import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'notes',
          component: () => import('@/views/Notes.vue')
        },
        {
          path: '/new',
          name: 'new_note',
          component: () => import('@/views/NewNote.vue')
        },
        {
          path: '/edit/:id',
          name: 'edit_note',
          component: () => import('@/views/EditNote.vue')
        }
      ]
    }
  ],
});
