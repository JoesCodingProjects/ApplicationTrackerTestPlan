// ApplicationTracker/Common/createDriver.js
const { Builder, By, until, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

exports.driver = async function () {
  const o = new chrome.Options();
  o.setChromeBinaryPath("C:/Program Files/Google/Chrome Beta/Application/chrome.exe");
  o.addArguments("disable-infobars");
  o.addArguments("--lang=en-US");
  o.addArguments("--disable-notifications");
  o.setUserPreferences({ credential_enable_service: false });
  o.addArguments("--start-maximized");

  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.setPageLoadStrategy("normal");

  const driver = await new Builder()
    .withCapabilities(chromeCapabilities)
    .setChromeOptions(o)
    .forBrowser("chrome")
    .build();

  return driver;
};
