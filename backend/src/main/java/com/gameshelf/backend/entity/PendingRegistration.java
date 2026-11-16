package com.gameshelf.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "pending_registrations")
public class PendingRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String username;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column
    private String email;

    @Column(name = "token_hash")
    private  String tokenHash;

    @Column(name = "wait_secret_hash")
    private String waitSecretHash;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "expires_At")
    private Instant expiresAt;
}
