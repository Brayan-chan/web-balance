document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    // Obtener los datos del formulario 
    //async function para que espere la respuesta del servidor
    formulario.addEventListener('submit', async function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value;

        const email = document.getElementById('email').value;

        const celular = document.getElementById('celular').value;

        const password = document.getElementById('password').value;

        const tipo = document.getElementById('tipo').value;

        const recaptcha = document.getElementById('recaptcha');

        //validar el formulario
        if (nombre === '' || email === '' || celular === '' || password === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        //validar el captcha
        if (recaptcha.checked) {

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            //verificar si el correo ya existe
            //some verifica si hay un elemento que cumpla la condición
            const esCorreoObtenido = usuarios.some(usuario => usuario.email === email);

            if (esCorreoObtenido) {
                alert('El correo ya existe');
                return;
            }


            //Crear el objeto usuario
            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                celular: celular,
                password: password,
                tipo: tipo
            };

            //Agregar el nuevo usuario a la lista de usuarios
            usuarios.push(nuevoUsuario);

            //Guardar la lista actualizada de usuarios en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            //Limpiar el formulario
            formulario.reset();

            //Mostrar alerta de éxito
            alert('Registro exitoso');

            //Redirigir al usuario a la página del menu
            window.location.href = 'pages/login.html';
           
        } else {
            alert('Por favor, verifica que no eres un robot.');
        }

    })
})