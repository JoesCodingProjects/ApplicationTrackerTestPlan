/* eslint-disable no-console */

// module.exports = async config => {
// const PID = global.httpProcess.pid;
//  console.log(`process id ${PID}`);
//  global.httpProcess.kill(PID,"SIGTERM"); //This does not work as the starting process is a cmd.exe which exists after the webserver starts, so PID is already gone.
// global.httpProcess.kill("SIGHUP");
//  process.exit();
// };