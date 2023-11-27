var express = require('express');
var router = express.Router();

var estatisticasController = require('../controllers/estatisticasController');

router.post('/inserir', (req, res) => estatisticasController.inserirEstatisticas(req, res));

module.exports = router;