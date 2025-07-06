const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")

const connection = require("./database/database")


const UsersController = require("./users/UsersController")
const SedesController = require("./sedes/SedesController")
const EstacaoesController = require("./estacao/EstacoesController")
const AgendamentoController = require("./agendamento/AgendamentosController")


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use("/", UsersController)
app.use("/", SedesController)
app.use("/", EstacaoesController)
app.use("/", AgendamentoController)



//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {   
        console.log(error)
    })

// Define a porta a partir da variável de ambiente ou usa 3000 como padrão.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso na porta ${PORT}`);
})
