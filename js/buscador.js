document.addEventListener('DOMContentLoaded', function() {
    const buscarButton = document.getElementById('buscar');
    const editarButton = document.querySelector('.editar');
    const eliminarButton = document.querySelector('.eliminar');
    const guardarCambiosButton = document.querySelector('.guardar-cambios');

    const buscadorInput = document.getElementById('buscador');
    const contenedorResultados = document.querySelector('.contenedor');

    let archivosEncontrados = []; // Variable para almacenar los archivos encontrados

    buscarButton.addEventListener('click', buscarArchivos);
    editarButton.addEventListener('click', habilitarEdicion);
    eliminarButton.addEventListener('click', eliminarArchivo);
    guardarCambiosButton.addEventListener('click', guardarCambios);

    document.addEventListener('DOMContentLoaded', function() {
    const buscarButton = document.getElementById('buscar');
    const editarButton = document.querySelector('.editar');
    const eliminarButton = document.querySelector('.eliminar');
    const guardarCambiosButton = document.querySelector('.guardar-cambios');

    const buscadorInput = document.getElementById('buscador');
    const contenedorResultados = document.querySelector('.contenedor');

    let archivosEncontrados = []; // Variable para almacenar los archivos encontrados

    buscarButton.addEventListener('click', buscarArchivos);
    editarButton.addEventListener('click', habilitarEdicion);
    eliminarButton.addEventListener('click', eliminarArchivo);
    guardarCambiosButton.addEventListener('click', guardarCambios);

    function buscarArchivos() {
        const busqueda = buscadorInput.value.toLowerCase();
        const resultados = archivosEncontrados.filter(archivo => archivo.toLowerCase().includes(busqueda));
        mostrarResultadosDeBusqueda(resultados);
    }    

    function mostrarResultadosDeBusqueda(resultados) {
        const contenedorResultados = document.querySelector('.contenedor');
        contenedorResultados.innerHTML = '';
    
        resultados.forEach(resultado => {
            const elementoResultado = document.createElement('div');
            elementoResultado.textContent = resultado;
            contenedorResultados.appendChild(elementoResultado);
        });
    }
    

    function cargarArchivo(archivo) {
        // Crear una nueva instancia de XMLHttpRequest
        let xhr = new XMLHttpRequest();
    
        // Establecer la función de devolución de llamada cuando la solicitud esté lista
        xhr.onreadystatechange = function() {
            // Verificar si la solicitud se ha completado y la respuesta está lista
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Verificar si la solicitud se completó correctamente
                if (xhr.status === 200) {
                    // Obtener el contenido del archivo
                    let contenido = xhr.responseText;
                    
                    // Llamar a la función para mostrar el contenido del archivo
                    mostrarContenido(contenido);
                } else {
                    // Manejar el error si la solicitud no se completó correctamente
                    console.error('Error al cargar el archivo:', xhr.statusText);
                }
            }
        };
    
        // Abrir una nueva solicitud GET para el archivo especificado
        xhr.open('GET', archivo, true);
    
        // Enviar la solicitud
        xhr.send();
    }
    
    // Función para mostrar el contenido del archivo en la página
    function mostrarContenido(contenido) {
        // Insertar el contenido del archivo en un elemento de la página
        let contenedor = document.getElementById('contenedor-archivo');
        contenedor.innerHTML = contenido;
    }
    

    function habilitarEdicion() {
        // Lógica para habilitar la edición de campos
    }

    function eliminarArchivo() {
        // Lógica para eliminar el archivo seleccionado
    }

    function guardarCambios() {
        // Lógica para guardar los cambios realizados en el archivo
    }

    // Otras funciones y lógicas necesarias

    });
});
