package com.tokniuan.voluntariado;

import org.springframework.data.jpa.repository.JpaRepository;

// Este archivo ya trae por defecto funciones como "save()", "findAll()", "delete()", etc.
public interface VoluntarioRepository extends JpaRepository<Voluntario, Long> {
}