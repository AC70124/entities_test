<template>
    <ShellModule>
        <router-view />
    </ShellModule>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
    height: 100%;

    a {
        cursor: pointer;
    }
}
</style>
