const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const connection = require("./database/database")

const UsersController = require("./users/UsersController")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use("/", UsersController)

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {
        console.log(error)
    })

    var DB = {

        games: [
            {
                id: 200,
                title: "COD",
                year: 2020,
                price: 60
            }, 
            {
                id: 201,
                title: "God",
                year: 2021,
                price: 60
            }, 
            {
                id: 202,
                title: "GTA",
                year: 2012,
                price: 50
            },
        ]
    }
    

app.listen(5000,()=>{
    console.log("Iniciado com sucesso")
})
