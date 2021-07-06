import { RouteConfig } from 'vue-router';

export const routerConfig: RouteConfig = {
    path: '/components',
    meta: {
        name: 'Go to commons',
        icon: 'icon-attachment',
    },
    beforeEnter() {
        window.open('https://nginx-master-po-enterprise-common.kubeodc-test.corp.intranet/');
    },
};
