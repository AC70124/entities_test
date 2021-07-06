<template>
    <div>
        <a
            href="#"
            class="chi-link chi-modal__trigger"
            :data-target="`#modal-1-${this.deviceName.substring(-7,2)}`"
            :id="`modal-trigger-1-${this.deviceName.substring(-7,2)}`"
        >
            Run Diagnostics
        </a>
        <!-- Modal -->
        <div class="chi-backdrop -closed">
            <div class="chi-backdrop__wrapper">
                <section
                    :id="`modal-1-${this.deviceName.substring(-7,2)}`"
                    class="chi-modal -mw--1200"
                    role="dialog"
                    aria-label="Modal description"
                    aria-modal="true"
                >
                    <header class="chi-modal__header">
                        <h2 class="chi-modal__title">24 hours Metrics Data - {{ this.$props.item.siteType }}</h2>
                        <button class="chi-button -icon -close" data-dismiss="modal" aria-label="Close">
                            <div class="chi-button__content">
                                <i class="chi-icon icon-x"></i>
                            </div>
                        </button>
                    </header>
                    <div class="chi-modal__content modal-height">
                        <div class="-text -mt--0">
                            <PoLineChart :data="data" v-if="this.$props.dataLoaded" />
                            <PoLineChart :data="data1" v-if="this.$props.dataLoaded" />
                            <PoLineChart :data="data2" v-if="this.$props.dataLoaded" />
                            <EntitiesTracerouteTable v-if="this.$props.dataLoaded" :tracertData="this.$props.tracertData" />
                            <div v-if="!this.$props.dataLoaded" class="chi-backdrop__wrapper">
                                <svg class="chi-spinner -md -icon--muted" viewBox="0 0 66 66">
                                    <title>Loading</title>
                                    <circle class="path" cx="33" cy="33" r="30" fill="none" stroke-width="6"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <footer class="chi-modal__footer">
                        <button class="chi-button" data-dismiss="modal">Close</button>
                    </footer>
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as API from '@/modules/entities/api/api-urls';
import PoLineChart from './EntitiesLineChart/LineChart.vue';
import { ChartData, ChartDataset, Position, Style, GridStyle } from '@/components/EntitiesLineChart/chart-data';
import { ChartDataSets } from 'chart.js';
declare const chi: any;
@Component({
    components: {
        PoLineChart: () => import(/* webpackChunkName: "po-line-chart" */ '@/components/EntitiesLineChart/LineChart.vue'),
        EntitiesTracerouteTable: () => import(/* webpackChunkName: "traceroute-table" */ '@/components/EntitiesTracerouteTable.vue'),
    },
    props: {
        item: Object,
        jitterDataSet: Object,
        lossDataSet: Object,
        avgLatencyDataSet: Object,
        metricsDataDate: Array,
        tracertData: Array,
        dataLoaded: Boolean,
        deviceName: String,
    },
})
export default class RunDiagnosticsEntitiesTE extends Vue {
    chartData: ChartDataset[] = [];
    errors: Array<any> = [];
    deviceName: string = this.$props.deviceName;
    private dataset1: ChartDataset[] = [
        {
            legend: 'avg lat',
            color: 'blue',
            dataset: this.$props.avgLatencyDataSet,
        },
    ];
    private dataset: ChartDataset[] = [
        {
            legend: 'loss',
            color: 'red',
            dataset: this.$props.lossDataSet,
        },
    ];
    private dataset2: ChartDataset[] = [
        {
            legend: 'jitter',
            color: 'green',
            dataset: this.$props.jitterDataSet,
        },
    ];
    private data: ChartData = {
        labelsOrdered: this.$props.metricsDataDate,
        //labelsOrdered: ['test'],
        //labelsOrdered: ['first', 'second', 'third', 'fourth'],
        datasets: this.dataset,
        //datasets: this.chartData,
        xGridStyle: [Style.LINE, Style.LINE, Style.LINE],
        yGridStyle: [Style.LINE, Style.LINE, Style.LINE],
    };
    private data1: ChartData = {
        labelsOrdered: this.$props.metricsDataDate,
        //labelsOrdered: ['test'],
        //labelsOrdered: ['first', 'second', 'third', 'fourth'],
        datasets: this.dataset1,
        //datasets: this.chartData,
        xGridStyle: [Style.LINE, Style.LINE, Style.LINE],
        yGridStyle: [Style.LINE, Style.LINE, Style.LINE],
    };
    private data2: ChartData = {
        labelsOrdered: this.$props.metricsDataDate,
        //labelsOrdered: ['test'],
        //labelsOrdered: ['first', 'second', 'third', 'fourth'],
        datasets: this.dataset2,
        //datasets: this.chartData,
        xGridStyle: [Style.LINE, Style.LINE, Style.LINE],
        yGridStyle: [Style.LINE, Style.LINE, Style.LINE],
    };
    mounted() {
        console.log('Testing: ', this.deviceName.substring(-7,2));
        chi.modal(document.getElementById(`modal-trigger-1-${this.deviceName.substring(-7,2)}`));
    }
}
</script>
<style lang="scss" scoped>
.modal-height {
    max-height: 600px !important;
}
</style>
