var estatisticasModel = require('../models/estatisticasModel');

function inserirEstatisticas(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var pontuacaoTotal = req.body.pontuacaoTotal;
    var pontuacaoMinima = req.body.pontuacaoMinima;
    var pontuacaoMaxima = req.body.pontuacaoMaxima;
    var tempoJogado = req.body.tempoJogado;

    estatisticasModel.inserirEstatisticas(fkUsuario, pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao registrar estatísticas do jogo! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    inserirEstatisticas
};