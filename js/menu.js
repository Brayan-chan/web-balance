document.addEventListener('DOMContentLoaded', function() {
    
    const tusDatos = document.getElementById('tusDatos');

    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    if (usuarioActual) {
        tusDatos.querySelector('#nombre').value = usuarioActual.nombre;
        tusDatos.querySelector('#celular').value = usuarioActual.celular;
        tusDatos.querySelector('#email').value = usuarioActual.email;
        tusDatos.querySelector('#tuEmpresa').value = sessionStorage.getItem('tuEmpresa');
    }

    tusDatos.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const tuEmpresa = document.getElementById('tuEmpresa').value;

        sessionStorage.setItem('tuEmpresa', tuEmpresa); // Almacenar el nombre de la empresa en el almacenamiento de sesión

        // Mostrar alerta de éxito
        alert('Tu empresa se ha guardado exitosamente');
        
        // Insertar el nombre de la empresa en el input de tu empresa
        tuEmpresa.value = sessionStorage.getItem('tuEmpresa');
    })
})