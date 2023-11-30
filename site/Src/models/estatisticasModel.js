var database = require("../database/config");

function obterEstatisticas(){
    var instrucao = `SELECT * FROM ranking;`;
    return database.executar(instrucao);
}

function inserirEstatisticas(fkUsuario, pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado) {
    var instrucao = `
        INSERT INTO estatisticas_jogo (fkUsuario, pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado)
        VALUES (${fkUsuario}, ${pontuacaoTotal}, ${pontuacaoMinima}, ${pontuacaoMaxima}, '${tempoJogado}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    obterEstatisticas,
    inserirEstatisticas
};