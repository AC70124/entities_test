<template>
    <div>
        <div class="chi-dropdown -d--none -d-lg--flex">
            <button
                class="chi-button -flat chi-dropdown__trigger -px--1 -animate"
                id="button-user-menu2"
                ref="button-user-menu2"
                data-position="bottom-end"
            >
                Rows Per Page
            </button>
            <div class="chi-dropdown__menu -w--sm">
                <a class="chi-dropdown__menu-item" href="#" @click="rowsPerPageMessageToParent($event)">
                    <span>All</span>
                </a>
                <a class="chi-dropdown__menu-item" href="#" @click="rowsPerPageMessageToParent($event)">
                    <span>10</span>
                </a>
                <a class="chi-dropdown__menu-item" href="#" @click="rowsPerPageMessageToParent($event)">
                    <span>50</span>
                </a>
                <a class="chi-dropdown__menu-item" href="#" @click="rowsPerPageMessageToParent($event)">
                    <span>100</span>
                </a>
                <a class="chi-dropdown__menu-item" href="#" @click="rowsPerPageMessageToParent($event)">
                    <span>200</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class RowsPerPage extends Vue {
    private dropdown: any;

    perPageSelect: number = 10;
    test: any = 10;

    mounted() {
        const chi: any = window.chi;
        this.dropdown = chi.dropdown(this.$refs['button-user-menu2']);
    }

    destroyed() {
        this.dropdown.dispose();
    }

    public rowsPerPageMessageToParent(e: any): void {
        this.$emit('messageFromChildForRowsPerPage', e.target.text);
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
