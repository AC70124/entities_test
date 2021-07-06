import Vue from 'vue';
import * as API from './api-const';

export default {
    loadAllStoresData: () =>
        Vue.prototype.$http
            .get(API.ALL_DATA)
            .then((response: any) => {
                let data = response.data;
                return data;
            })
            .catch((e: any) => {
                const message: string = 'Error while loading all stores data. ';
                console.log(message + e);
                Vue.prototype.$sendLog('pf.errpr', message, e);
            }),
};
