// home.js
import { pintarTarjetas, crearTarjeta, limpiarContenedor, mostrarMensajeSinResultados } from '../modules/modules.js';

const apiURL = 'https://aulamindhub.github.io/amazing-api/events.json';

// Función para obtener los eventos desde la API y luego mostrarlos
fetch(apiURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la API');
        }
        return response.json();
    })
    .then(data => {


let padreTarjetas = document.getElementById("eventos");

pintarTarjetas(data.events, padreTarjetas);

let checkboxsCategorias = document.getElementById('categorias');
console.log(checkboxsCategorias);

let buscarPorTarjeta = document.getElementById('BuscadorTarjetas');

function aplicarFiltros() {
    let checkboxsCategoriasChecked = document.querySelectorAll('input[type=checkbox]:checked');
    let textoBusqueda = buscarPorTarjeta.value.toLowerCase();

    let tarjetasFiltradas = data.events.filter(tarjeta => {
        let coincideCategoria = checkboxsCategoriasChecked.length === 0 || Array.from(checkboxsCategoriasChecked).some(checkbox => checkbox.value === tarjeta.category);
        let coincideBusqueda = tarjeta.name.toLowerCase().includes(textoBusqueda) || tarjeta.description.toLowerCase().includes(textoBusqueda);
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
buscarPorTarjeta.addEventListener('input', aplicarFiltros); })
.catch(error => {
    console.error('Error:', error);
    const padreTarjetas = document.getElementById("eventos");
    mostrarMensajeSinResultados(padreTarjetas);
});
