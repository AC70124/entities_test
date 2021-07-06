import { routerConfig } from '@/router';
import { APP_MODE } from '@/utils/constants';
import { APP_NAME } from '@/utils/app';

declare let shell: any;

document.onreadystatechange = function() {
    function contentLoaded() {
        if (!document.getElementById('chi-icons')) {
            let DOMContentLoadedEvent = document.createEvent('Event');

            DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
            document.dispatchEvent(DOMContentLoadedEvent);
        }
    }

    if (document.readyState == 'complete') {
        document.onreadystatechange = null;

        contentLoaded();

        // Router setup
        const application: any = [];
        application.push({ name: APP_NAME, icon: 'icon-logo-centurylink', routes: [routerConfig] });

        if (process.env.VUE_APP_MODE !== APP_MODE.PROD) {
            Promise.all(shell.library.microApps)
                .then((microapps: any[]) => {
                    microapps.forEach((app: any) => {
                        if (app.library.name !== APP_NAME) {
                            application.push({
                                name: app.library.name,
                                icon: app.library.icon,
                                routes: [app.library.routerPath],
                                hide: true,
                            });
                        }
                    });
                    shell.library.setApplications(application);
                })
                .catch(e => {
                    console.log('unable to laod the microapps');
                });
        } else {
            shell.library.setApplications(application);
        }

        const app = shell.library.getVue();
        if (window.Cypress) {
            window.app = app;
        }
        app.$mount('#app');
    }
};
