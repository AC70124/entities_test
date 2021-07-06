import { APP_MENU } from '@/utils/app';
import { RouteConfig } from 'vue-router';

export const routerConfig: RouteConfig[] = [
    {
        path: '/adap',
        component: () => import(/* webpackChunkName: "adaptive-view" */ '@/views/MicroAppView.vue'),
        meta: {
            title: APP_MENU[0].title,
            ccid: APP_MENU[0].ccid,
            name: APP_MENU[0].name,
            icon: APP_MENU[0].icon,
            hasNoChildren: false,
            requiresAuth: false,
        },
        children: [
            {
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "adaptive-dashboard" */ '@/modules/dashboard/Index.vue'),
                meta: { name: 'CFA Dashboard' },
            },
            {
                path: 'entities',
                component: () => import(/* webpackChunkName: "adaptive-dashboard-entities" */ '@/modules/entities/Index.vue'),
                meta: { name: 'CFA Entities' },
            },
        ],
    },
];
