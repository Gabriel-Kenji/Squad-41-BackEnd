const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const connection = require("./database/database")

const UsersController = require("./users/UsersController")
const SedesController = require("./sedes/SedesController")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use("/", UsersController)
app.use("/", SedesController)

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {
        console.log(error)
    })



app.listen(5000,()=>{
    console.log("Iniciado com sucesso")
})
