const MODE =
  process.env.NODE_ENV === 'production'
    ? createWebHistory
    : createWebHashHistory;

import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import Home from '../views/Home.vue';
import Calc from '../views/Calc.vue';
import Wip from '../views/Wip.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  /* calc */ {
    path: '/Calc',
    name: 'Calc',
    component: Calc,
    meta: {
      title: 'The Calc stuff',
    },
    children: [
      {
        path: 'Percents',
        name: 'Percents',
        meta: {
          title: 'The Elusive Percent',
        },
        component: () =>
          import(
            /* webpackChunkName: "Percents" */ '../views/calc/Percents.vue'
          ),
      },
      {
        path: 'Velo',
        name: 'Velo',
        meta: {
          title: 'The Counter Intuitive Flight',
        },
        component: () =>
          import(/* webpackChunkName: "Velo" */ '../views/calc/Velo.vue'),
      },
      {
        path: 'Tomato',
        name: 'Tomato',
        meta: {
          title: 'The Counter Intuitive Tomato',
        },
        component: () =>
          import(/* webpackChunkName: "Tomato" */ '../views/calc/Tomato.vue'),
      },
      {
        path: 'Cars',
        name: 'Cars',
        meta: {
          title: 'The Counter Intuitive Cars',
        },
        component: () =>
          import(/* webpackChunkName: "Cars" */ '../views/calc/Cars.vue'),
      },
      {
        path: 'Range',
        name: 'Range',
        component: () =>
          import(/* webpackChunkName: "Range" */ '../views/calc/Range.vue'),
      },
    ],
  },
  /* wip */ {
    path: '/Wip',
    name: 'Wip',
    component: Wip,
    meta: {
      title: 'The WIP stuff',
    },
    children: [
      {
        path: 'Matrix',
        name: 'Matrix',
        meta: {
          title: 'The Freaky Matrix',
        },
        component: () =>
          import(/* webpackChunkName: "Matrix" */ '../views/calc/Matrix.vue'),
      },
      {
        path: 'vmail',
        name: 'Vmail',
        meta: {
          title: 'Forge Vmail',
        },
        component: () =>
          import(/* webpackChunkName: "Vmail" */ '../views/mail/Vmail.vue'),
      },
    ],
  },
  {
    path: '/About',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: MODE(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = document.title;
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
