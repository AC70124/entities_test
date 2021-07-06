<template>
    <div>
        <div>
            <br />
            <div class="chi-input__wrapper -icon--left chi-dropdown__menu-item" role="search">
                <div class="chi-form__item">
                    <div class="chi-input__wrapper -icon--right">
                        <input
                            class="chi-input chi-search__input"
                            id="userInput"
                            v-model="userInput"
                            type="search"
                            aria-label="search input"
                        />
                        <button class="chi-button -icon -flat -bg--none" aria-label="Search">
                            <div class="chi-button__content" @click="testFunction(userInput)">
                                <i class="chi-icon icon-search"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="chi-divider -vertical -mx--2"></div>
                <div class="chi-dropdown">
                    <button
                        id="dropdown-animate"
                        class="chi-button chi-dropdown__trigger -animate"
                        data-cy="cy-statuses-dropdown"
                    >
                        - All Statuses -
                    </button>
                    <div class="chi-dropdown__menu">
                        <a
                            class="chi-dropdown__menu-item"
                            @click="displaySiteswithIssues()"
                            data-cy="cy-statuses-dropdown-alert"
                            >Alert</a
                        >
                        <a
                            class="chi-dropdown__menu-item"
                            @click="displaySiteswithoutIssues()"
                            data-cy="cy-statuses-dropdown-up"
                            >Up</a
                        >
                    </div>
                </div>
                <div class="chi-form__item">
                    <div class="chi-checkbox">
                        <input
                            type="checkbox"
                            @click="displayCIMMStores()"
                            class="chi-checkbox__input"
                            id="checkbox-ba1"
                        />
                    </div>
                </div>
                
                        
                  
                <div class="chi-divider -vertical -mx--2"></div>
                <button
                    class="chi-button -icon -flat -bg--none -opacity-hover--80"
                    aria-label="Button action"
                    title="Clear Cache and Reload Data"
                    @click="refreshPage()"
                    data-cy="cy-clear-cache-button"
                >
                    <div class="chi-button__content">
                        <i class="chi-icon icon-refresh"></i>
                    </div>
                </button>
            </div>
            <br />
            <div class="chi-dropdown__menu-item" role="search">
                <label v-if="autoRefresh === 'enabled'" class="chi-label -text--sm" for="example-base"
                    >Refreshing in {{ countDown }} seconds</label
                >
                <label v-if="autoRefresh === 'disabled'" class="chi-label -text--sm -m--1" for="example-base"
                    >Refreshing Paused</label
                >
                <chi-button
                    v-if="autoRefresh === 'enabled'"
                    color="primary"
                    variant="flat"
                    @click="toggleAutoRefresh()"
                    data-cy="cy-pause-refresh-button"
                    >Pause</chi-button
                >
                <chi-button
                    v-if="autoRefresh === 'disabled'"
                    color="primary"
                    variant="flat"
                    @click="toggleAutoRefresh(), startDownTimer()"
                    >Resume</chi-button
                >
            </div>
            <br />
            <div v-if="spinel === 'Error'">
                <p>Unable to fetch data. Try refreshing the page !</p>
            </div>
            <EntitiesDisplayData
                :sortedSites="sortedSites"
                :sites="sites"
                :errors="errors"
                :filteredSites="filteredSites"
                :spinel="spinel"
            ></EntitiesDisplayData>
        </div>
        <br />
        <Pagination
            v-if="sortedSites.length > 0 && filteredSites.length > 0 && sites.length > 0"
            :filteredSites="filteredSites"
            :sites="sites"
            :currentPage="currentPage"
            v-on:messageFromChildForNextPage="childMessageReceivedForNextPage"
            v-on:messageFromChildForPrevPage="childMessageReceivedForPrevPage"
        ></Pagination>
    </div>
</template>
<script lang="ts">
import { component } from 'node_modules/vue/types/umd';
import { Component, Vue, Prop } from 'vue-property-decorator';
import Pagination from '@/components/Pagination.vue';
import SortBy from '@/components/SortBy.vue';
import StoreTypes from '@/components/StoreTypes.vue';
import RowsPerPage from '@/components/RowsPerPage.vue';
import EntitiesDisplayData from '@/components/EntitiesDisplayData.vue';
import { getModule } from 'vuex-module-decorators';
import * as API from './api/api-urls';
import * as CONS from './constants/constants';
import site from '@/entity';

@Component({
    components: {
        Pagination: () => import(/* webpackChunkName: "adaptive-pagination" */ '@/components/Pagination.vue'),
        SortBy: () => import(/* webpackChunkName: "adaptive-sort-by" */ '@/components/SortBy.vue'),
        StoreTypes: () => import(/* webpackChunkName: "adaptive-store-types" */ '@/components/StoreTypes.vue'),
        RowsPerPage: () => import(/* webpackChunkName: "adaptive-rows-per-page" */ '@/components/RowsPerPage.vue'),
        EntitiesDisplayData: () => import(/* webpackChunkName: "adaptive-display-data" */ '@/components/EntitiesDisplayData.vue'),
    },
})
export default class EntitiesDashboard extends Vue {
    //storeModule: any;
    siteModule: any;
    private chi: any;
    //private stores: Array<any> = [];
    private sites: Array<any> = [];
    private selected: string = 'All';
    private inlineRadio1: string = '';
    private inlineRadio2: string = '';
    private inlineRadio3: string = '';
    private selectedSite: string = 'All';
    private selectedDevice: string = 'All';
    private pageSize: number = 10;
    private currentPage: number = 1;
    private deviceSites: Array<object> = [];
    private spinel: string = 'NotLoaded';
    //private uniqueStores: Array<object> = [];
    private uniqueSites: Array<object> = [];
    //private filteredStores: Array<object> = [];
    private filteredSites: Array<object> = [];
    private thousandEyesSites: Array<object> = [];
    private merakiSites: Array<object> = [];
    private isrSites: Array<object> = [];
    private cradlePointSites: Array<object> = [];
    private fortinetSites: Array<object> = [];
    private mistSites: Array<object> = [];
    private isOpen: Array<object> = [];
    private filterColumns: boolean = false;
    private graniteButton: string = '';
    private cimmButton: string = '';
    private siteWithIssues: Array<object> = [];
    private siteWithoutIssues: Array<object> = [];
    private circuitButton: string = '';
    private userInput: string = 'All';
    private autoRefresh: string = 'disabled';
    private countDown: number = 120;
    private errors: Array<any> = [];
    //get sortedStores(): Array<object> {
    get sortedSites(): Array<object> {
        return this.filteredSites.filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
        });
    }
    get sortedDeviceSites(): Array<object> {
        return this.deviceSites.filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
        });
    }
    updated() {
        const chi: any = window.chi;
        chi.dropdown(document.getElementById('dropdown-animate'));
        //const accordionNested = this.$refs['nested-accordions'];
        //chi.accordion(accordionNested);
    }
    created() {
        if (!this.siteModule) this.siteModule = getModule(site, this.$store);
        Vue.prototype.$http
            .get(API.ALL_DATA)
            .then((response: any) => {
                this.sites = response.data;
                this.spinel = 'DataLoaded';
                this.removeDuplicateSitesAndFilter();
            })
            .catch((e: any) => {
                this.spinel = 'Error';
                this.errors.push(e);
            });
    }
    public toggleAutoRefresh(): void {
        if (this.autoRefresh === 'enabled') {
            this.autoRefresh = 'disabled';
            window.stop();
        } else {
            this.autoRefresh = 'enabled';
        }
    }
    public testFunction(e: any): void {
        console.log('User Input is', e);
        this.spinel = 'NotLoaded';
        Vue.prototype.$http
            .get(API.SITE_DATA + e)
            .then((response: any) => {
                //this.stores = response.data;
                this.sites = response.data;
                this.spinel = 'DataLoaded';
                this.merakiSites = [];
                this.thousandEyesSites = [];
                //this.isrStores = [];
                this.cradlePointSites = [];
                this.fortinetSites = [];
                this.mistSites = [];
                this.removeDuplicateSitesAndFilter();
                this.filterColumns = false;
            })
            .catch((e: any) => {
                this.spinel = 'Error';
                this.errors.push(e);
            });
    }
    public startDownTimer(): void {
        if (this.countDown === 120) {
            this.countDownTimer();
        }
    }
    public countDownTimer(): void {
        if (this.countDown > 0) {
            setTimeout(() => {
                this.countDown -= 1;
                this.countDownTimer();
            }, 1000);
        }
    }
    public pauseAutoRefresh(): void {
        this.autoRefresh = 'disabled';
        window.stop();
    }
    public childMessageReceivedForNextPage(): void {
        this.currentPage++;
    }
    public childMessageReceivedForPrevPage(): void {
        this.currentPage--;
    }
    // public refreshPage(): any {
    //     Vue.prototype.$http
    //         .get(API.CLEAR_CACHE)
    //         .then((response: any) => {
    //             console.log('Clearing Cache');
    //         })
    //         .catch((e: any) => {
    //             this.spinel = 'Error';
    //             this.errors.push(e);
    //         });
    //     window.location.href = location['href'];
    //     window.location.reload();
    // }
    public technology_status_html(status_value: any): any {
        let color_value = '';
        if (!status_value) {
            color_value = '-text--success';
        } else if (status_value) {
            color_value = '-text--warning';
        }
        return '<i class="chi-icon icon-circle -sm ' + color_value + '"></i>';
    }
    public displayCIMMStores(): void {
        this.graniteButton = '';
        this.siteWithIssues = [];
        this.circuitButton = '';
        this.removeDuplicateSitesAndFilter();
        this.cimmButton = 'SELECTED';
        let sites: Array<any> = this.filteredSites;
        let cimmSites: Array<object> = [];
        let s = sites.filter(function (item) {
            if (item.techFT === 'Available') {
                cimmSites.push(item);
            }
        });
        console.log('CIMMM:', cimmSites);
        console.log('CIMM Length:', cimmSites.length);
        this.filteredSites = cimmSites;
    }
    public displayCircuitSites(): void {
        this.cimmButton = '';
        this.graniteButton = '';
        this.siteWithIssues = [];
        this.removeDuplicateSitesAndFilter();
        this.circuitButton = 'SELECTED';
        let sites: Array<any> = this.filteredSites;
        let circuitsites: Array<object> = [];
        let s = sites.filter(function (item) {
            if (item.techTE === 'Available') {
                circuitsites.push(item);
            }
        });
        this.filteredSites = circuitsites;
    }
    public displaySiteswithoutIssues(): void {
        this.siteWithoutIssues = [];
        this.filteredSites = [];
        this.spinel = 'NotLoaded';
        this.cimmButton = '';
        this.graniteButton = '';
        this.circuitButton = '';
        let siteWithoutIssues = this.siteWithoutIssues;
        this.removeDuplicateSitesAndFilter();
        let sites: Array<any> = this.filteredSites;
        let s = sites.filter(function (item) {
            if (
                !item.teAlertFlag &&
                !item.mkAlertFlag &&
                !item.isrAlertFlag &&
                !item.cpAlertFlag &&
                !item.ftAlertFlag &&
                !item.mtAlertFlag
            ) {
                siteWithoutIssues.push(item);
            }
        });
        this.spinel = 'Loaded';
        this.filteredSites = this.siteWithoutIssues;
    }
    public displaySiteswithIssues(): void {
        this.siteWithIssues = [];
        this.filteredSites = [];
        this.spinel = 'NotLoaded';
        this.cimmButton = '';
        this.graniteButton = '';
        this.circuitButton = '';
        let siteWithIssues = this.siteWithIssues;
        this.removeDuplicateSitesAndFilter();
        let sites: Array<any> = this.filteredSites;
        let s = sites.filter(function (item) {
            if (
                item.teAlertFlag ||
                item.mkAlertFlag ||
                item.isrAlertFlag ||
                item.cpAlertFlag ||
                item.ftAlertFlag ||
                item.mtAlertFlag
            ) {
                siteWithIssues.push(item);
            }
        });
        this.filteredSites = this.siteWithIssues;
        this.spinel = 'Loaded';
    }
    public setOverallSiteStatus(): void {
        let sites: Array<any> = this.filteredSites;
        for (let i = 0; i < sites.length; i++) {
            if (
                !sites[i].teAlertFlag &&
                !sites[i].mkAlertFlag &&
                !sites[i].isrAlertFlag &&
                !sites[i].cpAlertFlag &&
                !sites[i].ftAlertFlag &&
                !sites[i].mtAlertFlag
            ) {
                sites[i].overallSiteStatus = 'GREEN';
            } else if (
                sites[i].teAlertFlag &&
                sites[i].mkAlertFlag &&
                sites[i].isrAlertFlag &&
                sites[i].cpAlertFlag &&
                sites[i].ftAlertFlag &&
                sites[i].mtAlertFlag
            ) {
                sites[i].overallSiteStatus = 'RED';
            } else if (
                sites[i].teAlertFlag &&
                sites[i].techISR === 'NA' &&
                sites[i].techCP === 'NA' &&
                sites[i].techMK === 'NA' &&
                sites[i].techFT === 'NA' &&
                sites[i].techMT === 'NA'
            ) {
                sites[i].overallSiteStatus = 'RED';
            } else {
                sites[i].overallSiteStatus = 'AMBER';
            }
        }
        this.filteredSites = sites;
    }
    public checkAvailableTechnology(): void {
        let checkTech: Array<any> = [];
        let count = 0;
        let s = this.sites.filter(function (item) {
            let number = item.siteType;
            if (checkTech.length === 0) {
                checkTech.push(item);
                if (item.deviceType !== 'CIRCUIT') {
                    checkTech[count].techTE = 'NA';
                } else {
                    checkTech[count].techTE = 'Available';
                }
                if (item.deviceType !== 'ISR') {
                    checkTech[count].techISR = 'NA';
                } else {
                    checkTech[count].techISR = 'Available';
                }
                if (item.deviceType.toUpperCase() !== 'CRADLEPOINT') {
                    checkTech[count].techCP = 'NA';
                } else {
                    checkTech[count].techCP = 'Available';
                }
                if (item.deviceType !== 'Meraki') {
                    checkTech[count].techMK = 'NA';
                } else {
                    checkTech[count].techMK = 'Available';
                }
                if (item.deviceType !== 'Fortinet') {
                    checkTech[count].techFT = 'NA';
                } else {
                    checkTech[count].techFT = 'Available';
                }
                if (item.deviceType !== 'Mist') {
                    checkTech[count].techMT = 'NA';
                } else {
                    checkTech[count].techMT = 'Available';
                }
                count += 1;
            } else if (checkTech.length > 0) {
                let site = checkTech.find((x) => x.siteType === number);
                let index = checkTech.findIndex((x) => x.siteType === number);
                if (site != undefined && site.siteType == number && site.siteType != '') {
                    if (item.deviceType !== 'CIRCUIT' && site.techTE !== 'Available') {
                        checkTech[index].techTE = 'NA';
                    } else {
                        checkTech[index].techTE = 'Available';
                    }
                    if (item.deviceType !== 'ISR' && site.techISR !== 'Available') {
                        checkTech[index].techISR = 'NA';
                    } else {
                        checkTech[index].techISR = 'Available';
                    }
                    if (item.deviceType.toUpperCase() !== 'CRADLEPOINT' && site.techCP !== 'Available') {
                        checkTech[index].techCP = 'NA';
                    } else {
                        checkTech[index].techCP = 'Available';
                    }
                    if (item.deviceType !== 'Meraki' && site.techMK !== 'Available') {
                        checkTech[index].techMK = 'NA';
                    } else {
                        checkTech[index].techMK = 'Available';
                    }
                    if (item.deviceType !== 'Fortinet' && site.techFT !== 'Available') {
                        checkTech[index].techFT = 'NA';
                    } else {
                        checkTech[index].techFT = 'Available';
                    }
                    if (item.deviceType !== 'Mist' && site.techMT !== 'Available') {
                        checkTech[index].techMT = 'NA';
                    } else {
                        checkTech[index].techMT = 'Available';
                    }
                } else if (item.siteType != '') {
                    checkTech.push(item);
                    if (item.deviceType !== 'CIRCUIT') {
                        checkTech[count].techTE = 'NA';
                    } else {
                        checkTech[count].techTE = 'Available';
                    }
                    if (item.deviceManufacturer !== 'ISR') {
                        checkTech[count].techISR = 'NA';
                    } else {
                        checkTech[count].techISR = 'Available';
                    }
                    if (item.deviceType.toUpperCase() !== 'CRADLEPOINT') {
                        checkTech[count].techCP = 'NA';
                    } else {
                        checkTech[count].techCP = 'Available';
                    }
                    if (item.deviceType !== 'Meraki') {
                        checkTech[count].techMK = 'NA';
                    } else {
                        checkTech[count].techMK = 'Available';
                    }
                    if (item.deviceType !== 'Fortinet') {
                        checkTech[count].techFT = 'NA';
                    } else {
                        checkTech[count].techFT = 'Available';
                    }
                    if (item.deviceType !== 'Mist') {
                        checkTech[count].techMT = 'NA';
                    } else {
                        checkTech[count].techMT = 'Available';
                    }
                    count += 1;
                }
            } else {
                console.log('Inside Else');
            }
        });
        this.filteredSites = checkTech;
    }
    //public removeDuplicateStoresAndFilter(): void {
    public removeDuplicateSitesAndFilter(): void {
        //let uniqueStores: Array<any> = [];
        let uniqueSites: Array<any> = [];
        //let s = this.stores.filter(function (item) {
        let s = this.sites.filter(function (item) {
            //let number = item.storeNumber;
            let number = item.siteType;
            if (uniqueSites.length == 0) {
                uniqueSites.push(item);
            } else if (uniqueSites.length > 0) {
                let site = uniqueSites.find((x) => x.siteType === number);
                if (site != undefined && site.siteType == number && site.siteType != '') {
                    if (!site.teAlertFlag) {
                        site.teAlertFlag = item.teAlertFlag;
                    }
                    if (!site.mkAlertFlag) {
                        site.mkAlertFlag = item.mkAlertFlag;
                    }
                    if (!site.isrAlertFlag) {
                        site.isrAlertFlag = item.isrAlertFlag;
                    }
                    if (!site.cpAlertFlag) {
                        site.cpAlertFlag = item.cpAlertFlag;
                    }
                    if (!site.ftAlertFlag) {
                        site.ftAlertFlag = item.ftAlertFlag;
                    }
                    if (!site.mtAlertFlag) {
                        site.mtAlertFlag = item.mtAlertFlag;
                    }
                } else if (item.siteType != '') {
                    uniqueSites.push(item);
                }
            } else {
                console.log('Inside Else');
            }
        });
        this.filteredSites = uniqueSites;
        this.checkAvailableTechnology();
        this.setOverallSiteStatus();
    }
    public sortSitesByNumber(): void {
        let sites: Array<any> = this.filteredSites;
        this.filteredSites = sites.sort((a, b) => (a.siteType > b.siteType ? 1 : -1));
    }
    public sortSitesByStatus(): void {
        let sites: Array<any> = this.filteredSites;
        let teSort = sites.sort(function (x, y) {
            return x.teAlertFlag === y.teAlertFlag ? 0 : x.teAlertFlag ? -1 : 1;
        });
        let mrSort = teSort.sort(function (x, y) {
            return x.mkAlertFlag === y.mkAlertFlag ? 0 : x.mkAlertFlag ? -1 : 1;
        });
        let isrSort = mrSort.sort(function (x, y) {
            return x.isrAlertFlag === y.isrAlertFlag ? 0 : x.isrAlertFlag ? -1 : 1;
        });
        let cpSort = isrSort.sort(function (x, y) {
            return x.cpAlertFlag === y.cpAlertFlag ? 0 : x.cpAlertFlag ? -1 : 1;
        });
        let ftSort = cpSort.sort(function (x, y) {
            return x.ftAlertFlag === y.ftAlertFlag ? 0 : x.ftAlertFlag ? -1 : 1;
        });
        let mtSort = ftSort.sort(function (x, y) {
            return x.mtAlertFlag === y.mtAlertFlag ? 0 : x.mtAlertFlag ? -1 : 1;
        });
        this.filteredSites = mtSort;
    }
    public submit(selectedSite: any, selectedDevice: any, selected: any): void {
        this.spinel = 'NotLoaded';
        if (selected == 'All') {
            console.log('Submit API call : Selected == All');
            Vue.prototype.$http
                .get(API.ALL_DATA)
                .then((response: any) => {
                    this.sites = response.data;
                    this.spinel = 'DataLoaded';
                    this.filterColumns = false;
                    this.removeDuplicateSitesAndFilter();
                })
                .catch((e: any) => {
                    this.spinel = 'Error';
                    this.errors.push(e);
                });
        } else if (selected == CONS.SITE_TYPE) {
            console.log('Submit API call : Selected == sitetype', selectedSite);
            Vue.prototype.$http
                .get(API.SITE_DATA + selectedSite)
                .then((response: any) => {
                    this.sites = response.data;
                    this.spinel = 'DataLoaded';
                    this.merakiSites = [];
                    this.thousandEyesSites = [];
                    this.isrSites = [];
                    this.cradlePointSites = [];
                    this.fortinetSites = [];
                    this.mistSites = [];
                    this.removeDuplicateSitesAndFilter();
                    this.filterColumns = false;
                })
                .catch((e: any) => {
                    this.spinel = 'Error';
                    this.errors.push(e);
                });
        // } else if (selected == 'devicetype') {
        //     Vue.prototype.$http
        //         .get(API.TECHNOLOGY_DATA + selectedDevice)
        //         .then((response: any) => {
        //             this.sites = response.data;
        //             this.deviceSites = response.data;
        //             this.spinel = 'DataLoaded';
        //             this.merakiSites = [];
        //             this.thousandEyesSites = [];
        //             //this.aerohiveSites = [];
        //             this.cradlePointSites = [];
        //             this.fortinetSites = [];
        //             this.mistSites = [];
        //             this.filterColumns = true;
        //             this.removeDuplicateSitesAndFilter();
        //         })
        //         .catch((e: any) => {
        //             this.spinel = 'Error';
        //             this.errors.push(e);
        //         });
        }
    }
}
</script>
<style scoped>
.all-margin-left {
    margin-left: 10px !important;
}
.dropdown-left {
    left: 1190px;
}
</style>
