CREATE DATABASE spider_man;
USE spider_man;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(50),
cpf CHAR(14)
);

CREATE TABLE jogo(
id INT PRIMARY KEY,
nome VARCHAR(45),
tipo VARCHAR(45)
);

CREATE TABLE estatisticas_jogo(
fkJogo INT,
fkUsuario INT,
tempo_resolucao TIME,
pontuacao INT,
PRIMARY KEY(fkJogo, fkUsuario),
FOREIGN KEY (fkJogo) REFERENCES jogo(id),
FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE foto_de_perfil(
id INT PRIMARY KEY,
fkfoto_Usuario INT,
FOREIGN KEY (fkfoto_usuario) REFERENCES usuario(id)
);

CREATE TABLE personagem(
fkfoto_personagem INT PRIMARY KEY,
nome VARCHAR(45)
);
