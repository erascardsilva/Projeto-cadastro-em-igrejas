const sequelize =require('sequelize'); 

const connection = new sequelize({
    dialect: 'sqlite',
    storage: './database/database.db'
  });
  
  module.exports = connection;