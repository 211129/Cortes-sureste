const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")

const mysqlConnection = require('../database.js');

router.post('/api/auth/register', async (req, res) => {

    const { id_cliente, nombres, apellidos, direccion, ciudad, telefono, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const validator_query = "SELECT email FROM clientes WHERE email = ?"

    const query = `
    SET @id_cliente = ?;
    SET @nombres = ?;
    SET @apellidos = ?;
    SET @direccion = ?;
    SET @ciudad = ?;
    SET @telefono = ?;
    SET @email = ?;
    SET @password = ?;
    CALL clientesAddOrEdit(@id_cliente, @nombres, @apellidos, @direccion,
        @ciudad, @telefono, @email, @password);
    `;
    try {
        mysqlConnection.query(validator_query, ['email'], (err, result) => {
            if(!err) {
              if (result.length > 0) {
                res.json({status: 'El email ya existe!'})
                res.sendStatus(409);
              }else{
                mysqlConnection.query(query, [id_cliente, nombres, apellidos, direccion, ciudad, telefono, email, hashedPassword], (err, rows, fields) => {
                    if(!err) {
                      res.json({status: 'Usuario guardado'});
                    } else {
                      console.log(err);
                    }
                  });
                }
            } else {
              console.log(err);
            }
        });

    } catch (error) {
        console.log(error);
    }
});

router.post('/api/auth/login',(req, res) => {
    
    const {email, password } = req.body;
    const validator_query = "SELECT * FROM clientes WHERE email = ?"
    try {
        mysqlConnection.query(validator_query, [email], async (err, result, fields) => {
            if (!err) {
                if (result.length == 0) {
                    res.send('No se encontro la cuenta')
                    res.sendStatus(404);
                }else{
                    const hashedPassword = result[0].password
                    if (await bcrypt.compare(password, hashedPassword)) {
                        res.json({
                            status:`${email} Esta logeado!`,
                            usuario: result[0]
                        });
                        return result;
                    } 
                    else {
                        res.send({status:'Contraseña incorrecta'});
                    }
                }
            } 
        });
    } catch (error) {
        log(error)
    }
    
});

module.exports = router;
