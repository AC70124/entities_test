<template>
    <div class="chi-card -portal -bg--white -bg-md--grey-15">
        <div class="chi-card__header -sm">
            <div class="chi-card__title">Chick-fil-A</div>
        </div>
        <div v-if="spinel === 'NotLoaded'" class="chi-backdrop -center -inverse">
            <div class="chi-backdrop__wrapper">
                <svg class="chi-spinner -icon--primary" viewBox="0 0 66 66">
                    <title>Loading</title>
                    <circle class="path" cx="33" cy="33" r="30" fill="none" stroke-width="6"></circle>
                </svg>
            </div>
        </div>
        <div class="chi-card__content -p--0">
            <div class="chi-data-table -portal -compact">
                <div class="chi-data-table__head">
                    <div class="chi-data-table__row">
                        <div class="chi-data-table__cell -expandable"></div>
                        <div class="chi-data-table__cell -flex-basis--15">
                            <div>Store Number</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Overall Status</div>
                            <i class="chi-icon -icon--primary -xs icon-arrow-up"></i>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Thousand Eyes</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Meraki</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Aerohive</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>CradlePoint</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Fortinet</div>
                        </div>
                        <div class="chi-data-table__cell -flex-basis--5">
                            <div>Mist</div>
                        </div>
                        <div class="chi-data-table__cell"></div>
                    </div>
                </div>
                <div class="chi-data-table__body" v-for="item in sortedStores" :key="item.sortedStores">
                    <div class="chi-data-table__row -xl">
                        <div class="chi-data-table__cell -expandable">
                            <button
                                class="chi-button -icon -flat -sm"
                                aria-label="Expand row"
                                @click="toggleTable($event)"
                            >
                                <div class="chi-button__content">
                                    <i class="chi-icon icon-plus"></i>
                                </div>
                            </button>
                        </div>
                        <div class="chi-data-table__cell -key -bold -flex-basis--15" data-label="Store Number">
                            <div>{{ item.storeNumber }}</div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Overall Status">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div class="chi-badge__content" v-if="item.overallStoreStatus === 'GREEN'">
                                        <span>Up</span>
                                    </div>
                                    <div class="chi-badge__content" v-if="item.overallStoreStatus === 'AMBER'">
                                        <i class="chi-icon -icon--warning -xs icon-circle-warning"></i>
                                        <span>Warning</span>
                                    </div>
                                    <div class="chi-badge__content" v-if="item.overallStoreStatus === 'RED'">
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Alert</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Thousand Eyes">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.thousandEyesFlag && item.techTE === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.thousandEyesFlag && item.techTE === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Meraki">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.merakiFlag && item.techMK === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.merakiFlag && item.techMK === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Aerohive">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.aerohiveFlag && item.techAH === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.aerohiveFlag && item.techAH === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="CradlePoint">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.cradlePointFlag && item.techCP === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.cradlePointFlag && item.techCP === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Fortinet">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.fortinetFlag && item.techFT === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.fortinetFlag && item.techFT === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -flex-basis--5" data-label="Mist">
                            <div>
                                <div class="chi-badge -flat -text--normal -px--0">
                                    <div
                                        class="chi-badge__content"
                                        v-if="!item.mistFlag && item.techMT === 'Available'"
                                    >
                                        <span>Up</span>
                                    </div>
                                    <div
                                        class="chi-badge__content"
                                        v-else-if="item.mistFlag && item.techMT === 'Available'"
                                    >
                                        <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                        <span>Down</span>
                                    </div>
                                    <div class="chi-badge__content" v-else>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chi-data-table__cell -key -justify-content-md--end">
                            <button class="chi-button -icon -flat -primary" aria-label="More actions">
                                <div class="chi-button__content">
                                    <i class="chi-icon icon-more-vert"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div id="row-dt-4-0-content" style="" class="-d--none">
                        <div role="row" class="chi-data-table__row-child -p--2 -px--8 -flex--column">
                            <div class="-d--flex -w--100 -flex--column -flex-md--row -align-items-md--center">
                                <div class="-d--flex -flex--column -flex--grow1">
                                    <strong>Location Address</strong>
                                    <span
                                        >{{ item.streetAddress }},{{ item.city }},{{ item.state }},{{ item.zip }}</span
                                    >
                                </div>
                                <div class="-mt--1 -mt-md--0">
                                    <button class="chi-button -primary -outline -sm -bg--white -px--2 -mr--1 -disabled">
                                        Create New Ticket
                                    </button>
                                    <button class="chi-button -primary -outline -sm -bg--white -px--2 -disabled">
                                        Run Diagnostics
                                    </button>
                                </div>
                            </div>
                            <Accordionstores :item="item" :stores="stores" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Accordionstores from './Accordionstores.vue';
import { getModule } from 'vuex-module-decorators';
import store from '@/store';
import * as CONS from '@/modules/dashboard/constants/constants';

@Component({
    components: {
        Accordionstores: () =>
            import(/* webpackChunkName: "adaptive-accordion-stores" */ '@/components/Accordionstores.vue'),
    },
})
export default class DisplayData extends Vue {
    storeModule: any;
    @Prop()
    filteredStores: any;
    @Prop()
    sortedStores: any;
    @Prop()
    stores: any;
    @Prop()
    filterColumns: any;
    cimmButton: string = '';
    circuitButton: string = '';
    spinnerFlag: boolean = false;
    thousandEyesStores: Array<object> = [];
    merakiStores: Array<object> = [];
    aerohiveStores: Array<object> = [];
    cradlePointStores: Array<object> = [];
    fortinetStores: Array<object> = [];
    mistStores: Array<object> = [];
    @Prop()
    spinel: any;
    thousandEyesAlerts: Array<object> = [];
    merakiAlerts: Array<object> = [];
    aerohiveAlerts: Array<object> = [];
    cradlePointAlerts: Array<object> = [];
    mistAlerts: Array<object> = [];
    deviceNames: Array<string> = ['ThousandEyes', 'Meraki', 'Aerohive', 'CradlePoint', 'Fortinet', 'Mist'];
    public toggleAccordion(e: any): void {
        let curr_element = e.target;
        while (!curr_element.classList.contains('chi-accordion__item')) {
            curr_element = curr_element.parentElement;
        }
        if (curr_element.classList.contains('chi-accordion__item')) {
            curr_element.classList.toggle('-expanded');
        }
    }
    public toggleTable(e: any): void {
        let curr_element = e.target;
        let iconPlus = curr_element.classList.contains('icon-plus') ? true : false;
        if (iconPlus) {
            curr_element.classList.replace('icon-plus', 'icon-minus');
            let storeRow = curr_element.parentElement.parentElement.parentElement.parentElement;
            let curr_display_el = storeRow.nextElementSibling;
            while (curr_display_el != null && curr_display_el.getAttribute('id') === 'row-dt-4-0-content') {
                curr_display_el.classList.remove('-d--none');
                curr_display_el = curr_display_el.nextElementSibling;
            }
        } else {
            curr_element.classList.replace('icon-minus', 'icon-plus');
            let storeRow = curr_element.parentElement.parentElement.parentElement.parentElement;
            let curr_display_el = storeRow.nextElementSibling;
            while (curr_display_el != null && curr_display_el.getAttribute('id') === 'row-dt-4-0-content') {
                curr_display_el.classList.add('-d--none');
                curr_display_el = curr_display_el.nextElementSibling;
            }
        }
    }
    created() {
        if (!this.storeModule) this.storeModule = getModule(store, this.$store);
    }
    mounted() {
        const chi: any = window.chi;
        const expandCollapseAccordion = chi.accordion(document.querySelectorAll('.chi-accordion'));
    }
}
</script>

<style lang="scss" scoped>
.status-padding {
    padding-right: 3rem !important;
}
.accordionTitle-padding {
    margin-left: 500px !important;
}
body {
    margin: 3rem !important;
}

.-expanded > .chi-accordion__trigger > .chi-icon.icon-plus:before {
    content: '\e974';
}

.chi-link {
    cursor: pointer;
}
</style>
