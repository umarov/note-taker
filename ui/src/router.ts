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
          component: () => import('@/views/Notes.vue'),
          meta: {
            topLevel: true
          }
        },
        {
          path: 'new',
          name: 'new_note',
          component: () => import('@/views/NewNote.vue'),
          meta: {
            topLevel: false,
            toolbarLabel: 'Create new note'
          }
        },
        {
          path: 'edit/:id',
          name: 'edit_note',
          component: () => import('@/views/EditNote.vue'),
          meta: {
            topLevel: false,
            toolbarLabel: 'Edit new note'
          }
        }
      ]
    }
  ],
});
