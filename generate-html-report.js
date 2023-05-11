const reporter = require('cucumber-html-reporter');

var options = {
    theme: 'hierarchy',
    jsonDir: 'cypress/reports/json/',
    output: 'cypress/reports/cucumber_report.html',
    screenshotsDirectory: 'test-results/screenshots/',
    storeScreenshots: false,
    reportSuiteAsScenarios: true,
    launchReport: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "Test Environment": "Qualif"
    }
};

reporter.generate(options);
