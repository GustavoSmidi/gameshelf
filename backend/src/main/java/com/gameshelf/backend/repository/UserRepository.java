package com.gameshelf.backend.repository;

import com.gameshelf.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<UserDetails> findUserByEmail(String email);

    boolean existsByEmail (String email);
}