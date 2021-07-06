import { Module, VuexModule, MutationAction } from 'vuex-module-decorators';
import api from '@/api';
import * as CONS from '@/modules/dashboard/constants/constants';
import { compile } from 'vue/types/umd';

export const STORE_KEY = '$_adaptive';

@Module({
    namespaced: true,
    name: STORE_KEY,
})
export default class MicroAppStore extends VuexModule {
    allStoresData: Array<any> = [];
    filteredStoresData: Array<object> = [];
    allStoresDataLoaded: boolean = false;

//     @MutationAction
//     async allStoresDataReq() {
//         let data: any[] = [];
//         let uniqueStores: Array<any> = [];
//         let dataError: Record<string, string> = {};
//         let checkTech: Array<any> = [];

//         try {
//             await api.loadAllStoresData().then((resp: any) => {
//                 data = resp;
//                 let item: any = [];
//                 for (item in data) {
//                     let number = item.storeNumber;
//                     if (uniqueStores.length === 0) {
//                         uniqueStores.push(item);
//                     } else if (uniqueStores.length > 0) {
//                         let store = uniqueStores.find(x => x.storeNumber === number);
//                         if (store && store.storeNumber) {
//                             if (!store.thousandEyesFlag) store.thousandEyesFlag = item.thousandEyesFlag;
//                             if (!store.merakiFlag) store.merakiFlag = item.merakiFlag;
//                             if (!store.aerohiveFlag) store.aerohiveFlag = item.aerohiveFlag;
//                             if (!store.cradlePointFlag) store.cradlePointFlag = item.cradlePointFlag;
//                             if (!store.fortinetFlag) store.fortinetFlag = item.fortinetFlag;
//                             if (!store.mistFlag) store.mistFlag = item.mistFlag;
//                         } else if (item.storeNumber) {
//                             uniqueStores.push(item);
//                         }
//                     } else {
//                         console.log('Inside Else');
//                     }
//                 }
//                 let stores: Array<any> = uniqueStores;
//                 for (let i = 0; i < stores.length; i++) {
//                     !stores[i].thousandEyesFlag &&
//                     !stores[i].merakiFlag &&
//                     !stores[i].aerohiveFlag &&
//                     !stores[i].cradlePointFlag &&
//                     !stores[i].fortinetFlag &&
//                     !stores[i].mistFlag
//                         ? (stores[i].overallStoreStatus = CONS.STATUS_GREEN)
//                         : stores[i].thousandEyesFlag &&
//                           stores[i].merakiFlag &&
//                           stores[i].aerohiveFlag &&
//                           stores[i].cradlePointFlag &&
//                           stores[i].fortinetFlag &&
//                           stores[i].mistFlag
//                         ? (stores[i].overallStoreStatus = CONS.STATUS_RED)
//                         : (stores[i].overallStoreStatus = CONS.STATUS_AMBER);
//                 }
//                 let count = 0;
//                 let item1: any = [];
//                 for (item1 in data) {
//                     let number = item1.storeNumber;
//                     if (checkTech.length === 0) {
//                         checkTech.push(item1);
//                         checkTech[count].techTE = item1.deviceManufacturer !== CONS.CT ? CONS.NA : CONS.AVAILABLE;
//                         checkTech[count].techAH = item1.deviceManufacturer !== CONS.AH ? CONS.NA : CONS.AVAILABLE;
//                         checkTech[count].techCP =
//                             item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase() ? CONS.NA : CONS.AVAILABLE;
//                         checkTech[count].techMK = item1.deviceManufacturer !== CONS.MK ? CONS.NA : CONS.AVAILABLE;
//                         checkTech[count].techFT = item1.deviceManufacturer !== CONS.FT ? CONS.NA : CONS.AVAILABLE;
//                         checkTech[count].techMT = item1.deviceManufacturer !== CONS.MT ? CONS.NA : CONS.AVAILABLE;

//                         count += 1;
//                     } else if (checkTech.length > 0) {
//                         let store = checkTech.find(x => x.storeNumber === number);
//                         let index = checkTech.findIndex(x => x.storeNumber === number);
//                         if (store && store.storeNumber) {
//                             checkTech[index].techTE =
//                                 item1.deviceManufacturer !== CONS.CT && store.techTE !== CONS.AVAILABLE
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                             checkTech[index].techAH =
//                                 item1.deviceManufacturer !== CONS.AH && store.techAH !== CONS.AVAILABLE
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                             checkTech[index].techCP =
//                                 item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase() &&
//                                 store.techCP !== CONS.AVAILABLE
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                             checkTech[index].techMK =
//                                 item1.deviceManufacturer !== CONS.MK && store.techMK !== CONS.AVAILABLE
//                                     ? CONS
//                                     : CONS.AVAILABLE;
//                             checkTech[index].techFT =
//                                 item1.deviceManufacturer !== CONS.FT && store.techFT !== CONS.AVAILABLE
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                             checkTech[index].techMT =
//                                 item1.deviceManufacturer !== CONS.MT && store.techMT !== CONS.AVAILABLE
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                         } else if (item1.storeNumber !== '') {
//                             checkTech.push(item1);
//                             checkTech[count].techTE = item1.deviceManufacturer !== CONS.CT ? CONS.NA : CONS.AVAILABLE;
//                             checkTech[count].techAH = item1.deviceManufacturer !== CONS.AH ? CONS.NA : CONS.AVAILABLE;
//                             checkTech[count].techCP =
//                                 item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase()
//                                     ? CONS.NA
//                                     : CONS.AVAILABLE;
//                             checkTech[count].techMK = item1.deviceManufacturer !== CONS.MK ? CONS.NA : CONS.AVAILABLE;
//                             checkTech[count].techFT = item1.deviceManufacturer !== CONS.FT ? CONS.NA : CONS.AVAILABLE;
//                             checkTech[count].techMT = item1.deviceManufacturer !== CONS.MT ? CONS.NA : CONS.AVAILABLE;
//                             count += 1;
//                         }
//                     } else {
//                         console.log('Inside Else');
//                     }
//                 }
//             });
//         } catch (e) {
//             dataError = { dashboardData: e };
//         }
//         return {
//             allStoresData: data,
//             filteredStoresData: checkTech,
//             allStoresDataLoaded: true,
//         };
//     }
}
