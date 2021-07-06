const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { APP_MODE, APP_TARGET } = require('./src/utils/constants');
const path = require('path');
const ASSET_PATH = '/';
function PublicPathWebpackPlugin() {}
PublicPathWebpackPlugin.prototype.apply = function(compiler) {
    compiler.hooks.entryOption.tap('PublicPathWebpackPlugin', (context, entry) => {
        if (entry['module.common']) {
            entry['module.common'] = path.resolve(__dirname, './src/main.js');
        }
        if (entry['module.umd']) {
            entry['module.umd'] = path.resolve(__dirname, './src/main.js');
        }
        if (entry['module.umd.min']) {
            entry['module.umd.min'] = path.resolve(__dirname, './src/main.js');
        }
    });
    compiler.hooks.beforeRun.tap('PublicPathWebpackPlugin', compiler => {
        compiler.options.output.publicPath = ASSET_PATH;
    });
};

module.exports = {
    configureWebpack: config => {
        if (!config.externals) {
            config.externals = {};
        }
        if (config.devtool) {
            delete config.devtool;
        }

        switch (process.env.VUE_APP_MODE) {
            case APP_MODE.PROD:
                config.mode = 'production';
                config.optimization.minimize = true;
                let terserOptions = config.optimization.minimizer[0].options.terserOptions;
                terserOptions.compress.drop_console = true;
                terserOptions.compress.drop_debugger = true;
                terserOptions.keep_classnames = true;
                terserOptions.keep_fnames = true;
                break;

            case APP_MODE.PR:
            case APP_MODE.STAGE:
                config.mode = 'development';
                config.output.filename = '[name].js';
                config.output.chunkFilename = '[name].js';
                config.externals.shell = 'shell';
                config.externals.vue = 'Vue';
                break;

            case APP_MODE.TEST_E2E:
                config.mode = 'development';
                config.devtool = 'source-map';
                config.output.filename = '[name].js';
                config.output.chunkFilename = '[name].js';
                config.externals.shell = 'shell';
                config.externals.vue = 'Vue';
                break;

            case APP_MODE.DEV:
                config.mode = 'development';
                config.devtool = 'source-map';
                config.plugins.push(new BundleAnalyzerPlugin());
                config.output.filename = '[name].js';
                config.output.chunkFilename = '[name].js';
                config.externals.shell = 'shell';
                config.externals.vue = 'Vue';
                break;

            default:
        }

        if (process.env.VUE_APP_TARGET === APP_TARGET.COMPONENT) {
            config.plugins.unshift(new PublicPathWebpackPlugin());
        } else {
            // copy µcomponents libraries
            // config.plugins.push(
            //   new CopyWebpackPlugin([{ from: '@centurylink/µcomponent-repository/dist' }], {
            //     context: 'node_modules',
            //     ignore: ['.DS_Store'],
            //   })
            // );
        }
    },
    css: {
        extract: process.env.VUE_APP_MODE === APP_MODE.PROD,
    },
    devServer: {
        progress: false,
        watchOptions: {
            ignored: /node_modules/,
            // if aggregateTimeout and poll values should be changed on local, create a .env.local file
            aggregateTimeout: process.env.WEBPACK_AGGREGATE_TIMEOUT,
            poll: process.env.WEBPACK_POLL,
        },
        overlay: {
            warnings: true,
            errors: true,
        },
        public: 'localhost:9090',
        port: 9090,
        https: true,
        // temporal solution for CORS. more info: https://medium.com/js-dojo/how-to-deal-with-cors-error-on-vue-cli-3-d78c024ce8d3
        // proxy: 'https://url-backend.test/',
    },
    transpileDependencies: ['vuex-module-decorators'],
};
