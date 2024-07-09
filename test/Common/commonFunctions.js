/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const fs = require("fs");
const { By, until, Key } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const createDriver = require('../Common/createDriver');
const Selectors = require("../Common/selectors.js");
const testConfig = require("../Common/testConfig.js");
// const processWindows = require("../Common/node-process-windows");
const chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOptions = {
    args: ["--test-type"] // --start-maximized
    // 'args': ['--test-type','--headless','--window-size=1024,768'] //--start-maximized
};
chromeCapabilities.set("chromeOptions", chromeOptions);

exports.fillForm = async function(driver)
{  try {
    // Fill out the form
    await driver.findElement(By.name('companyName')).sendKeys("Company Name");
    await driver.findElement(By.name('position')).sendKeys("Job Title");
    await driver.findElement(By.name('location')).sendKeys("Location");
    await driver.findElement(By.name('applicationLink')).sendKeys("https://example.com");

    // Click on the Work Type dropdown to open it
    await driver.findElement(By.xpath('//label[contains(text(), "Work Type")]/ancestor::button')).click();
    await driver.findElement(By.xpath('//span[@data-label="true" and contains(text(), "Remote")]')).click();

    // Click on the Application Status dropdown to open it
    await driver.findElement(By.xpath('//label[contains(text(), "Application Status")]/ancestor::button')).click();
    await driver.findElement(By.xpath('//span[@data-label="true" and contains(text(), "Applied")]')).click();

     // Fill Application Date
     const applicationDateValue = '07/08/2024'; // mm/dd/yyyy format

     // Split the date into day, month, year
     const [appDateMonth, appDateDay, appDateYear] = applicationDateValue.split('/');

     // Click on the Application Date picker to open it
     const applicationDatePickerButton = await driver.findElement(By.xpath('//span[text()="Application date"]/ancestor::div[@data-slot="input-wrapper"]//button'));
     await applicationDatePickerButton.click();

     // Select month
     const appDateMonthField = await driver.findElement(By.xpath('//span[text()="Application date"]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="month"]'));
     await appDateMonthField.clear();
     await appDateMonthField.sendKeys(appDateMonth);

     // Select day
     const appDateDayField = await driver.findElement(By.xpath('//span[text()="Application date"]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="day"]'));
     await appDateDayField.clear();
     await appDateDayField.sendKeys(appDateDay);

     // Select year
     const appDateYearField = await driver.findElement(By.xpath('//span[text()="Application date"]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="year"]'));
     await appDateYearField.clear();
     await appDateYearField.sendKeys(appDateYear);



    // Click on another field to ensure the date picker closes (example: location field)
    await driver.findElement(By.name('location')).click();
 // Fill Follow up Date
 const followUpDateValue = '07/10/2024'; // mm/dd/yyyy format

 // Split the date into day, month, year
 const [followUpMonth, followUpDay, followUpYear] = followUpDateValue.split('/');

 // Click on the Follow up Date picker to open it
 const followUpDatePickerButton = await driver.findElement(By.xpath('//span[contains(text(), "Follow up date")]/ancestor::div[@data-slot="input-wrapper"]//button'));
 await followUpDatePickerButton.click();

 // Select month
 const followUpMonthField = await driver.findElement(By.xpath('//span[contains(text(), "Follow up date")]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="month"]'));
 await followUpMonthField.clear();
 await followUpMonthField.sendKeys(followUpMonth);

 // Select day
 const followUpDayField = await driver.findElement(By.xpath('//span[contains(text(), "Follow up date")]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="day"]'));
 await followUpDayField.clear();
 await followUpDayField.sendKeys(followUpDay);

 // Select year
 const followUpYearField = await driver.findElement(By.xpath('//span[contains(text(), "Follow up date")]/ancestor::div[@data-slot="input-wrapper"]//div[@data-type="year"]'));
 await followUpYearField.clear();
 await followUpYearField.sendKeys(followUpYear);


    // Click on another field to ensure the date picker closes (example: location field)
    await driver.findElement(By.name('location')).click();

    const saveButton = await driver.findElement(By.xpath('//button[contains(@class, "z-0") and contains(@class, "group") and text()="Save"]'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", saveButton);
    await saveButton.click();
    // Wait for submission to complete (if there's any confirmation or redirect)
    await driver.sleep(3000); // Adjust wait time as necessary
} catch (error) {
    console.error('Error occurred:', error);
}
};

exports.signin = async function (driver) {
    try {
        const URL = testConfig.testPage;
        const username = testConfig.username;
        const password = testConfig.password;

        // Navigate to the URL
        await driver.get(URL);

        // Find the username input field and enter username
        const usernameInput = await driver.wait(until.elementLocated(By.xpath("//input[@name='identifier']")), 10000);
        await usernameInput.sendKeys(username);

        // Find the password input field and enter password
        const PWInput = await driver.findElement(By.xpath("//input[@type='password' and @name='password']"));
        await PWInput.sendKeys(password);

        // Find the sign-in button and click
        const signinButton = await driver.findElement(By.xpath("//button[text()='Sign In']"));
        await signinButton.click();

        // Optionally, you can add further steps after sign-in, such as validation or navigation

    } catch (error) {
        console.error("Error occurred during sign-in:", error);
        throw error; // Re-throw the error to fail the test if sign-in fails
    }
};


exports.getElement = async function (driver, elementSelector, nofail, wait) {
    try {
        const SelectorType = elementSelector[1];
        let timeout = 15000;
        if(wait) { timeout = wait; }
        if(SelectorType === "id") {
            const element =
    await driver.wait(until.elementLocated(By.id(elementSelector[0])), timeout);
            return element;
        }

        if(SelectorType === "class") {
            const element =
      await driver.wait(until.elementLocated(By.className(elementSelector[0])), timeout);
            return element;
        }

        if(SelectorType === "xpath") {
            const element =
     await driver.wait(until.elementLocated(By.xpath(elementSelector[0])), timeout);
            return element;
        }

        if(SelectorType === "name") {
            const element =
     await driver.wait(until.elementLocated(By.name(elementSelector[0])), timeout);
            return element;
        }
      
        if(SelectorType === "css") {
            const element =
      await driver.wait(until.elementLocated(By.css(elementSelector[0])), timeout);
            return element;
        }
    } catch(e) {
        if(nofail === true) {
            console.log(`Couldn't find ${elementSelector[2]} is it's Selector still of type ${elementSelector[1]} with value ${elementSelector[0]}`);
        } else {
        // eslint-disable-next-line no-undef
            throw new Error(`Couldn't find ${elementSelector[2]} is it's Selector still of type ${elementSelector[1]} with value ${elementSelector[0]}`);
        }
    }

    return 0;
};
// Finds element within a shadow DOM.Use case below
// shadowrootelementselector = signinSelectors.rootElement - The Shadow DOM root element
// elementSelector - signInSelectors.DOMelement - The element in a shadow DOM you want to find
// nofail - True/false - do you want test to fail if you can't find the element, defaults to false
// waitfor - how long to search for EACH element, not just the DOM element, defaults to 10000
// ManualContainerSelector - In browsers other thann chrome we need to use getShadowRootElement to find child elements
// This means the first element in a shadow Dom needs to be found as well as the root. The getContainer will do this automatically for most equatio
// functions but if you want to specifiy it manually we can pass it in with this variable.
