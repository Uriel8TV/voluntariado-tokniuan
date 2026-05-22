// ==========================================
// LÓGICA DEL EDITOR WEB (CMS)
// ==========================================

const idsCms = {};

async function cargarTextosEnEditor() {
    try {
        const respuesta = await fetch('/api/contenido');
        if (respuesta.ok) {
            const contenidos = await respuesta.json();

            contenidos.forEach(item => {
                idsCms[item.clave] = item.id;

                const inputHtml = document.getElementById('input_' + item.clave);
                if (inputHtml) {
                    inputHtml.value = item.contenido;
                }

                if (item.clave === 'imagen_evento' && item.contenido !== 'default.jpg') {
                    const preview = document.getElementById('preview_imagen');
                    if (preview) {
                        preview.src = '/imagenes/' + item.contenido;
                        preview.style.display = 'block';
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar el CMS:', error);
    }
}

document.getElementById('form-cms')?.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    try {
        // Parte 1: Imagen
        const inputArchivo = document.getElementById('input_archivo_evento');
        if (inputArchivo.files.length > 0) {
            const archivo = inputArchivo.files[0];
            const formData = new FormData();
            formData.append('archivo', archivo);

            const respuestaImg = await fetch('/api/imagenes/subir', {
                method: 'POST',
                body: formData
            });

            if (respuestaImg.ok) {
                const dataImg = await respuestaImg.json();
                const idImagen = idsCms['imagen_evento'];
                if (idImagen) {
                    await fetch(`/api/contenido/${idImagen}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contenido: dataImg.nombreImagen })
                    });
                }
            } else {
                alert('Hubo un problema al subir la imagen.');
            }
        }

        // Parte 2: Textos
        const clavesTextos = ['titulo_principal', 'fecha_proxima_reunion', 'mensaje_anuncio'];
        for (let clave of clavesTextos) {
            const id = idsCms[clave];
            const inputElement = document.getElementById('input_' + clave);

            if (id && inputElement) {
                await fetch(`/api/contenido/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contenido: inputElement.value })
                });
            }
        }

        alert('¡La página principal se ha actualizado con éxito!');
        cargarTextosEnEditor();

    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Hubo un error de conexión al guardar los cambios.');
    }
});

// Arrancar al cargar la página
cargarTextosEnEditor();