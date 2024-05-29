document.addEventListener('DOMContentLoaded', function() {
    const siguienteButton = document.getElementById('siguiente');
    const divisiones = document.getElementById('divisiones');
    const datosIniciales = document.getElementById('datosIniciales');

    const numActivosInput = document.getElementById('numActivos');
    const crearActivosButton = document.getElementById('crearActivos');
    const listaActivos = document.getElementById('listaActivos');

    const numPasivosInput = document.getElementById('numPasivos');
    const crearPasivosButton = document.getElementById('crearPasivos');
    const listaPasivos = document.getElementById('listaPasivos');

    const totalActivosSpan = document.getElementById('totalActivos');
    const totalPasivosSpan = document.getElementById('totalPasivos');
    const capitalContableSpan = document.getElementById('capitalContable');

    const guardarBalanceButton = document.getElementById('guardarBalance');

    let activos = [];
    let pasivos = [];

    siguienteButton.addEventListener('click', function() {
        datosIniciales.style.display = 'none';
        divisiones.style.display = 'block';
    });

    crearActivosButton.addEventListener('click', function() {
        const numActivos = parseInt(numActivosInput.value);
        listaActivos.innerHTML = '';
        activos = [];

        for (let i = 0; i < numActivos; i++) {
            const div = document.createElement('div');
            const labelInput = document.createElement('input');
            const valueInput = document.createElement('input');

            labelInput.type = 'text';
            labelInput.placeholder = `Nombre del Activo ${i + 1}`;
            valueInput.type = 'number';
            valueInput.step = '0.01';
            valueInput.placeholder = `Valor del Activo ${i + 1}`;
            valueInput.addEventListener('input', actualizarResultados);

            div.appendChild(labelInput);
            div.appendChild(valueInput);
            listaActivos.appendChild(div);

            activos.push({ label: labelInput, value: valueInput });
        }
    });

    crearPasivosButton.addEventListener('click', function() {
        const numPasivos = parseInt(numPasivosInput.value);
        listaPasivos.innerHTML = '';
        pasivos = [];

        for (let i = 0; i < numPasivos; i++) {
            const div = document.createElement('div');
            const labelInput = document.createElement('input');
            const valueInput = document.createElement('input');

            labelInput.type = 'text';
            labelInput.placeholder = `Nombre del Pasivo ${i + 1}`;
            valueInput.type = 'number';
            valueInput.step = '0.01';
            valueInput.placeholder = `Valor del Pasivo ${i + 1}`;
            valueInput.addEventListener('input', actualizarResultados);

            div.appendChild(labelInput);
            div.appendChild(valueInput);
            listaPasivos.appendChild(div);

            pasivos.push({ label: labelInput, value: valueInput });
        }
    });

    function actualizarResultados() {
        const totalActivos = activos.reduce((sum, input) => sum + parseFloat(input.value.value || 0), 0);
        const totalPasivos = pasivos.reduce((sum, input) => sum + parseFloat(input.value.value || 0), 0);
        const capitalContable = totalActivos - totalPasivos;

        totalActivosSpan.textContent = totalActivos.toFixed(2);
        totalPasivosSpan.textContent = totalPasivos.toFixed(2);
        capitalContableSpan.textContent = capitalContable.toFixed(2);
    }

    guardarBalanceButton.addEventListener('click', function() {
        const entidad = document.getElementById('entidad').value;
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;
        const autorizadoPor = document.getElementById('autorizadoPor').value;
        const elaboradoPor = document.getElementById('elaboradoPor').value;

        const balance = {
            entidad,
            fechaInicio,
            fechaFin,
            autorizadoPor,
            elaboradoPor,
            activos: activos.map(a => ({ nombre: a.label.value, valor: parseFloat(a.value.value) })),
            pasivos: pasivos.map(p => ({ nombre: p.label.value, valor: parseFloat(p.value.value) })),
            totalActivos: parseFloat(totalActivosSpan.textContent),
            totalPasivos: parseFloat(totalPasivosSpan.textContent),
            capitalContable: parseFloat(capitalContableSpan.textContent)
        };

        // Guardar el balance en sessionStorage
        let balances = JSON.parse(sessionStorage.getItem('balances')) || [];
        balances.push(balance);
        sessionStorage.setItem('balances', JSON.stringify(balances));

        alert('Balance guardado correctamente');
    });
});