// Variable global para guardar la lista original y no perderla al buscar
let todosLosVoluntarios = [];

document.addEventListener('DOMContentLoaded', async () => {
    const inputBusqueda = document.getElementById('input-busqueda');

    try {
        // 1. Descargamos los datos del servidor
        const respuesta = await fetch('/api/voluntarios');
        todosLosVoluntarios = await respuesta.json();

        // 2. Dibujamos la tabla por primera vez con todos los datos
        renderizarTabla(todosLosVoluntarios);

        // 3. ¡LA MAGIA DE LA BÚSQUEDA! Escuchamos cada vez que escribes algo
        inputBusqueda.addEventListener('input', (evento) => {
            const textoBuscado = evento.target.value.toLowerCase(); // Convertimos a minúsculas

            // Filtramos la lista original
            const voluntariosFiltrados = todosLosVoluntarios.filter(voluntario => {
                return voluntario.nombre.toLowerCase().includes(textoBuscado) ||
                    voluntario.email.toLowerCase().includes(textoBuscado) ||
                    voluntario.telefono.includes(textoBuscado);
            });

            // Redibujamos la tabla solo con los que coinciden
            renderizarTabla(voluntariosFiltrados);
        });

    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        document.getElementById('lista-voluntarios').innerHTML =
            '<tr><td colspan="7" style="text-align: center; color: red;">Hubo un error al cargar la información.</td></tr>';
    }
});

// Función constructora: Se encarga de dibujar las filas recibiendo una lista
function renderizarTabla(lista) {
    const cuerpoTabla = document.getElementById('lista-voluntarios');
    cuerpoTabla.innerHTML = ''; // Limpiamos el lienzo

    if (lista.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No se encontraron voluntarios con esa búsqueda. 🕵️‍♂️</td></tr>';
        return;
    }

    lista.forEach(voluntario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>#${voluntario.id}</strong></td>
            <td>${voluntario.nombre}</td>
            <td><a href="mailto:${voluntario.email}">${voluntario.email}</a></td>
            <td>${voluntario.telefono}</td>
            <td>${voluntario.motivo}</td>
            <td>
                <input type="checkbox" ${voluntario.contactado ? 'checked' : ''} onchange="marcarComoContactado(${voluntario.id})">
            </td>
            <td>
                <select onchange="actualizarMedio(${voluntario.id}, this.value)" class="select-medio">
                    <option value="Ninguno" ${voluntario.medioContacto === 'Ninguno' ? 'selected' : ''}>Ninguno</option>
                    <option value="Correo" ${voluntario.medioContacto === 'Correo' ? 'selected' : ''}>Correo</option>
                    <option value="Teléfono" ${voluntario.medioContacto === 'Teléfono' ? 'selected' : ''}>Teléfono</option>
                    <option value="WhatsApp" ${voluntario.medioContacto === 'WhatsApp' ? 'selected' : ''}>WhatsApp</option>
                </select>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// ==========================================
// FUNCIONES GLOBALES DE ACTUALIZACIÓN
// ==========================================

async function marcarComoContactado(idVoluntario) {
    try {
        const respuesta = await fetch(`/api/voluntarios/${idVoluntario}/contactado`, { method: 'PUT' });
        if (!respuesta.ok) alert("Hubo un problema al actualizar el estado.");
    } catch (error) { console.error("Error:", error); }
}

async function actualizarMedio(idVoluntario, medioSeleccionado) {
    try {
        const respuesta = await fetch(`/api/voluntarios/${idVoluntario}/medio-contacto?medio=${medioSeleccionado}`, { method: 'PUT' });
        if (!respuesta.ok) alert("Hubo un problema al guardar el medio.");
    } catch (error) { console.error("Error:", error); }
}