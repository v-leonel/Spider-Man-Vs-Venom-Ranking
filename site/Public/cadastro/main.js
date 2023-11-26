function cadastrar() {

    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var cpfVar = input_cpf.value;
    var senhaVar = input_senha.value;
    var confirmacaoEmail = input_confirmacao_email.value;
    var confirmacaoSenha = input_confirmacao_senha.value;
    var frase = '@'

    if (nomeVar === '' || cpfVar <= 0 || emailVar === '') {
        alert('Por favor preencha o registro')
        return false;
    }
    else {
        if (emailVar.indexOf(frase) === -1)
            alert(`Email inválido`)
        else {
            if (emailVar != confirmacaoEmail)
                alert('Os emails não coincidem.')
            else if (senhaVar != confirmacaoSenha)
                alert('As senhas não coincidem.')
            else
                setInterval(5000);
        }
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            cpfServer: cpfVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.status == 200) {
                // conteudo2.style.display = "block";

                // mensagem_erro.innerHTML =
                //     "Cadastro realizado com sucesso! Redirecionando para tela de Cadastro do usuario...";

                window.location.href = "../login/index.html";
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

// function sumirMensagem() {
//     conteudo2.style.display = "none";
// }