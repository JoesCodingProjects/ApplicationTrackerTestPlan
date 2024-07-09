/* eslint-disable import/no-extraneous-dependencies */
const { join } = require("path");
const portscanner = require("portscanner");
const spawnd = require("spawnd");
const waitPort = require("wait-port");

let server;

const port = 8085;
const timeout = 50000;

const setupServer = async () => {
    const status = await portscanner.checkPortStatus(port, "127.0.0.1");

    if(status !== "closed") {
        return;
    }

    server = spawnd("npm run develop", {
        shell: true,
        env: process.env,
        cwd: join(__dirname, "../")
    });

    await waitPort({
        output: "silent",
        timeout,
        port
    });
};

const teardownServer = async () => {
    if(server) {
        await server.destroy();
    }
};

module.exports = { setupServer, teardownServer };