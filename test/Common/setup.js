/* eslint-disable no-console */
/* eslint-disable no-undef */
// const spawn = require("cross-spawn");

const os = require("os");
const { spawn } = require("child_process");


module.exports = async () => {
    let runnpm = "npm";
    if(os.platform() === "win32") { runnpm = "npm.cmd"; }
    await new Promise((resolve, reject) => {
        httpProcess = spawn(runnpm, ["run", "developTest"]);
        const PID = httpProcess.pid;
        console.log(`process id on start ${PID}`);

        let counter = 1;
        httpProcess.stdout.on("data", e => {
            console.log(e.toString());
            if(e.toString().includes("Compiled Demo Page")) {
                // eslint-disable-next-line no-plusplus
                counter++;
                if(counter === 2) {
                    resolve();
                }
            }
        });
        httpProcess.once("error", reject);
    });
};

