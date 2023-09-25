Feature: Sign In

    As user, I should be able to login to website with valid data.

    Background:
        Given the browser is at "Sign In" page

        Scenario Outline: Login with valid data 

            When user sign in with <email>
            Then the title of the page should be "My Account"
            And <email> information should be visible

            Examples: 
                |email                      |
                |test.automation@gmail.com  |


        Scenario Outline: Can't login with invalid data 

            When user sign in with <email>
            Then the title of the page should be "Customer Login"
            And error about invalid <email> data should be visible

            Examples: 
                |email           |
                |test@gmail.com  |


        Scenario Outline: Can't login with missing data 

            When user sign in with missing <creds>
            Then the title of the page should be "Customer Login"
            And error about missing <creds> data should be visible

            Examples: 
                |creds              |
                |email              |
                |password           |
                |all creds          |





