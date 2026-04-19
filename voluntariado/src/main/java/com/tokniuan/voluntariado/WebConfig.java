package com.tokniuan.voluntariado;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Configuration
    public static class RutasEstaticasConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            // Le decimos a Spring: "Si alguien pide una ruta que empiece con /imagenes/,
            // ve a buscar el archivo a la carpeta ./datos_tokniuan/imagenes/"
            registry.addResourceHandler("/imagenes/**")
                    .addResourceLocations("file:./datos_tokniuan/imagenes/");
        }
    }
}