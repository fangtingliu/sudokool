var $ = require('jQuery');
var fs =require('fs');
var knex = require('./db.js');

// insert all the boards to newboards database;
fs.readFile('sudokuJson.txt', 'utf-8', function(err, data){
  if (err) throw err;

  data = data.split("\n");
  //var data = JSON.parse(data);
  for (var key in data) {
    var temp = data[key]
    var re = /\./g;
    temp = temp.replace(/\./g,' ');
    knex('newboards').insert({board: temp})
      .then(function(){
        console.log('Store new board success')
      })
  }
});