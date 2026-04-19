package com.tokniuan.voluntariado;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ContenidoWeb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clave; // Ejemplo: "titulo_principal", "fecha_evento"

    @Column(columnDefinition = "TEXT")
    private String contenido; // El texto real que se verá en la web
}
