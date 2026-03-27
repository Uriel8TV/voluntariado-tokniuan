document.addEventListener('DOMContentLoaded', () => {
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