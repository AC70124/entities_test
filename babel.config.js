const { APP_MODE } = require('./src/utils/constants');

let plugins = [];

if ([APP_MODE.TEST_E2E, APP_MODE.TEST_UNIT].includes(process.env.VUE_APP_MODE)) {
    plugins.push([
        'istanbul',
        {
            extension: ['.vue', '.ts', '.js'],
        },
    ]);
}
module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                useBuiltIns: false,
            },
        ],
    ],
    plugins,
};
