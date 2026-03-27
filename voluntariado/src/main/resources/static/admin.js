document.addEventListener('DOMContentLoaded', async () => {
    const cuerpoTabla = document.getElementById('lista-voluntarios');

    try {
        const respuesta = await fetch('/api/voluntarios');
        const voluntarios = await respuesta.json();

        cuerpoTabla.innerHTML = '';

        if (voluntarios.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="7" style="text-align: center;">Aún no hay aspirantes registrados.</td></tr>';
            return;
        }

        voluntarios.forEach(voluntario => {
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

    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        cuerpoTabla.innerHTML = '<tr><td colspan="7" style="text-align: center; color: red;">Hubo un error al cargar la información.</td></tr>';
    }
});

async function marcarComoContactado(idVoluntario) {
    try {
        const respuesta = await fetch(`/api/voluntarios/${idVoluntario}/contactado`, {
            method: 'PUT'
        });
        if (!respuesta.ok) alert("Hubo un problema al actualizar el estado. Intenta de nuevo.");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

async function actualizarMedio(idVoluntario, medioSeleccionado) {
    try {
        const respuesta = await fetch(`/api/voluntarios/${idVoluntario}/medio-contacto?medio=${medioSeleccionado}`, {
            method: 'PUT'
        });
        if (!respuesta.ok) alert("Hubo un problema al guardar el medio de contacto.");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}