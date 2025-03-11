Feature: Contact Us

Scenario: Validates contact us page
    Given I login to the application
    When I navigate to Contact us page
    Then I should see the contact us page information
