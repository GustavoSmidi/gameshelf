package com.gameshelf.backend.repository;

import com.gameshelf.backend.entity.PendingRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PendingRegistrationRepository extends JpaRepository<PendingRegistration, Integer> {

    Optional<PendingRegistration> findByTokenHash (String tokenHash);

    Optional<PendingRegistration> findByEmail (String email);
}
