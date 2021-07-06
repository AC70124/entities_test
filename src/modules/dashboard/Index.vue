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
                            @click="displayStoreswithIssues()"
                            data-cy="cy-statuses-dropdown-alert"
                            >Alert</a
                        >
                        <a
                            class="chi-dropdown__menu-item"
                            @click="displayStoreswithoutIssues()"
                            data-cy="cy-statuses-dropdown-up"
                            >Up</a
                        >
                    </div>
                </div>
                <div class="chi-divider -vertical -mx--2"></div>
                <div class="chi-form__item">
                    <div class="chi-checkbox">
                        <input
                            type="checkbox"
                            @click="displayCIMMStores()"
                            class="chi-checkbox__input"
                            id="checkbox-ba1"
                        />
                        <label class="chi-checkbox__label" for="checkbox-ba1">Fully Managed</label>
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
            <DisplayData
                :sortedStores="sortedStores"
                :stores="stores"
                :errors="errors"
                :filteredStores="filteredStores"
                :spinel="spinel"
            ></DisplayData>
        </div>
        <br />
        <Pagination
            v-if="sortedStores.length > 0 && filteredStores.length > 0 && stores.length > 0"
            :filteredStores="filteredStores"
            :stores="stores"
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
import DisplayData from '@/components/DisplayData.vue';
import { getModule } from 'vuex-module-decorators';
import * as API from './api/api-urls';
import * as CONS from './constants/constants';
import store from '@/store';

@Component({
    components: {
        Pagination: () => import(/* webpackChunkName: "adaptive-pagination" */ '@/components/Pagination.vue'),
        SortBy: () => import(/* webpackChunkName: "adaptive-sort-by" */ '@/components/SortBy.vue'),
        StoreTypes: () => import(/* webpackChunkName: "adaptive-store-types" */ '@/components/StoreTypes.vue'),
        RowsPerPage: () => import(/* webpackChunkName: "adaptive-rows-per-page" */ '@/components/RowsPerPage.vue'),
        DisplayData: () => import(/* webpackChunkName: "adaptive-display-data" */ '@/components/DisplayData.vue'),
    },
})
export default class CFADashboard extends Vue {
    storeModule: any;
    private chi: any;
    private stores: Array<any> = [];
    private selected: string = 'All';
    private inlineRadio1: string = '';
    private inlineRadio2: string = '';
    private inlineRadio3: string = '';
    private selectedStore: string = 'All';
    private selectedDevice: string = 'All';
    private pageSize: number = 10;
    private currentPage: number = 1;
    private deviceStores: Array<object> = [];
    private spinel: string = 'NotLoaded';
    private uniqueStores: Array<object> = [];
    private filteredStores: Array<object> = [];
    private thousandEyesStores: Array<object> = [];
    private merakiStores: Array<object> = [];
    private aerohiveStores: Array<object> = [];
    private cradlePointStores: Array<object> = [];
    private fortinetStores: Array<object> = [];
    private mistStores: Array<object> = [];
    private isOpen: Array<object> = [];
    private filterColumns: boolean = false;
    private graniteButton: string = '';
    private cimmButton: string = '';
    private storeWithIssues: Array<object> = [];
    private storeWithoutIssues: Array<object> = [];
    private circuitButton: string = '';
    private userInput: string = 'All';
    private autoRefresh: string = 'disabled';
    private countDown: number = 120;
    private errors: Array<any> = [];
    get sortedStores(): Array<object> {
        return this.filteredStores.filter((row, index) => {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
        });
    }
    get sortedDeviceStores(): Array<object> {
        return this.deviceStores.filter((row, index) => {
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
        if (!this.storeModule) this.storeModule = getModule(store, this.$store);
        Vue.prototype.$http
            .get(API.ALL_DATA)
            .then((response: any) => {
                this.stores = response.data;
                this.spinel = 'DataLoaded';
                this.removeDuplicateStoresAndFilter();
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
            .get(API.STORE_DATA + e)
            .then((response: any) => {
                this.stores = response.data;
                this.spinel = 'DataLoaded';
                this.merakiStores = [];
                this.thousandEyesStores = [];
                this.aerohiveStores = [];
                this.cradlePointStores = [];
                this.fortinetStores = [];
                this.mistStores = [];
                this.removeDuplicateStoresAndFilter();
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
    public refreshPage(): any {
        Vue.prototype.$http
            .get(API.CLEAR_CACHE)
            .then((response: any) => {
                console.log('Clearing Cache');
            })
            .catch((e: any) => {
                this.spinel = 'Error';
                this.errors.push(e);
            });
        window.location.href = location['href'];
        window.location.reload();
    }
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
        this.storeWithIssues = [];
        this.circuitButton = '';
        this.removeDuplicateStoresAndFilter();
        this.cimmButton = 'SELECTED';
        let stores: Array<any> = this.filteredStores;
        let cimmStores: Array<object> = [];
        let s = stores.filter(function(item) {
            if (item.techFT === 'Available') {
                cimmStores.push(item);
            }
        });
        console.log('CIMMM:', cimmStores);
        console.log('CIMM Length:', cimmStores.length);
        this.filteredStores = cimmStores;
    }
    public displayCircuitStores(): void {
        this.cimmButton = '';
        this.graniteButton = '';
        this.storeWithIssues = [];
        this.removeDuplicateStoresAndFilter();
        this.circuitButton = 'SELECTED';
        let stores: Array<any> = this.filteredStores;
        let circuitstores: Array<object> = [];
        let s = stores.filter(function(item) {
            if (item.techTE === 'Available') {
                circuitstores.push(item);
            }
        });
        this.filteredStores = circuitstores;
    }
    public displayStoreswithoutIssues(): void {
        this.spinel = 'NotLoaded';
        this.cimmButton = '';
        this.graniteButton = '';
        this.circuitButton = '';
        let storeWithoutIssues = this.storeWithoutIssues;
        this.removeDuplicateStoresAndFilter();
        let stores: Array<any> = this.filteredStores;
        let s = stores.filter(function(item) {
            if (
                !item.thousandEyesFlag &&
                !item.merakiFlag &&
                !item.aerohiveFlag &&
                !item.cradlePointFlag &&
                !item.fortinetFlag &&
                !item.mistFlag
            ) {
                storeWithoutIssues.push(item);
            }
        });
        this.spinel = 'Loaded';
        this.filteredStores = this.storeWithoutIssues;
    }
    public displayStoreswithIssues(): void {
        this.spinel = 'NotLoaded';
        this.cimmButton = '';
        this.graniteButton = '';
        this.circuitButton = '';
        let storeWithIssues = this.storeWithIssues;
        this.removeDuplicateStoresAndFilter();
        let stores: Array<any> = this.filteredStores;
        let s = stores.filter(function(item) {
            if (
                item.thousandEyesFlag ||
                item.merakiFlag ||
                item.aerohiveFlag ||
                item.cradlePointFlag ||
                item.fortinetFlag ||
                item.mistFlag
            ) {
                storeWithIssues.push(item);
            }
        });
        this.filteredStores = this.storeWithIssues;
        this.spinel = 'Loaded';
    }
    public setOverallStoreStatus(): void {
        let stores: Array<any> = this.filteredStores;
        for (let i = 0; i < stores.length; i++) {
            if (
                !stores[i].thousandEyesFlag &&
                !stores[i].merakiFlag &&
                !stores[i].aerohiveFlag &&
                !stores[i].cradlePointFlag &&
                !stores[i].fortinetFlag &&
                !stores[i].mistFlag
            ) {
                stores[i].overallStoreStatus = 'GREEN';
            } else if (
                stores[i].thousandEyesFlag &&
                stores[i].merakiFlag &&
                stores[i].aerohiveFlag &&
                stores[i].cradlePointFlag &&
                stores[i].fortinetFlag &&
                stores[i].mistFlag
            ) {
                stores[i].overallStoreStatus = 'RED';
            } else if (
                stores[i].thousandEyesFlag &&
                stores[i].techAH === 'NA' &&
                stores[i].techCP === 'NA' &&
                stores[i].techMK === 'NA' &&
                stores[i].techFT === 'NA' &&
                stores[i].techMT === 'NA'
            ) {
                stores[i].overallStoreStatus = 'RED';
            } else {
                stores[i].overallStoreStatus = 'AMBER';
            }
        }
        this.filteredStores = stores;
    }
    public checkAvailableTechnology(): void {
        let checkTech: Array<any> = [];
        let count = 0;
        let s = this.stores.filter(function(item) {
            let number = item.storeNumber;
            if (checkTech.length === 0) {
                checkTech.push(item);
                if (item.deviceManufacturer !== 'CIRCUIT') {
                    checkTech[count].techTE = 'NA';
                } else {
                    checkTech[count].techTE = 'Available';
                }
                if (item.deviceManufacturer !== 'Aerohive') {
                    checkTech[count].techAH = 'NA';
                } else {
                    checkTech[count].techAH = 'Available';
                }
                if (item.deviceManufacturer.toUpperCase() !== 'CRADLEPOINT') {
                    checkTech[count].techCP = 'NA';
                } else {
                    checkTech[count].techCP = 'Available';
                }
                if (item.deviceManufacturer !== 'Meraki') {
                    checkTech[count].techMK = 'NA';
                } else {
                    checkTech[count].techMK = 'Available';
                }
                if (item.deviceManufacturer !== 'Fortinet') {
                    checkTech[count].techFT = 'NA';
                } else {
                    checkTech[count].techFT = 'Available';
                }
                if (item.deviceManufacturer !== 'Mist') {
                    checkTech[count].techMT = 'NA';
                } else {
                    checkTech[count].techMT = 'Available';
                }
                count += 1;
            } else if (checkTech.length > 0) {
                let store = checkTech.find(x => x.storeNumber === number);
                let index = checkTech.findIndex(x => x.storeNumber === number);
                if (store != undefined && store.storeNumber == number && store.storeNumber != '') {
                    if (item.deviceManufacturer !== 'CIRCUIT' && store.techTE !== 'Available') {
                        checkTech[index].techTE = 'NA';
                    } else {
                        checkTech[index].techTE = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Aerohive' && store.techAH !== 'Available') {
                        checkTech[index].techAH = 'NA';
                    } else {
                        checkTech[index].techAH = 'Available';
                    }
                    if (item.deviceManufacturer.toUpperCase() !== 'CRADLEPOINT' && store.techCP !== 'Available') {
                        checkTech[index].techCP = 'NA';
                    } else {
                        checkTech[index].techCP = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Meraki' && store.techMK !== 'Available') {
                        checkTech[index].techMK = 'NA';
                    } else {
                        checkTech[index].techMK = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Fortinet' && store.techFT !== 'Available') {
                        checkTech[index].techFT = 'NA';
                    } else {
                        checkTech[index].techFT = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Mist' && store.techMT !== 'Available') {
                        checkTech[index].techMT = 'NA';
                    } else {
                        checkTech[index].techMT = 'Available';
                    }
                } else if (item.storeNumber != '') {
                    checkTech.push(item);
                    if (item.deviceManufacturer !== 'CIRCUIT') {
                        checkTech[count].techTE = 'NA';
                    } else {
                        checkTech[count].techTE = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Aerohive') {
                        checkTech[count].techAH = 'NA';
                    } else {
                        checkTech[count].techAH = 'Available';
                    }
                    if (item.deviceManufacturer.toUpperCase() !== 'CRADLEPOINT') {
                        checkTech[count].techCP = 'NA';
                    } else {
                        checkTech[count].techCP = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Meraki') {
                        checkTech[count].techMK = 'NA';
                    } else {
                        checkTech[count].techMK = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Fortinet') {
                        checkTech[count].techFT = 'NA';
                    } else {
                        checkTech[count].techFT = 'Available';
                    }
                    if (item.deviceManufacturer !== 'Mist') {
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
        this.filteredStores = checkTech;
    }
    public removeDuplicateStoresAndFilter(): void {
        let uniqueStores: Array<any> = [];
        let s = this.stores.filter(function(item) {
            let number = item.storeNumber;
            if (uniqueStores.length == 0) {
                uniqueStores.push(item);
            } else if (uniqueStores.length > 0) {
                let store = uniqueStores.find(x => x.storeNumber === number);
                if (store != undefined && store.storeNumber == number && store.storeNumber != '') {
                    if (!store.thousandEyesFlag) {
                        store.thousandEyesFlag = item.thousandEyesFlag;
                    }
                    if (!store.merakiFlag) {
                        store.merakiFlag = item.merakiFlag;
                    }
                    if (!store.aerohiveFlag) {
                        store.aerohiveFlag = item.aerohiveFlag;
                    }
                    if (!store.cradlePointFlag) {
                        store.cradlePointFlag = item.cradlePointFlag;
                    }
                    if (!store.fortinetFlag) {
                        store.fortinetFlag = item.fortinetFlag;
                    }
                    if (!store.mistFlag) {
                        store.mistFlag = item.mistFlag;
                    }
                } else if (item.storeNumber != '') {
                    uniqueStores.push(item);
                }
            } else {
                console.log('Inside Else');
            }
        });
        this.filteredStores = uniqueStores;
        this.checkAvailableTechnology();
        this.setOverallStoreStatus();
    }
    public sortStoresByNumber(): void {
        let stores: Array<any> = this.filteredStores;
        this.filteredStores = stores.sort((a, b) => (a.storeNumber > b.storeNumber ? 1 : -1));
    }
    public sortStoresByStatus(): void {
        let stores: Array<any> = this.filteredStores;
        let teSort = stores.sort(function(x, y) {
            return x.thousandEyesFlag === y.thousandEyesFlag ? 0 : x.thousandEyesFlag ? -1 : 1;
        });
        let mrSort = teSort.sort(function(x, y) {
            return x.merakiFlag === y.merakiFlag ? 0 : x.merakiFlag ? -1 : 1;
        });
        let ahSort = mrSort.sort(function(x, y) {
            return x.aerohiveFlag === y.aerohiveFlag ? 0 : x.aerohiveFlag ? -1 : 1;
        });
        let cpSort = ahSort.sort(function(x, y) {
            return x.cradlePointFlag === y.cradlePointFlag ? 0 : x.cradlePointFlag ? -1 : 1;
        });
        let ftSort = cpSort.sort(function(x, y) {
            return x.fortinetFlag === y.fortinetFlag ? 0 : x.fortinetFlag ? -1 : 1;
        });
        let mtSort = ftSort.sort(function(x, y) {
            return x.mistFlag === y.mistFlag ? 0 : x.mistFlag ? -1 : 1;
        });
        this.filteredStores = mtSort;
    }
    public submit(selectedStore: any, selectedDevice: any, selected: any): void {
        this.spinel = 'NotLoaded';
        if (selected == 'All') {
            console.log('Submit API call : Selected == All');
            Vue.prototype.$http
                .get(API.ALL_DATA)
                .then((response: any) => {
                    this.stores = response.data;
                    this.spinel = 'DataLoaded';
                    this.filterColumns = false;
                    this.removeDuplicateStoresAndFilter();
                })
                .catch((e: any) => {
                    this.spinel = 'Error';
                    this.errors.push(e);
                });
        } else if (selected == CONS.STORE_NUMBER) {
            console.log('Submit API call : Selected == storenumber', selectedStore);
            Vue.prototype.$http
                .get(API.STORE_DATA + selectedStore)
                .then((response: any) => {
                    this.stores = response.data;
                    this.spinel = 'DataLoaded';
                    this.merakiStores = [];
                    this.thousandEyesStores = [];
                    this.aerohiveStores = [];
                    this.cradlePointStores = [];
                    this.fortinetStores = [];
                    this.mistStores = [];
                    this.removeDuplicateStoresAndFilter();
                    this.filterColumns = false;
                })
                .catch((e: any) => {
                    this.spinel = 'Error';
                    this.errors.push(e);
                });
        } else if (selected == 'devicemanufacturer') {
            Vue.prototype.$http
                .get(API.TECHNOLOGY_DATA + selectedDevice)
                .then((response: any) => {
                    this.stores = response.data;
                    this.deviceStores = response.data;
                    this.spinel = 'DataLoaded';
                    this.merakiStores = [];
                    this.thousandEyesStores = [];
                    this.aerohiveStores = [];
                    this.cradlePointStores = [];
                    this.fortinetStores = [];
                    this.mistStores = [];
                    this.filterColumns = true;
                    this.removeDuplicateStoresAndFilter();
                })
                .catch((e: any) => {
                    this.spinel = 'Error';
                    this.errors.push(e);
                });
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
