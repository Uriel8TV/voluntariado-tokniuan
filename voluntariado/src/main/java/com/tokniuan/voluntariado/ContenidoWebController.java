package com.tokniuan.voluntariado;

import com.tokniuan.voluntariado.ContenidoWeb;
import com.tokniuan.voluntariado.ContenidoWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contenido")
public class ContenidoWebController {

    @Autowired
    private ContenidoWebRepository repositorio;

    // Para obtener todo el contenido de la web
    @GetMapping
    public List<ContenidoWeb> obtenerTodo() {
        return repositorio.findAll();
    }

    // Para que el administrador actualice una sección específica
    @PutMapping("/{id}")
    public ContenidoWeb actualizarContenido(@PathVariable Long id, @RequestBody ContenidoWeb nuevoContenido) {
        return repositorio.findById(id).map(item -> {
            item.setContenido(nuevoContenido.getContenido());
            return repositorio.save(item);
        }).orElseThrow();
    }
}
