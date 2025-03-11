const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./test-report",
    reportPath: "./test-report/",
    reportName: "Playwright Automation Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Local test machine",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "QA_POC" },
            { label: "POC", value: "Bhanu Prakash" },
            
        ],
    },
});