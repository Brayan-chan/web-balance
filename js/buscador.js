document.addEventListener('DOMContentLoaded', function() {
    const buscadorInput = document.getElementById('buscador');
    const contenedorResultados = document.querySelector('.resultados');
    const abrirBalanceButton = document.getElementById('abrirBalance');

    let balances = JSON.parse(sessionStorage.getItem('balances')) || [];
    let balanceSeleccionado = null;

    buscadorInput.addEventListener('input', buscarBalances);
    abrirBalanceButton.addEventListener('click', abrirBalance);

    function buscarBalances() {
        const busqueda = buscadorInput.value.toLowerCase();
        contenedorResultados.innerHTML = '';

        const resultados = balances.filter(balance => balance.entidad.toLowerCase().includes(busqueda));

        resultados.forEach((resultado, index) => {
            const elementoResultado = document.createElement('div');
            elementoResultado.textContent = resultado.entidad;
            elementoResultado.dataset.index = index;
            elementoResultado.addEventListener('click', () => {
                balanceSeleccionado = resultado;
                abrirBalanceButton.style.display = 'block';
            });
            contenedorResultados.appendChild(elementoResultado);
        });
    }

    function abrirBalance() {
        if (balanceSeleccionado) {
            // Redirigir a la página del balance o cargar los datos en la misma página
            sessionStorage.setItem('balanceSeleccionado', JSON.stringify(balanceSeleccionado));
            window.location.href = '../pages/editor.html';
        }
    }
});
