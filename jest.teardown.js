const { teardownServer } = require("./jest.http-server");

module.exports = async () => {
    await teardownServer();
};