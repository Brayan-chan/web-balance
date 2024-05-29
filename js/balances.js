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

        let balanceHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balance de ${entidad}</title>
    <link rel="stylesheet" href="../css/balances.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="../assets/imagenes/logo.png" alt="BC Corp">
            <span class="company-name">BC Corp</span>
        </div>
        <nav>
            <ul>
                <li><a href="../pages/login.html">Salir</a></li>
            </ul>
        </nav>
    </header>

    <div class="contenedor">
        <div id="datosIniciales">
            <h3>Datos del Balance</h3>
            <form id="datosBalance">
                <label for="entidad">Nombre de la Entidad:</label>
                <input type="text" id="entidad" value="${entidad}" disabled>
                <label for="fechaInicio">Fecha Inicio:</label>
                <input type="date" id="fechaInicio" value="${fechaInicio}" disabled>
                <label for="fechaFin">Fecha Fin:</label>
                <input type="date" id="fechaFin" value="${fechaFin}" disabled>
                <label for="autorizadoPor">Autorizado Por:</label>
                <input type="text" id="autorizadoPor" value="${autorizadoPor}" disabled>
                <label for="elaboradoPor">Elaborado Por:</label>
                <input type="text" id="elaboradoPor" value="${elaboradoPor}" disabled>
            </form>
        </div>

        <div id="divisiones">
            <div id="activos">
                <h3>Activos</h3>
                <div id="listaActivos">
        `;

        activos.forEach((input, index) => {
            balanceHTML += `
                <div>
                    <input type="text" value="${input.label.value}" disabled>
                    <input type="number" value="${input.value.value}" disabled>
                </div>
            `;
        });

        balanceHTML += `
                </div>
            </div>
            <div id="pasivos">
                <h3>Pasivos</h3>
                <div id="listaPasivos">
        `;

        pasivos.forEach((input, index) => {
            balanceHTML += `
                <div>
                    <input type="text" value="${input.label.value}" disabled>
                    <input type="number" value="${input.value.value}" disabled>
                </div>
            `;
        });

        balanceHTML += `
                </div>
            </div>
            <div id="resultados">
                <h3>Resultados</h3>
                <p>Total Activos: <span id="totalActivos">${totalActivosSpan.textContent}</span></p>
                <p>Total Pasivos: <span id="totalPasivos">${totalPasivosSpan.textContent}</span></p>
                <p>Capital Contable: <span id="capitalContable">${capitalContableSpan.textContent}</span></p>
            </div>
        </div>
    </div>
    
    <script src="../js/balances.js"></script>
</body>
</html>
        `;

        const blob = new Blob([balanceHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `balance-${entidad}.html`;
        a.click();
        URL.revokeObjectURL(url);
    });

    document.addEventListener('DOMContentLoaded', function() {
        const guardarComoButton = document.getElementById('guardarComo');
    
        guardarComoButton.addEventListener('click', function() {
            const balanceHTML = document.body; // Aquí puedes seleccionar el elemento que quieres convertir a PDF
    
            html2canvas(balanceHTML).then(function(canvas) {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("balance.pdf");
            });
        });
    });
});


