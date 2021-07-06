declare class ComponentLibrary {
    components: Record<string, any>;
}

const microappComponent: ComponentLibrary = {
    components: {
        // AdaptiveSampleComponent: () => import(/* webpackChunkName: "adaptive-sample-component" */ '@/components/AdaptiveSampleComponent.vue'),
    },
};

export const library = microappComponent;
