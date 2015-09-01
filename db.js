var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sudokool'
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(t) {
      t.increments('id').primary();
      t.string('username', 50);
      t.string('password', 100);
      t.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
});

knex.schema.hasTable('boards').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('boards', function(t) {
      t.increments('id').primary();
      t.string('boardName', 50);
      t.integer('userId');
      t.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
})

knex.schema.hasTable('newboards').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('newboards', function(t) {
      t.increments('id').primary();
      t.string('board');
      t.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
})

module.exports = knex;