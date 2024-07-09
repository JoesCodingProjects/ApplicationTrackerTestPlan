const builder = require("jest-trx-results-processor");

const processor = builder({
    outputFile: "./test/Common/jestTestresults.trx"
});
module.exports = processor;