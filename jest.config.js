
module.exports = {
    testEnvironment: 'node',
  };
 
module.exports = {

    reporters: [
        "default",
        [
            "jest-trx-results-processor",
            {
                testRunner: "jest-circus/runner",
                outputFile: "./test/Common/jestTestresults.trx",
            }
        ]
    ]
};