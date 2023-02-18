/*  Projeto criado por 
        Erasmo Cardoso
                NODE.JS " Viva o javascript"     */

//express
const express = require('express');
const app = express();

//sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:///database/database.db');

//body parser 
const bodyParser = require("body-parser");

//sqlite3  e sequelize(bando de dados local)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');
const connection = require('./database/database');
console.log(connection);

//teste banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados !!")
    })
    .catch(() => {
        console.log("Erro nao conectado com banco")
    });

//express
app.set('view engine', 'ejs');
app.set('views', './views'); // pasta views global
app.use(express.static('public')); // pasta views global

//boby parser para analisar pedido HTTP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.get('/', (req, res) => {
    res.render('index')
});

app.get("/cadastrar", (req,res) =>{
    res.render("cadastrar")
});

app.get("/verifcadastro", (req,res) =>{
    res.render("verifcadastro")
});

app.get("/sobre", (req,res)=>{
    res.render("sobre")
});

//servidor online
app.listen(3000, () => { console.log("http://localhost:3000/") })