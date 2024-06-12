// pastEvents.js

import { pintarTarjetas, limpiarContenedor, mostrarMensajeSinResultados } from '../modules/modules.js';

const apiURL = 'https://aulamindhub.github.io/amazing-api/events.json';

fetch(apiURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const padreTarjetas = document.getElementById("eventos");
        let arreglosPasados = [];
        
        for (let i = 0; i < data.events.length; i++) {
            if (data.currentDate > data.events[i].date) {
                arreglosPasados.push(data.events[i]);
            }
        }

        pintarTarjetas(arreglosPasados, padreTarjetas);

        const checkboxsCategorias = document.getElementById('categorias');
        const buscarPorTarjeta = document.getElementById('BuscadorTarjetas');

        function aplicarFiltros() {
            const checkboxsCategoriasChecked = document.querySelectorAll('input[type=checkbox]:checked');
            const textoBusqueda = buscarPorTarjeta.value.toLowerCase();

            const tarjetasFiltradas = arreglosPasados.filter(tarjeta => {
                const coincideCategoria = checkboxsCategoriasChecked.length === 0 || Array.from(checkboxsCategoriasChecked).some(checkbox => checkbox.value === tarjeta.category);
                const coincideBusqueda = tarjeta.name.toLowerCase().includes(textoBusqueda) || tarjeta.description.toLowerCase().includes(textoBusqueda);
                return coincideCategoria && coincideBusqueda;
            });

            limpiarContenedor(padreTarjetas);
            if (tarjetasFiltradas.length > 0) {
                pintarTarjetas(tarjetasFiltradas, padreTarjetas);
            } else {
                mostrarMensajeSinResultados(padreTarjetas);
            }
        }

        checkboxsCategorias.addEventListener('change', aplicarFiltros);
        buscarPorTarjeta.addEventListener('input', aplicarFiltros);
    })
    .catch(error => {
        console.error('Error:', error);
        const padreTarjetas = document.getElementById("eventos");
        mostrarMensajeSinResultados(padreTarjetas);
    });
