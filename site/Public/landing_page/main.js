function redirecionarParaCadastro() {
    window.location.href = "../cadastro/index.html"
}

document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > header.offsetTop) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
});