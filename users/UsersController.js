const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const auth = require("../middleware/Auth")
const jwt = require("jsonwebtoken");
const JWTSecret = "ndsuhiudnfijuwsnfoukhwepijewpjrilçwjngfojweoh";

//get
router.get("/users",auth, (req, res) => {
  User.findAll().then((users) => {
    res.status(200);
    res.json(users);
  });
});

//get one
router.get("/users/:id",auth, (req, res) => {
  var id = req.params.id;
  User.findOne({
    where: {
      id: id,
    },
  }).then((user) => {
    res.status(200);
    res.json(user);
  });
});

//create
router.post("/users", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name

  var nul = false;
  if (name == undefined) {
    nul = true;
  }
  if (name.length === 0) {
    nul = true;
  }
  if (email == undefined) {
    nul = true;
  }
  if (email.length === 0) {
    nul = true;
  }
  if (password == undefined) {
    nul = true;
  }
  if (password == "") {
    nul = true;
  }

  if (nul) {
    res.status(400);
    res.json({ err: "Existem campos vazios" });
  } else {
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user == undefined) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(password, salt);
          User.create({
            name: name,
            email: email,
            password: hash
          })
            .then(() => {
              res.sendStatus(200);
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
router.delete("/users/:id",auth, (req, res) => {
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

//edit

router.put("/users/:id",auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(406);
  } else {
    var id = parseInt(req.params.id);
    User.findOne({ where: { id: id } }).then((user) => {
      if (user != undefined) {
        var { password, admin } = req.body;

        if (password != undefined) {
          if (password != "") {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            User.update(
              {
                password: hash,
              },
              {
                where: {
                  id: id,
                },
              }
            );
          }
        }

        if (admin != undefined) {
          if (admin != "") {
            User.update(
              {
                admin: admin,
              },
              {
                where: {
                  id: id,
                },
              }
            );
          }
        }
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  }
});

router.post("/login", (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user != undefined) {
          var correct = bcrypt.compareSync(password, user.password);
          if (correct) {
            jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              JWTSecret,
              { expiresIn: "48h" },
              (err, token) => {
                if (err) {
                  res.status(402);
                  res.json({ err: "Falha interna" });
                } else {
                  res.status(200);
                  res.json({ token: token, id: user.id });
                }
              }
            );
          } else {
            res.status(401);
            res.json({ err: "Credenciais inválidas!" });
          }
        } else {
          res.status(404);
          res.json({ err: "O E-mail enviado não existe na base de dados" });
        }
      })
      .catch((err) => {
        res.status(404);
        res.json({ err: "O E-mail enviado não existe na base de dados" });
      });
  } else {
    res.status(400);
    res.json({ err: "O E-mail enviado é inválido" });
  }
});

router.post("/auth",(req,res)=>{
  token = req.body.token
  if(token!=undefined){

    jwt.verify(token,JWTSecret,(err,data)=>{
        if(err){
            res.status(401)
            res.json({err:"Token inválido"})
        }else{
            req.token = token
            req.loggedUser = {id: data.id , email: data.email}
            res.sendStatus(200)
        }
    })
  }else{
      res.status(401)
      res.json({err:"Token inválido"})
  }
})


console.log("user")
module.exports = router;
