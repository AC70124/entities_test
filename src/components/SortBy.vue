<template>
    <div class="chi-dropdown -d--none -d-lg--flex">
        <button
            class="chi-button -flat chi-dropdown__trigger -px--1 -animate"
            id="button-eid-menu2"
            ref="button-eid-menu2"
            data-position="bottom-end"
        >
            Sort By
        </button>
        <div class="chi-dropdown__menu -w--sm">
            <a class="chi-dropdown__menu-item" @click="sortStoresByNumberMessageToParent()" href="#">
                <i class="chi-icon icon-home-outline"></i>
                <span>Store Number</span>
            </a>
            <a class="chi-dropdown__menu-item" @click="sortStoresByStatusMessageToParent()" href="#">
                <i class="chi-icon icon-warning-outline"></i>
                <span>Active Alerts</span></a
            >
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class SortBy extends Vue {
    mounted() {
        const chi: any = window.chi;
        chi.dropdown(this.$refs['button-eid-menu2']);
    }
    public sortStoresByNumberMessageToParent(): void {
        this.closeExpandedAccordions();
        this.$emit('messageFromChildForSortStoresByNumber');
    }
    public sortStoresByStatusMessageToParent(): void {
        this.closeExpandedAccordions();
        this.$emit('messageFromChildForSortStoresByStatus');
    }
    public closeExpandedAccordions(): void {
        let elements = document.querySelectorAll('.chi-accordion__item');
        [].forEach.call(elements, function(el: any) {
            el.classList.remove('-expanded');
        });
    }
}
</script>

<style lang="scss" scoped>
.storeloc-margin {
    margin-left: 1100px !important;
}
</style>
