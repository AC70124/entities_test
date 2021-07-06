<template>
    <div>
        <fieldset>
            <div class="chi-picker-group">
                <div class="chi-picker-group__content">
                    <input
                        class="chi-picker__input"
                        type="radio"
                        name="inlineRadios"
                        id="inlineRadio1"
                        @click="displayCircuitStoresMessageToParent()"
                    />
                    <label for="inlineRadio1">CIRCUITS</label>
                    <input
                        class="chi-picker__input"
                        type="radio"
                        name="inlineRadios"
                        id="inlineRadio2"
                        @click="displayCIMMStoresMessageToParent()"
                    />
                    <label for="inlineRadio2">CIMM</label>
                    <input
                        class="chi-picker__input"
                        type="radio"
                        name="inlineRadios"
                        id="inlineRadio3"
                        @click="displayStoreswithIssuesMessageToParent()"
                    />
                    <label for="inlineRadio3">Stores with Issues</label>
                </div>
                <button
                    class="chi-button -icon -flat -bg--none -opacity-hover--80"
                    aria-label="Button action"
                    title="Clear Cache and Reload Data"
                    @click="refreshPageMessageToParent()"
                >
                    <div class="chi-button__content">
                        <i class="chi-icon icon-refresh"></i>
                    </div>
                </button>
                <button
                    class="chi-button -icon -flat -bg--none -opacity-hover--80"
                    aria-label="Button action"
                    title="Pause Auto-Refreshing"
                    @click="pauseAutoRefreshMessageToParent()"
                >
                    <div class="chi-button__content">
                        <i class="chi-icon icon-circle-stop"></i>
                        <label v-if="autoRefresh === 'enabled'" class="chi-label -text--sm -m--1" for="example-base"
                            >Refreshing in {{ countDown }} seconds</label
                        >
                        <label v-if="autoRefresh === 'disabled'" class="chi-label -text--sm -m--1" for="example-base"
                            >Refreshing Paused</label
                        >
                    </div>
                </button>
            </div>
        </fieldset>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class StoreTypes extends Vue {
    @Prop()
    countDown: any;
    @Prop()
    autoRefresh: any;
    public displayCircuitStoresMessageToParent(): void {
        this.closeExpandedAccordions();
        this.$emit('messageFromChildForCircuitStores');
    }
    public displayCIMMStoresMessageToParent(): void {
        this.closeExpandedAccordions();
        this.$emit('messageFromChildForCIMMStores');
    }
    public displayStoreswithIssuesMessageToParent(): void {
        this.closeExpandedAccordions();
        this.$emit('messageFromChildForStoresWithIssues');
    }
    public refreshPageMessageToParent(): void {
        this.$emit('messageFromChildForRefreshPage');
    }
    public pauseAutoRefreshMessageToParent(): void {
        this.$emit('messageFromChildForPauseAutoRefresh');
    }
    public closeExpandedAccordions(): void {
        let elements = document.querySelectorAll('.chi-accordion__item');
        [].forEach.call(elements, function(el: any) {
            el.classList.remove('-expanded');
        });
    }
}
</script>

<style lang="scss" scoped></style>
