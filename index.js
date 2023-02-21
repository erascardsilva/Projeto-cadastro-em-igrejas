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
const GravaDados = require("./database/Cadastrograva");
const { GEOGRAPHY } = require('sequelize');
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
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//rotas
app.get('/', (req, res) => {
   
    res.render('index')
});

app.get("/cadastrar", (req, res) => {
    res.render("cadastrar")
});

app.get("/sobre", (req, res) => {
    res.render("sobre")
});

app.get("/verifcadastro", (req, res) => {
    //acessa dados salvos do banco de dados
    GravaDados.findAll({raw: true}).then(verdados=>{
        res.render("verifcadastro",{
            verdados : verdados})
    });
    
});

app.post("/rotaform", (req,res) =>{
    let nome = req.body.nome;
    let cpf =  req.body.cpf;
    let cep = req.body.cep;
    let endereco = req.body.endereco;
    let data = req.body.data;
    let telefone = req.body.telefone;
  
    GravaDados.create({
        nome: nome,
        cpf: cpf,
        cep: cep,
        endereco: endereco,
        data: data,
        telefone: telefone || null
    }).then(()=>{
        res.redirect("/cadastrar");
    })
      
})
app.get("/verifcadastro/:id", (req,res) => {
    const id = req.params.id;

    GravaDados.findAll({
        where : {ID : id}
    }).then(registro => {
        if (registro) {
            // Se encontrou um registro com o ID especificado, envie os dados como resposta
            res.send("Ok UFA")
        } else {
            // Se não encontrou um registro com o ID especificado, envie uma mensagem de erro
            res.status(404).send("Registro não encontrado.");
        }
    }).catch(erro => {
        // Se ocorreu um erro ao buscar o registro, envie uma mensagem de erro
        res.status(500).send("Erro ao buscar registro.");
    });
});

app.post("/delete", (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            GravaDados.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/verifcadastro");
            });
        } else {
            // Trate o erro quando o id não é um número
            res.redirect("/");
        }
    } else {
        // Trate o erro quando o id é indefinido
        res.redirect("/");
    }
});

app.get("/editacadastro/:id",(req,res) => {
    let id = req.params.id;

   GravaDados.findByPk(id).then(edita => {
        if(edita != undefined){
            res.redirect("/")
        }else{
            res.render("cadastrar");
        }
   }).catch(erro =>{
    res.render("/");

   })
   
   
      
    
});


//servidor online
app.listen(3000, () => {
    console.log("http://localhost:3000/")
})