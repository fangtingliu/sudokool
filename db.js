var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'us-cdbr-iron-east-02.cleardb.net' //127.0.0.1',
    user: 'bcc1fc80012395'//root',
    password: 'bfc5370d' //'',
    database: 'heroku_a2dcd4572cb36d6'
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