import { RouteConfig } from 'vue-router';

export declare class MicroAppLibrary {
    name: string;
    enterpriseNav: EnterpriseNav | undefined;
    routerPath: RouteConfig[];
}

export declare class AppMenu {
    title: string | undefined;
    name: string;
    ccid: string | undefined;
    icon: string;
}

interface EnterpriseNavMenu {
    id?: string;
    description?: string;
    origin?: Record<string, string>[];
    menu?: Record<string, EnterpriseNavMenu>[];
    icon?: string;
    site?: string;
    'local-href'?: string;
    href?: string;
    ext?: boolean;
    window?: string;
}

interface EnterpriseNavMenuSite {
    description: string;
    origin: Record<string, string>[];
    menu: Record<string, EnterpriseNavMenu>[];
}

export declare class EnterpriseNav {
    site: string;
    menus: string | Record<string, EnterpriseNavMenuSite>[];
    customize: Record<string, any>;
}
