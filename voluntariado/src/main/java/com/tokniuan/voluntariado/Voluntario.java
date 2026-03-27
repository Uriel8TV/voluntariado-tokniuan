package com.tokniuan.voluntariado;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Esto le dice a Java: "¡Conviérteme en una tabla de base de datos!"
public class Voluntario {

    @Id // Esto le dice que es el identificador único
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Para que el ID se enumere solo (1, 2, 3...)
    private Long id;

    private String nombre;
    private String email;
    private String telefono;
    private String motivo;

    // --- IMPORTANTE: Deja aquí abajo los Getters y Setters que ya tenías ---
    // (Añade también los del ID)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
}