<template>
    <div>
        <div class="chi-form__item" v-for="(mainItem, index) in this.$props.tracertData" :key="mainItem.tracertData">
            <chi-label for="example__readonly">Route - {{ routeNumber(index) }}</chi-label>
            <chi-textarea
                id="example__readonly"
                size="sm"
                readonly
                v-for="item in mainItem['hops']"
                :key="item.mainItem"
            >
                Hop {{ item.hop }} | Hop IP {{ item.ipAddress }} | Prefix {{ item.prefix }} | Location
                {{ item.location }} | Network {{ item.network }}
            </chi-textarea>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
declare const chi: any;
@Component({
    components: {},
    props: {
        tracertData: Array,
    },
})
export default class EntitiesTracerouteTable extends Vue {
    errors: Array<any> = [];
    public routeNumber(e: number): number {
        return e + 1;
    }
}
</script>
<style lang="scss" scoped></style>
