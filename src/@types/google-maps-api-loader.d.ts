declare module 'googlemaps';

declare module 'google-maps-api-loader' {
    interface Options {
        apiKey?: string;
        client?: string;
        language?: string;
        version?: string;
        libraries?: string[];
    }

    function googleMapsApiLoader(options?: Options): Promise<typeof google>;

    export = googleMapsApiLoader;
}
