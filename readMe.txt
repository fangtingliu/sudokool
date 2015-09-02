This is my first personal project. It functions as a infinite sudoku game 
store. Any user can play a game and store all played games and track performance by registering the app.

Currently, it allows users to signup/login/logout. Signed users have more views than otherwise. One is provided to user to play. Solution check function is stored in presenter.




// Improvement Point //

// server side

/*
  1. add bcrypt to store password like in the database project;
  2. create a model for server to access data throught knex;
  3. send randomly generated board to client view presenter
*/

// client side

/* 
  1. create one more button for game storage;
  2. send ajax request to server to store games for user;
  3. use D3 library to show performance;
*/