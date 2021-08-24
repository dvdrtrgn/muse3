import { createRouter, createWebHistory } from 'vue-router';
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
    path: '/calc',
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
          title: 'The Counter Intuitive Percent',
        },
        component: () =>
          import(/* webpackChunkName: "Percents" */ '../views/calc/Percents.vue'),
      },
      {
        path: 'velo',
        name: 'Velo',
        meta: {
          title: 'The Counter Intuitive Flight',
        },
        component: () =>
          import(/* webpackChunkName: "Velo" */ '../views/calc/Velo.vue'),
      },
      {
        path: 'tomato',
        name: 'Tomato',
        meta: {
          title: 'The Counter Intuitive Tomato',
        },
        component: () =>
          import(/* webpackChunkName: "Tomato" */ '../views/calc/Tomato.vue'),
      },
      {
        path: 'cars',
        name: 'Cars',
        meta: {
          title: 'The Counter Intuitive Cars',
        },
        component: () =>
          import(/* webpackChunkName: "Cars" */ '../views/calc/Cars.vue'),
      },
      {
        path: 'range',
        name: 'Range',
        component: () =>
          import(/* webpackChunkName: "Range" */ '../views/calc/Range.vue'),
      },
    ],
  },
  /* wip */ {
    path: '/wip',
    name: 'Wip',
    component: Wip,
    meta: {
      title: 'The WIP stuff',
    },
    children: [
      {
        path: 'matrix',
        name: 'Matrix',
        meta: {
          title: 'The Freaky Matrix',
        },
        component: () =>
          import(/* webpackChunkName: "matrix" */ '../views/calc/Matrix.vue'),
      },
      {
        path: 'vmail',
        name: 'Vmail',
        meta: {
          title: 'Forge Vmail',
        },
        component: () =>
          import(/* webpackChunkName: "vmail" */ '../views/mail/Vmail.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = document.title;
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
