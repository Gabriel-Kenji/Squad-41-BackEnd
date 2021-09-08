const express = require("express");
const router = express.Router();
const Sede = require("./Sede")


router.get('/sedes', (req,res)=>{
    Sede.findAll().then((sedes) => {
        res.status(200);
        res.json(sedes);
      });
})

console.log("sede")
module.exports = router;