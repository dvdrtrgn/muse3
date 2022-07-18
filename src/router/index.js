import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import CalcPage from '../views/CalcPage.vue';
import WipPage from '../views/WipPage.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound,
    },
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    /* calc */ {
        path: '/calc',
        name: 'Calc',
        component: CalcPage,
        meta: {
            title: 'The Calc stuff',
        },
        children: [
            {
                path: 'percents',
                name: 'Percents',
                meta: {
                    title: 'The Elusive Percent',
                },
                component: () => import('../views/calc/PercentsPage.vue'),
            },
            {
                path: 'velo',
                name: 'Velo',
                meta: {
                    title: 'The Counter Intuitive Flight',
                },
                component: () => import('../views/calc/VeloPage.vue'),
            },
            {
                path: 'tomato',
                name: 'Tomato',
                meta: {
                    title: 'The Counter Intuitive Tomato',
                },
                component: () => import('../views/calc/TomatoPage.vue'),
            },
            {
                path: 'cars',
                name: 'Cars',
                meta: {
                    title: 'The Counter Intuitive Cars',
                },
                component: () => import('../views/calc/CarsPage.vue'),
            },
            {
                path: 'range',
                name: 'Range',
                component: () => import('../views/calc/RangePage.vue'),
            },
        ],
    },
    /* wip */ {
        path: '/Wip',
        name: 'Wip',
        component: WipPage,
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
                component: () => import('../views/calc/MatrixPage.vue'),
            },
            {
                path: 'vmail',
                name: 'Vmail',
                meta: {
                    title: 'Forge Vmail',
                },
                component: () => import('../views/mail/VmailPage.vue'),
            },
        ],
    },
    {
        path: '/About',
        name: 'About',
        component: () => import('../views/AboutPage.vue'),
    },
];

const MODE = import.meta.env.NODE_ENV === 'production' ? createWebHistory : createWebHashHistory;

const router = createRouter({
    history: MODE(import.meta.env.BASE_URL),
    routes,
});

const DEFAULT_TITLE = document.title;
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
