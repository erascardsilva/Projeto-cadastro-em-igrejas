const { Sequelize, DataTypes } = require("sequelize");
const connection = require("./database");

const GravaDados = connection.define('GravaDados', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    
    
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

// Sincronize o modelo com o banco de dados
connection.sync()
  .then(() => {
    console.log("Tabela criada com sucesso");
  })
  .catch((error) => {
    console.log("Erro ao criar tabela:", error);
  });

  module.exports = GravaDados;
