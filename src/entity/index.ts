import { Module, VuexModule, MutationAction } from 'vuex-module-decorators';
import api from '@/eapi';
import * as CONS from '@/modules/entities/constants/constants';
import { compile } from 'vue/types/umd';

export const STORE_KEY = '$_adaptive';

@Module({
    namespaced: true,
    name: STORE_KEY,
})
export default class MicroAppStore extends VuexModule {
    allSitesData: Array<any> = [];
    filteredSitesData: Array<object> = [];
    allSitesDataLoaded: boolean = false;

    @MutationAction
    async allSitesDataReq() {
        let data: any[] = [];
        let uniqueSites: Array<any> = [];
        let dataError: Record<string, string> = {};
        let checkTech: Array<any> = [];

        try {
            await api.loadAllSitesData().then((resp: any) => {
                data = resp;
                let item: any = [];
                for (item in data) {
                    let number = item.siteType;
                    if (uniqueSites.length === 0) {
                        uniqueSites.push(item);
                    } else if (uniqueSites.length > 0) {
                        let site = uniqueSites.find(x => x.siteType === number);
                        if (site && site.siteType) {
                            if (!site.teAlertFlag) site.teAlertFlag = item.teAlertFlag;
                            if (!site.mkAlertFlag) site.mkAlertFlag = item.mkAlertFlag;
                            if (!site.isrAlertFlag) site.isrAlertFlag = item.isrAlertFlag;
                            if (!site.cpAlertFlag) site.cpAlertFlag = item.cpAlertFlag;
                            if (!site.ftAlertFlag) site.ftAlertFlag = item.ftAlertFlag;
                            if (!site.mtAlertFlag) site.mtAlertFlag = item.mtAlertFlag;
                        } else if (item.siteType) {
                            uniqueSites.push(item);
                        }
                    } else {
                        console.log('Inside Else');
                    }
                }
                let sites: Array<any> = uniqueSites;
                for (let i = 0; i < sites.length; i++) {
                    !sites[i].teAlertFlag &&
                    !sites[i].mkAlertFlag &&
                    !sites[i].isrAlertFlag &&
                    !sites[i].cpAlertFlag &&
                    !sites[i].ftAlertFlag &&
                    !sites[i].mtAlertFlag
                        ? (sites[i].overallSiteStatus = CONS.STATUS_GREEN)
                        : sites[i].teAlertFlag &&
                          sites[i].mkAlertFlag &&
                          sites[i].isrAlertFlag &&
                          sites[i].cpAlertFlag &&
                          sites[i].ftAlertFlag &&
                          sites[i].mtAlertFlag
                        ? (sites[i].overallSiteStatus = CONS.STATUS_RED)
                        : (sites[i].overallSiteStatus = CONS.STATUS_AMBER);
                }
                let count = 0;
                let item1: any = [];
                for (item1 in data) {
                    let number = item1.siteType;
                    if (checkTech.length === 0) {
                        checkTech.push(item1);
                        checkTech[count].techTE = item1.deviceManufacturer !== CONS.CT ? CONS.NA : CONS.AVAILABLE;
                        checkTech[count].techISR = item1.deviceManufacturer !== CONS.ISR ? CONS.NA : CONS.AVAILABLE;
                        checkTech[count].techCP =
                            item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase() ? CONS.NA : CONS.AVAILABLE;
                        checkTech[count].techMK = item1.deviceManufacturer !== CONS.MK ? CONS.NA : CONS.AVAILABLE;
                        checkTech[count].techFT = item1.deviceManufacturer !== CONS.FT ? CONS.NA : CONS.AVAILABLE;
                        checkTech[count].techMT = item1.deviceManufacturer !== CONS.MT ? CONS.NA : CONS.AVAILABLE;

                        count += 1;
                    } else if (checkTech.length > 0) {
                        let site = checkTech.find(x => x.siteType === number);
                        let index = checkTech.findIndex(x => x.siteType === number);
                        if (site && site.siteType) {
                            checkTech[index].techTE =
                                item1.deviceManufacturer !== CONS.CT && site.techTE !== CONS.AVAILABLE
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                            checkTech[index].techISR =
                                item1.deviceManufacturer !== CONS.ISR && site.techISR !== CONS.AVAILABLE
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                            checkTech[index].techCP =
                                item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase() &&
                                site.techCP !== CONS.AVAILABLE
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                            checkTech[index].techMK =
                                item1.deviceManufacturer !== CONS.MK && site.techMK !== CONS.AVAILABLE
                                    ? CONS
                                    : CONS.AVAILABLE;
                            checkTech[index].techFT =
                                item1.deviceManufacturer !== CONS.FT && site.techFT !== CONS.AVAILABLE
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                            checkTech[index].techMT =
                                item1.deviceManufacturer !== CONS.MT && site.techMT !== CONS.AVAILABLE
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                        } else if (item1.siteType !== '') {
                            checkTech.push(item1);
                            checkTech[count].techTE = item1.deviceManufacturer !== CONS.CT ? CONS.NA : CONS.AVAILABLE;
                            checkTech[count].techISR = item1.deviceManufacturer !== CONS.ISR ? CONS.NA : CONS.AVAILABLE;
                            checkTech[count].techCP =
                                item1.deviceManufacturer.toUpperCase() !== CONS.CP.toUpperCase()
                                    ? CONS.NA
                                    : CONS.AVAILABLE;
                            checkTech[count].techMK = item1.deviceManufacturer !== CONS.MK ? CONS.NA : CONS.AVAILABLE;
                            checkTech[count].techFT = item1.deviceManufacturer !== CONS.FT ? CONS.NA : CONS.AVAILABLE;
                            checkTech[count].techMT = item1.deviceManufacturer !== CONS.MT ? CONS.NA : CONS.AVAILABLE;
                            count += 1;
                        }
                    } else {
                        console.log('Inside Else');
                    }
                }
            });
        } catch (e) {
            dataError = { dashboardDataEntities: e };
        }
        return {
            allSitesData: data,
            filteredSitesData: checkTech,
            allSitesDataLoaded: true,
        };
    }
}
