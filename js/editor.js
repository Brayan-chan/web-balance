document.addEventListener('DOMContentLoaded', function() {
    const editarButton = document.getElementById('editar');
    const guardarCambiosButton = document.getElementById('guardarCambios');
    const eliminarBalanceButton = document.getElementById('eliminarBalance');

    let balance = JSON.parse(sessionStorage.getItem('balanceSeleccionado'));
    cargarBalance(balance);

    editarButton.addEventListener('click', habilitarEdicion);
    guardarCambiosButton.addEventListener('click', guardarCambios);
    eliminarBalanceButton.addEventListener('click', eliminarBalance);

    function cargarBalance(balance) {
        document.getElementById('entidad').value = balance.entidad;
        document.getElementById('fechaInicio').value = balance.fechaInicio;
        document.getElementById('fechaFin').value = balance.fechaFin;
        document.getElementById('autorizadoPor').value = balance.autorizadoPor;
        document.getElementById('elaboradoPor').value = balance.elaboradoPor;

        const listaActivos = document.getElementById('listaActivos');
        listaActivos.innerHTML = '';
        balance.activos.forEach(activo => {
            const div = document.createElement('div');
            const labelInput = document.createElement('input');
            const valueInput = document.createElement('input');

            labelInput.type = 'text';
            labelInput.value = activo.nombre;
            labelInput.disabled = true;
            valueInput.type = 'number';
            valueInput.step = '0.01';
            valueInput.value = activo.valor;
            valueInput.disabled = true;

            div.appendChild(labelInput);
            div.appendChild(valueInput);
            listaActivos.appendChild(div);
        });

        const listaPasivos = document.getElementById('listaPasivos');
        listaPasivos.innerHTML = '';
        balance.pasivos.forEach(pasivo => {
            const div = document.createElement('div');
            const labelInput = document.createElement('input');
            const valueInput = document.createElement('input');

            labelInput.type = 'text';
            labelInput.value = pasivo.nombre;
            labelInput.disabled = true;
            valueInput.type = 'number';
            valueInput.step = '0.01';
            valueInput.value = pasivo.valor;
            valueInput.disabled = true;

            div.appendChild(labelInput);
            div.appendChild(valueInput);
            listaPasivos.appendChild(div);
        });

        document.getElementById('totalActivos').textContent = balance.totalActivos.toFixed(2);
        document.getElementById('totalPasivos').textContent = balance.totalPasivos.toFixed(2);
        document.getElementById('capitalContable').textContent = balance.capitalContable.toFixed(2);
    }

    function habilitarEdicion() {
        document.querySelectorAll('input').forEach(input => input.disabled = false);
        guardarCambiosButton.style.display = 'block';
    }

    function guardarCambios() {
        const entidad = document.getElementById('entidad').value;
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        const autorizadoPor = document.getElementById('autorizadoPor').value;
        const elaboradoPor = document.getElementById('elaboradoPor').value;

        const activos = Array.from(document.querySelectorAll('#listaActivos div')).map(div => ({
            nombre: div.children[0].value,
            valor: parseFloat(div.children[1].value)
        }));

        const pasivos = Array.from(document.querySelectorAll('#listaPasivos div')).map(div => ({
            nombre: div.children[0].value,
            valor: parseFloat(div.children[1].value)
        }));

        const totalActivos = activos.reduce((sum, activo) => sum + activo.valor, 0);
        const totalPasivos = pasivos.reduce((sum, pasivo) => sum + pasivo.valor, 0);
        const capitalContable = totalActivos - totalPasivos;

        balance = {
            entidad,
            fechaInicio,
            fechaFin,
            autorizadoPor,
            elaboradoPor,
            activos,
            pasivos,
            totalActivos,
            totalPasivos,
            capitalContable
        };

        let balances = JSON.parse(sessionStorage.getItem('balances')) || [];
        balances = balances.map(b => (b.entidad === balance.entidad ? balance : b));
        sessionStorage.setItem('balances', JSON.stringify(balances));

        alert('Cambios guardados correctamente');
    }

    function eliminarBalance() {
        let balances = JSON.parse(sessionStorage.getItem('balances')) || [];
        balances = balances.filter(b => b.entidad !== balance.entidad);
        sessionStorage.setItem('balances', JSON.stringify(balances));

        alert('Balance eliminado correctamente');
        window.location.href = '../pages/buscador.html';
    }
});
