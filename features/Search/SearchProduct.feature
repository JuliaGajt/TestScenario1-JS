Feature: Search Product

    As user, I want to search for certain type of Product
    or for exact product so I can purchase ones.

    Scenario Outline: Search for item that exist when logged in/out

        Given user <email> <isLogged> logged in
        And the browser is at "<pageName>" page
        When user seach "<term>"
        Then the title of the page should be "<pageTitle>"
        And products should be listed
        And related terms to "<term>" should be listed and contain search term

        Examples: 
            |email                      |isLogged|pageName  |term                       |pageTitle                                      |
            |test.automation@gmail.com  |is      |Home      |tee                        |Search results for: 'tee'                      |
            |                           |is not  |Home      |Proteus Fitness Jackshirt  |Search results for: 'Proteus Fitness Jackshirt'|


    Scenario Outline: Search for item that doesn't exist when logged in/out

        Given user <email> <isLogged> logged in
        And the browser is at "<pageName>" page
        When user seach "<term>"
        Then the title of the page should be "<pageTitle>"
        And no products should be listed
        And no related terms to "<term>" should be listed and contain search term
        And message "no results" should be visible

        Examples:
            |email                      |isLogged|pageName  |term     |pageTitle                    |
            |test.automation@gmail.com  |is      |Home      |unicorn  |Search results for: 'unicorn'|
            |                           |is not  |Home      |abcde    |Search results for: 'abcde'  |

    