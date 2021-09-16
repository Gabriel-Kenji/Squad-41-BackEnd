const express = require("express");
const router = express.Router();
const Estacao = require("./Estacao");
const Sede = require("../sedes/Sede");
const { Op } = require("sequelize");

router.get("/estacoes", (req, res) => {
  Estacao.findAll().then((estacao) => {
    res.status(200);
    res.json(estacao);
  });
});


router.get("/estacoes/:sede", (req, res) => {
  Estacao.findAll({
    where: {
      sedeId: req.params.sede
    }}
  ).then((estacao) => {
    res.status(200);
    res.json(estacao);
  });
});

router.post("/estacoes", (req, res) => {
  var num = req.body.num;
  var sede = parseInt(req.body.sede);
  var nul = false;

  if (num == undefined) {
    nul = true;
  }
  if (num.length === 0) {
    nul = true;
  }

  if (sede == undefined) {
    nul = true;
  }
  if (sede.length === 0) {
    nul = true;
  }

  if (nul) {
    res.status(400);
    res.json({ err: "Dados invalidos" });
  } else {
    Sede.findOne({
      where: {
        id: sede,
      },
    })
      .then((sedes) => {
        if (sedes != undefined) {
          Estacao.findOne({
            where: {
              [Op.and]: [{ number: num }, { sedeId: sede }],
            },
          }).then((estacao) => {
            if (estacao == undefined) {
              Estacao.create({
                number: num,
                sedeId: sede,
              })
                .then(() => {
                  res.status(200);
                  res.json({ ok: "Estação cadastrada com sucesso" });
                })
                .catch((err) => {
                  res.sendStatus(500);
                });
            } else {
              res.status(400);
              res.json({ err: "Estação ja existe" });
            }
          });
        } else {
          res.status(400);
          res.json({ err: "A sede não existe" });
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }
});



module.exports = router;
