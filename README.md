# PizzaMasters

Getting Started with PizzaMasters

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:4200 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

##Information about the project:

## npm start - starts the api and Angular CLI in one terminal

The api is created with mongodb and express. Framework used for the app is Angular. 
The api, angular, html and css are created by me.

Navigation bar for all non-authenticated and authenticated users: Home and Menu pages are visible.

Navigation bar for non-authenticated users: The available pages on the navigation bar are register, login.

Navigation bar for authenticated users: The available pages on the navigation bar are create pizza , posts of current user. There is a logout link too.

Register form has validation messages about the data that is entered when the input box is touched and invalid. Also if the email is already taken an error message is displayed or if the password and confirm password are diffrent an error message will be displayed.

For login page you should login with alrady registered user and enter the correct password or it will display the error messages on the screeen.

Home page has a button that sends yoy to menu page.

Menu page loads all created pizza posts from the data base.

Details page -
1. A logged in user that is owner of the post has premission to edit or delete it
2. A logged in user who is not an owner can order the pizza and after he orders it the text content of the button changes to you have ordered
3. For non-logged user no buttons are displayed.

Create pizza is a page where you can create a pizza that has image, name, info, size and price. When incorrect data is entered and the input filed is touched and invalid errors about the problem are displayed. on the screen.

Edit page: When you change the information about the post and save it it will redirect you to details page with the updated data.

Delete post: When try to delete your post a confirmation dialog will appear on the sceen asking if you are sure you want to delete the post.

Posts of current user: This page will display only the posts that the user has created.

