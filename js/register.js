document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const password = document.getElementById('password').value;
        const tipo = document.getElementById('tipo').value;
        const recaptcha = document.getElementById('recaptcha');

        if (nombre === '' || email === '' || celular === '' || password === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (recaptcha.checked) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const esCorreoObtenido = usuarios.some(usuario => usuario.email === email);

            if (esCorreoObtenido) {
                alert('El correo ya existe');
                return;
            }

            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                celular: celular,
                password: password,
                tipo: tipo
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            formulario.reset();
            alert('Registro exitoso');
            window.location.href = 'pages/login.html';
        } else {
            alert('Por favor, verifica que no eres un robot.');
        }
    });
});
