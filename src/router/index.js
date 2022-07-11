import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Calc from '../views/Calc.vue';
import Wip from '../views/Wip.vue';
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
                component: () => import('../views/calc/Percents.vue'),
            },
            {
                path: 'Velo',
                name: 'Velo',
                meta: {
                    title: 'The Counter Intuitive Flight',
                },
                component: () => import('../views/calc/Velo.vue'),
            },
            {
                path: 'Tomato',
                name: 'Tomato',
                meta: {
                    title: 'The Counter Intuitive Tomato',
                },
                component: () => import('../views/calc/Tomato.vue'),
            },
            {
                path: 'Cars',
                name: 'Cars',
                meta: {
                    title: 'The Counter Intuitive Cars',
                },
                component: () => import('../views/calc/Cars.vue'),
            },
            {
                path: 'Range',
                name: 'Range',
                component: () => import('../views/calc/Range.vue'),
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
                component: () => import('../views/calc/Matrix.vue'),
            },
            {
                path: 'vmail',
                name: 'Vmail',
                meta: {
                    title: 'Forge Vmail',
                },
                component: () => import('../views/mail/Vmail.vue'),
            },
        ],
    },
    {
        path: '/About',
        name: 'About',
        component: () => import('../views/About.vue'),
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
