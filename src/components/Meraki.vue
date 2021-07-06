<template>
    <div class="chi-accordion -w--100">
        <div class="chi-accordion__item -bg--none" v-for="meraki in merakiStores" :key="meraki.merakiStores">
            <button class="chi-accordion__trigger">
                <i class="chi-icon icon-plus -icon--primary"></i>
                <div class="chi-accordion__title">
                    <i class="chi-icon icon-circle-warning -xs -icon--danger -mr--1"></i>
                    {{ meraki.deviceName }}
                </div>
                <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                    <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark">View in Meraki</a>
                    <a href="#" class="chi-link">Run Diagnostics</a>
                </div>
            </button>
            <div class="chi-accordion__content">
                <table class="chi-table -portal">
                    <thead>
                        <tr class="-sm">
                            <th>Alert ID</th>
                            <th>Threshold</th>
                            <th>Rule ID</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="-sm">
                            <td>70772648</td>
                            <td>> 25%</td>
                            <td>118473</td>
                            <td>Circuit Packet Loss</td>
                        </tr>
                        <tr class="-sm">
                            <td>70772648</td>
                            <td>> 25%</td>
                            <td>118473</td>
                            <td>Circuit Packet Loss</td>
                        </tr>
                        <tr class="-sm">
                            <td>70772648</td>
                            <td>> 25%</td>
                            <td>118473</td>
                            <td>Circuit Packet Loss</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
var json1 = require('@/modules/dashboard/constants/constants.json');
var json = require('@/modules/dashboard/api/API_URLS.json');
// eslint-disable-next-line
declare const chi: any;
@Component({
    components: {},
})
export default class Meraki extends Vue {
    deviceNames: Array<string> = ['ThousandEyes', 'Meraki', 'Aerohive', 'CradlePoint', 'Fortinet', 'Mist'];
    DEVICE_TE: Array<object> = json1['DEVICE_TE'];
    DEVICE_MK: Array<object> = json1['DEVICE_MK'];
    DEVICE_AH: Array<object> = json1['DEVICE_AH'];
    DEVICE_CP: Array<object> = json1['DEVICE_CP'];
    DEVICE_FT: Array<object> = json1['DEVICE_FT'];
    DEVICE_MT: Array<object> = json1['DEVICE_MT'];
    MIST_STORE: Array<object> = json['MIST_STORE'];
    TE_STORE: Array<object> = json['TE_STORE'];
    MERAKI_STORE: Array<object> = json['MERAKI_STORE'];
    AEROHIVE_STORE: Array<object> = json['AEROHIVE_STORE'];
    CRADLEPOINT_STORE: Array<object> = json['CRADLEPOINT_STORE'];
    thousandEyesStores: Array<object> = [];
    @Prop()
    merakiStores: Array<object> = [];
    aerohiveStores: Array<object> = [];
    cradlePointStores: Array<object> = [];
    fortinetStores: Array<object> = [];
    mistStores: Array<object> = [];
    thousandEyesAlerts: Array<object> = [];
    merakiAlerts: Array<object> = [];
    aerohiveAlerts: Array<object> = [];
    cradlePointAlerts: Array<object> = [];
    mistAlerts: Array<object> = [];
    spinnerFlag: boolean = false;
    public fetchAllStoresForStore(selDev: any, store: any): void {
        let sNum = store.storeNumber;
        if (selDev === this.DEVICE_TE && !store.thousandEyesFlag) {
            let tStores: Array<any> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    tStores.push(item);
                } else if (item.storeNumber === sNum && item.deviceManufacturer === 'CIRCUIT') {
                    tStores.push(item);
                }
            });
            this.thousandEyesStores = tStores;
        }
        if (selDev === this.DEVICE_TE && store.thousandEyesFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(this.TE_STORE + sNum)
                .then((response: any) => {
                    this.thousandEyesAlerts = response.data;
                    console.log('ThousandEyes alerts:' + this.thousandEyesAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.$props.errors.push(e);
                });
        }
        if (selDev === this.DEVICE_MK && !store.merakiFlag) {
            let mStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    mStores.push(item);
                }
            });
            this.merakiStores = mStores;
            console.log('Testing');
        }
        if (selDev === this.DEVICE_MK && store.merakiFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(this.MERAKI_STORE + sNum)
                .then((response: any) => {
                    this.merakiAlerts = response.data;
                    console.log('Meraki alerts:' + this.merakiAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.$props.spinel = 'Error';
                    this.$props.errors.push(e);
                });
        }
        if (selDev === this.DEVICE_AH && !store.aerohiveFlag) {
            let aStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    aStores.push(item);
                }
            });
            this.aerohiveStores = aStores;
        }
        if (selDev === this.DEVICE_AH && store.aerohiveFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(this.AEROHIVE_STORE + sNum)
                .then((response: any) => {
                    this.aerohiveAlerts = response.data;
                    console.log('aerohive alerts:' + this.aerohiveAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.$props.spinel = 'Error';
                    this.$props.errors.push(e);
                });
        }
        if (selDev === this.DEVICE_CP && !store.cradlePointFlag) {
            let cpStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    cpStores.push(item);
                }
            });
            this.cradlePointStores = cpStores;
        }
        if (selDev === this.DEVICE_CP && store.cradlePointFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(this.CRADLEPOINT_STORE + sNum)
                .then((response: any) => {
                    this.cradlePointAlerts = response.data;
                    console.log('cradlepoint alerts:' + this.cradlePointAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.$props.spinel = 'Error';
                    this.$props.errors.push(e);
                });
        }
        if (selDev === this.DEVICE_FT) {
            let fStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    fStores.push(item);
                }
            });
            this.fortinetStores = fStores;
        }
        if (selDev === this.DEVICE_MT && !store.mistFlag) {
            let mtStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber === sNum && item.deviceManufacturer === selDev) {
                    mtStores.push(item);
                }
            });
            this.mistStores = mtStores;
        }
        if (selDev === this.DEVICE_MT && store.mistFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(this.MIST_STORE + sNum)
                .then((response: any) => {
                    this.mistAlerts = response.data;
                    console.log('mist alerts:' + this.mistAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.$props.spinel = 'Error';
                    this.$props.errors.push(e);
                });
        }
    }
}
</script>
<style lang="scss" scoped>
/* Do not use - for presentation purposes only */
body {
    margin: 3rem !important;
}

/* Needed to support custom accordion expand/collapse icons - will include in next Chi release */
.-expanded > .chi-accordion__trigger > .chi-icon.icon-plus:before {
    content: '\e974';
}

/* Needed for expand all/collapse all links - will include in next Chi release */
.chi-link {
    cursor: pointer;
}
</style>
