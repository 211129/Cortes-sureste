const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

//Obtener todos los cortes
router.get('/api/cortes', (req, res) => {
  mysqlConnection.query('SELECT * FROM cortes', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// Obtener un corte
router.get('/api/cortes/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM cortes WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// Borrar un corte
router.delete('/api/cortes/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cortes WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'corte eliminado'});
    } else {
      console.log(err);
    }
  });
});

// Crear un corte
router.post('/api/cortes', (req, res) => {
  const {id, nombre, caducidad, ciudad} = req.body;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @caducidad = ?;
    SET @ciudad = ?;
    CALL cortesAddOrEdit(@id, @nombre, @caducidad, @ciudad);
  `;
  mysqlConnection.query(query, [id, nombre, caducidad, ciudad], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'corte guardado'});
    } else {
      console.log(err);
    }
  });

});

router.put('/api/cortes/:id', (req, res) => {
  const {nombre, caducidad, ciudad} = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @caducidad = ?;
    SET @ciudad = ?;
    CALL cortesAddOrEdit(@id, @nombre, @caducidad, @ciudad);
  `;
  mysqlConnection.query(query, [id, nombre, caducidad, ciudad], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Corte actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
