# Info

This is a store/cms front-end built all in React. There is no backend so there is no authentication and data resets on page load.

Becauase all product fields are optional, price and data fields can be left empty when creating content, resulting in more of a CMS system than a store.

# Features

The features fall into 3 categories:

1. Content Search
    * Find products by selecting different combinations of tag and price filters
    * Add a search term to further refine your search
2. Favorite System
    * Click the heart in the top-left corner of each product to save it to the list of favorites
    * Access this list by clicking the favorites's count in the header. This opens the favorites modal.
    * Inside the favorite modal you can remove favorites from the favorite list
    * Products can also be removed from the favorite list by clicking on the heart a second time
3. Product Administration
    * On hover of content, buttons appear to edit or remove
    * The cancel button automatically rolls back any changes made to the content while in edit-mode
    * New content can be added by clicking the "add new product" button in the top left of the header
    * If content is added with tags not previously used by other content, those tags are automatically addd to the sidebar



