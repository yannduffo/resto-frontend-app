**08/11/2024 UPDATE**

# appResto6 - Yann DUFFO

This is my work for the 6th assigment. 
The aim here is to take the work from the 5th assignment and improve it (by using API communication with a back-end server to retreive or send data) and also by improving my app by adding fonctionnalities.

To enable exchanges between my application and a server, I've coded a simple REST API myself that lets me manage data on a remote server and respond to requests from my application. The API is available here: https://github.com/yannduffo/simple-rust-rest-api.

# Basilico App

I choose to build an app for a fancy italian restaurant.
There are currently 5 pages (each page got a diffrent "screen" in the ./screens/ repertory): 
- The landing page (front page) where there are 2 buttons "ORDER" and "BOOK"
- The "Order" page where it is going to be a list of the dish proposed by the restaurant (the list come from the data received from the API) (with a full working search bar). Each dish will be cliackable to obtain some details -> a click on a dish open a DishDetailScreen.
- The "Book" page where it will be possible to book a table on a specific day at a fixed hour with a simple form (sending a reservation to the API)
- The DishDetailScreen who is dynamiquely generated regarding which dish was clicked on the OrderScreen. You can add a product in the cart from this page.
- The CartScreen which is a Cart where you see the products you added and remove them if you want (there also is a button to checkout)

--> These pages are created with the react-navigation library with the "stack" navigation method

# What was done for the Assignment 6

- Creating a REST API to handle request from our app (https://github.com/yannduffo/simple-rust-rest-api). For now this API has 2 endpoints for now : 
    - ```GET /dishes/``` to get all dishes
    - ```POST /bookings``` to post a new booking in the restaurant database
- Send booking data to the server using the REST API when the user complete the booking form and click on 'confirm appointment' (on the book screen). The app make a POST request to the API with all the bookings details to add a new booking the database (Using fetch method to create the POST request).
- Grab the list of dishes from this server  when we need to display the list of dishes : 
    - Use of useEffect() + function async/await + fetch method (to create the GET request)
    - Implementation of a loading screen while retreiving the datas
    - The data are also passed to DishDetailScreen as before

**08/11/2024 UPDATE :**
- Improving my rust REST API to taking in account 3 more endpoints : 
    - ```GET /bookings``` to get the list of all the bookings
    - ```PUT /bookings/{phone_number}``` to edit a booking indentifed by its phone number
    - ```DELETE /bookings/{phone_number}``` to delete a booking indentified by its phone number
- Improving the BookingScreen : 
    - Adding a list of all the booking at the bottom of the Scrollview (using GET /booking endpoint and frequently updated using a useEffect hook)
    - Adding the possibility to delete booking from this list (using a "delete" button associated with the booking)
    - Adding the possibility to edit a booking. Again from the list click on "edit" button and the form is filled with the booking info. As there is already a booking using this phone number (used here as our unique indentifier), the "handlebooking" function adapt the request to a PUT request to modify the booking. Drawbacks : one phone number can only have 1 booking at a time.

# What to do next ? 

### Main work :
- Send ordering data from the cart to the server using the REST API when the user click on 'Proceed to order' (more complicated cause the table of dishes don't have the same shape everytime and we need to impelment a "authentification system")

### Small improvment :
- Add a button to remove a dish from the cart directly from the DishDetailScreen (like a "- 1 +") to improve user experience
- Add a button to get to the cart directly from a DishDetailScreen

### Bug fixing : 
- Correct the warnings types by creating explicite types (according to the TSX syntaxe)
- Correct the warning saying that flatlist should be nested on scrollviews (bookingscreen)