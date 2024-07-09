/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable camelcase */
// import clearall from "../Common/sheets";
// eslint-disable-next-line no-unused-vars
const { Builder, By, until, Key } = require("selenium-webdriver");
const fs = require("fs");
const Selectors = require("../Common/selectors.js");
const common_functions = require("../Common/commonFunctions");
const testConfig = require("../Common/testConfig.js");
const createDriver = require('../Common/createDriver');
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");
const wd = require("selenium-webdriver");
const assert = require("assert").strict;
let driver = "";
let TestPlan = "Application Tracker-Test";

const applicationTrackerSelectors = Selectors.applicationTrackerSelectors;
// const TestCase = "Graph-" + screen.width + "X" + screen.height;
jest.setTimeout(500000);

// eslint-disable-next-line arrow-parens
beforeAll(async () => {
    driver = await createDriver.driver();
    
});

// checks sign-in fails with incorrect credentials, then checks it signs in correctly with correct credentials
test("1. Sign-in test", async () => {
    const TestCase = "Application Tracker- sign-in";
    const URL = testConfig.testPage;
    const username = testConfig.username;
    const password = testConfig.password;
    const incorrectpassword = testConfig.incorrectpassword;
    await driver.get(URL);

    //validate incorrect signin
    const usernameInput = await common_functions.getElement(driver, applicationTrackerSelectors.usernameInput,false,5000);
    await usernameInput.sendKeys(username);
    const PWInput = await common_functions.getElement(driver, applicationTrackerSelectors.passwordInput);
    await PWInput.sendKeys(incorrectpassword);
    const signinButton = await common_functions.getElement(driver, applicationTrackerSelectors.signinButton);
    await signinButton.click();
    const passwordError = await common_functions.getElement(driver, applicationTrackerSelectors.incorrectPWmessage);
    const errorMessageText = await passwordError.getText();
    expect(errorMessageText).toContain("Password is incorrect. Try again, or use another method."); 

    //validate correct signin
    await driver.executeScript("arguments[0].value = '';", PWInput);
    const fieldValue = await PWInput.getAttribute("value");
    console.log("Password field value after clear:", fieldValue);
    await PWInput.sendKeys(password);
    await signinButton.click();
    await driver.sleep(3000);
    const signinIdentifier = await common_functions.getElement(driver, applicationTrackerSelectors.signinIdentifier,false,5000);
    const isDisplayed = await signinIdentifier.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Sign-in identifier element should be displayed");
    
});


// checks existing application exists
test("2. check existing application", async () => {
    const TestCase = "Application Tracker- check application";
    await common_functions.signin(driver);
    const applicationNav = await common_functions.getElement(driver, applicationTrackerSelectors.applicationNav);
    await applicationNav.click();
    const filter = await common_functions.getElement(driver, applicationTrackerSelectors.filter);
    await filter.sendKeys("test");
    await driver.sleep(3000);
    const status = await common_functions.getElement(driver, applicationTrackerSelectors.status);
    const isDisplayed = await status.isDisplayed();
    assert.strictEqual(isDisplayed, true, "status element should be displayed");

    
});

test("3. create new application", async () => {
    const TestCase = "Application Tracker- create new application";
    await common_functions.signin(driver);
    const applicationNav = await common_functions.getElement(driver, applicationTrackerSelectors.applicationNav);
    await applicationNav.click();
    const newApplicationButton = await common_functions.getElement(driver,applicationTrackerSelectors.newApplicationButton);
    await newApplicationButton.click();
    await driver.sleep(3000);
    await common_functions.fillForm(driver);

    const filter = await common_functions.getElement(driver, applicationTrackerSelectors.filter);
    await filter.sendKeys("Company Name");
    await driver.sleep(3000);
    const status = await common_functions.getElement(driver, applicationTrackerSelectors.status);
    const isDisplayed = await status.isDisplayed();
    assert.strictEqual(isDisplayed, true, "status element should be displayed");
    //delete application after it is made and validated
    const deleteButton = await driver.findElement(By.css('button.z-0.group[aria-label="Delete"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", deleteButton);
    await deleteButton.click();


});

test("4. edit existing application", async () => {
    const TestCase = "Application Tracker- edit existing application";
    await common_functions.signin(driver);
    const applicationNav = await common_functions.getElement(driver, applicationTrackerSelectors.applicationNav);
    await applicationNav.click();
    await driver.sleep(2000);

    editButton = await driver.findElement(By.css('a[href^="/applications/"][href$="/edit"]'));
    await editButton.click();
    const companyNameField = await driver.findElement(By.name('companyName'));
    await companyNameField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE); // Select all and delete
    await driver.findElement(By.name('companyName')).sendKeys("edit");
    const saveButton = await driver.findElement(By.xpath('//button[contains(@class, "z-0") and contains(@class, "group") and text()="Save"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", saveButton);
    await saveButton.click();
    const filter = await common_functions.getElement(driver, applicationTrackerSelectors.filter);
    await filter.sendKeys("edit");
    await driver.sleep(3000);
    const status = await common_functions.getElement(driver, applicationTrackerSelectors.status);
    const isDisplayed = await status.isDisplayed();
    assert.strictEqual(isDisplayed, true, "status element should be displayed");



});



afterEach(async () => {
    const testName = expect.getState().currentTestName;
    const encodedString = await driver.takeScreenshot();
    await fs.writeFileSync(`./FailureImages/${testName}.png`, encodedString, "base64");
    let clogs = await driver.manage().logs().get(wd.logging.Type.BROWSER);
    let rlogs = JSON.stringify(clogs, null, 4);
    await fs.writeFileSync(`./FailureImages/${testName}.txt`, rlogs);
});

afterAll(async () => {
    await driver.quit();
});
