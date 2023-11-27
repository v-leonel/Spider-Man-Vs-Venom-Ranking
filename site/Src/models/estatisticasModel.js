var database = require("../database/config");

function inserirEstatisticas(fkUsuario, pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado) {
    var instrucao = `
        INSERT INTO estatisticas_jogo (fkUsuario, pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado)
        VALUES (${fkUsuario}, ${pontuacaoTotal}, ${pontuacaoMinima}, ${pontuacaoMaxima}, '${tempoJogado}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    inserirEstatisticas
};