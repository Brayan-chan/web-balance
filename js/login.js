document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('login-form');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password);

        if (usuario) {
            sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
            alert('Inicio de sesión exitoso');
            window.location.href = '../pages/tusDatos.html';
        } else {
            alert('Credenciales incorrectas');
        }
    });
});