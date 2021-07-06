<template>
    <router-view data-cy="cy-parent-router__element" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import store, { STORE_KEY } from '@/store';

@Component
export default class MicroAppView extends Vue {
    storeModule: any;
    created() {
        this.$store.dispatch('testEnvironmentStrategy', 'SAMEASLOGIN');
        const isModuleRegistered = Object.keys(this.$store.state).includes(STORE_KEY);

        if (!isModuleRegistered) {
            this.$store.registerModule(STORE_KEY, store);
        }
    }

    async mounted() {
        if (!this.storeModule) {
            this.storeModule = getModule(store, this.$store);
            await Promise.all([this.storeModule.allStoresDataReq()]);
        }
    }

    destroyed() {
        this.$store.unregisterModule(STORE_KEY);
    }
}
</script>

<style lang="scss" scoped></style>
