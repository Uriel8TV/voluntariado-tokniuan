package com.tokniuan.voluntariado;

import com.tokniuan.voluntariado.ContenidoWeb;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ContenidoWebRepository extends JpaRepository<ContenidoWeb, Long> {
    Optional<ContenidoWeb> findByClave(String clave);
}
