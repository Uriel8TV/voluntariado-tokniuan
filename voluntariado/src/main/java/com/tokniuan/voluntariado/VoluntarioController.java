package com.tokniuan.voluntariado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/voluntarios")
public class VoluntarioController {

    @Autowired
    private VoluntarioRepository repository;

    // Método para GUARDAR datos (Cuando la página web envía el formulario)
    @PostMapping
    public String recibirDatos(@RequestBody Voluntario nuevoVoluntario) {
        repository.save(nuevoVoluntario);
        return "¡Gracias por querer unirte a la familia Tokniuan! Tus datos han sido guardados exitosamente.";
    }

    // NUEVO: Método para VER los datos (Nuestra propia consola)
    @GetMapping
    public List<Voluntario> verVoluntarios() {
        // Esto va a la base de datos y saca todos los registros
        return repository.findAll();
    }

    @PutMapping("/{id}/contactado")
    public Voluntario cambiarEstadoContacto(@PathVariable Long id) {
        // Buscamos al voluntario en la base de datos por su ID
        Voluntario voluntario = repository.findById(id).orElseThrow();

        // Cambiamos su estado al contrario (si era false, pasa a true y viceversa)
        voluntario.setContactado(!voluntario.isContactado());

        // Lo guardamos actualizado
        return repository.save(voluntario);
    }

    @PutMapping("/{id}/medio-contacto")
    public Voluntario actualizarMedioContacto(@PathVariable Long id, @RequestParam String medio) {
        // Buscamos al voluntario
        Voluntario voluntario = repository.findById(id).orElseThrow();

        // Le guardamos el texto que eligió el coordinador (Correo, Teléfono, etc.)
        voluntario.setMedioContacto(medio);

        // Guardamos los cambios
        return repository.save(voluntario);
    }
}