const express = require("express");
const router = express.Router();
const Agendamento = require("./Agendamento");
const User = require("../users/User");
const { Op } = require("sequelize");

//get
router.get("/agendamentos", (req, res) => {
  Agendamento.findAll({ include: [{ model: User }] }).then((agendamentos) => {
    res.status(200);
    res.json(agendamentos);
  });
});

//get data
router.get("/agendamentos/:date",(req,res)=>{
    Agendamento.findAll({ include: [{ model: User }], where:{
        date: req.params.date,
      }, }).then((agendamentos) => {
        res.status(200);
        res.json(agendamentos);
      });
})

router.post("/agendamentos", (req, res) => {
  var id = req.body.id;
  var date = req.body.date;
  var nul = false;

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
                })
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch((err) => {
                    res.sendStatus(500);
                  });
              } else {
                res.status(406);
                res.json({ err: "já cadastrado" });
              }
            })
            .catch((err) => {
                res.sendStatus(500);
                
            }); 
        } else {
          res.status(406);
          res.json({ err: "E-mail já cadastrado" });
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }
});

//delete
router.delete("/users/:id", (req, res) => {
  var id = req.params.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      User.findOne({
        where: {
          id: id,
        },
      }).then((user) => {
        if (user) {
          User.destroy({
            where: {
              id: id,
            },
          }).then(() => {
            res.sendStatus(200);
          });
        } else {
          res.status(400);
          res.json({ err: "Usuario não existe" });
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

console.log("Agendamento");
module.exports = router;
