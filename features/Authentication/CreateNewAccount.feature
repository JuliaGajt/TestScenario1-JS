Feature: Register new Account

    As user, I should be able to register with valid data.

    Background:
        Given the browser is at "Create an Account" page

        Scenario Outline: Register with valid data 

            When registering user with <firstName>
            Then the title of the page should be "My Account"
            And <firstName> information should be visible
            And successful registration message should be visible

            Examples: 
                |firstName  |
                |Valid      |

        Scenario Outline: User is not registered with invalid data

            When registering user with <firstName>
            Then the title of the page should be "Create New Customer Account"
            And registration error message should be visible

            Examples: 
                |firstName          |
                |Already Exist      |

        Scenario Outline: User is not registered with missing data 

            When registering user with missing <data>
            Then the title of the page should be "Create New Customer Account"
            And missing <data> message should be visible

            Examples: 
                |data                  |
                |firstname             |
                |lastname              |
                |email                 |
                |password              |
                |password confirmation |


        Scenario Outline: User is not registered with missing data 

            When registering user with different passwords
            Then the title of the page should be "Create New Customer Account"
            And password confirmation differ message should be visible

