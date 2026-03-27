package com.tokniuan.voluntariado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
}