import {Given, Then} from "@cucumber/cucumber";
import * as fs from 'fs';
import {chromium, Page, Browser} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { strict as assert } from 'assert';


// Read test locators from the JSON file
let locators = JSON.parse(fs.readFileSync('config/testLocators.json', 'utf8'));

// Read data from the testConfig.json file
let testData = JSON.parse(fs.readFileSync('config/testConfig.json','utf8')).uiTests;


Given('I navigate to the configurated URL', async function () {
  
  
    await pageFixture.page.goto(testData[0].url);
    try {
      await pageFixture.page.getByRole(locators.acceptAllButton.role, { name: locators.acceptAllButton.name }).click();
      console.log('Accepted cookie consent popup');
    } catch (error) {
      console.log('No popup appeared or error accepting the popup:', error);
    }
  });
  
  Then('I verify the title matches the configured value', async function () {
    const title = await pageFixture.page.title();
    const expTitle = testData[0].expTitle;
    if (title !== expTitle) {
      throw new Error(`Expected title to be "${expTitle}", but got "${title}"`);
    }
  });
  

  Then('I clicked on the login button', async function () {
    await pageFixture.page.click(locators.loginButton);
    console.log('Clicked on the login button');
  });
  
  Then('I entered the email address', async function () {
    await pageFixture.page.fill(locators.emailField, testData[0].invalidEmail);
    console.log('Entered Email id');
  });
  
  Then('I entered the password', async function () {
    await pageFixture.page.fill(locators.passwordField, testData[0].invalidPassword);
    console.log('Entered password');
  });
  
  Then('I clicked on login', async function () {
    await pageFixture.page.click(locators.loginBtn);
    console.log('Clicked on the login button');
  });
  
  Then('I verified the error message is as expected', async function () {
    const errorMessage = await pageFixture.page.waitForSelector(locators.errorMessage, {
      timeout: 9000,
    });
  
    const messageText = await errorMessage.textContent();
    assert.strictEqual(messageText, "We didn't recognize the username or password you entered. Please try again.");
    console.log('Error message verified');
  });

  Then('I select Polestar 3', async function () {
    await pageFixture.page.getByRole(locators.polestar3Button.role, { name: locators.polestar3Button.name }).click();
    console.log('Navigated to polestar 3 button');
  });
  
  Then('I configure the Polestar 3', async function () {
    await pageFixture.page.getByLabel(locators.configureButton.label).click();
    console.log('Navigated to Polestar 3 Configure page');
    await pageFixture.page.getByRole(locators.motorOption.role, { name: locators.motorOption.name }).click();
    await pageFixture.page.getByLabel(locators.colorOption.label).click();
    await pageFixture.page.getByLabel(locators.leatherOption.label).click();
    await pageFixture.page.getByLabel(locators.upgradeOption.label).click();
  });
  
  Then('I continue the configuration', async function () {
    await pageFixture.page.getByRole(locators.continueButton.role, { name: locators.continueButton.name }).click();
    console.log('Clicked on Continue');
  });
  
  
  Then('I search for a location and click on Continue', async function () {
    await pageFixture.page.getByRole(locators.searchLocationTab.role, { name: locators.searchLocationTab.name }).click();
    await pageFixture.page.getByRole(locators.locationButton.role, { name: locators.locationButton.name }).click();
    await pageFixture.page.locator('.css-1ij60oe').click();
    await pageFixture.page.getByRole(locators.continueLocationButton.role, { name: locators.continueLocationButton.name }).click();
    console.log('Clicked on Continue');
  });
  