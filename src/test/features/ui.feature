Feature: Polarstar Home Page

Scenario: Verify the page title
Given I navigate to the configurated URL
Then I verify the title matches the configured value

Scenario: Verify error message on invalid login
Given I navigate to the configurated URL
Then I clicked on the login button
Then I entered the email address
Then I entered the password
Then I clicked on login
Then I verified the error message is as expected

Scenario: Configure a Polestar 3 vehicle
Given I navigate to the configurated URL
Then I select Polestar 3
Then I configure the Polestar 3
Then I continue the configuration
Then I search for a location and click on Continue