import { routerConfig } from '@/router';
import { APP_NAME } from '@/utils/app';
import { MicroAppLibrary } from '@/models/app';

const microapp: MicroAppLibrary = {
    name: APP_NAME,
    enterpriseNav: undefined,
    routerPath: routerConfig,
};

export const library = microapp;
