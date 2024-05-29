document.addEventListener('DOMContentLoaded', function() {

    const tusDatos = document.getElementById('tusDatos');

    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    if (usuarioActual) {
        tusDatos.querySelector('#nombre').value = usuarioActual.nombre;
        tusDatos.querySelector('#email').value = usuarioActual.email;
        tusDatos.querySelector('#tipo').value = usuarioActual.tipo;
        tusDatos.querySelector('#tuEmpresa').value = sessionStorage.getItem('tuEmpresa');
    }
})