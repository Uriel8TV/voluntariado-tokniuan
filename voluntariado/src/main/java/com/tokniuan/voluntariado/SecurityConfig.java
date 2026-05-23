package com.tokniuan.voluntariado;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Apagamos una protección temporal para que el formulario HTML funcione sin problemas
                .csrf(csrf -> csrf.disable())

                // Aquí le damos las reglas al "guardia"
                .authorizeHttpRequests(auth -> auth
                        // 1. Lo que el PÚBLICO SÍ puede ver (La página principal, textos del CMS y las fotos)
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/style.css",
                                "/script.js",
                                "/fondo-tokniuan.jpg",
                                "/api/contenido/**",  // ¡NUEVO! Permite leer los textos de la base de datos
                                "/imagenes/**"        // ¡NUEVO! Permite ver las fotos subidas
                        ).permitAll()

                        // 2. Permitimos que cualquiera pueda ENVIAR el formulario
                        .requestMatchers(HttpMethod.POST, "/api/voluntarios").permitAll()

                        // 3. Lo que está PROTEGIDO (Solo coordinadores con contraseña)
                        .requestMatchers(
                                "/admin.html",
                                "/admin.js",
                                "/editor.html",       // ¡NUEVO! Protegemos la nueva página del editor
                                "/editor.js"          // ¡NUEVO! Protegemos la lógica del editor
                        ).authenticated()

                        .requestMatchers(HttpMethod.GET, "/api/voluntarios").authenticated()

                        // Protegemos las rutas para MODIFICAR los textos o SUBIR fotos
                        .requestMatchers(HttpMethod.PUT, "/api/contenido/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/imagenes/subir").authenticated()

                        // Cualquier otra cosa, por si acaso, se bloquea
                        .anyRequest().authenticated()
                )
                // Le decimos que use la pantalla de inicio de sesión que Spring trae por defecto
                .formLogin(form -> form.permitAll())
                .logout(logout -> logout.permitAll());

        return http.build();
    }
}