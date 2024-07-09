const { setupServer } = require("./jest.http-server");

module.exports = async () => {
    await setupServer();
};