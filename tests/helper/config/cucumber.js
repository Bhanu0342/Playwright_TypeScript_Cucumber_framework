module.exports = {
default: {
        tags:process.env.npm_config_TAGS || "",
        formatOptions: { snippetInterface: "async-await"},
        paths: ["tests/features/"],
        require: ["tests/steps/*.ts", "tests/helper/hooks/hooks.ts"],
        requireModule: ["ts-node/register" ],
        publishQuiet: false,
        dryRun:false,
        format:["progress-bar",
                  "html:test-report/cucumber_report.html",
                  "json:test-report/cucumber_report.json",
                  "rerun:@rerun.txt"], 
        parallel: 2       

    },
    rerun: {
        formatOptions: { snippetInterface: "async-await"},
        require: ["tests/steps/*.ts", "tests/helper/hooks/hooks.ts"],
        requireModule: ["ts-node/register" ],
        publishQuiet: false,
        dryRun:false,
        format:["progress-bar",
                  "html:test-report/cucumber_report.html",
                  "json:test-report/cucumber_report.json",
                  "rerun:@rerun.txt"], 
        parallel: 2       

    }

}