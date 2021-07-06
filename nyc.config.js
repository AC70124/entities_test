const { APP_MODE } = require('./src/utils/constants');

let nycConfiguration = {
    cache: false,
    instrument: false,
    sourceMap: false,

    include: ['src/'],
    exclude: ['cypress/', 'assets/', 'tests/', 'src/assets/', '**/*.d.ts'],
    extension: ['.vue', '.ts', '.js'],
    reporter: ['lcov', 'text-summary'],

    branches: 40,
    lines: 40,
    functions: 40,
    statements: 40,
};

if (process.env.VUE_APP_MODE === APP_MODE.TEST_E2E) {
    nycConfiguration['temp-dir'] = '.nyc_output_e2e';
    nycConfiguration['report-dir'] = 'coverage_e2e';
}

module.exports = nycConfiguration;
