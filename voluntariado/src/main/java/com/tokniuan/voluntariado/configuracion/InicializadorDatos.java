package com.tokniuan.voluntariado.configuracion;


import com.tokniuan.voluntariado.ContenidoWeb; // Ajusta el import
import com.tokniuan.voluntariado.ContenidoWebRepository; // Ajusta el import
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InicializadorDatos {

    @Bean
    public CommandLineRunner iniciarDatos(ContenidoWebRepository repositorio) {
        return args -> {
            // Verificamos si la tabla de textos está vacía
            if (repositorio.count() == 0) {

                // Creamos nuestro primer texto dinámico
                ContenidoWeb titulo = new ContenidoWeb();
                titulo.setClave("titulo_principal");
                titulo.setContenido("Bienvenidos a la familia Tokniuan");

                // Creamos otro texto, por ejemplo, para una fecha
                ContenidoWeb fecha = new ContenidoWeb();
                fecha.setClave("fecha_proxima_reunion");
                fecha.setContenido("Sábado 25 de abril");

                // Creamos un anuncio
                ContenidoWeb anuncio = new ContenidoWeb();
                anuncio.setClave("mensaje_anuncio");
                anuncio.setContenido("¡Únete a nuestro próximo evento para entregar juguetes!");

                // Creamos el espacio para el nombre de la imagen (por defecto vacío)
                ContenidoWeb imagenEvento = new ContenidoWeb();
                imagenEvento.setClave("imagen_evento");
                imagenEvento.setContenido("default.jpg"); // Nombre por defecto

                // No olvides agregar la línea para guardarlo:
                // repositorio.save(imagenEvento);
                // Los guardamos en la base de datos
                repositorio.save(titulo);
                repositorio.save(fecha);
                repositorio.save(anuncio);
                repositorio.save(imagenEvento);

                System.out.println("✅ Textos iniciales del CMS cargados con éxito.");
            }
        };
    }
}
