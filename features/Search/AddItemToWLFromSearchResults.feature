Feature: Add to Wish List from search result page functionality

    As user, I should be able to add item to wish list when logged.

    Scenario Outline: should not add item to wish list - user not logged in
        Given the browser is at "Search Results for <item>" page
        When adding <product> to Wish List
        Then the title of the page should be "Customer Login"
        And error message "You should login before adding item to Wish List" should be visible

        Examples:
            |item               |product                   |
            |tee                |Radiant Tee               |
            |Fitness Jackshirt  |Proteus Fitness Jackshirt |
            
    Scenario Outline: should add item to wish list - user logged in
        Given user <email> is logged in 
        And the browser is at "Search Results for <item>" page
        When adding <product> to Wish List
        Then the title of the page should be "My Wish List"
        And successfully added <product> to Wish List message is visible
        And <product> is added to Wish List

        Examples:
            |item               |email                      |product                   |
            |tee                |test.automation@gmail.com  |Radiant Tee               |
            |Fitness Jackshirt  |test.automation@gmail.com  |Proteus Fitness Jackshirt |


