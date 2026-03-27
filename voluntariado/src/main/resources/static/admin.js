document.addEventListener('DOMContentLoaded', async () => {
    const cuerpoTabla = document.getElementById('lista-voluntarios');

    try {
        // 1. Vamos a tocar la puerta de nuestro propio servidor Java
        const respuesta = await fetch('/api/voluntarios');
        const voluntarios = await respuesta.json();

        // 2. Limpiamos el mensaje de "Cargando datos..."
        cuerpoTabla.innerHTML = '';

        // 3. Verificamos si la base de datos está vacía
        if (voluntarios.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="5" style="text-align: center;">Aún no hay aspirantes registrados.</td></tr>';
            return;
        }

        // 4. Por cada voluntario en el JSON, creamos una fila en la tabla
        voluntarios.forEach(voluntario => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td><strong>#${voluntario.id}</strong></td>
                <td>${voluntario.nombre}</td>
                <td><a href="mailto:${voluntario.email}">${voluntario.email}</a></td>
                <td>${voluntario.telefono}</td>
                <td>${voluntario.motivo}</td>
            `;

            cuerpoTabla.appendChild(fila);
        });

    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        cuerpoTabla.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Hubo un error al cargar la información.</td></tr>';
    }
});