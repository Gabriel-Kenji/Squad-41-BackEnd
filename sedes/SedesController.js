const express = require("express");
const router = express.Router();
const Sede = require("./Sede")
const auth = require("../middleware/Auth")


router.get('/sedes',auth, (req,res)=>{
    Sede.findAll().then((sedes) => {
        res.status(200);
        res.json(sedes);
      });
})

router.get('/sedess',auth, (req,res)=>{
  Sede.findOne({
    where: {
      name: 'teste',
    }}).then((sedes) => {
      res.status(200);
      res.json(sedes);
    });
})

console.log("sede")
module.exports = router;