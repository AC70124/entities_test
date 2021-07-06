import { expect } from 'chai';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import RowsPerPage from '@/components/RowsPerPage.vue';
import StoreTypes from '@/components/StoreTypes.vue';
import SortBy from '@/components/SortBy.vue';

const localVue = createLocalVue();

describe('RowsPerPage.vue', () => {
    it('Display only 5 items under drop down', () => {
        let wrapper: Wrapper<RowsPerPage>;
        wrapper = shallowMount(RowsPerPage, {
            localVue,
        });

        expect(wrapper.findAll('.chi-dropdown__menu-item').length).to.be.equals(5);
    });
    it('Button should be available', () => {
        let wrapper: Wrapper<RowsPerPage>;
        wrapper = shallowMount(RowsPerPage, {
            localVue,
        });
        expect(wrapper.find('.chi-button').exists);
    });
});

describe('SortBy.vue', () => {
    it('Length of chi dropdown menu should be 2', () => {
        let wrapper: Wrapper<SortBy>;
        wrapper = shallowMount(SortBy, {
            localVue,
        });
        expect(wrapper.findAll('.chi-dropdown__menu-item').length).to.be.equals(2);
    });
});
