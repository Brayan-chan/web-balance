document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('login-form');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Obtener los datos del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar el usuario en la lista de usuarios
        const usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password);

        if (usuario) {
            // Almacenar el usuario actual en el almacenamiento de sesión
            sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));

            // Mostrar alerta de éxito
            alert('Inicio de sesión exitoso');
            window.location.href = '../pages/menu.html';
        } else {
            // Mostrar alerta de error
            alert('Credenciales incorrectas');
        }
    })
})