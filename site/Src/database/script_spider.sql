CREATE DATABASE spider_man;
USE spider_man;
DROP DATABASE spider_man;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(50),
senha VARCHAR(45)
);

SELECT * FROM usuario;

CREATE TABLE jogo(
id INT PRIMARY KEY,
nome VARCHAR(45)
);

insert into jogo values
(1, 'spider-vs-venom');

CREATE TABLE estatisticas_jogo(
id INT AUTO_INCREMENT,
fkJogo INT DEFAULT 1,
fkUsuario INT,
pontuacaoTotal INT,
pontuacaoMinima INT,
pontuacaoMaxima INT,
tempoJogado TIME,
PRIMARY KEY(id, fkJogo, fkUsuario),
FOREIGN KEY (fkJogo) REFERENCES jogo(id),
FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

select * from estatisticas_jogo;

SELECT sum(tempoJogado) FROM estatisticas_jogo GROUP BY fkUsuario;
SELECT sum(pontuacaoTotal), sum(tempoJogado) FROM estatisticas_jogo GROUP BY fkUsuario;

SELECT 
u.nome AS Usuario,
max(pontuacaoMaxima) AS 'MaiorPonto',
min(pontuacaoMinima) AS 'MenorPonto',
sum(pontuacaoTotal) AS 'Total',
sum(tempoJogado) AS 'Tempo'
FROM usuario AS u
JOIN estatisticas_jogo ON fkUsuario = u.id GROUP BY fkUsuario ORDER BY total desc, tempo
;

CREATE VIEW ranking AS
SELECT 
u.nome AS Usuario,
max(pontuacaoMaxima) AS 'MaiorPonto',
min(pontuacaoMinima) AS 'MenorPonto',
sum(pontuacaoTotal) AS 'Total',
sum(tempoJogado) AS 'Tempo'
FROM usuario AS u
JOIN estatisticas_jogo ON fkUsuario = u.id GROUP BY fkUsuario ORDER BY total desc, tempo
;

SELECT * FROM ranking;


CREATE TABLE foto_de_perfil(
id INT PRIMARY KEY,
fkfoto_Usuario INT,
FOREIGN KEY (fkfoto_usuario) REFERENCES usuario(id)
);

CREATE TABLE personagem(
fkfoto_personagem INT PRIMARY KEY,
nome VARCHAR(45)
);
