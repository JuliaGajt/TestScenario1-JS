Feature: Header Navigation

    As a user, I want to be able to navigate through out user options
    using the header links to get to various pages

    Scenario Outline: I can navigate to various page through header links when logged in/out 

        Given user <email> <isLogged> logged in
        And the browser is at "<pageName>" page
        When the user click on the "<headerOption>" option in the header
        Then the title of the page should be "<pageTitle>"

        Examples:
            |pageName    |headerOption     |pageTitle                  |email                     |isLogged    |
            |My Wish List|My Account       |My Account                 |test.automation@gmail.com |is          |
            |My Account  |My Wish List     |My Wish List               |test.automation@gmail.com |is          |
            |Home        |Sign Out         |                           |test.automation@gmail.com |is          |
            |Home        |Sign In          |Customer Login             |                          |is not      |
            |Cart        |Create an Account|Create New Customer Account|                          |is not      |       
