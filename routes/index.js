var express = require('express');
var router = express.Router();
var knex = require('../db.js');
var bcrypt   = require('bcrypt-nodejs');

// Improvement Point //
/*
  1. add bcrypt to store password like in the database project;
  2. create a model for server to access data throught knex;
  3. send randomly generated board to client view presenter
*/

function checkUser(req, res) {
  if (req.cookies.user) {
    res.redirect('/user/' + req.cookies.user);
  } else {
    res.render('index', { user: false});

    //attempt to pass the randomly generated borad to client side presenter
    // var id = Math.floor(Math.random() * 100);
    // console.log('id', id)
    // knex.select('board').from('newboards').where({id: id})
    //   .then(function(board){
    //     console.log('board', board);
    //     res.render('index', { user: false, board: JSON.stringify(board) })
    //   });

  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  checkUser(req, res);
});

router.get('/about', function(req, res, next) {
  res.render('about', { user: req.cookies.user });
});

router.get('/signout', function(req, res, next) {
  var cookie = req.cookies;
  res.cookie('user', '');
  res.redirect('/'); 
});

router.get('/signin', function(req, res, next) {
  res.render('signin',{ user: false });
});


router.get('/user/*', function(req, res, next) {
  res.render('logedin', { user: req.cookies.user });
});

router.get('/signup', function(req, res, next) {
  res.render('signup',{ user: false });
});

router.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password
  knex.table('users').where({username: username})
    .then(function(user){
      if (user.length !== 0) {
        console.log('Account already exists');
        res.redirect(409, 'signup');
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            return next(err);
          }

          // hash the password along with our new salt
          bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
              return console.error(err);
            }

            // override the cleartext password with the hashed one
            password = hash;
            salt = salt;
            knex('users').insert({username: username, password: password})
            .then(function (result) {
              var cookie = req.cookies;
              res.cookie('user', username);
              res.redirect('/user/' + username);
            })
            .catch(function(err){
              console.log('err', err);
              res.redirect(500, 'signup');
            })
          });
        });
      }
    })
});

router.post('/signin', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password
  knex.table('users').where({username: username})
    .then(function(user){
      if (user.length === 0) {
        console.log('No user exist!');
        res.redirect(409, '/signin');
      } else if (user[0].password !== password) {
        console.log('Invalid password!');
        res.redirect(409, '/signin');
      } else {
        var cookie = req.cookies;
        res.cookie('user', username);
        res.redirect('/user/' + username);
      }

    })
});

router.get('/*', function(req, res, next) {
  res.redirect('/');
});
module.exports = router;
