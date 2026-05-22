document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================
    // LÓGICA DEL MENÚ DE HAMBURGUESA (Móviles)
    // ==========================================
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const enlacesMenu = document.getElementById('enlaces-menu');

    if (btnMenuMovil && enlacesMenu) {
        // 1. Abrir/Cerrar con el botón de hamburguesa
        btnMenuMovil.addEventListener('click', () => {
            enlacesMenu.classList.toggle('mostrar-menu');
        });

        // 2. Autocierre: Cerrar el menú cuando se hace clic en un enlace
        const links = enlacesMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                enlacesMenu.classList.remove('mostrar-menu');
            });
        });
    }

    // ==========================================
    // 1. LÓGICA DEL CMS (Cargar textos dinámicos)
    // ==========================================
    try {
        const respuestaCms = await fetch('/api/contenido');

        if (respuestaCms.ok) {
            const contenidos = await respuestaCms.json();

            // Recorremos el JSON que nos dio el servidor
            contenidos.forEach(item => {
                const elementoHtml = document.getElementById(item.clave);

                if (elementoHtml) {
                    // Si el elemento es nuestra imagen especial...
                    if (item.clave === 'imagen_evento') {
                        // Construimos la ruta hacia la carpeta blindada de Java
                        elementoHtml.src = '/imagenes/' + item.contenido;
                        elementoHtml.style.display = 'inline-block'; // La hacemos visible
                    }
                    // Si es cualquier otro elemento (los textos normales)...
                    else {
                        elementoHtml.innerText = item.contenido;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar el contenido web:', error);

        // 👇 ¡AQUÍ ESTÁ EL CHIVATO PARA EL CELULAR! 👇
        alert('Fallo detectado en el celular al cargar el CMS: ' + error.message);
    }

    // ==========================================
    // 2. LÓGICA DEL FORMULARIO DE VOLUNTARIOS
    // ==========================================
    const formVoluntario = document.getElementById('form-voluntario');

    if(formVoluntario) {
        formVoluntario.addEventListener('submit', async (evento) => {
            evento.preventDefault(); // Evitamos que la página recargue

            // Recolectamos los datos del formulario
            const datosVoluntario = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                motivo: document.getElementById('motivo').value
            };

            try {
                // Enviamos los datos a Java usando Fetch API
                const respuesta = await fetch('/api/voluntarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosVoluntario)
                });

                const mensaje = await respuesta.text();

                // Mostramos el mensaje que nos respondió Java
                alert(mensaje);
                formVoluntario.reset(); // Limpiamos el formulario

            } catch (error) {
                console.error('Error al enviar los datos:', error);
                alert('Hubo un error de conexión. Por favor, intenta de nuevo.');
            }
        });
    }
});