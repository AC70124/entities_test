module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config); // e2e cypress tests

    config.fixturesFolder = 'tests/e2e/fixtures';
    config.integrationFolder = 'tests/e2e/specs';
    config.screenshotsFolder = 'tests/e2e/screenshots';
    config.videosFolder = 'tests/e2e/videos';
    config.supportFile = 'tests/e2e/support/index.js';
    return config;
};
