Feature: Go to Product page from Search Result page

    As user, I should be able to go to Product page from search Results
            
    Scenario Outline: user can go to product page

        Given user <email> <isNot> logged in
        And the browser is at "Search Results for <item>" page
        When clicking <product> card
        Then the title of the page should be "<product>"

        Examples:
            |email                      |product                   |isNot   |item              |size    |color  |
            |test.automation@gmail.com  |Radiant Tee               |is      |tee               |M       |Orange |
            |test.automation@gmail.com  |Proteus Fitness Jackshirt |is not  |Fitness Jackshirt |S       |Orange |
