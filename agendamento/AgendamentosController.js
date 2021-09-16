const express = require("express");
const router = express.Router();
const Agendamento = require("./Agendamento");
const User = require("../users/User");
const Estacao = require("../estacao/Estacao");
const { Op, where } = require("sequelize");
const Sede = require("../sedes/Sede");
const auth = require("../middleware/Auth");
const e = require("cors");
const nodemailer = require("nodemailer")

//get
router.get("/agendamentos",auth, (req, res) => {
  Agendamento.findAll({ include: [{ model: User }] }).then((agendamentos) => {
    res.status(200);
    res.json(agendamentos);
  });
});


// get user agendamentos
router.get("/agendamentos/:id",auth, (req, res) => {
  Agendamento.findAll({
    include: [{ model: Estacao }],
    where: {
      userId: req.params.id,
    },
    order: [['id', 'DESC']],
  }).then((resp) =>{
    res.json(resp)
  }).catch((err) =>{
    res.json(err)
  })
})


//get data
router.get("/agendamentos/:date/:sede",auth, (req, res) => {
  Estacao.findAll({
    where: {
      sedeId: req.params.sede,
    },
  })
    .then((resp) => {
      

      Agendamento.findAll({
        where: {
          date: req.params.date,
        },
      }).then((agendamentos) => {
        var estaco = [];
        
        resp.forEach((estacao) => {
          existe = false;

          agendamentos.forEach((agen) => {
            if (existe == false) {
              if (estacao.id == agen.estacaoId) {
                existe = true;
              }
            }
          });

          
          if (!existe) {
            estaco.push({id: estacao.id, number: estacao.number});
          }  
          Agendamento.findAll({
                include: [{ model: User }],
                where: {
                  date: req.params.date,
                },
              }).then((agendamento) => {
                Estacao.count({
                  where:{
                    sedeId: req.params.sede
                  }
                }).then(quant =>{
                  res.status(200);
                  res.json({ agendamento, estaco, quant });
                }).catch(error =>{
                  res.status(500);
                  res.json(error)
                })
                
              });
        });
      });
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

router.post("/agendamentos",auth, (req, res) => {
  var id = req.body.id;
  var date = req.body.date;
  var estacoes = req.body.estacaoId;
  var entrada = req.body.entrada;
  var saida = req.body.saida;
  var nul = false;

  if (estacoes == undefined) {
    nul = true;
  }
  if (estacoes.length === 0) {
    nul = true;
  }
  if (id == undefined) {
    nul = true;
  }
  if (id.length === 0) {
    nul = true;
  }
  if (date == undefined) {
    nul = true;
  }
  if (date.length === 0) {
    nul = true;
  }
  if (saida == undefined) {
    nul = true;
  }
  if (saida.length === 0) {
    nul = true;
  }
  if (entrada == undefined) {
    nul = true;
  }
  if (entrada.length === 0) {
    nul = true;
  }


  if (nul) {
    res.status(400);
    res.json({ err: "Dados invalidos" });
  } else {
    User.findOne({
      where: {
        id: id,
      },
    })
      .then((user) => {
        if (user != undefined) {

          Agendamento.findOne({
            where: {
              [Op.and]: [{ userId: id }, { date: date }],
            },
          })
            .then((agendamento) => {
              if (agendamento == undefined) {







          Estacao.findOne({
            where: {
              id: estacoes,
            },
          }).then((estaco) => {
            if (estaco != undefined) {
              Agendamento.findOne({
                where: {
                  [Op.and]: [{ estacaoId: estacoes }, { date: date }],
                }
              }).then(existe =>{
                if(existe == undefined){
                  
                        Agendamento.create({
                          userId: id,
                          date: date,
                          estacaoId: estacoes,
                          entrada: entrada,
                          saida: saida
                        })
                          .then(() => {

                            User.findOne({where:{
                              id: id
                            }}).then(usuario=>{
                              Estacao.findOne({where:{
                                id: estacoes
                              }}).then(es=>{

                                const transporter = nodemailer.createTransport({
                                  service: 'Gmail',
                                  secure: true,
                                  auth:{user: "testesquad41@gmail.com",
                                   pass: "teste123@"},
                                   tls: {
                                      rejectUnauthorized: false
                                  }
                                })
                                sedee= ""

                                if(es.sedeId == 1){
                                  sedee = "São Paulo"
                                }else if(es.sedeId == 2){
                                  sedee = "Santos"
                                }
                                arruma_data= []
                                arruma_data = date.split("-");
                          
                                const mailOptions = {
                                  from: "testesquad41@gmail.com", // sender address
                                  to: usuario.email , // receiver (use array of string for a list)

                                
                                  subject: 'Agendamento FCalendar ', // Subject line
                                  html: `Olá  ${usuario.name}, seu agendamento foi realizado com sucesso!!!<br>Segue abaixo os dados do seu agendamento:<br><br><br>Escritório: ${sedee}<br>Data: ${arruma_data[2]}/${arruma_data[1]}/${arruma_data[0]}<br>Estação de trabalho: 1<br>Horário: ${entrada} - ${saida}`,// plain text body
                              
                                };
                          
                                transporter.sendMail(mailOptions, (err, info) => {
                                  if(err)
                                    res.sendStatus(5000);
                                  else
                                  res.status(200);
                                  res.json({ ok: "Agendamento realizado com sucesso" });
                               });



                              }).catch(err=>{
                                res.sendStatus(5001);
                              })

                              
                            }).catch(err =>{
                              res.sendStatus(5002);
                            })

                            



                            
                          })
                          .catch((err) => {
                            res.Sendstatus(5003);
                          });
                      
                }
                else{
                  res.status(401);
                  res.json({ err: "Estação já agendada" });
                }
              })
              
            } else {
              res.status(406);
              res.json({ err: "Estação não existe" });
            }
          });

        } else {
          res.status(403);
          res.json({ err: "Usuario já agendado nesse" });
        }
      })
      .catch((err) => {
        res.Sendstatus(500);
      });











        } else {
          res.status(406);
          res.json({ err: "Usuario não existe" });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({ err: "aaaa" });
      });
  }
});

//delete
router.delete("/agendamento/:id",auth, (req, res) => {
  var id = req.params.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Agendamento.findOne({
        where: {
          id: id,
        },
      }).then((agen) => {
        if (agen) {
          Agendamento.destroy({
            where: {
              id: id,
            },
          }).then(() => {
            res.sendStatus(200);
          });
        } else {
          res.status(400);
          res.json({ err: "Agendamento não existe" });
        }
      });
    } else {
      //NÂO FOR UM NÚMERO
      res.sendStatus(406);
    }
  } else {
    //NULL
    res.sendStatus(406);
  }
});

module.exports = router;
