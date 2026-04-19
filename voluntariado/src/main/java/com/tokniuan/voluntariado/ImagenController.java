package com.tokniuan.voluntariado;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/api/imagenes")
public class ImagenController {

    // Usamos la misma carpeta segura de tu base de datos para que nada se pierda en la nube
    private final String CARPETA_IMAGENES = "./datos_tokniuan/imagenes/";

    @PostMapping("/subir")
    public ResponseEntity<?> subirImagen(@RequestParam("archivo") MultipartFile archivo) {
        if (archivo.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Archivo vacío");
        }
        try {
            // 1. Si la carpeta de imágenes no existe, Java la crea automáticamente
            File directorio = new File(CARPETA_IMAGENES);
            if (!directorio.exists()) {
                directorio.mkdirs();
            }

            // 2. Limpiamos el nombre del archivo (para evitar problemas con espacios)
            String nombreOriginal = archivo.getOriginalFilename();
            String nombreLimpio = nombreOriginal.replaceAll("\\s+", "_");

            // 3. Guardamos el archivo físicamente en tu computadora/servidor
            byte[] bytes = archivo.getBytes();
            Path ruta = Paths.get(CARPETA_IMAGENES + nombreLimpio);
            Files.write(ruta, bytes);

            // 4. Le respondemos al Javascript cuál fue el nombre final para que lo guarde en el CMS
            return ResponseEntity.ok(Map.of("nombreImagen", nombreLimpio));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al guardar la imagen: " + e.getMessage());
        }
    }
}
