Feature: Add to Cart from search result page functionality

    As user, I should be able to add item to caert when logged in/out.
            
    Scenario Outline: user should be able to add item to cart

        Given user <email> <isNot> logged in
        And the browser is at "Search Results for <item>" page
        When adding <product> size: <size> color: <color>, to Cart
        Then the title of the page should be "Search results for: '<item>'"
        And successfully added <product> to Cart message is visible
        And can go to cart with successfully added product link
        And <product> is added to Cart

        Examples:
            |email                      |product                   |isNot   |item              |size    |color  |
            |test.automation@gmail.com  |Radiant Tee               |is      |tee               |M       |Orange |
            |test.automation@gmail.com  |Proteus Fitness Jackshirt |is not  |Fitness Jackshirt |S       |Orange |
