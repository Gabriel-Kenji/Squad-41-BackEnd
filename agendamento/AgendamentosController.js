const express = require("express");
const router = express.Router();
const Agendamento = require("./Agendamento");
const User = require("../users/User");
const Estacao = require("../estacao/Estacao");
const { Op } = require("sequelize");

//get
router.get("/agendamentos", (req, res) => {
  Agendamento.findAll({ include: [{ model: User }] }).then((agendamentos) => {
    res.status(200);
    res.json(agendamentos);
  });
});

//get data
router.get("/agendamentos/:date/:sede", (req, res) => {
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
                res.status(200);
                res.json({ agendamento, estaco });
              });
        });
      });
    })
    .catch((err) => {
      res.status(500);
      res.send("sss");
    });
});

router.post("/agendamentos", (req, res) => {
  var id = req.body.id;
  var date = req.body.date;
  var estacoes = req.body.estacaoId;
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
  if (nul) {
    res.status(400);
    res.json({ err: "usuario invalido" });
  } else {
    User.findOne({
      where: {
        id: id,
      },
    })
      .then((user) => {
        if (user != undefined) {
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
                  Agendamento.findOne({
                    where: {
                      [Op.and]: [{ userId: id }, { date: date }],
                    },
                  })
                    .then((agendamento) => {
                      if (agendamento == undefined) {
                        Agendamento.create({
                          userId: id,
                          date: date,
                          estacaoId: estacoes,
                        })
                          .then(() => {
                            res.status(200);
                            res.json({ ok: "Agendamento realizado com sucesso" });
                          })
                          .catch((err) => {
                            res.status(500);
                            res.json({ err: "ccccc" });
                          });
                      } else {
                        res.status(406);
                        res.json({ err: "Já existe um agendamento" });
                      }
                    })
                    .catch((err) => {
                      res.status(500);
                      res.json({ err: "bbbb" });
                    });
                }
                else{
                  res.status(406);
                  res.json({ err: "Já existe um agendamento" });
                }
              })
              
            } else {
              res.status(406);
              res.json({ err: "Estação não existe" });
            }
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
router.delete("/agendamento/:id", (req, res) => {
  var id = req.params.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      User.findOne({
        where: {
          id: id,
        },
      }).then((user) => {
        if (user) {
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
