

export function pintarTarjetas(arregloAPintar, divContenedor) {
    for (let i = 0; i < arregloAPintar.length; i++) {
        crearTarjeta(divContenedor, arregloAPintar[i]);
    }
}

export function crearTarjeta(divContenedor, contenidoTarjeta) {
    let contenidoDeTarjetaNueva = document.createElement('div');
    contenidoDeTarjetaNueva.className = 'col';
    contenidoDeTarjetaNueva.ignnerHTML = `
    <div class="card text-center">
        <img src="${contenidoTarjeta.image}">
        <div class="card-body">
            <h5 class="card-title">${contenidoTarjeta.name}</h5>
            <p class="card-text">${contenidoTarjeta.description}</p>
            <div class="card-footer d-flex justify-content-around">
                <p class='d-flex align-items-center'>$${contenidoTarjeta.price}</p>
                <a href="details.html?_id=${contenidoTarjeta._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;
    divContenedor.appendChild(contenidoDeTarjetaNueva);
}

export function limpiarContenedor(divContenedor) {
    divContenedor.innerHTML = '';
}

export function mostrarMensajeSinResultados(divContenedor) {
    let mensaje = document.createElement('div');
    mensaje.className = 'col text-center';
    mensaje.innerHTML = `<p>No hay resultados de la búsqueda</p>`;
    divContenedor.appendChild(mensaje);
}
