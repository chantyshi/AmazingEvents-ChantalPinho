// stats.js

const apiURL = 'https://aulamindhub.github.io/amazing-api/events.json';

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const events = data.events;
        const currentDate = data.currentDate;

        // Filtrar eventos pasados y futuros
        const pastEvents = events.filter(event => event.date < currentDate);
        const upcomingEvents = events.filter(event => event.date >= currentDate);

        mostrarEstadisticasGenerales(events);
        mostrarEstadisticasPorCategoria(pastEvents, 'past-stats');
        mostrarEstadisticasPorCategoria(upcomingEvents, 'upcoming-stats');
    })
    .catch(error => console.error('Error:', error));

function mostrarEstadisticasGenerales(events) {
    let highestAssistance = { name: "", percentage: 0 };
    let lowestAssistance = { name: "", percentage: Infinity };
    let largestCapacity = { name: "", capacity: 0 };

    events.forEach(event => {
        const assistancePercentage = (event.assistance / event.capacity) * 100;
        if (assistancePercentage > highestAssistance.percentage) {
            highestAssistance = { name: event.name, percentage: assistancePercentage };
        }
        if (assistancePercentage < lowestAssistance.percentage) {
            lowestAssistance = { name: event.name, percentage: assistancePercentage };
        }
        if (event.capacity > largestCapacity.capacity) {
            largestCapacity = { name: event.name, capacity: event.capacity };
        }
    });

    document.getElementById('highest-assistance').innerText = highestAssistance.name;
    document.getElementById('lowest-assistance').innerText = lowestAssistance.name;
    document.getElementById('largest-capacity').innerText = largestCapacity.name;
}

function mostrarEstadisticasPorCategoria(events, tableId) {
    const categorias = {};

    events.forEach(event => {
        if (!categorias[event.category]) {
            categorias[event.category] = {
                revenue: 0,
                assistance: 0,
                totalCapacity: 0
            };
        }

        categorias[event.category].revenue += event.price * (event.assistance || event.estimate);
        categorias[event.category].assistance += event.assistance || event.estimate;
        categorias[event.category].totalCapacity += event.capacity;
    });

    const tabla = document.getElementById(tableId);

    Object.keys(categorias).forEach(key => {
        const category = categorias[key];
        const assistancePercentage = (category.assistance / category.totalCapacity) * 100;

        let nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${key}</td>
            <td>${category.revenue.toLocaleString()}</td>
            <td>${assistancePercentage.toFixed(2)}%</td>
        `;
        tabla.appendChild(nuevaFila);
    });
}
