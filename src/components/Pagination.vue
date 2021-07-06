<template>
    <!--<nav class="chi-pagination -compact" role="navigation" aria-label="Pagination">
        <div class="chi-button-group">
            <a @click="prevPage" class="chi-button -flat -sm" aria-label="Previous">
                <i class="chi-icon icon-chevron-left" aria-hidden="true"></i>
                <span class="-sr--only">Previous</span>
            </a>
            <a @click="nextPage" href="#" class="chi-button -flat -sm">{{ currentPage }} of {{ totalPages() }}</a>
            <a @click="nextPage" class="chi-button -flat -sm" aria-label="Next">
                <i class="chi-icon icon-chevron-right" aria-hidden="true"></i>
                <span class="-sr--only">Next</span>
            </a>
        </div>
    </nav> -->
    <nav class="chi-pagination" role="navigation" aria-label="Pagination">
        <div class="chi-pagination__content">
            <div class="chi-pagination__start">
                <div class="chi-pagination__results">
                    <span class="chi-pagination__results-label">{{ this.filteredStores.length }}</span>
                </div>
                <div class="chi-pagination__page-size">
                    <select class="chi-input" aria-label="Number of result items per page">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="all">All</option>
                    </select>
                    <span class="chi-pagination__label">per page</span>
                </div>
            </div>
            <div class="chi-pagination__center">
                <div class="chi-pagination__button-group chi-button-group">
                    <button class="chi-button -icon -flat" aria-label="Previous page" type="button">
                        <div class="chi-button__content" @click="prevPage">
                            <i class="chi-icon icon-chevron-left" aria-hidden="true"></i>
                        </div>
                    </button>
                    <button class="chi-button -flat -active" aria-label="Page 1" type="button">
                        1
                    </button>
                    <button class="chi-button -flat" aria-label="Page 2" type="button">
                        2
                    </button>
                    <button class="chi-button -flat" aria-label="Page 3" type="button">
                        3
                    </button>
                    <button class="chi-button -flat" aria-label="Page 4" type="button">
                        4
                    </button>
                    <button class="chi-button -flat" aria-label="Page 5" type="button">
                        5
                    </button>
                    <div class="chi-button -flat" aria-hidden="true" disabled>...</div>
                    <button class="chi-button -flat" aria-label="Page 12" type="button">
                        12
                    </button>
                    <button class="chi-button -icon -flat" aria-label="Next page" type="button">
                        <div class="chi-button__content" @click="nextPage">
                            <i class="chi-icon icon-chevron-right" aria-hidden="true"></i>
                        </div>
                    </button>
                </div>
            </div>
            <div class="chi-pagination__end"></div>
        </div>
    </nav>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Pagination extends Vue {
    @Prop()
    filteredStores: any;
    @Prop()
    currentPage: any;
    pageSize: number = 10;
    stores: Array<any> = [];
    totalPages(): any {
        return Math.ceil(this.filteredStores.length / this.pageSize);
    }
    nextPage(): void {
        //this.closeExpandedAccordions();
        this.nextPageMessage();
        //if (this.currentPage * this.pageSize < this.stores.length) this.currentPage++;
    }
    prevPage(): void {
        //this.closeExpandedAccordions();
        this.prevPageMessage();
        //if (this.currentPage > 1) this.prevPageMessage();
    }
    public nextPageMessage(): void {
        this.$emit('messageFromChildForNextPage');
    }
    public prevPageMessage(): void {
        this.$emit('messageFromChildForPrevPage');
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
