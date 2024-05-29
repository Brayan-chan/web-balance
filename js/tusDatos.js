document.addEventListener('DOMContentLoaded', function() {
    
    const tusDatos = document.getElementById('tusDatos');

    const entrar = document.getElementById('entrar');

    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    if (usuarioActual) {
        tusDatos.querySelector('#nombre').value = usuarioActual.nombre;
        tusDatos.querySelector('#celular').value = usuarioActual.celular;
        tusDatos.querySelector('#email').value = usuarioActual.email;
        tusDatos.querySelector('#tuEmpresa').value = sessionStorage.getItem('tuEmpresa');
        tusDatos.querySelector('#tipo').value = usuarioActual.tipo;
        document.querySelector('#entidad').value = sessionStorage.getItem('tuEmpresa');
    }

    tusDatos.addEventListener('submit', function() {

        const tuEmpresa = document.getElementById('tuEmpresa').value;

        sessionStorage.setItem('tuEmpresa', tuEmpresa); // Almacenar el nombre de la empresa en el almacenamiento de sesión

        // Mostrar alerta de éxito
        alert('Tu empresa se ha guardado exitosamente');
        
        // Insertar el nombre de la empresa en el input de tu empresa
        tuEmpresa.value = sessionStorage.getItem('tuEmpresa');
    })

    entrar.addEventListener('click', function() {
        if(sessionStorage.getItem('tuEmpresa')) {
            window.location.href = '../pages/menu.html';
        } else {
            alert('Completa los datos de tu empresa');
        }
    })
})